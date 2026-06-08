# Design: Migrate express-validator to Zod 4 (Backend)

## Technical Approach

Reemplazar las reglas de validación basadas en `express-validator` (arrays de `body()` chains) por esquemas declarativos de Zod 4. Se introduce un middleware factory `zodValidate(schema)` que envuelve `safeParse()` y lanza `AppError(400)` en caso de fallo — mismo contrato que el actual middleware `validate`. Los validators pasan de ser arrays de reglas a ser objetos con schemas Zod. Cada schema preserva **exactamente** los mismos mensajes de error en español, las mismas validaciones (required, length, rango, formato) y el mismo comportamiento para optional/partial.

## Architecture Decisions

### Decision: Middleware factory `zodValidate` en lugar de middleware fijo

**Choice**: Un factory `zodValidate(schema)` que recibe un schema Zod y devuelve middleware Express.
**Alternatives considered**: (1) Middleware fijo que importa schemas internamente, (2) Decorador en los controllers.
**Rationale**: El factory es el patrón más idiomático con Zod en Express. Cada ruta declara su schema en el array de middlewares, exactamente como hoy con las `rules`. Además permite que el schema se defina cerca de la ruta sin acoplamiento. Es análogo al middleware `validate` actual pero parametrizado.

### Decision: `req.body = parsed.data` en éxito

**Choice**: Si `safeParse()` es exitoso, asignamos `req.body = result.data` antes de `next()`.
**Alternatives considered**: No mutar `req.body` y dejar que el controller use el raw.
**Rationale**: Zod hace stripping de campos no definidos en el schema. Si el body pasa validación, los datos están limpios y tipados. Mutar `req.body` evita que campos basura o no esperados lleguen al controller. Consistente con cómo trabajaría un schema en TypeScript.

### Decision: Errores concatenados en string único con `, `

**Choice**: `result.error.issues.map(i => i.message).join(', ')` → mismo formato que el validate actual.
**Alternatives considered**: Devolver array de errores, devolver primer error solamente.
**Rationale**: Preservar el contrato actual de la API. El frontend espera `Datos inválidos: El nombre es requerido, El precio debe ser un número positivo`. Cambiar el formato rompería clientes. Si en el futuro se quiere más estructura, se puede migrar sin breaking change agregando un campo `errors` adicional.

### Decision: `.regex()` para isMongoId y URL en lugar de `z.url()` / `ObjectId.isValid`

**Choice**: Usar `z.string().regex(/^[0-9a-fA-F]{24}$/)` para MongoId y `z.string().regex(/^https?:\/\/.+/)` para URLs.
**Alternatives considered**: `mongoose.Types.ObjectId.isValid()` en `.refine()`, `z.url()` de Zod 4.
**Rationale**: 
- **MongoId**: `.refine()` con `ObjectId.isValid()` requeriría importar Mongoose en el validator, rompiendo la separación de concerns. Una regex de 24 hex chars es suficiente para validar formato en la capa HTTP. Mongoose ya validará el ObjectId real al hacer la query.
- **URL**: `z.url()` de Zod 4 valida contra WHATWG URL spec, que es más restrictiva que la regex actual `/^https?:\/\/.+/. Preservar la regex exacta evita falsos positivos y mantiene compatibilidad con URLs que Zod rechazaría.

### Decision: Esquemas como objetos en lugar de arrays de reglas

**Choice**: Cada archivo exporta schemas Zod directamente (ej. `const createProductSchema = z.object({...})`).
**Alternatives considered**: Mantener arrays con un `check()` wrapper que emule `body()`.
**Rationale**: Zod ES un schema declarativo. Un objeto Zod es el equivalente directo de un array de reglas de `express-validator`. Es más legible, tipable (cuando migremos a TS) y componible.

### Decision: `z.string().min(1)` en lugar de `z.string().nonempty()`

**Choice**: Usar `.min(1)` para required strings en Zod 4.
**Alternatives considered**: `z.string().nonempty()` de Zod 3 (deprecado en Zod 4).
**Rationale**: Zod 4 eliminó `.nonempty()`. El equivalente es `.min(1)`. Mismo comportamiento: rechaza string vacío `""`.

## Data Flow

```
HTTP Request
    │
    ▼
Express middleware chain
    │
    ├─ auth.middleware (protect, restrictTo)
    ├─ upload.middleware (multer)
    │
    ├─ zodValidate(schema)  ◄── NUEVO
    │   │
    │   ├─ safeParse(req.body)
    │   │
    │   ├─ ✅ success → req.body = result.data → next()
    │   │
    │   └─ ❌ failure → new AppError("Datos inválidos: ...", 400)
    │
    ▼
