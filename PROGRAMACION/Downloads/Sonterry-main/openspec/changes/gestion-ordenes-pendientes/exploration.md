# Exploration: Gestión de órdenes pendientes

## Estado actual

### Flujo de pago
1. Usuario llena ShippingForm → PaymentForm en `/checkout`
2. `PaymentForm.handlePayment()`: syncCartToBackend → POST /orders → status `pending`
3. Si `paymentMethod === 'wompi'`: llama `createWompiTransaction(order._id)` → abre widget Wompi
4. Wompi redirect a `/checkout/callback?ref=...&transaction_id=...&status=...`
5. `confirmWompiPayment`: si APPROVED → `deductOrderStock` → `status = 'paid'`
6. Webhook Wompi respaldo: busca por `wompiTransactionId` → mismo proceso

### Estados de orden
```
Order.status enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

Transiciones actuales:
  pending  --> paid       (confirmación de pago)
  pending  --> cancelled  (cancelOrder usuario)
  paid     --> shipped    (updateOrderDispatch con tracking)
  paid     --> cancelled  (cancelOrder, solo sin tracking)
  shipped  --> delivered  (updateOrderStatus admin)
```

### Cancelación ya implementada
- `cancelOrder()` en orders.service.js — owner check, status validación, stock restoration, notificación
- `PATCH /:id/cancel` route (protect, sin admin)
- Frontend: botón Cancelar en OrderHistory (pending/paid) + modal confirmación
- Frontend: botón Cancelar en CheckoutCallback (estado pendiente)

## Problemas identificados

### 1. Retomar pago — no existe
- `createWompiTransaction` controller VERIFICA `order.status !== 'pending'`, pero el endpoint está listo
- `wompi.service.js:createTransaction()` **sobrescribe** `order.wompiTransactionId` cada vez — mata tracking de referencias anteriores
- Frontend no tiene botón "Pagar ahora" para órdenes pending
- No hay ruta para re-procesar pago de orden existente

### 2. Editar orden — no existe
- No hay endpoints PUT/PATCH para items, shipping, customization
- Stock debe re-validarse si se cambian items
- El total puede cambiar → transacciones Wompi previas quedan con monto incorrecto

### 3. Eliminar — ya existe como cancelar, pero...
- Webhook Wompi no chequea `status === 'cancelled'` → race condition: cancelar mientras webhook llega
- No invalida referencias Wompi previas al cancelar

## Riesgos técnicos

| Riesgo | Severidad | Mitigación |
|--------|-----------|------------|
| Webhook Wompi procesa pago post-cancelación | Alta | Agregar chequeo `status === 'cancelled'` en webhook |
| Race condition editar mientras paga | Media | Usar transacción MongoDB + validar status al inicio |
| Stock inconsistente al editar items | Media | Re-validar stock con `$gte` antes de aplicar cambios |
| Reference Wompi único por transacción perdido | Media | Usar array `wompiReferences` en Order |
| Doble descuento de stock por concurrencia | Baja | Usar `findOneAndUpdate` atómico con filtro `{ status: 'pending' }` |

## Archivos afectados

### Backend
- `Back/src/services/orders.service.js` — agregar `updateOrderItems`, `updateOrderShipping`, `updateOrderItemCustomization`
- `Back/src/controllers/orders.controllers.js` — agregar controllers para edición
- `Back/src/routes/orders.routes.js` — agregar rutas PUT/PATCH
- `Back/src/services/wompi.service.js` — fix sobrescritura `wompiTransactionId`
- `Back/src/webhooks/wompi.js` — fix race condition cancel + pago
- `Back/src/models/order.model.js` — agregar `wompiReferences: [String]`
- `Back/src/validators/order.validators.js` — schemas para edición
- `Back/src/services/payments.service.js` — opcional: regeneratePaymentIntent para Stripe

### Frontend
- `Front/src/pages/Profile/components/OrderHistory.jsx` — botón Retomar pago, botón Editar, modal edición
- `Front/src/pages/Checkout/components/PaymentForm.jsx` — refactor para soportar `existingOrderId`
- `Front/src/store/checkoutStore.js` — agregar `editingOrderId`
- `Front/src/store/cartStore.js` — cargar items de orden existente para edición
- `Front/src/router/index.jsx` — opcional: ruta `/checkout/resume/:orderId`
- `Front/src/services/orders.service.js` — funciones para editar orden
