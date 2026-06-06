# Tasks: Migrar express-validator a Zod 4 en Backend

## Phase 1: Fundación (Infraestructura)

### 1.1 Actualizar dependencias en `Back/package.json`

**File**: `Back/package.json`

**Changes**:
- Reemplazar `"express-validator": "^7.1.0"` → `"zod": "^4.0.0"` en `dependencies`
- Ejecutar `npm install` para regenerar `package-lock.json` y `node_modules`

**Gotchas**:
- Zod 4 se instala como `zod`, no `zod@next`. Verificar que la versión instalada sea 4.x.
- Confirmar que Zod 4 funciona con CommonJS (`require('zod')`) — es dual package, debe andar.

**Verification**:
- `node -e "const { z } = require('zod'); console.log(z)"` → no tira error
- `npm ls express-validator` → missing (o deduped)
- `npm ls zod` → muestra versión 4.x

### 1.2 Crear middleware `zodValidate`

**File**: NEW `Back/src/middlewares/zodValidate.middleware.js`

**Changes**: Crear factory function que toma un schema de Zod y retorna middleware Express:

```js
const AppError = require('../errors/AppError');

const zodValidate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const messages = result.error.issues.map(issue => issue.message).join(', ');
    return next(new AppError(`Datos inválidos: ${messages}`, 400));
  }
  req.body = result.data;
  next();
};

module.exports = zodValidate;
```

**Gotchas**:
- `req.body = result.data` reemplaza el body con datos parseados/coercionados — importante para `z.coerce.number()` en price/stock que vienen como strings de multipart
- El formato del mensaje de error DEBE ser `"Datos inválidos: messages"` con mensajes separados por `, ` — los tests de integración existentes hacen match con `toMatch(/precio/i)` sobre `res.body.message`

**Verification**:
- Unit test mental: schema con nombre requerido, body vacío → error `"Datos inválidos: El nombre es requerido"`
- Unit test mental: schema válido, body correcto → `req.body` tiene datos parseados, llama `next()`

## Phase 2: Validators (Reescribir schemas)

### 2.1 Reescribir `product.validators.js` con Zod

**File**: `Back/src/validators/product.validators.js`

**Changes**: Reemplazar todo el contenido. Exportar `createProductSchema` y `updateProductSchema`.

```js
const { z } = require('zod');

const mongoId = () => z.string().regex(/^[0-9a-fA-F]{24}$/);
const imageUrl = () => z.string().refine(val => /^https?:\/\/.+/.test(val));
const productTypes = ['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado'];


const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre es requerido' })
    .max(200, { message: 'Máximo 200 caracteres' }),
  description: z.string().trim().min(1, { message: 'La descripción es requerida' })
    .max(5000, { message: 'Máximo 5000 caracteres' }),
  price: z.coerce.number().min(0, { message: 'El precio debe ser un número positivo' }),
  stock: z.coerce.number().int({ message: 'El stock debe ser un entero' })
    .min(0, { message: 'El stock debe ser un entero positivo' }),
  category: mongoId().refine(val => /^[0-9a-fA-F]{24}$/.test(val),
    { message: 'La categoría debe ser un ID válido' }),
  type: z.enum(productTypes, { message: 'Tipo inválido' }).optional(),
  images: z.array(imageUrl()).max(5, { message: 'Máximo 5 imágenes' }).optional(),
});

const updateProductSchema = z.object({
  name: z.string().trim().max(200, { message: 'Máximo 200 caracteres' }).optional(),
  description: z.string().trim().max(5000, { message: 'Máximo 5000 caracteres' }).optional(),
  price: z.coerce.number().min(0, { message: 'Precio inválido' }).optional(),
  stock: z.coerce.number().int({ message: 'Stock inválido' })
    .min(0, { message: 'Stock inválido' }).optional(),
  type: z.enum(productTypes, { message: 'Tipo inválido' }).optional(),
  images: z.array(imageUrl()).max(5, { message: 'Máximo 5 imágenes' }).optional(),
});

module.exports = { createProductSchema, updateProductSchema };
```

**Cambios semánticos respecto al original**:
- `images` ahora valida máximo 5 (antes no tenía límite) — alineado con spec
- `stock` usa `z.coerce.number().int()` en vez de `isInt()` — necesario porque multer envía strings

