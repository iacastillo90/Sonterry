# Tasks: Gestión de órdenes pendientes

## Phase 1: Backend — Modelo y Fixes

- [ ] 1.1 En `Back/src/models/order.model.js`, agregar campo `wompiReferences` al schema Order:
  - Tipo: `[{ transactionId: String, status: String, createdAt: Date, active: Boolean }]`
  - Valor por defecto: `[]`
  - Mantener campo legacy `wompiTransactionId: String` intacto (backward compat)

- [ ] 1.2 En `Back/src/services/wompi.service.js`, modificar `createTransaction()`:
  - Después de crear la transacción en Wompi, pushear `{ transactionId, status: 'pending', active: true, createdAt: new Date() }` a `order.wompiReferences[]`
  - Mantener escritura legacy en `wompiTransactionId` (último reference activo)
  - NO sobrescribir `wompiReferences` — solo pushear nueva entrada

- [ ] 1.3 En `Back/src/webhooks/wompi.js`, agregar guard clause al inicio de `transaction.updated`:
  - Obtener `order` via `wompiTransactionId` (existente)
  - Si `order.status === 'cancelled'`:
    - Loggear `[Wompi] Order ${order._id} is cancelled, ignoring transaction`
    - Actualizar `wompiReferences[].status` para tracking (sin cambiar orden)
    - Responder `200 { received: true }` sin procesar
  - Adicional: verificar `wompiReferences[].active` — si `false`, ignorar (transacción de referencia invalidada por edición de items)

- [ ] 1.4 En `Back/src/services/orders.service.js`, modificar `cancelOrder()`:
  - Después de restaurar stock y cambiar status a `cancelled`, agregar:
  - Si `order.wompiReferences.length > 0`:
    - Marcar TODAS `wompiReferences[].active = false`
    - Loggear referencias invalidadas

## Phase 2: Backend — Editar orden

- [ ] 2.1 En `Back/src/services/orders.service.js`, agregar función `updateOrderItems(orderId, userId, newItems)`:
  - Buscar orden por `{ _id: orderId, user: userId }` — 404 si no existe o no pertenece
  - Validar `order.status === 'pending'` — AppError 400 si no
  - **Restaurar stock viejo**: iterar `order.items`, hacer `Product.findByIdAndUpdate(product, { $inc: { stock: +item.quantity } })` para cada uno
  - **Re-validar stock nuevo**: iterar `newItems`, hacer `Product.findOneAndUpdate({ _id: product, stock: { $gte: quantity } }, { $inc: { stock: -quantity } })`
  - Si algún item nuevo falla por stock: compensar decrementos exitosos y restaurar stock viejo (rollback total)
  - Si falla stock: responder AppError 409 con detalle `{ field: "items", detail: [{ product, name, available, requested }] }`
  - Recalcular `order.total` basado en nuevos items (subtotal = sum(item.price * item.quantity), mantener shipping y discount)
  - Invalidar referencias Wompi: si `wompiReferences` tiene alguna `active: true`, marcar todas `active: false`
  - Asignar `order.items = newItems`, `order.total = newTotal`
  - `await order.save()`
  - Retornar orden actualizada

- [ ] 2.2 En `Back/src/services/orders.service.js`, agregar función `updateOrderShipping(orderId, userId, newAddress)`:
  - Buscar orden por `{ _id: orderId, user: userId }` — 404 si no existe o no pertenece
  - Validar `order.status === 'pending'` — AppError 400 si no
  - Reemplazar `order.shippingAddress = newAddress`
  - NO invalidar referencias Wompi, NO recalcular total
  - `await order.save()`
  - Retornar orden actualizada

- [ ] 2.3 En `Back/src/controllers/orders.controllers.js`, agregar controllers:
  - `updateItems`: extraer `orderId` de `req.params.id`, `newItems` de `req.body.items`, llamar `ordersService.updateOrderItems(orderId, req.user._id, newItems)`, responder `formatResponse(true, 'Items actualizados exitosamente', { order })`
  - `updateShipping`: extraer `orderId` de `req.params.id`, `newAddress` de `req.body`, llamar `ordersService.updateOrderShipping(orderId, req.user._id, newAddress)`, responder `formatResponse(true, 'Dirección de envío actualizada', { order })`

- [ ] 2.4 En `Back/src/routes/orders.routes.js`, agregar rutas:
  - `router.put('/:id/items', protect, ordersControllers.updateItems)`
  - `router.put('/:id/shipping', protect, ordersControllers.updateShipping)`

- [ ] 2.5 En `Back/src/validators/order.validators.js`, agregar schemas Zod:
  - `updateOrderItemsSchema`: `items` array no vacío, cada item con `product` (string ObjectId), `quantity` (int >= 1), `customization.type` (enum `['serigrafia', 'dtf']` optional), `customization.details` (string max 1000 optional)
  - `updateOrderShippingSchema`: `shippingAddress` con `address`, `city`, `postalCode`, `country`, `phone` — mismos campos que `createOrderSchema`

## Phase 3: Frontend — Retomar pago

