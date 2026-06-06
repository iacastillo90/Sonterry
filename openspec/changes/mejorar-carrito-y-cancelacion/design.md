# Design: Mejorar carrito y cancelación de órdenes

## Technical Approach

Dos tracks paralelos que tocan backend (services/controllers/routes) y frontend (components/store):

1. **Cancelación**: nuevo endpoint `PATCH /orders/:id/cancel` (público, user-only) → `cancelOrder()` en service → restaura stock vía `$inc` → botón en OrderHistory y CheckoutCallback.
2. **Carrito**: endpoint `DELETE /cart` → auto-refresh en Cart page → input numérico en CartItemList → fix removeFromCart → optimizar syncCartToBackend.

Se sigue el patrón existente: Controller → Service → Model (CommonJS backend), Zustand + componentes React (ESM frontend).

## Architecture Decisions

### Decision: cancelOrder como función separada (no reusar updateOrderStatus)

**Choice**: Crear `cancelOrder(orderId, userId)` en `orders.service.js` separada de `updateOrderStatus(orderId, newStatus)`.
**Alternatives considered**: Extender `updateOrderStatus` para que acepte userId opcional y restaure stock automáticamente cuando `newStatus === 'cancelled'`.
**Rationale**: `updateOrderStatus` es admin-only (`restrictTo('admin')`) y maneja toda notificación genérica. `cancelOrder` tiene lógica específica:
- Verificar propiedad de la orden (userId)
- Validar estados permitidos (pending/paid)
- Restaurar stock atómicamente
- Mensaje de trackingHistory personalizado (`"Cancelado por el usuario"`)

Separarlas evita acoplar lógica de admin con lógica de usuario y mantiene cada función con una responsabilidad clara.

### Decision: Restaurar stock con $inc atómico (no findOneAndUpdate con condición)

**Choice**: Usar `Product.findByIdAndUpdate(item.product, { $inc: { stock: +item.quantity } })` sin condición de stock previo.
**Alternatives considered**: Usar `findOneAndUpdate` con condición para evitar sobre-restauración.
**Rationale**: Al cancelar, estamos devolviendo stock que ya se descontó. No hay riesgo de "exceder" el stock original porque sería un bug si el stock original se modificó externamente (un admin lo cambió manualmente). Además, si el stock se modificó entre el descuento y la cancelación, es más seguro restaurar la cantidad exacta que el usuario había comprado. El `$inc` en MongoDB es atómico, no hay race condition.

### Decision: Auto-refresh condicional (no reemplazar si backend vacío)

**Choice**: En `Cart.jsx`, al montar, llamar `fetchCart()` pero solo reemplazar items si el backend tiene datos. Si el backend está vacío y localStorage tiene items, mantener locales.
**Alternatives considered**: Siempre reemplazar con backend (podría borrar items si hubo desincronización).
**Rationale**: Protege contra el caso donde el usuario agrega items sin estar autenticado y luego se loguea — los items locales no deben perderse. El `fetchCart()` existente en el store ya maneja lógica de auth check.

### Decision: No usar modal library externa para confirmación

**Choice**: Implementar modal de confirmación inline en los componentes (usando `useState` + render condicional + CSS).
**Alternatives considered**: Usar `react-confirm-alert` o similar.
**Rationale**: El proyecto no tiene ninguna librería de modals. Agregar una dependecia solo para un modal de confirmación es overkill. El modal es simple: título, mensaje, dos botones. Se implementa con un div overlay + flexbox, consistente con el resto del CSS plano del proyecto.

## Data Flow

### Cancelación de orden

```
[OrderHistory.jsx]                    [Backend]
      │                                    │
      │  click "Cancelar pedido"            │
      ├──► modal confirmación               │
      │      │                              │
      │      ├─ "Sí, cancelar"              │
      │      │   └──► PATCH /orders/:id/cancel
      │      │           │                  │
      │      │           │   verify owner   │
      │      │           │   verify status  │
      │      │           │   $inc stock     │
      │      │           │   status→cancel  │
      │      │           │   save + notify  │
      │      │           │◄── { order }     │
      │      │           │                  │
      │      │   ◄── toast éxito            │
      │      │   ◄── re-render (cancelled)  │
      │      │                              │
      │      └─ "No, mantener"              │
      │          └──► cerrar modal          │
```

