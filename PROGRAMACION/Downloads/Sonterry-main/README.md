# SonTerry — Plataforma de E-Commerce para Personalización Textil

> Tienda en línea full-stack con configurador 3D, pagos integrados y notificaciones WhatsApp automáticas. Diseñada desde el primer día para producción.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-7.0-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos de Datos](#modelos-de-datos)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Variables de Entorno](#variables-de-entorno)
- [API Reference](#api-reference)
- [Flujo de Notificación WhatsApp](#flujo-de-notificación-whatsapp)
- [Tests](#tests)
- [CI/CD](#cicd)
- [Despliegue en Producción](#despliegue-en-producción)
- [Contribuir](#contribuir)

---

## Descripción General

**SonTerry** es una plataforma de e-commerce especializada en personalización textil (serigrafía, DTF, mugs, gorras). Incluye un **configurador 3D interactivo** donde los clientes diseñan su producto en tiempo real, un sistema de **pagos dual** (Stripe + PayPal), y un pipeline de **notificaciones automáticas por WhatsApp** al momento del despacho.

### Características Principales

| Módulo | Descripción |
|---|---|
| 🎨 **Configurador 3D** | Editor Three.js: prenda, color, texto y posición de diseño en tiempo real |
| 💳 **Pagos Múltiples** | Stripe, PayPal y transferencia bancaria con webhooks verificados |
| 📦 **Gestión de Órdenes** | Ciclo completo: pending → paid → shipped → delivered → cancelled |
| 💬 **WhatsApp Automático** | Notificación al cliente al marcar despacho vía n8n + Evolution API |
| 🔒 **Autenticación Segura** | JWT + Refresh Token rotativo en cookie httpOnly |
| 🛡️ **Rate Limiting** | Por IP y por userId para endpoints sensibles |
| 🗃️ **Object Storage** | MinIO S3-compatible para imágenes de productos |
| 🎟️ **Soporte Postventa** | Sistema de tickets vinculado a órdenes con chat interno |
| ⚡ **Colas Asíncronas** | BullMQ + Redis para emails, facturas y notificaciones sin bloquear HTTP |
| 🧪 **Tests Completos** | Unit (Jest) + Integration (Supertest) con cobertura financiera |

---

## Stack Tecnológico

### Backend
- **Runtime**: Node.js 20 + Express 4
- **Base de datos**: MongoDB 4.4 (Mongoose)
- **Caché / Colas**: Redis 7.0 + BullMQ
- **Autenticación**: JWT + bcrypt
- **Validación**: express-validator
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Storage**: MinIO (S3-compatible)
- **Pagos**: Stripe, PayPal

### Frontend
- **Framework**: React 18 + Vite
- **Estado Global**: Zustand
- **Caché de Servidor**: TanStack Query (React Query)
- **Formularios**: react-hook-form + Zod
- **3D**: Three.js + React Three Fiber
- **Routing**: React Router v6

### Infraestructura
- **Contenedores**: Docker + Docker Compose
- **Automatización**: n8n (self-hosted)
- **WhatsApp Bridge**: Evolution API v1.8.2
- **CI/CD**: GitHub Actions

---

## Arquitectura del Sistema

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                        │
│              React 18 + Vite  ─  :5173 / :3000                   │
│    Zustand · React Query · React Hook Form · Three.js            │
└───────────────────────────┬──────────────────────────────────────┘
                            │ HTTP/REST
┌───────────────────────────▼──────────────────────────────────────┐
│                     API (Express + Node.js)  :5000               │
│  Controllers → Services → Models  |  BullMQ Workers             │
│  JWT Auth · Rate Limiting · Multer · Stripe/PayPal Webhooks      │
└────────┬──────────────┬──────────────────┬───────────────────────┘
         │              │                  │
┌────────▼────┐  ┌──────▼──────┐  ┌───────▼────────┐
│  MongoDB    │  │   Redis     │  │     MinIO      │
│  :27017     │  │  :6379      │  │  :9000 / :9001 │
│  Datos      │  │  Cache +    │  │  Imágenes      │
│  principales│  │  BullMQ     │  │  (S3-compat.)  │
└─────────────┘  └─────────────┘  └────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    AUTOMATIZACIÓN / MENSAJERÍA                   │
│          n8n  :5678  ──────────▶  Evolution API  :8080           │
│       (Flujos lógísticos)         (Bridge WhatsApp)              │
└──────────────────────────────────────────────────────────────────┘
```

### Patrón Controller → Service → Model

El backend aplica separación estricta de responsabilidades:

- **Controllers** (`/controllers`): Solo manejan req/res. Máximo 20 líneas por función.
- **Services** (`/services`): Toda la lógica de negocio. Testeables sin HTTP.
- **Models** (`/models`): Esquemas Mongoose con validaciones e índices.
- **Jobs / Workers** (`/jobs`): Operaciones lentas fuera del ciclo HTTP (BullMQ).

---

## Estructura del Proyecto

```
sonterry/
├── docker-compose.yml          # Orquesta todos los servicios
├── .env.example                # Template de variables de entorno
│
├── Back/                       # API Node.js + Express
│   ├── Dockerfile              # Multi-stage build, imagen Alpine
│   ├── package.json
│   └── src/
│       ├── app.js              # Bootstrap de Express
│       ├── config/             # env.js · db.js · cors.js · minio.js
│       ├── controllers/        # Capa HTTP (thin controllers)
│       ├── services/           # Lógica de negocio
│       ├── models/             # Esquemas Mongoose
│       ├── middlewares/        # auth · validate · rateLimiter · upload
│       ├── routes/             # Definición de endpoints
│       ├── errors/             # AppError · errorHandler · notFound
│       ├── jobs/               # notificationQueue · orderQueue · workers/
│       ├── webhooks/           # stripe.js · paypal.js · n8n.webhook.js
│       ├── uploads/            # multer.config.js
│       ├── utils/              # minioUpload.js · formatResponse.js
│       └── logs/               # Winston logger
│   └── scripts/
│       ├── seed.js             # Datos de desarrollo
│       ├── migrate.js          # Migraciones de esquema
│       └── clearCache.js       # Limpieza selectiva de Redis
│   └── tests/
│       ├── unit/               # products.service · orders.service
│       └── integration/        # auth · checkout (con DB de test)
│
└── Front/                      # React 18 + Vite
    ├── vite.config.js
    └── src/
        ├── router/             # index.jsx · ProtectedRoute · AdminRoute
        ├── store/              # authStore · cartStore · checkoutStore · uiStore · configuratorStore
        ├── queries/            # useProducts · useOrders · useTickets · useBankAccounts
        ├── schemas/            # authSchema · checkoutSchema (Zod)
        ├── services/           # api.js · auth · orders · products · tickets
        ├── utils/              # formatCurrency · formatDate
        └── pages/
            ├── Home/           # Landing con carrusel y secciones
            ├── Products/       # Listado, filtros, detalle, reseñas
            ├── Configurador/   # Editor 3D (Three.js)
            ├── Cart/           # Carrito con optimistic updates
            ├── Checkout/       # Flujo multi-paso: envío → pago → confirmación
            ├── Profile/        # Órdenes, tracking, soporte, wishlist, wallet
            ├── Admin/          # Panel: productos, órdenes, despacho, tickets, usuarios
            ├── Auth/           # Login, Register, ForgotPassword, ResetPassword
            └── Contact/        # Formulario de contacto
```

---

## Modelos de Datos

```
USER ──────────────────── ORDER
 │                          │
 ├── CART (TTL 7 días)       ├── PAYMENT
 ├── WISHLIST               └── TICKET
 └── REVIEW
          │
       PRODUCT ──── CATEGORY
```

| Modelo | Campos clave | Notas |
|---|---|---|
| `User` | email (índice), role, isActive, shippingAddress, resetToken | Soft-disable con `isActive` |
| `Product` | slug, type (serigrafia/dtf/mug/gorra...), images[], isDeleted | Soft delete preserva histórico en órdenes |
| `Order` | items (snapshot), status enum, trackingHistory[], paymentIntentId | Snapshot congela el precio al momento de la compra |
| `Cart` | TTL index: expira a los 7 días de inactividad | Limpieza automática sin jobs |
| `Review` | Índice compuesto `[user, product]` unique | Garantiza 1 reseña por usuario/producto a nivel de BD |
| `Ticket` | messages[], orderId ref, status | Chat interno usuario ↔ admin |
| `Payment` | method, status, paymentIntentId | Desacoplado de Order para auditoría independiente |
| `BankAccount` | supportedMethods, isActive | Rotación de cuentas sin perder historial |

---

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) >= 24.0
- [Docker Compose](https://docs.docker.com/compose/) >= 2.0
- (Solo desarrollo local) Node.js >= 20 y npm >= 10

---

## Instalación y Puesta en Marcha

### Opción A — Docker (recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/sonterry.git
cd sonterry

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves reales (ver sección Variables de Entorno)

# 3. Levantar toda la infraestructura
docker compose up -d

# 4. Sembrar la base de datos con datos de ejemplo
docker compose exec api node scripts/seed.js

# 5. Ver logs en vivo
docker compose logs -f api
```

Una vez levantado, los servicios están disponibles en:

| Servicio | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:5000 |
| MinIO Console | http://localhost:9001 |
| n8n | http://localhost:5678 |
| Evolution API | http://localhost:8080 |

### Opción B — Desarrollo Local (sin Docker)

```bash
# Backend
cd Back
cp .env.example .env     # Ajustar MONGO_URI y REDIS_HOST a localhost
npm install
npm run seed             # Poblar BD con datos de prueba
npm run dev              # → http://localhost:5000

# Frontend (en otra terminal)
cd Front
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev              # → http://localhost:5173
```

---

## Variables de Entorno

Copiar `.env.example` a `.env` y completar los valores reales:

```bash
# ─── Puertos (Docker Bindings) ───
PORT_DATABASE=27017
PORT_REDIS=6379
PORT_API=5000
PORT_N8N=5678
PORT_EVOLUTION=8080
PORT_MINIO_API=9000
PORT_MINIO_CONSOLE=9001

# ─── Base de Datos ───
MONGO_USER=admin
MONGO_PASS=tu_password_seguro

# ─── Seguridad ───
JWT_SECRET=genera_un_string_aleatorio_largo
REFRESH_TOKEN_SECRET=genera_otro_string_aleatorio_largo
CORS_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# ─── MinIO Object Storage ───
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=tu_password_minio
MINIO_BUCKET=sonterry
MINIO_PUBLIC_URL=http://localhost:9000

# ─── Pagos ───
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# ─── Automatización ───
N8N_API_KEY=un_secreto_compartido
N8N_ENCRYPTION_KEY=clave_de_encriptacion_n8n
N8N_HOST=localhost

# ─── WhatsApp ───
EVOLUTION_API_KEY=tu_api_key_evolution

# ─── Email (SMTP) ───
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
EMAIL_FROM=SonTerry <noreply@sonterry.com>

# ─── Frontend ───
PORT_FRONT=3000
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Nunca** subas el archivo `.env` al repositorio. El `.gitignore` ya lo excluye.

---

## API Reference

Todos los endpoints se sirven bajo `/api`. La autenticación usa Bearer Token en el header `Authorization`.

### Autenticación

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/auth/register` | — | Crear cuenta |
| `POST` | `/auth/login` | — | Login, retorna accessToken + cookie refreshToken |
| `POST` | `/auth/refresh` | Cookie | Renovar accessToken |
| `POST` | `/auth/logout` | ✅ | Invalidar sesión |
| `POST` | `/auth/forgot-password` | — | Enviar email de recuperación |
| `POST` | `/auth/reset-password/:token` | — | Cambiar contraseña |

### Productos

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/products` | — | Listado paginado con filtros |
| `GET` | `/products/:slug` | — | Detalle por slug |
| `POST` | `/products` | Admin | Crear producto |
| `PUT` | `/products/:id` | Admin | Editar producto |
| `DELETE` | `/products/:id` | Admin | Soft delete |

### Órdenes

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/orders` | ✅ | Mis órdenes |
| `POST` | `/orders` | ✅ | Crear orden desde carrito |
| `GET` | `/orders/:id` | ✅ | Detalle con tracking |
| `PATCH` | `/orders/:id/status` | Admin | Cambiar estado (dispara WhatsApp si → shipped) |

### Otros endpoints disponibles

`/cart` · `/wishlist` · `/reviews` · `/tickets` · `/categories` · `/payments` · `/bank-accounts` · `/users` · `/webhooks/stripe` · `/webhooks/paypal` · `/webhooks/n8n` · `/health`

---

## Flujo de Notificación WhatsApp

Cuando el admin marca una orden como **"En Tránsito"**, se dispara automáticamente:

```
Admin (ManageDispatch.jsx)
        │ PATCH /orders/:id/status
        ▼
orders.controller.js
        │ delega lógica
        ▼
orders.service.js
        │ actualiza MongoDB + agrega entrada a trackingHistory[]
        │ encola job en BullMQ
        ▼
notificationQueue.js  (Redis / BullMQ)
        │ worker consume el job de forma asíncrona
        ▼
notificationWorker.js
        │ llama al servicio centralizado
        ▼
n8n.service.js  ──── POST webhook ────▶  n8n :5678
                                                │ flujo de automatización
                                                ▼
                                        Evolution API :8080
                                                │
                                                ▼
                                    📱 WhatsApp del cliente
```

**Resiliencia**: Si n8n o Evolution API fallan, BullMQ reintenta con backoff exponencial. La respuesta HTTP al admin es siempre < 200ms (el envío es completamente asíncrono).

### Configurar n8n (primer arranque)

1. Abrir `http://localhost:5678` y crear cuenta de owner.
2. Crear un workflow con trigger **Webhook** en `POST /webhook/dispatch-notification`.
3. Conectar un nodo **HTTP Request** que haga `POST` a:
   ```
   http://api:5000/api/webhooks/n8n/dispatch-callback
   ```
   Con header `x-webhook-secret: ${N8N_API_KEY}` y body:
   ```json
   { "orderId": "{{$json.orderId}}", "deliveryConfirmed": true }
   ```
4. Activar el workflow.

---

## Tests

```bash
cd Back

# Tests unitarios (sin BD, sin HTTP, < 1 segundo)
npm run test:unit

# Tests de integración (levanta Express + BD de test)
npm run test:integration

# Cobertura completa
npm run test:coverage
```

### Cobertura objetivo

| Suite | Qué prueba |
|---|---|
| `unit/products.service.test.js` | Lógica de catálogo mockeando Mongoose |
| `unit/orders.service.test.js` | Cálculos de totales, descuentos, stock disponible |
| `integration/auth.test.js` | Registro, login, refresh token, logout end-to-end |
| `integration/checkout.test.js` | Flujo completo de compra con mock de Stripe |

> La lógica financiera tiene cobertura del 100% en tests unitarios. Un error de redondeo en producción cuesta dinero real.

---

## CI/CD

El archivo `.github/workflows/deploy.yml` ejecuta en cada push a `main`:

```
checkout → install → lint → unit tests → integration tests → build Docker
```

Si cualquier paso falla, el pipeline se detiene y el deploy no ocurre. Un deploy bloqueado tiene costo cero; un bug en producción puede ser costoso.

---

## Despliegue en Producción

1. Asegurarse de que todas las variables de entorno están correctamente configuradas (especialmente `NODE_ENV=production`, `JWT_SECRET` y `REFRESH_TOKEN_SECRET` con valores aleatorios largos).

2. El `Dockerfile` usa multi-stage build: la imagen final excluye `tests/`, `scripts/` y `devDependencies`, reduciendo el tamaño de ~500 MB a ~80 MB.

3. Para apuntar el almacenamiento a AWS S3 en vez de MinIO, solo cambiar las variables `MINIO_*` por las credenciales de S3. El código no cambia.

4. El endpoint `GET /api/health` verifica activamente MongoDB y Redis. Configura tu balanceador de carga para usar este endpoint como health check.

---

## Contribuir

1. Fork del repositorio.
2. Crear una rama: `git checkout -b feature/nombre-feature`.
3. Asegurarse de que `npm run test:unit` pasa antes de hacer commit.
4. Abrir un Pull Request describiendo el cambio y por qué.

---

<p align="center">
  Hecho con Node.js, React y mucha serigrafía.
</p>
