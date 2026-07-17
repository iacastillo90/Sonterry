# Design: Gestión de órdenes pendientes

## Technical Approach

Intervención quirúrgica en 3 frentes independientes:

1. **Backend model + services**: Agregar `wompiReferences[]` al modelo Order, nuevos servicios `updateOrderItems()` y `updateOrderShipping()`, fix race condition en webhook.
2. **Backend routes + controllers**: Nuevos endpoints `PUT /orders/:id/items` y `PUT /orders/:id/shipping`.
3. **Frontend**: Botón "Pagar ahora" y modales de edición en OrderHistory. CheckoutCallback mantiene compatibilidad con órdenes existentes.

No hay refactor del flujo de checkout. Todo es aditivo y backward-compatible.

---

## Architecture Decisions

### 1. Wompi reference tracking

**Decisión**: Agregar campo `wompiReferences: [{ transactionId, status, createdAt, active }]` al modelo Order. El campo legacy `wompiTransactionId` se mantiene para que el webhook existente y `confirmWompiPayment` sigan funcionando sin cambios.

**Flujo de escritura**:
- `wompi.service.js:createTransaction()` → guarda ref en ambos: `wompiTransactionId` (legacy) y `wompiReferences.push({ transactionId, status: 'pending', active: true })`.
- `payments.controllers.js:confirmWompiPayment()` → actualiza `wompiReferences` cuando status cambia.
- `webhooks/wompi.js` → actualiza `wompiReferences` correspondiente.

**Lookup**: El webhook busca por `wompiTransactionId` (no cambia). Cuando se migre a buscar por `wompiReferences` en el futuro, se hace un ciclo después sin breaking changes.

**Alternativas descartadas**:
- Solo `wompiTransactionId` (pierde historial de reintentos)
- Colección separada `WompiReference` (overkill, complexidad innecesaria para solo tracking)

### 2. Retomar pago ("Pagar ahora")

**Decisión**: Reusar endpoint existente `POST /payments/wompi/transaction` + botón en OrderHistory.

**Por qué funciona**: El endpoint `createWompiTransaction` ya valida `order.status === 'pending'` (no importa si es orden nueva o existente). El widget Wompi genera una nueva referencia con timestamp (`SONTERRY-${orderId}-${Date.now()}`), que se guarda como nuevo entry en `wompiReferences[]`.

**Flujo**:
1. Usuario ve orden `pending` en OrderHistory
2. Click "Pagar ahora" → `createWompiTransaction(orderId)` → abre widget
3. Widget Wompi → callback → `navigate(/checkout/callback?ref=...)` (misma URL que checkout normal)
4. CheckoutCallback llama `POST /payments/wompi/confirm` → orden pasa a `paid`
5. Sin cambios en CheckoutCallback: ya maneja la orden existente correctamente porque busca por `_id` extraído del `ref`

**No se necesita**: nueva ruta, nuevo componente, ni refactor de PaymentForm.

### 3. Editar items de orden

**Decisión**: Endpoint `PUT /orders/:id/items` que reemplaza el array `items` completo.

**Contrato**:
- Request body: `{ items: [{ product: ObjectId, quantity: Number, customization?: { type, details } }] }`
- Validaciones: `status === 'pending'`, owner match, stock disponible para cada item
- Acción atómica: `findOneAndUpdate` con filtro `{ _id, user, status: 'pending' }` + re-validate stock con transacción

**Manejo de stock**: Similar a `createManualOrder` — corre `Product.findOneAndUpdate` con `{ stock: { $gte: quantity } }` en paralelo. Si algún item no tiene stock, compensa los decrementos exitosos y rechaza la operación.

**Invalidación de referencias Wompi**: Si la orden tiene `wompiReferences` activas, se marcan como `active: false` porque el monto de la transacción anterior ya no es válido.

**Frontend**: Modal en OrderHistory que carga los items actuales, permite cambiar cantidades, usar misma UI de CartItemList.

### 4. Editar dirección de envío

**Decisión**: Endpoint `PUT /orders/:id/shipping` que actualiza `shippingAddress`.

**Contrato**:
- Request body: `{ address, city, postalCode, country, phone }` (mismos campos que `createOrderSchema`)
- Validaciones: `status === 'pending'`, owner match
- NO invalida referencias Wompi (el shipping no cambia el monto)

**Frontend**: Modal en OrderHistory con formulario inline de dirección.

### 5. Wompi webhook race condition

**Decisión**: Agregar guard clause al inicio del handler de `transaction.updated`:

