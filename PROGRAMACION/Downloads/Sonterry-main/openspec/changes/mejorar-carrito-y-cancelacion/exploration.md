## Exploration: Mejorar carrito y cancelación de órdenes

### Current State

#### Carrito (Frontend)
- **Offline-first**: Zustand store opera sobre `localStorage` (`st_cart`). Sincronización con backend es secundaria.
- **Cart page** (`Cart.jsx`): carga items desde Zustand/localStorage, NO desde backend. Si hay desincronización, el usuario ve datos stale.
- **removeFromCart**: funciona localmente, pero si el item no tiene `_id` (nunca se sincronizó), llama `fetchCart()` que es una llamada GET adicional. El DELETE al backend puede fallar silenciosamente.
- **Quantity controls**: ya existen botones `-`/`+` en `CartItemList.jsx`, pero no hay input numérico directo.
- **No hay clearCart endpoint**: `clearCart()` solo limpia localStorage/Zustand. No existe `DELETE /cart` en backend.
- **syncCartToBackend hack**: en PaymentForm se borra todo el carrito del backend y se reinserta — solución parche para la desincronización.

#### Cancelación de órdenes (Backend)
- **No hay endpoint público**: solo `PATCH /orders/:id/status` con `restrictTo('admin')`.
- **updateOrderStatus NO restaura stock**: cuando se cancela una orden, el stock queda descontado permanentemente.
- **No hay lógica de qué statuses se pueden cancelar**: un admin podría cancelar una orden `delivered` si quisiera.
- **createManualOrder aún descuenta stock en creación** (no aplica la nueva política de pago-first).

#### Cancelación (Frontend)
- **OrderHistory.jsx**: solo muestra órdenes, sin botón de cancelar.
- **CheckoutCallback.jsx**: muestra éxito/fracaso pero no permite cancelar.
- **No hay confirmación visual**: cancelar una orden no tiene modal de confirmación ni feedback.

### Affected Areas

- `Back/src/services/orders.service.js` — agregar `cancelOrder()`, restaurar stock, refactor `createManualOrder`
- `Back/src/controllers/orders.controllers.js` — agregar `cancelOrder` controller
- `Back/src/routes/orders.routes.js` — agregar ruta `PATCH /orders/:id/cancel`
- `Back/src/services/cart.service.js` — agregar `clearCart()`
- `Back/src/controllers/cart.controllers.js` — agregar `clearCart` controller
- `Back/src/routes/cart.routes.js` — agregar ruta `DELETE /cart`
- `Front/src/store/cartStore.js` — mejorar sync, agregar `clearCartBackend`
- `Front/src/pages/Cart/Cart.jsx` — auto-refresh desde backend al montar
- `Front/src/pages/Cart/components/CartItemList.jsx` — agregar input numérico de cantidad
- `Front/src/pages/Profile/components/OrderHistory.jsx` — agregar botón cancelar + modal confirmación
- `Front/src/pages/Checkout/CheckoutCallback.jsx` — agregar botón cancelar si el pago falló
- `Front/src/services/api.js` o similar — nueva función de cancelación

### Approaches

1. **Mínimo viable** — Solo agregar cancelación de órdenes (backend + frontend) y fixear carrito con auto-refresh
   - Pros: Rápido, toca lo urgente
   - Cons: No resuelve la raíz de la desincronización offline-first
   - Effort: Medium

2. **Completo** — Refactor del carrito a online-first cuando hay sesión activa + cancelación completa
   - Pros: Soluciona de raíz, UX impecable
   - Cons: Más cambios, riesgo de regresiones
   - Effort: High

3. **Recomendado (Balanceado)** — Cancelación completa + fixes de carrito sin refactor total
   - Cancelación: endpoint + restauración stock + UI en perfil y checkout
   - Carrito: auto-refresh al montar, clearCart endpoint, input numérico de cantidad
   - Sin refactor del patrón offline-first (eso sería otro cambio)
   - Effort: Medium-High

### Recommendation

**Opción 3 (Balanceada)**. Resuelve los problemas concretos del usuario sin entrar en una refactorización masiva del patrón offline-first del carrito, que merecería su propio cambio aparte.

### Risks
- **Stock restoration race condition**: si dos cancelaciones ocurren casi simultáneamente, el stock podría restaurarse de más. Usar `$inc` atómico mitiga esto.
- **Cancelar orden paid que ya se está despachando**: validar que solo se puedan cancelar `pending` (no pagadas aún) para evitar conflictos con logística. Si está `paid` pero no `shipped`, se podría cancelar con advertencia.

### Ready for Proposal
Sí. Pasar a propuesta con la Opción 3.
