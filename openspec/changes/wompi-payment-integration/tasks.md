# Tasks: Integrar Wompi como pasarela de pagos

## Phase 1: Configuración y Modelos (Infrastructure)

- [x] 1.1 Agregar variables de entorno Wompi a `Back/.env` y `Back/.env.example`
  - WOMPI_PUBLIC_KEY, WOMPI_PRIVATE_KEY, WOMPI_INTEGRITY_KEY, WOMPI_EVENTOS_SECRET
  - Agregar placeholders: `pub_test_xxx`, `prv_test_xxx`, `int_test_xxx`, `evt_test_xxx`
- [x] 1.2 Agregar variables Wompi a `Back/src/config/env.js`
  - Leer las 4 variables de process.env
  - Agregar a `productionRequiredEnvs` para validar en producción (condicional como Stripe)
- [x] 1.3 Actualizar `Back/src/models/order.model.js`
  - Agregar campo opcional `wompiTransactionId: { type: String }`
  - Agregar campo opcional `wompiStatus: { type: String }`
  - Extender enum `paymentMethod` con `'wompi'`
  - Agregar índice `{ wompiTransactionId: 1 }`
- [x] 1.4 Actualizar `Back/src/models/payment.model.js`
  - Extender enum `method` con `'wompi'`

## Phase 2: Backend Core — Wompi Service

- [x] 2.1 Crear `Back/src/utils/wompi.js` con funciones compartidas
  - `generateIntegritySignature(reference, amountInCents, currency, integrityKey)` — SHA256 hex digest de `reference + amountInCents + currency + integrityKey`
  - `verifyEventSignature(eventBody, signature, eventSecret)` — concatena valores del evento (en orden de aparición) + timestamp + event_secret, SHA256 hex, compara con header `X-Eventos-Signature` en uppercase
  - Usar `crypto.createHash('sha256')`, NO HMAC
- [x] 2.2 Crear `Back/src/services/wompi.service.js`
  - `createTransaction(order, amountInCents)` — llama a POST `https://sandbox.wompi.co/v1/transactions` con `{ amount_in_cents, reference, currency: 'COP', payment_source: { type: 'CARD' }, redirect_url }`, usa `WOMPI_PRIVATE_KEY` en Authorization Bearer
  - `getTransaction(transactionId)` — llama a GET `/v1/transactions/{id}`
  - Inicialización condicional: advertir si `WOMPI_PRIVATE_KEY` no está configurada (como Stripe en payments.service.js)
  - Usar `axios` o `node-fetch` para HTTP calls

## Phase 3: Backend — Webhook Handler

- [x] 3.1 Crear `Back/src/webhooks/wompi.js`
  - Router Express independiente (mismo patrón que `webhooks/stripe.js`)
  - Endpoint POST / con `express.raw({ type: 'application/json' })` para preservar body crudo
  - Verificar firma SHA256 usando `verifyEventSignature()` de Phase 2.1
  - Si header `X-Eventos-Signature` falta o firma inválida → responder 401
  - Procesar evento `transaction.updated`:
    - Buscar Order por `reference` (extraer orderId del reference string)
    - APPROVED → `order.status = 'paid'`, crear Payment record con `{ method: 'wompi', status: 'succeeded', paymentIntentId: wompiTransactionId }`
    - DECLINED/VOIDED/ERROR → loguear, responder 200 sin cambios (opcional: Payment record con status 'failed')
  - Implementar idempotencia: verificar `wompiTransactionId` duplicado antes de crear Payment. Si ya existe Payment con ese ID, responder 200 sin procesar.
  - Responder siempre `{ received: true }` con HTTP 200 si se procesó correctamente
  - Si `WOMPI_PRIVATE_KEY` no está configurado, responder 500 como stripe.js
- [x] 3.2 Modificar `Back/src/app.js`
  - Importar webhook: `const wompiWebhooks = require('./webhooks/wompi');`
  - Montar ANTES de `express.json()` (línea 47, junto a stripe): `app.use('/api/webhooks/wompi', express.raw({ type: 'application/json' }), wompiWebhooks);`
  - Nota: stripe.js ya incluye `express.raw()` internamente, pero el diseño pide raw explícito en app.js (como stripe). Decidir si va raw en app.js o en el router. Stripe lo tiene en el router.