Controller (catchAsync)
    │
    ▼
Service (lógica de negocio, puede lanzar AppError)
    │
    ▼
Model (Mongoose, validación adicional)
    │
    ▼
formatResponse() → JSON Response
```

Flujo de errores (comparación antes/después):

```
express-validator:
  body('name').trim().notEmpty().withMessage('El nombre es requerido')
  → validationResult(req) → array de { msg } → join ", "
  → new AppError(`Datos inválidos: ${messages}`, 400)

Zod 4:
  z.object({ name: z.string().trim().min(1, { error: 'El nombre es requerido' }) })
  → safeParse(req.body) → error.issues.map(i => i.message) → join ", "
  → new AppError(`Datos inválidos: ${messages}`, 400)
```

## File Changes

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/middlewares/zodValidate.middleware.js` | Crear | Factory que recibe schema Zod y devuelve middleware Express |
| `src/middlewares/validate.middleware.js` | Eliminar | Reemplazado por zodValidate |
| `src/validators/product.validators.js` | Modificar | Migrar schemas a Zod |
| `src/validators/order.validators.js` | Modificar | Migrar schemas a Zod |
| `src/validators/review.validators.js` | Modificar | Migrar schemas a Zod |
| `src/routes/products.routes.js` | Modificar | Cambiar imports y uso de middleware |
| `src/routes/orders.routes.js` | Modificar | Cambiar imports y uso de middleware |
| `src/routes/reviews.routes.js` | Modificar | Cambiar imports y uso de middleware |
| `package.json` | Modificar | Agregar zod@^4, eliminar express-validator |

## Components

### 1. Middleware: `src/middlewares/zodValidate.middleware.js`

```js
const AppError = require('../errors/AppError');

const zodValidate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const messages = result.error.issues.map(issue => issue.message).join(', ');
    return next(new AppError(`Datos inválidos: ${messages}`, 400));
  }
  req[source] = result.data;
  next();
};

module.exports = zodValidate;
```

### 2. Validator: `src/validators/product.validators.js`

```js
const { z } = require('zod');

const allowedTypes = ['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado'];

const createProductSchema = z.object({
  name: z.string().trim().min(1, { error: 'El nombre es requerido' }).max(200, { error: 'Máximo 200 caracteres' }),
  description: z.string().trim().min(1, { error: 'La descripción es requerida' }).max(5000, { error: 'Máximo 5000 caracteres' }),
  price: z.number().min(0, { error: 'El precio debe ser un número positivo' }),
  stock: z.number().int({ error: 'El stock debe ser un entero positivo' }).min(0, { error: 'El stock debe ser un entero positivo' }),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, { error: 'La categoría debe ser un ID válido' }),
  type: z.enum(allowedTypes, { error: 'Tipo inválido' }).optional(),
  images: z.array(
    z.string().regex(/^https?:\/\/.+/, { error: 'Cada imagen debe ser una URL válida (http/https)' })
  ).optional(),
});

const updateProductSchema = z.object({
  name: z.string().trim().max(200, { error: 'Máximo 200 caracteres' }).optional(),
  description: z.string().trim().max(5000, { error: 'Máximo 5000 caracteres' }).optional(),
  price: z.number().min(0, { error: 'Precio inválido' }).optional(),
  stock: z.number().int({ error: 'Stock inválido' }).min(0, { error: 'Stock inválido' }).optional(),
  type: z.enum(allowedTypes, { error: 'Tipo inválido' }).optional(),
  images: z.array(
    z.string().regex(/^https?:\/\/.+/, { error: 'Cada imagen debe ser una URL válida' })
  ).optional(),
});

module.exports = { createProductSchema, updateProductSchema };
```

### 3. Validator: `src/validators/order.validators.js`

```js
const { z } = require('zod');

const allowedStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

const createOrderSchema = z.object({
  shippingAddress: z.object({
    address: z.string().trim().min(1, { error: 'La dirección es requerida' }),
    city: z.string().trim().min(1, { error: 'La ciudad es requerida' }),
    postalCode: z.string().trim().min(1, { error: 'El código postal es requerido' }),
    country: z.string().trim().min(1, { error: 'El país es requerido' }),
    phone: z.string().trim().min(1, { error: 'El teléfono es requerido' })
      .regex(/^[0-9+\s\-()]{7,20}$/, { error: 'Formato de teléfono inválido' }),
  }),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(allowedStatuses, {
    error: 'Estado de pedido inválido. Valores permitidos: pending, paid, shipped, delivered, cancelled',
  }),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
```