```js
if (event.event === 'transaction.updated') {
  const order = await Order.findOne({ wompiTransactionId: reference });
  if (!order) { /* existing logic */ }

  // NEW: ignore if cancelled
  if (order.status === 'cancelled') {
    logger.info(`[Wompi] Order ${order._id} is cancelled, ignoring transaction`);
    return res.status(200).json({ received: true });
  }

  // ... rest of existing logic
}
```

**Por qué es suficiente**: Previene que una transacción Wompi que llegue después de la cancelación pueda marcar la orden como `paid`. No necesita lógica de reversión porque la orden ya está cancelada.

---

## Data Flow Diagrams

### Retomar pago

```
┌─────────────┐     click "Pagar ahora"     ┌──────────────────────┐
│ OrderHistory │ ───────────────────────────→ │ createWompiTransaction│
│ (pending)    │                              │ POST /payments/       │
└─────────────┘                              │ wompi/transaction     │
       │                                      └───────────┬──────────┘
       │                                                  │
       │                                      ┌───────────▼──────────┐
       │                                      │  Wompi Widget opens  │
       │                                      │  (client-side)       │
       │                                      └───────────┬──────────┘
       │                                                  │
       │                                                  │ callback
       │                                      ┌───────────▼──────────┐
       │                                      │ navigate(/checkout/  │
       │                                      │ callback?ref=...&    │
       │                                      │ transaction_id=...)  │
       │                                      └───────────┬──────────┘
       │                                                  │
       │                                      ┌───────────▼──────────┐
       │                                      │ CheckoutCallback     │
       │                                      │ POST /payments/      │
       │                                      │ wompi/confirm        │
       │                                      │                      │
       │                                      │ order.status='paid'  │
       │                                      └──────────────────────┘
```

### Editar items

```
┌─────────────┐     click "Editar"      ┌──────────────────┐
│ OrderHistory │ ──────────────────────→ │ Modal de edición  │
│ (pending)    │                        │ (lista items +    │
└─────────────┘                        │  cantidades,       │
                                        │  customization)   │
                                        └────────┬─────────┘
                                                 │
                                        ┌────────▼─────────┐
                                        │ PUT /orders/:id/ │
                                        │ items            │
                                        │                  │
                                        │ 1. validar status│
                                        │ 2. validar stock │
                                        │ 3. reemplazar    │
                                        │    items array   │
                                        │ 4. recalcular    │
                                        │    total         │
                                        │ 5. invalidar     │
                                        │    refs activas  │
                                        └──────────────────┘
```

---

## File Changes Table

| File | Action | Description |
|------|--------|-------------|
| `Back/src/models/order.model.js` | Modify | Add `wompiReferences: [{ transactionId: String, status: String, createdAt: Date, active: Boolean }]` |
| `Back/src/services/wompi.service.js` | Modify | Save ref to `wompiReferences[]` alongside legacy `wompiTransactionId` |
| `Back/src/services/orders.service.js` | Modify | Add `updateOrderItems()`, `updateOrderShipping()` |
| `Back/src/controllers/orders.controllers.js` | Modify | Add `updateItems`, `updateShipping` controllers |
| `Back/src/routes/orders.routes.js` | Modify | Add routes: `PUT /:id/items`, `PUT /:id/shipping` |
| `Back/src/validators/order.validators.js` | Modify | Add `updateOrderItemsSchema`, `updateOrderShippingSchema` with Zod |
| `Back/src/webhooks/wompi.js` | Modify | Add cancelled check before processing APPROVED |
| `Back/src/controllers/payments.controllers.js` | Modify | `createWompiTransaction`: update `wompiReferences` on each call |
| `Back/src/services/payments.service.js` | — | No changes needed (race fix is in webhook, not here) |
| `Front/src/pages/Profile/components/OrderHistory.jsx` | Modify | Add "Pagar ahora" button (Wompi pending), edit items modal, edit shipping modal, improve cancel with loading/error states |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | — | No changes needed (already handles existing order via confirm endpoint) |
| `Front/src/pages/Checkout/components/PaymentForm.jsx` | — | No changes needed (retomar pago bypasses PaymentForm entirely) |
| `Front/src/store/checkoutStore.js` | — | No changes needed (resume flow uses OrderHistory, not checkout store) |
| `Front/src/store/cartStore.js` | — | No changes needed |
| `Front/src/services/orders.service.js` | Modify | Add `updateOrderItems()`, `updateOrderShipping()` |
| `Front/src/services/wompi.service.js` | — | No changes needed (existing `createWompiTransaction` works) |
| `Front/src/router/index.jsx` | — | No changes needed (resume uses same `/checkout/callback` route) |

