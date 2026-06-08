# Tasks: Mejorar carrito y cancelación de órdenes

## Phase 1: Backend — Cancelación de órdenes

- [x] 1.1 En `Back/src/services/orders.service.js`, agregar función `cancelOrder(orderId, userId)` que:
  - Busque orden por `_id` + `user` (verificar propiedad)
  - Valide status: permitir `pending`, permitir `paid` solo si NO tiene `shippingDetails.trackingNumber`
  - Rechazar `shipped`, `delivered`, `cancelled` con AppError 400
  - Restaurar stock: `Product.findByIdAndUpdate(item.product, { $inc: { stock: +item.quantity } })` para cada item
  - Cambiar status a `'cancelled'`
  - Enviar notificación fire-and-forget (igual que `createOrder`)
  - Retornar orden actualizada

- [x] 1.2 En `Back/src/controllers/orders.controllers.js`, agregar `cancelOrder` controller:
  - Extraer `orderId` de `req.params.id`
  - Llamar `ordersService.cancelOrder(orderId, req.user._id)`
  - Responder con `formatResponse(true, 'Orden cancelada exitosamente', { order })`

- [x] 1.3 En `Back/src/routes/orders.routes.js`, agregar ruta:
  - `router.patch('/:id/cancel', protect, ordersControllers.cancelOrder)`
  - SIN `restrictTo('admin')` — es público para usuarios autenticados

## Phase 2: Backend — Carrito (clearCart)

- [x] 2.1 En `Back/src/services/cart.service.js`, agregar función `clearCart(userId)`:
  - Llamar `getCart(userId)` (que hace upsert si no existe)
  - Setear `cart.items = []`
  - `await cart.save()`
  - Retornar carrito vacío

- [x] 2.2 En `Back/src/controllers/cart.controllers.js`, agregar `clearCart` controller:
  - Llamar `cartService.clearCart(req.user._id)`
  - Responder con `formatResponse(true, 'Carrito limpiado exitosamente', { items: [] })`

- [x] 2.3 En `Back/src/routes/cart.routes.js`, agregar ruta:
  - `router.delete('/', protect, cartControllers.clearCart)`

## Phase 3: Frontend — Carrito (store y componentes)

- [x] 3.1 En `Front/src/store/cartStore.js`:
  - Fix `removeFromCart`: asegurar que cuando el item tiene `_id`, siempre haga `DELETE /cart/:itemId` (y no derive a `fetchCart` si falla)
  - Agregar acción `clearCartBackend()`: llama `DELETE /api/cart`, si ok → limpia store + localStorage

- [x] 3.2 En `Front/src/pages/Cart/Cart.jsx`:
  - Importar `useAuthStore` para verificar si hay usuario
  - Agregar `useEffect` al mount que si hay usuario autenticado → llama `fetchCart()`
  - El fetch solo reemplaza items si el backend devuelve datos (no vacía si backend está vacío y hay items locales)

- [x] 3.3 En `Front/src/pages/Cart/components/CartItemList.jsx`:
  - Agregar `<input type="number" min="1" max={item.product.stock}>` junto a los botones `-`/`+`
  - Al cambiar el input, llamar `updateItemQuantity` con throttling (150ms debounce en onChange)
  - Limitar valor a `[1, item.product.stock]` usando `Math.min`/`Math.max`
  - NO permitir valores negativos o cero

## Phase 4: Frontend — Cancelación en perfil (OrderHistory)

- [x] 4.1 En `Front/src/pages/Profile/components/OrderHistory.jsx`:
  - Agregar estado `cancellingId` para tracking de loading
  - Agregar estado `showCancelModal` + `selectedOrder` para el modal
  - Renderizar botón "Cancelar pedido" (clase danger/rojo) SOLO si status es `pending`
  - Al hacer clic → abrir modal de confirmación
  - Modal: overlay + card centrada con:
    - Título: "Cancelar pedido"
    - Mensaje: "¿Estás seguro de cancelar este pedido? Esta acción no se puede deshacer."
    - Botón "Sí, cancelar" (danger, con loading state)
    - Botón "No, mantener" (secondary, cierra modal)
  - Al confirmar: llamar `PATCH /api/orders/:id/cancel`
  - Si ok: cerrar modal, toast éxito, refetch órdenes (invalidar query de TanStack Query)
  - Si error: toast con mensaje de error, cerrar modal

- [x] 4.2 Verificar que `OrderHistory.jsx` use TanStack Query `useQueryClient().invalidateQueries()` para refrescar la lista después de cancelar

## Phase 5: Frontend — Cancelación en CheckoutCallback

- [x] 5.1 En `Front/src/pages/Checkout/CheckoutCallback.jsx`:
  - Cuando el pago está "pendiente" (ni APPROVED ni DECLINED):
    - Obtener `orderId` del `ref` param (`ref.split('-')[1]`)
    - Renderizar botón "Cancelar pedido" debajo del mensaje de "en proceso"
    - Mismo modal de confirmación que en OrderHistory
    - Al confirmar: `PATCH /api/orders/:id/cancel`
    - Si ok: navegar a `/profile` con toast éxito
    - Si error: toast error

## Phase 6: Frontend — Optimizar syncCartToBackend (PaymentForm)

- [x] 6.1 En `Front/src/pages/Checkout/components/PaymentForm.jsx`:
  - Modificar `syncCartToBackend()`:
    - En lugar de borrar items uno por uno con `DELETE /cart/:itemId`, llamar `DELETE /api/cart` (usando el nuevo endpoint de clearCart o la acción del store)
    - Luego insertar items normalmente con `POST /api/cart`

## Dependencies entre fases

```
Phase 1 ──► Phase 4, 5  (cancelación backend → frontend)
Phase 2 ──► Phase 3, 6  (clearCart backend → frontend)
Phase 3 ──► Phase 6     (cartStore fixes → syncCartToBackend)
```

Las fases 1-2 son independientes entre sí y pueden implementarse en paralelo. Las fases 4-5 dependen de la fase 1. Las fases 3 y 6 dependen de la fase 2.