### Auto-refresh carrito

```
[Cart.jsx mount]
      │
      ├── ¿user autenticado? ──NO──► usar items localStorage
      │        │
      │       YES
      │        │
      │   fetchCart() (GET /api/cart)
      │        │
      │   ¿backend tiene items? ──NO──► mantener items locales
      │        │
      │       YES
      │        │
      │   reemplazar items store
      │   actualizar localStorage
      │   renderizar carrito
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `Back/src/services/orders.service.js` | Modify | Agregar `cancelOrder()`, restaurar stock al cancelar |
| `Back/src/controllers/orders.controllers.js` | Modify | Agregar `cancelOrder` controller |
| `Back/src/routes/orders.routes.js` | Modify | Agregar `PATCH /:id/cancel` (protect, SIN restrictTo) |
| `Back/src/services/cart.service.js` | Modify | Agregar `clearCart()` |
| `Back/src/controllers/cart.controllers.js` | Modify | Agregar `clearCart` controller |
| `Back/src/routes/cart.routes.js` | Modify | Agregar `DELETE /` (clearCart) |
| `Front/src/pages/Cart/Cart.jsx` | Modify | Agregar `useEffect` con `fetchCart()` al montar |
| `Front/src/pages/Cart/components/CartItemList.jsx` | Modify | Agregar input numérico para cantidad |
| `Front/src/pages/Profile/components/OrderHistory.jsx` | Modify | Agregar botón cancelar + modal confirmación |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | Modify | Agregar botón cancelar para órdenes en proceso |
| `Front/src/pages/Checkout/components/PaymentForm.jsx` | Modify | Optimizar `syncCartToBackend` usando clearCart |
| `Front/src/store/cartStore.js` | Modify | Fix `removeFromCart` sync, agregar `clearCartBackend` |

## Interfaces / Contracts

### API: PATCH /api/orders/:id/cancel

```
Request: (no body required)
Response 200: {
  success: true,
  message: "Orden cancelada exitosamente",
  data: { order: OrderDocument }
}
Response 400: {
  success: false,
  message: "La orden no se puede cancelar porque ya fue despachada" | "La orden ya fue cancelada"
}
Response 404: {
  success: false,
  message: "Orden no encontrada"
}
```

### API: DELETE /api/cart

```
Request: (no body required)
Response 200: {
  success: true,
  message: "Carrito limpiado exitosamente",
  data: { items: [] }
}
```

### cancelOrder() service signature

```js
/**
 * Cancela una orden del usuario y restaura el stock.
 * @param {string} orderId - ID de la orden
 * @param {string} userId - ID del usuario (dueño)
 * @returns {Promise<Object>} Orden actualizada
 * @throws {AppError} Si no existe, no pertenece, o no se puede cancelar
 */
async function cancelOrder(orderId, userId) {
  // 1. Find order by _id + user
  // 2. Validate status (pending or paid without tracking)
  // 3. Restore stock via $inc
  // 4. Set status = 'cancelled'
  // 5. Save (triggers trackingHistory via pre('save'))
  // 6. Fire notification (fire-and-forget)
  // 7. Return order
}
```

### cartStore — clearCartBackend

```js
clearCartBackend: async () => {
  if (!isAuth()) return;
  try {
    await api.delete('/cart');
    set({ items: [] });
    localStorage.removeItem('st_cart');
  } catch (err) {
    console.error('Error clearing cart:', err);
  }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit (Back) | `cancelOrder()` | Mock Order.find + Product.findByIdAndUpdate. Test: status válido, inválido, stock restoration, owner vs non-owner. Jest |
| Unit (Back) | `clearCart()` | Mock Cart.findByIdAndUpdate. Test: cart exists, cart empty |
| Integration (Back) | `PATCH /orders/:id/cancel` | Supertest + MongoDB Memory Server. Test: full flow, 400, 404 |
| Manual (Front) | Auto-refresh, modal, inputs | Probar en navegador con Docker |

## Migration / Rollout

No migration required. Todos los cambios son aditivos (nuevos endpoints, nuevos botones). Las órdenes existentes pueden cancelarse con el nuevo endpoint sin problema.

## Open Questions

- [ ] Ninguna
