# Backend — AGENTS.md

API Node.js 20 + Express 4 con MongoDB (Mongoose), Redis/BullMQ, MinIO.

## Entrypoints

| Archivo | Rol |
|---|---|
| `src/server.js` | Arranque: conecta MongoDB, inicia workers BullMQ (si no es test), inicia Express |
| `src/app.js` | Express app: middlewares globales, rutas, error handlers |

NO usar ES modules. Todo es **CommonJS** (`require`/`module.exports`).

## Arquitectura: Controller → Service → Model

```
routes/ → controllers/ → services/ → models/
  (validación)              (lógica       (Mongoose)
   express-validator         de negocio)
```

- **Controllers**: manejan `req`/`res`. Máximo ~5 líneas, envueltos en `catchAsync(fn)`.
- **Services**: lógica de negocio pura, sin HTTP. Testeables. Lanzan `AppError` para errores esperados.
- **Models**: esquemas Mongoose con validaciones, índices y hooks (`pre('save')`).
- **Validators**: reglas `express-validator` separadas por recurso en `src/validators/`.

## Estructura de `src/`

```
config/       env.js, db.js, cors.js, minio.js
controllers/  auth, products, orders, cart, etc.
services/     auth, products, orders, payments, n8n, etc.
models/       user, product, order, cart, review, etc.
routes/       auth.routes, products.routes, orders.routes, etc.
middlewares/  auth.middleware (protect, restrictTo), rateLimiter, validate, upload
validators/   product.validators, order.validators, review.validators
errors/       AppError, errorHandler, notFound
jobs/         notificationQueue (BullMQ), orderQueue, workers/
webhooks/     stripe, paypal, n8n.webhook (Express routers)
utils/        catchAsync, formatResponse, minioUpload, tokenUtils, pdfGenerator, emailTemplates
uploads/      multer.config (memoryStorage), uploadMiddleware
logs/         logger (Winston: file + console en no-prod)
```

## Convenciones clave

- **Toda respuesta pasa por `formatResponse(success, message, data)`**.
- **Handlers asíncronos** envueltos en `catchAsync(fn)` → atrapa errores y los pasa a `next(err)`.
- **Errores operacionales** con `new AppError(message, statusCode)` → `isOperational = true`.
- **Stripe webhook** montado en `app.js` **ANTES** de `express.json()` (necesita `express.raw()` para firma).
- **Rate limiting**: global (`100/15min`) + auth (`10/hora`) con RedisStore, fallback a memoria si Redis no está.
- **Multer** en memoria (`memoryStorage`). Archivos suben directo a MinIO/S3.
- **Soft delete**: modelos usan `isDeleted: Boolean` + `deletedAt: Date`.
- **BullMQ**: workers NO arrancan en `NODE_ENV=test` (ver `server.js:13`).

## Comandos

```bash
npm run dev          # nodemon src/server.js
npm start            # node src/server.js
npm run seed         # node scripts/seed.js
npm run migrate      # node scripts/migrate.js
npm run clear-cache  # node scripts/clearCache.js
npm test             # Jest --runInBand --detectOpenHandles (unit + integration, requiere MongoDB)
npm run test:coverage
```

## Tests (Jest + Supertest)

- **Tests corren secuencialmente** (`--runInBand`). No paralelizar.
- **Timeout de test**: 30s (configurado en `package.json` jest.testTimeout).
- **Unit tests** (`tests/unit/`): mockean Mongoose directamente con `jest.mock('../../src/models/...')`.
- **Integration tests** (`tests/integration/`): necesitan MongoDB corriendo. Tienen guardia: si `MONGO_URI` no incluye "test", se saltan con warning.
- **Coverage**: `npm run test:coverage` reporta en `coverage/`.

```bash
# Solo unit
npx jest tests/unit --runInBand

# Solo integration
npx jest tests/integration --runInBand

# Archivo específico
npx jest tests/unit/products.service.test.js --runInBand
```

## Variables de entorno requeridas

| Variable | ¿Obligatorio? | Nota |
|---|---|---|
| `MONGO_URI` | Siempre | Test `mi-ecommerce-test` |
| `JWT_SECRET` | Siempre | |
| `JWT_EXPIRES_IN` | Siempre | |
| `REFRESH_TOKEN_SECRET` | Siempre | |
| `REFRESH_TOKEN_EXPIRES_IN` | Siempre | |
| `REDIS_HOST` | Producción | Fallback localhost en dev |
| `MINIO_*` | Producción | Fallback localhost en dev |
| `STRIPE_SECRET_KEY` | Producción | Stripe webhook deshabilitado si falta |

> Los tests unitarios requieren `JWT_SECRET`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_SECRET` y `REFRESH_TOKEN_EXPIRES_IN` — ya incluidos vía `cross-env` en el script `test` de `package.json`.

## Notas operativas

- MongoDB connection: `maxPoolSize: 50`, `minPoolSize: 5`, retry 3 veces con 5s de delay.
- Winston escribe `logs/error.log` y `logs/combined.log`. En no-prod también imprime en consola.
- `.env.example` como referencia. Copiar a `.env` y ajustar.
- MinIO client se inicializa solo si `MINIO_ACCESS_KEY` y `MINIO_SECRET_KEY` están presentes.
