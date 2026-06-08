# Proposal: Mejorar carrito y cancelación de órdenes

## Intent

Resolver tres problemas de UX que afectan el flujo de compra:

1. **Carrito no se refresca**: los items quedan desincronizados entre el frontend (Zustand/localStorage) y el backend (MongoDB). El usuario ve datos stale, no puede eliminar items correctamente ni ajustar cantidades de forma confiable.

2. **No se puede cancelar una orden**: no existe un endpoint público para que el usuario cancele su propia orden desde el perfil o desde el checkout. Cuando se cancela, el stock no se restaura al inventario.

3. **Falta feedback visual**: no hay modales de confirmación ni botones claros para acciones destructivas como cancelar una orden.

## Scope

### In Scope
- Endpoint público `PATCH /orders/:id/cancel` para que el usuario cancele sus órdenes (`pending` o `paid` no despachadas)
- Restauración del stock al cancelar (vía `$inc` atómico)
- Botón "Cancelar orden" en `OrderHistory.jsx` con modal de confirmación
- Botón "Cancelar orden" en `CheckoutCallback.jsx` cuando el pago está pendiente
- Auto-refresh del carrito desde backend al montar la página del carrito
- Endpoint `DELETE /cart` para limpiar carrito en backend
- Input numérico directo para cantidad en `CartItemList.jsx` (no solo botones +/-)
- Fix del `removeFromCart` para que siempre borre del backend correctamente

### Out of Scope
- Refactor completo del patrón offline-first del carrito (merece su propio cambio)
- Cancelación admin mejorada (ya existe, solo falta restaurar stock)
- Notificaciones push/email al cancelar (ya existe la infraestructura vía `addNotificationJob`)
- Wishlist (está en otra sección)
- Histórico de órdenes canceladas (el trackingHistory ya lo guarda automáticamente)

## Approach

### Backend

1. **Agregar `cancelOrder(orderId, userId)` en `orders.service.js`**:
   - Verificar que la orden pertenezca al usuario
   - Validar que status sea `pending` o `paid` (no `shipped`/`delivered`/`cancelled`)
   - Restaurar stock: `Product.findByIdAndUpdate(item.product, { $inc: { stock: +item.quantity } })`
   - Cambiar status a `'cancelled'`
   - El `pre('save')` hook del modelo ya agrega trackingHistory automáticamente

2. **Agregar `cancelOrder` controller** (delgado, ~5 líneas)

3. **Agregar ruta `PATCH /orders/:id/cancel`** con `protect` (NO `restrictTo('admin')`)

4. **Agregar `clearCart()` en `cart.service.js`** y endpoint `DELETE /cart`

5. **Actualizar `createManualOrder`** para no descontar stock (consistente con `createOrder`)

### Frontend — Carrito

6. **Auto-refresh en `Cart.jsx`**: al montar el componente, si hay usuario autenticado, llamar `fetchCart()` para sincronizar desde backend

7. **Input numérico en `CartItemList.jsx`**: agregar `<input type="number">` junto a los botones `-`/`+` para que el usuario pueda escribir la cantidad directamente

8. **Fix `removeFromCart`**: asegurar que siempre mande DELETE al backend cuando el item tiene `_id`

9. **Agregar `clearCartBackend` en cartStore**: función que llama `DELETE /cart` en backend y limpia localStorage

### Frontend — Cancelación

10. **Botón cancelar en `OrderHistory.jsx`**: mostrar botón "Cancelar pedido" solo si status es `pending` o `paid`, con modal de confirmación (¿Estás seguro? Esta acción no se puede deshacer)

11. **Botón cancelar en `CheckoutCallback.jsx`**: cuando el pago quedó en proceso (no APPROVED ni DECLINED), mostrar opción de cancelar la orden

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `Back/src/services/orders.service.js` | Modified | Agregar `cancelOrder()`, restaurar stock, actualizar `createManualOrder` |
| `Back/src/controllers/orders.controllers.js` | Modified | Agregar `cancelOrder` controller |
| `Back/src/routes/orders.routes.js` | Modified | Agregar ruta `PATCH /orders/:id/cancel` |
| `Back/src/services/cart.service.js` | Modified | Agregar `clearCart()` |
| `Back/src/controllers/cart.controllers.js` | Modified | Agregar `clearCart` controller |
| `Back/src/routes/cart.routes.js` | Modified | Agregar ruta `DELETE /cart` |
| `Front/src/pages/Cart/Cart.jsx` | Modified | Auto-refresh al montar |
| `Front/src/pages/Cart/components/CartItemList.jsx` | Modified | Input numérico de cantidad |
| `Front/src/pages/Profile/components/OrderHistory.jsx` | Modified | Botón cancelar + modal |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | Modified | Botón cancelar |
| `Front/src/store/cartStore.js` | Modified | Fix removeFromCart, clearCartBackend |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Race condition al restaurar stock (dos cancelaciones simultáneas) | Low | Usar `$inc` atómico de MongoDB — es seguro por diseño |
| Usuario cancela orden `paid` que ya se estaba preparando | Medium | Solo permitir cancelar `pending` (no pagadas). Para `paid`, agregar validación extra |
| Perder items del carrito local al hacer auto-refresh | Medium | Auto-refresh solo reemplaza si el backend tiene datos. Si el backend está vacío, mantener datos locales |
| Orden cancelada pero webhook de pago llega después | Low | Verificar en webhook que orden no esté `cancelled` antes de marcar `paid` |

## Rollback Plan

Revert commits individuales en orden inverso:
1. Revertir cambios frontend (OrderHistory, CheckoutCallback, Cart)
2. Revertir rutas y controllers backend
3. Revertir cambios en services (cancelOrder, clearCart, createManualOrder)

Cada commit es atómico y reversible individualmente.

## Dependencies

- Ninguna externa. Todo es dentro del proyecto.

## Success Criteria

- [ ] Usuario puede cancelar una orden `pending` desde el perfil con confirmación
- [ ] Stock se restaura correctamente al cancelar (verificar en BD)
- [ ] Carrito se refresca desde backend al entrar a la página del carrito
- [ ] Usuario puede ingresar cantidad manualmente en el input numérico del carrito
- [ ] Endpoint `DELETE /cart` limpia el carrito en MongoDB
- [ ] Usuario no puede cancelar órdenes `shipped`/`delivered`/`cancelled`
- [ ] Las notificaciones existentes siguen funcionando para status changes