**Gotchas**:
- `z.coerce.number()` es crítico: multer `upload.array('images', 5)` envía price/stock como strings desde form-data. Sin coerce, strings como `"55000"` fallarían `z.number()`.
- ObjectId validation: usar regex `/^[0-9a-fA-F]{24}$/` es más simple que importar mongoose. Si la app tiene ObjectIds de distinto formato, ajustar.
- Los `imageUrl` helpers usan refines en vez de `z.url()` porque el original acepta cualquier http/https URL, mientras que `z.url()` de Zod 4 es más restrictivo (requiere TLD válido, etc.)

**Verification**:
- POST /api/products con `{ name: 'X', description: 'Y', price: -100, stock: 10, category: <validId> }` → 400 con mensaje que incluye "precio"
- POST /api/products con `{ name: 'X', description: 'Y', price: 50000, stock: 'mucho', category: <validId> }` → 400
- POST /api/products con datos válidos → 201, slug generado
- PUT /api/products/:id con solo `{ name: 'Nuevo' }` → 200 (parcial funciona)

### 2.2 Reescribir `order.validators.js` con Zod

**File**: `Back/src/validators/order.validators.js`

**Changes**: Reemplazar todo el contenido.

```js
const { z } = require('zod');

const phoneRegex = /^[0-9+\s\-()]{7,20}$/;

const createOrderSchema = z.object({
  shippingAddress: z.object({
    address: z.string().trim().min(1, { message: 'La dirección es requerida' }),
    city: z.string().trim().min(1, { message: 'La ciudad es requerida' }),
    postalCode: z.string().trim().min(1, { message: 'El código postal es requerido' }),
    country: z.string().trim().min(1, { message: 'El país es requerido' }),
    phone: z.string().trim().min(1, { message: 'El teléfono es requerido' })
      .regex(phoneRegex, { message: 'Formato de teléfono inválido' }),
  }),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled'], {
    message: 'Estado de pedido inválido. Valores permitidos: pending, paid, shipped, delivered, cancelled',
  }),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
```

**⚠️ DISCREPANCIA CON SPEC**: La spec pide `items: z.array(...).min(1)` en `createOrderSchema`, pero el controller `createOrder` (`orders.controllers.js:6-8`) lee items del CARRITO del usuario, NO de `req.body.items`. Agregar items al schema rompería `POST /api/orders` porque el body no contiene items. Decisión:
- **Opción A (recomendada)**: NO incluir items en `createOrderSchema`. Coincide con el comportamiento actual.
- **Opción B**: Incluir items y modificar el controller para leerlos de `req.body` — scope creep, no recomendado sin revisar la lógica de negocio.
- **Opción C**: Crear un schema separado `manualOrderSchema` para `POST /api/orders/manual` que sí acepte items (ruta que actualmente no tiene validación).

**Gotchas**:
- `shippingAddress` es un objeto anidado — Zod lo maneja naturalmente con `z.object()` anidado
- Phone regex idéntico al original

**Verification**:
- POST /api/orders sin shippingAddress → 400
- POST /api/orders con shippingAddress inválido (phone mal formado) → 400
- PATCH /api/orders/:id/status con status inválido → 400
- PATCH /api/orders/:id/status con status válido → 200 (si el ID existe)

### 2.3 Reescribir `review.validators.js` con Zod

**File**: `Back/src/validators/review.validators.js`

**Changes**: Reemplazar todo el contenido.

```js
const { z } = require('zod');

const addReviewSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'ID de producto inválido' }),
  rating: z.coerce.number().int({ message: 'El rating debe ser entero' })
    .min(1, { message: 'El rating debe ser entre 1 y 5' })
    .max(5, { message: 'El rating debe ser entre 1 y 5' }),
  comment: z.string().trim()
    .min(1, { message: 'El comentario es requerido' })
    .max(2000, { message: 'Máximo 2000 caracteres' }),
});

module.exports = { addReviewSchema };
```

**Gotchas**:
- `rating` usa `z.coerce.number()` por si el cliente envía `rating: "3"` como string (consistente con express-validator que hace coerción automática)
- `comment` usa `.min(1)` en vez del viejo `.notEmpty()` — equivalente semántico

**Verification**:
- POST /api/reviews sin auth → 401
- POST /api/reviews con `{ rating: 6 }` → 400
- POST /api/reviews con `{ productId: '<invalid>', rating: 3, comment: 'Bueno' }` → 400
- POST /api/reviews con datos válidos → 201