## Phase 4: Backend — Transaction API

- [x] 4.1 Agregar `createWompiTransaction` a `Back/src/controllers/payments.controllers.js`
  - Recibe `{ orderId }` del body
  - Valida con express-validator: `orderId` requerido, debe ser ObjectId válido
  - Verifica que la orden existe y `order.user.toString() === req.user._id.toString()` (patrón existente en payments.service.js)
  - Verifica `order.status === 'pending'`
  - Calcula `amount_in_cents = Math.round(order.total * 100)`
  - Genera `reference = SONTERRY-${orderId}-${Date.now()}`
  - Guarda `wompiTransactionId` en la orden
  - Si `wompiService` no está disponible (no configurado), lanza error 500
  - Retorna `{ reference, amountInCents, currency: 'COP', integritySignature, publicKey }`
- [x] 4.2 Agregar ruta en `Back/src/routes/payments.routes.js`
  - `router.post('/wompi/transaction', protect, paymentsControllers.createWompiTransaction);`

## Phase 5: Frontend — Wompi Widget Integration

- [x] 5.1 Crear `Front/src/services/wompi.service.js`
  - `createWompiTransaction(orderId)` → POST `/api/payments/wompi/transaction` con `{ orderId }`, retorna `data.data`
- [x] 5.2 Modificar `Front/src/pages/Checkout/components/PaymentForm.jsx`
  - Reemplazar opción "Tarjeta (Crédito/Débito)" (div con `onClick={() => setPaymentMethod('tarjeta')}`) con "Pagar con Wompi"
  - Al seleccionar Wompi, NO mostrar los inputs de tarjeta stub (los de demostración)
  - Modificar `handlePayment` para `paymentMethod === 'wompi'`:
    1. Crear orden via `POST /orders` con `paymentMethod: 'wompi'`
    2. Llamar `createWompiTransaction(order._id)` para obtener datos de transacción
    3. Cargar dinámicamente script `https://checkout.wompi.co/widget.js` (solo si no está ya cargado)
    4. Abrir Widget con `new Wompi.Widget({ ... }).open()` configurado con: `publicKey`, `currency: 'COP'`, `amountInCents`, `reference`, `signature: { integrity }`, `redirectUrl: `${CLIENT_URL}/checkout/callback``, `customerEmail` (del usuario autenticado)
  - Mantener "Transferencia Bancaria" y "Depósito en Efectivo" sin cambios
  - Fallback: si script no carga en 5s (timeout), mostrar enlace directo al Checkout Web de Wompi (redirect URL)
  - Manejar error: si backend retorna error, mostrar toast con mensaje de error
- [x] 5.3 Crear `Front/src/pages/Checkout/CheckoutCallback.jsx`
  - Ruta: `/checkout/callback`
  - Leer query params: `ref`, `transaction_id`, `status` via `useSearchParams()` de react-router-dom
  - APPROVED → mostrar "¡Pago exitoso!" con referencia, monto, y link a detalle de orden
  - DECLINED → mostrar "El pago no pudo ser procesado" con botón "Volver al checkout" que navega a `/checkout`
  - Otro status → mensaje genérico "Estado de pago desconocido"
  - Consultar estado al backend (`GET /api/orders/...`) para confirmar y mostrar datos actualizados
  - Todos los mensajes en español
  - Usar lazy loading para la página
- [x] 5.4 Agregar ruta en `Front/src/router/index.jsx`
  - Lazy import: `const CheckoutCallback = lazy(() => import('../pages/Checkout/CheckoutCallback'));`
  - Ruta: `{ path: '/checkout/callback', element: <CheckoutCallback /> }`

## Phase 6: Testing (Opcional — Manual con Sandbox)

- [ ] 6.1 Verificar que las variables de entorno se cargan correctamente y el app inicia
- [ ] 6.2 Probar creación manual de transacción Wompi vía API REST (curl/POST /v1/transactions con token de prueba)
- [ ] 6.3 Probar webhook con curl: enviar evento simulado a POST /api/webhooks/wompi con firma válida
- [ ] 6.4 Probar flujo completo en Sandbox: checkout → Widget → pago con tarjeta de prueba 4242 → callback → orden paid
- [ ] 6.5 Verificar que métodos offline (transferencia, depósito) siguen funcionando sin regresión