- [ ] 3.1 En `Front/src/services/orders.service.js`, agregar función `resumePayment(orderId)`:
  - Llama `POST /api/payments/wompi/transaction` con `{ orderId }`
  - Retorna `transactionData` (incluye URL del widget Wompi)

- [ ] 3.2 En `Front/src/pages/Profile/components/OrderHistory.jsx`, agregar botón "Pagar ahora":
  - Renderizar botón "Pagar ahora" con estilo primary/accent SOLO si `order.status === 'pending' && order.paymentMethod === 'wompi'`
  - Estado local `payingOrderId` para loading tracking
  - onClick:
    - Setear `payingOrderId`
    - Llamar `ordersService.resumePayment(orderId)`
    - Recibir `transactionData`
    - Abrir widget Wompi `window.open(widgetUrl, 'WompiPopup', 'width=600,height=700')`
    - Callback del widget → redirigir a `/checkout/callback?ref=<orderId>&transaction_id=...&status=...`
  - Si error: toast con mensaje, limpiar `payingOrderId`

## Phase 4: Frontend — Editar orden

- [ ] 4.1 En `Front/src/services/orders.service.js`, agregar funciones:
  - `updateOrderItems(orderId, items)` → llama `PUT /api/orders/:id/items` con `{ items }`
  - `updateOrderShipping(orderId, address)` → llama `PUT /api/orders/:id/shipping` con `{ address }`

- [ ] 4.2 En `Front/src/pages/Profile/components/OrderHistory.jsx`, agregar modal de edición de items:
  - Botón "Editar items" (estilo secondary/outline) SOLO si `order.status === 'pending'`
  - Estado local: `showEditItemsModal`, `editItems`, `savingItems`
  - Modal con:
    - Lista de items actuales: nombre, input numérico para cantidad (min 1, max stock), precio unitario, subtotal, botón quitar
    - Botón "Agregar producto" → selector de productos (reutilizar lógica de selector de catálogo existente)
    - Total calculado en tiempo real
    - Botones "Guardar cambios" y "Cancelar"
  - Al guardar:
    - Setear `savingItems = true`
    - Llamar `ordersService.updateOrderItems(orderId, editItems)`
    - Si ok: cerrar modal, toast "Items actualizados", `invalidateQueries` de órdenes
    - Si error 400/409 (stock insuficiente o ya no pending): mostrar detalle en modal/toast, mantener modal abierto si es stock, cerrar si ya no pending
    - Si error 409 "ya no está pendiente": cerrar modal, toast error, refrescar UI
    - Finalmente: `savingItems = false`

- [ ] 4.3 En `Front/src/pages/Profile/components/OrderHistory.jsx`, agregar modal de edición de shipping:
  - Botón "Editar dirección" SOLO si `order.status === 'pending'`
  - Estado local: `showEditShippingModal`, `editAddress`, `savingAddress`
  - Modal con formulario inline: address, city, postalCode, country, phone (reutilizar mismos campos que checkout)
  - Al guardar:
    - Llamar `ordersService.updateOrderShipping(orderId, editAddress)`
    - Si ok: cerrar modal, toast "Dirección actualizada", `invalidateQueries`
    - Si error: toast con mensaje, mantener modal abierto

## Phase 5: Testing

- [ ] 5.1 Unit tests para `wompi.service.js`:
  - `createTransaction` → pushea a `wompiReferences[]` junto al campo legacy `wompiTransactionId`
  - Múltiples llamadas → múltiples entradas en `wompiReferences[]`, sin sobrescritura

- [ ] 5.2 Unit tests para `orders.service.js:updateOrderItems`:
  - Success: items reemplazados, total recalculado, stock ajustado
  - Falla si `status !== 'pending'` → error 400
  - Falla si stock insuficiente → error 409 con detalle, stock original restaurado (compensation)
  - Invalida `wompiReferences` activas después de editar items
  - Concurrencia: orden cambió a `paid` entre lectura y escritura → operación atómica falla

- [ ] 5.3 Unit tests para `orders.service.js:updateOrderShipping`:
  - Success: `shippingAddress` actualizado, stock NO modificado, wompiReferences NO modificadas
  - Falla si `status !== 'pending'` → error 400

- [ ] 5.4 Integration test para webhook Wompi:
  - `transaction.updated` con `order.status === 'cancelled'` → status ignorado, 200 OK
  - `transaction.updated` con `wompiReferences[].active === false` → status ignorado, 200 OK
  - `transaction.updated` con orden `pending` y referencia `active: true` → proceso normal (`paid`)

## Dependencies entre fases

```
Phase 1 ──► Phase 3  (retomar pago necesita wompiReferences[] tracking)
Phase 1 ──► Phase 2  (editar necesita modelo con wompiReferences[])
Phase 2 ──► Phase 4  (frontend editar necesita endpoints backend)
Phase 3, 4 ──► Phase 5  (testing necesita features implementadas)
```

Las fases 3 y 4 son independientes entre sí (retomar pago y editar no comparten lógica frontend). Phase 1 es requisito para todas las demás. Phase 5 es la última.
