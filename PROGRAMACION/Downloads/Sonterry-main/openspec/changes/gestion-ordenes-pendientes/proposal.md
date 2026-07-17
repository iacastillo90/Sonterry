# Proposal: Gestión de órdenes pendientes

## Intent

Resolver tres problemas en el manejo de órdenes con estado `pending`:

1. **No se puede retomar el pago**: si el usuario abre el widget de Wompi pero no completa el pago, queda atrapado sin forma de reanudar.
2. **No se puede editar la orden**: items, cantidades, personalización o dirección de envío no se pueden modificar mientras está pendiente.
3. **Race condition Wompi webhook**: si el usuario cancela una orden y el webhook de Wompi llega después, la orden se marca como `paid` a pesar de estar `cancelled`. Además, cada reintento de pago sobrescribe `wompiTransactionId` perdiendo el historial de referencias.

## Scope

### In Scope
- **Fix Wompi webhook race condition**: webhook debe ignorar transacciones si `order.status === 'cancelled'`
- **Fix Wompi reference tracking**: cambiar `wompiTransactionId` (string único) por array `wompiReferences[]` en el modelo Order para trackear múltiples intentos
- **Retomar pago**: botón "Pagar ahora" en `OrderHistory.jsx` para órdenes `pending` con método Wompi → reusa endpoint `POST /payments/wompi/transaction` → abre widget Wompi → callback redirige a `CheckoutCallback` que actualiza la orden existente (no crea una nueva)
- **Editar items de la orden**: endpoint `PUT /orders/:id/items` + modal en OrderHistory para cambiar productos/cantidades/personalización → re-valida stock → recalcula total → invalida referencias Wompi previas si existían
- **Editar dirección de envío**: endpoint `PUT /orders/:id/shipping` + modal inline en OrderHistory para modificar `shippingAddress`
- **Mejorar cancelación**: invalidar referencias Wompi activas al cancelar (marcar como obsoletas, no eliminar). Mejorar feedback visual con loading state y manejo de errores.

### Out of Scope
- Editar método de pago (crear order con método A, pagar con método B)
- Stripe payment resume (solo Wompi por ahora)
- Hard-delete de órdenes (solo cancelación lógica)
- Refactor completo del flujo de checkout / CheckoutCallback
- Editar órdenes manuales (createManualOrder)

## Approach

### Backend

1. **Modelo Order**: reemplazar `wompiTransactionId: String` por `wompiReferences: [{ transactionId: String, status: String, createdAt: Date, active: Boolean }]`. Migración backward-compatible.

2. **Webhook Wompi** (`payments.service.js`): al recibir `transaction.finished`, verificar `order.status !== 'cancelled'` antes de marcar como `paid`. Si está cancelada, registrar la transacción en `wompiReferences` pero ignorar el cambio de status.

3. **Nuevo endpoint `PUT /orders/:id/items`**:
   - Validar que `order.status === 'pending'` y pertenezca al usuario
   - Validar stock disponible para cada item
   - Re-calcular total (`subtotal + shipping - discount`)
   - Si hay referencias Wompi previas activas, marcarlas como `active: false`
   - Usar transacción MongoDB para atomicidad

4. **Nuevo endpoint `PUT /orders/:id/shipping`**:
   - Validar `order.status === 'pending'`
   - Actualizar `shippingAddress`
   - No invalida referencias Wompi (el shipping no afecta el pago)

5. **Cancelación**: al cancelar, marcar todas las `wompiReferences[].active = false`. El webhook check ya existe del fix del race condition.

### Frontend

6. **OrderHistory.jsx**: agregar botón "Pagar ahora" (solo Wompi `pending`), modal de edición de items, modal de edición de dirección. Manejar loading/error states.

7. **PaymentForm.jsx / CheckoutCallback.jsx**: si la orden ya existe (`orderId` en query params y orden está en BD), actualizar en vez de crear nueva. Reusar flujo Wompi existente.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `Back/src/models/Order.js` | Modified | `wompiTransactionId` → `wompiReferences[]` |
| `Back/src/services/orders.service.js` | Modified | `updateOrderItems()`, `updateOrderShipping()`, mejorar `cancelOrder()` |
| `Back/src/controllers/orders.controllers.js` | Modified | Nuevos controllers `updateItems`, `updateShipping` |
| `Back/src/routes/orders.routes.js` | Modified | Rutas `PUT /:id/items`, `PUT /:id/shipping` |
| `Back/src/services/payments.service.js` | Modified | Webhook: check `status !== 'cancelled'`, guardar en `wompiReferences` |
| `Back/src/controllers/payments.controller.js` | Modified | Guardar referencia Wompi en `wompiReferences[]` |
| `Front/src/pages/Profile/components/OrderHistory.jsx` | Modified | Botón "Pagar ahora", modales de edición, mejorar cancelación |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | Modified | Soporte para orden existente (update vs create) |
| `Front/src/pages/Checkout/components/PaymentForm.jsx` | Modified | Pasar `orderId` existente al callback |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Usuario edita items mientras webhook de pago procesa | Low | Transacción MongoDB + marcar referencias como inactivas. Webhook checkea `active: true` |
| Stock cambia entre que el usuario ve la orden y edita | Low | Re-validar stock en el endpoint PUT, no confiar en frontend |
| Migración de `wompiTransactionId` a `wompiReferences` rompe datos existentes | Medium | Script de migración que lee `wompiTransactionId` existente y lo copia a `wompiReferences[0]`. Backward compatible: código lee de ambos por un ciclo |
| Usuario paga una orden editada con referencia Wompi vieja | Low | Al editar items, marcar todas las references como `active: false`. Webhook solo procesa `active: true` |
| Modal de edición en OrderHistory con muchos items → UX pobre | Low | Usar mismo diseño que el carrito (CartItemList). Scroll si es necesario |

## Rollback Plan

Revert commits individuales en orden inverso:
1. Revertir cambios frontend (OrderHistory, CheckoutCallback, PaymentForm)
2. Revertir rutas y controllers backend
3. Revertir cambios en services (updateOrderItems, updateOrderShipping, payments.service)
4. Revertir modelo Order (volver a `wompiTransactionId`)
5. Ejecutar script de migración inversa si es necesario

## Dependencies

- Ninguna externa. Todo es dentro del proyecto.

## Success Criteria

- [ ] Webhook Wompi ignora transacciones si `order.status === 'cancelled'`
- [ ] Modelo Order tiene `wompiReferences[]` en vez de `wompiTransactionId` único
- [ ] Usuario puede retomar pago desde OrderHistory para órdenes Wompi pendientes
- [ ] Usuario puede editar items/cantidades en orden pendiente con re-validación de stock
- [ ] Usuario puede editar dirección de envío en orden pendiente
- [ ] Editar items invalida referencias Wompi previas (no se puede pagar con ref vieja)
- [ ] Cancelación invalida referencias Wompi activas
- [ ] Datos existentes con `wompiTransactionId` se migran correctamente
- [ ] Loading states y manejo de errores en todos los botones y modales