---

## Interfaces / Contracts

### PUT /orders/:id/items

**Auth**: `protect` middleware (usuario autenticado)

**Request body**:
```json
{
  "items": [
    {
      "product": "64a1b2c3d4e5f6a7b8c9d0e1",
      "quantity": 3,
      "customization": {
        "type": "serigrafia",
        "details": "Logo frontal, 20cm x 15cm"
      }
    }
  ]
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Items actualizados exitosamente",
  "data": {
    "_id": "...",
    "items": [ ... ],
    "total": 135000,
    "wompiReferences": [
      { "transactionId": "SONTERRY-...-1234", "status": "pending", "active": false, "createdAt": "..." }
    ]
  }
}
```

**Error responses**:
- `404` — Orden no encontrada o no pertenece al usuario
- `400` — "La orden ya no está pendiente"
- `400` — "Stock insuficiente para: [producto]"

**Validaciones** (Zod schema `updateOrderItemsSchema`):
- `items` debe ser array no vacío
- Cada item: `product` required string (ObjectId válido), `quantity` required int >= 1, `customization.type` enum `['serigrafia', 'dtf']` optional, `customization.details` string max 1000 optional

**Backend logic**:
```
1. FindOne({ _id, user, status: 'pending' }) → 404 if not found
2. For each new item: Product.findOneAndUpdate({ _id, stock: { $gte: quantity } }, { $inc: { stock: -oldQuantity } }) — using old item quantities from current order for rollback if needed
3. If any item fails stock check → compensate successful decrements → AppError 400
4. Recalculate total = sum(item.price * item.quantity)
5. If wompiReferences has active: true entries → set them to active: false
6. order.items = new items; order.total = new total; await order.save()
7. Return updated order
```

**Stock compensation logic** (same pattern as `deductOrderStock` and `createManualOrder`):
- For each item being edited, diff the quantity change:
  - If `newQty > oldQty`: need `newQty - oldQty` more stock
  - If `newQty < oldQty`: return `oldQty - newQty` stock (no validation needed)
  - If product changes entirely: restore old product stock, deduct from new product

Simplified implementation: restore ALL old items stock, then deduct ALL new items stock (same pattern as atomic replace).

### PUT /orders/:id/shipping

**Auth**: `protect` middleware

**Request body**:
```json
{
  "address": "Calle 123 #45-67",
  "city": "Medellín",
  "postalCode": "050001",
  "country": "Colombia",
  "phone": "+573001234567"
}
```

**Response (200)**:
```json
{
  "success": true,
  "message": "Dirección de envío actualizada",
  "data": { "order object with updated shippingAddress" }
}
```

**Validaciones**: Same as `shippingAddress` in `createOrderSchema` — todos los campos required, phone regex.

### POST /payments/wompi/transaction (existing, no changes)

Already works with existing order IDs. The only change is in `wompi.service.js:createTransaction()` to also push to `wompiReferences[]`.

---

## Testing Strategy

### Backend unit tests (Back/tests/unit/)

**orders.service.test.js** — add to existing test file:
- `updateOrderItems` — success case, items replaced, total recalculated
- `updateOrderItems` — fails if status !== 'pending'
- `updateOrderItems` — fails if stock insufficient (compensation verified)
- `updateOrderItems` — invalidates active wompiReferences
- `updateOrderShipping` — success case, address updated
- `updateOrderShipping` — fails if status !== 'pending'

**wompi.service.test.js** — add to existing test file:
- `createTransaction` — pushes to `wompiReferences[]` alongside legacy field

### Backend integration tests (Back/tests/integration/)

- Webhook `transaction.updated` with `order.status === 'cancelled'` → ignored (200, no status change)
- `PUT /orders/:id/items` full flow with auth

---

## Migration / Rollout

**No data migration needed**. The `wompiReferences` field is additive. Existing orders have `wompiTransactionId` set — el código legacy sigue funcionando. Cuando se cree una nueva referencia, se escribe en ambos campos por un ciclo.

**Rollback**: Revert commits en orden inverso:
1. Frontend changes (OrderHistory, orders.service.js)
2. Routes + validators
3. Controllers
4. Services (`updateOrderItems`, `updateOrderShipping`)
5. Webhook cancelled check
6. Model + wompi.service (remove `wompiReferences`)

---

## Open Questions

Ninguna. El código fue revisado en su totalidad. Todos los endpoints, flujos y componentes necesarios existen. No se requieren nuevas dependencias ni cambios de infraestructura.