### 4. Validator: `src/validators/review.validators.js`

```js
const { z } = require('zod');

const addReviewSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, { error: 'ID de producto inválido' }),
  rating: z.number().int({ error: 'El rating debe ser entre 1 y 5' }).min(1, { error: 'El rating debe ser entre 1 y 5' }).max(5, { error: 'El rating debe ser entre 1 y 5' }),
  comment: z.string().trim().min(1, { error: 'El comentario es requerido' }).max(2000, { error: 'Máximo 2000 caracteres' }),
});

module.exports = { addReviewSchema };
```

### 5. Routes (cambios de import y uso)

**products.routes.js**:
```js
// REMOVE:
const validate = require('../middlewares/validate.middleware');
const { createProductRules, updateProductRules } = require('../validators/product.validators');

// ADD:
const zodValidate = require('../middlewares/zodValidate.middleware');
const { createProductSchema, updateProductSchema } = require('../validators/product.validators');

// CHANGE:
// router.post('/', ..., createProductRules, validate, ...)
router.post('/', ..., zodValidate(createProductSchema), ...)
// router.put('/:id', ..., updateProductRules, validate, ...)
router.put('/:id', ..., zodValidate(updateProductSchema), ...)
```

**orders.routes.js**:
```js
// REMOVE:
const validate = require('../middlewares/validate.middleware');
const { createOrderRules, updateOrderStatusRules } = require('../validators/order.validators');

// ADD:
const zodValidate = require('../middlewares/zodValidate.middleware');
const { createOrderSchema, updateOrderStatusSchema } = require('../validators/order.validators');

// CHANGE:
// router.post('/', ..., createOrderRules, validate, ...)
router.post('/', ..., zodValidate(createOrderSchema), ...)
// router.patch('/:id/status', ..., updateOrderStatusRules, validate, ...)
router.patch('/:id/status', ..., zodValidate(updateOrderStatusSchema), ...)
```

**reviews.routes.js**:
```js
// REMOVE:
const validate = require('../middlewares/validate.middleware');
const { addReviewRules } = require('../validators/review.validators');

// ADD:
const zodValidate = require('../middlewares/zodValidate.middleware');
const { addReviewSchema } = require('../validators/review.validators');

// CHANGE:
// router.post('/', ..., addReviewRules, validate, ...)
router.post('/', ..., zodValidate(addReviewSchema), ...)
```

### 6. package.json

```json
// REMOVE:
"express-validator": "^7.1.0",

// ADD:
"zod": "^4.0.0",
```

## Zod 4 Specific Considerations

| Aspecto | Zod 3 | Zod 4 | Impacto |
|---------|-------|-------|---------|
| `.nonempty()` | `z.string().nonempty()` | Eliminado. Usar `.min(1)` | Cambiar todas las ocurrencias |
| `z.string().email()` | `z.string().email()` | `z.email()` | No afecta (no usamos email en estos validators) |
| `z.string().url()` | `z.string().url()` | `z.url()` | No afecta (usamos regex, no url) |
| Mensajes de error | `.withMessage(msg)` o `{ message: msg }` | `{ error: msg }` en constraints, `{ message: msg }` en `.refine()` | **CRÍTICO**: Usar `error` en `.min()`, `.max()`, `.regex()`, etc.; usar `message` en `.refine()` |
| `.refine()` params | `(val, { message })` | `(val, { message })` | Sin cambio en refine |
| `.safeParse()` return | `{ success, data, error }` | `{ success, data, error }` | Sin cambio |
| `z.enum()` | `z.enum([...])` | `z.enum([...])` | Sin cambio |
| `.int()` | `.int()` | `.int({ error: msg })` | Zod 4 soporta `error` param en `.int()` |
| `.regex()` | `.regex(/pattern/)` | `.regex(/pattern/, { error: msg })` | Zod 4 soporta `error` param en `.regex()` |
| `.trim()` | `.trim()` | `.trim()` (preservado) | Sin cambio |
| CommonJS | `const { z } = require('zod')` | `const { z } = require('zod')` | Zod 4 mantiene soporte CJS |

## Edge Cases

### PUT vs POST (updateProductSchema)

| Aspecto | POST (createProductSchema) | PUT (updateProductSchema) |
|---------|---------------------------|---------------------------|
| name | required, min(1).max(200) | optional, max(200) |
| description | required, min(1).max(5000) | optional, max(5000) |
| price | required, number.min(0) | optional, number.min(0) |
| stock | required, int.min(0) | optional, int.min(0) |
| category | required, MongoId regex | **NO incluido** (no se actualiza) |
| type | optional, enum | optional, enum |
| images | optional, array of URL | optional, array of URL |