## Phase 3: Routes (Integrar nuevos validators)

### 3.1 Actualizar `products.routes.js`

**File**: `Back/src/routes/products.routes.js`

**Changes**:
| Línea | Original | Nuevo |
|-------|----------|-------|
| 5 | `const validate = require('../middlewares/validate.middleware');` | `const zodValidate = require('../middlewares/zodValidate.middleware');` |
| 6 | `const { createProductRules, updateProductRules } = ...` | `const { createProductSchema, updateProductSchema } = ...` |
| 11 | `..., createProductRules, validate, ...` | `..., zodValidate(createProductSchema), ...` |
| 12 | `..., updateProductRules, validate, ...` | `..., zodValidate(updateProductSchema), ...` |

**Gotchas**:
- El orden de middlewares se mantiene: `protect → restrictTo → upload → zodValidate → controller`. upload.parsea el multipart y luego zodValidate valida el body parseado.
- `zodValidate` se llama como función (retorna middleware), no se pasa como referencia.

**Verification**:
- Los mismos tests de integración de productos pasan sin cambios
- GET /api/products sigue funcionando (ruta sin validación)

### 3.2 Actualizar `orders.routes.js`

**File**: `Back/src/routes/orders.routes.js`

**Changes**:
| Línea | Original | Nuevo |
|-------|----------|-------|
| 5 | `const validate = require('../middlewares/validate.middleware');` | `const zodValidate = require('../middlewares/zodValidate.middleware');` |
| 6 | `const { createOrderRules, updateOrderStatusRules } = ...` | `const { createOrderSchema, updateOrderStatusSchema } = ...` |
| 8 | `..., createOrderRules, validate, ...` | `..., zodValidate(createOrderSchema), ...` |
| 13 | `..., updateOrderStatusRules, validate, ...` | `..., zodValidate(updateOrderStatusSchema), ...` |

**Gotchas**: Ninguno particular — mismo patrón que products.

**Verification**:
- POST /api/orders con token pero sin shippingAddress → 400
- PATCH /api/orders/:id/status con status inválido → 400

### 3.3 Actualizar `reviews.routes.js`

**File**: `Back/src/routes/reviews.routes.js`

**Changes**:
| Línea | Original | Nuevo |
|-------|----------|-------|
| 5 | `const validate = require('../middlewares/validate.middleware');` | `const zodValidate = require('../middlewares/zodValidate.middleware');` |
| 6 | `const { addReviewRules } = ...` | `const { addReviewSchema } = ...` |
| 10 | `..., addReviewRules, validate, ...` | `..., zodValidate(addReviewSchema), ...` |

**Gotchas**: Ninguno.

**Verification**:
- POST /api/reviews con token y datos válidos → 201
- POST /api/reviews con rating fuera de rango → 400

## Phase 4: Cleanup

### 4.1 Eliminar middleware obsoleto

**File**: DELETE `Back/src/middlewares/validate.middleware.js`

**Changes**: Eliminar el archivo físico. No debe quedar ningún `require` apuntando a él.

**Gotchas**: Verificar que ningún archivo fuera de los routes listados importe este middleware. Ya se confirmó que solo products, orders y reviews routes lo usan.

**Verification**:
- `grep -r "validate.middleware" Back/src/` → sin resultados
- `grep -r "validationResult" Back/src/` → sin resultados
- `grep -r "express-validator" Back/src/` → sin resultados

### 4.2 Actualizar `Back/AGENTS.md`

**File**: `Back/AGENTS.md`

**Changes**:
- Línea 19: `express-validator` → `Zod 4`
- Línea 25: `reglas express-validator separadas por recurso` → `schemas de Zod separados por recurso`

**Verification**: Lectura visual.

## Phase 5: Testing

### 5.1 Ejecutar test suite

**Comando**: `npm test` (en `Back/`)

**Verification**:
- Todos los tests existentes pasan (especialmente `tests/integration/products.test.js` que prueba validación de precio negativo y stock string)
- Ningún test roto por el cambio de middleware

### 5.2 Verificar cobertura de validación

**Verificación manual**: Probar cada ruta con datos inválidos para confirmar que Zod rechaza lo mismo que express-validator:
- Producto sin nombre → 400
- Producto con descripción >5000 chars → 400
- Review sin comentario → 400
- Order con teléfono inválido → 400
- Status de orden inválido → 400