**Comportamiento**: En `updateProductSchema`, todos los campos son `.optional()`. Si el body viene vacío `{}`, Zod lo acepta (pasa validación con 0 campos). Si un campo viene `undefined`, Zod lo ignora. Si un campo viene con valor, se valida contra su schema.

### Nested objects (shippingAddress)

`express-validator` usa `body('shippingAddress.address')` con dot-notation para acceder a propiedades anidadas. Zod maneja nested objects de forma nativa:

```js
z.object({
  shippingAddress: z.object({
    address: z.string().trim().min(1, { error: '...' }),
    city: z.string().trim().min(1, { error: '...' }),
    ...
  }),
});
```

Ventaja: el tipado refleja la estructura real. Desventaja: el error path cambia de `shippingAddress.address` a `shippingAddress.address` (igual, porque Zod usa el path del objeto).

### Arrays (images)

`express-validator` usa `.isArray()` + `.custom()`. Zod usa `z.array(z.string().regex(...))`. Si el body NO envía `images`, Zod lo deja como `undefined` (optional). Si envía `images: null`, Zod lo rechaza (no es un array ni undefined). Si envía `images: "not-an-array"`, Zod lo rechaza con error de tipo.

### type field as enum

Actualmente `type` usa `.isIn([...])` que valida contra una lista de strings. Zod usa `z.enum([...])` que es exactamente equivalente. Diferencia menor: `isIn` acepta cualquier string de la lista; `z.enum()` es más estricto en cuanto a que rechaza cualquier valor fuera de la lista (mismo comportamiento).

### Coerción de tipos (price como string)

Actualmente `body('price').isFloat()` acepta tanto `price: 29.99` como `price: "29.99"` porque express-validator hace coerción automática. Zod por defecto NO coerce: un string `"29.99"` no pasa `z.number()`. 

**Decisión**: NO agregar `.pipe(z.coerce.number())` porque el controller y service esperan números, y forzar al frontend a enviar el tipo correcto es la decisión correcta. Si el frontend envía strings, se rompió en el frontend, no acá. Esto es un **breaking change potencial** si el frontend envía `price` como string. Se documenta en el spec.

## Interfaces

### zodValidate middleware factory

```js
// Signature
zodValidate(schema: ZodSchema, source?: string) => (req, res, next) => void

// Uso
router.post('/', zodValidate(createProductSchema), controller)
router.post('/', zodValidate(createOrderSchema), controller)
router.post('/', zodValidate(addReviewSchema), controller)
router.put('/:id', zodValidate(updateProductSchema), controller)
router.patch('/:id/status', zodValidate(updateOrderStatusSchema), controller)
```

### Contrato de error (sin cambios)

```json
{
  "success": false,
  "message": "Datos inválidos: El nombre es requerido, El precio debe ser un número positivo",
  "data": null,
  "timestamp": "2026-06-05T..."
}
```

## Testing Strategy

| Capa | Qué probar | Approach |
|------|-----------|----------|
| Unit (middleware) | zodValidate llama next() en éxito, next(err) en fallo | Mockear schema.safeParse, assert next() llamado con/ sin AppError |
| Unit (validators) | Cada schema valida/rechaza casos borde | safeParse directo, assert success/error issues |
| Integration | Rutas con zodValidate devuelven 400 con formato correcto | Supertest contra rutas específicas |
| Integración regresiva | Mismos casos que los tests actuales pasan | Los tests de integración existentes (si usan rutas) deberían pasar sin cambios |

## Migration / Rollout

**No migration required.** Este cambio es puramente de implementación interna. Los endpoints, códigos de error, y mensajes se preservan exactamente igual.

Rollback: `git revert` del commit de migración, reinstalar `express-validator@^7.1.0` y restaurar `validate.middleware.js`.

## Open Questions

- [ ] ¿El frontend envía `price` y `stock` como strings o como números? Si envía strings, Zod 4 los va a rechazar (express-validator hacía coerción automática). Verificar en los controladores cómo llegan actualmente.
- [ ] ¿Hay tests de integración existentes que ejerciten estas rutas de validación? Si los hay, ejecutarlos post-migración es la validación más fuerte.
- [ ] Confirmar que Zod 4 publica `zod` package con soporte CommonJS. Si solo publica ESM, tocaría import dinámico o esperar a que soporte CJS.
