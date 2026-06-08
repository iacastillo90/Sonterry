# Design: Integrar Wompi como pasarela de pagos (Widget & Checkout Web)

## Technical Approach

Integrar Wompi usando su **Widget de Checkout** (modal iframe) en el frontend y la **API REST** en el backend. El flujo es: frontend crea orden → backend genera transacción Wompi con firma de integridad → frontend abre Widget con esos datos → usuario paga en modal seguro → Wompi notifica vía webhook con verificación SHA256 → backend actualiza orden/Payment.

Se sigue exactamente el patrón del webhook de Stripe existente: raw body antes de `express.json()`, verificación criptográfica, procesamiento de eventos, respuesta 200.

### Architecture Decisions

1. **Pattern for Wompi webhook**: Seguir el mismo patrón que `webhooks/stripe.js` — archivo dedicado `webhooks/wompi.js` que exporta un Express Router, montado en `app.js` ANTES de `express.json()` (línea 47), con `express.raw({ type: 'application/json' })`, verificación de firma SHA256 mediante el algoritmo de concatenación de Wompi Eventos, procesamiento de eventos `transaction.updated`, respuesta `200 { received: true }`.

2. **Widget loading strategy**: **Dynamic script loading** via un hook personalizado `useWompiWidget` que carga el script de checkout de Wompi (`https://checkout.wompi.co/widget.js`) solo cuando el usuario selecciona "Pagar con Wompi" y hace clic en el botón. Esto evita cargar el script en páginas que no lo necesitan y no contamina el bundle global.

3. **Callback after payment**: Nueva ruta `/checkout/callback` que captura los query params `?ref=...&transaction_id=...&status=...` que Wompi envía después del pago. Muestra mensaje de éxito/error en español y permite volver al checkout o ver detalle de orden. Se agrega como lazy-loaded page en `Front/src/router/index.jsx`.

4. **Order model changes**: **Mínimo impacto**. Agregar dos campos opcionales: `wompiTransactionId: { type: String }` y `wompiStatus: { type: String }`. Extender el enum de `paymentMethod` agregando `'wompi'`. Sin cambios a campos existentes. Sin migración — MongoDB tolera documentos sin estos campos.

5. **Payment method enum**: En `Order.paymentMethod.enum` agregar `'wompi'`. En `Payment.method.enum` agregar `'wompi'`. Ambos son additive changes que no rompen datos existentes.

6. **Signature verification function**: Crear `Back/src/utils/wompi.js` con dos funciones:
   - `generateIntegritySignature(reference, amountInCents, currency, integrityKey)` → SHA256 hex digest de la concatenación: `reference + amountInCents + currency + integrityKey`
   - `verifyEventSignature(eventBody, signature, eventSecret)` → SHA256 hex digest de la concatenación de todos los valores del objeto evento (en orden de aparición) + timestamp + event_secret, comparada con el header `X-Eventos-Signature`
   
   Separar en `utils/` porque lo usan tanto el servicio como el webhook.

7. **Integration with existing PaymentForm**: Reemplazar la opción "Tarjeta (Crédito/Débito)" (el div con `onClick={() => setPaymentMethod('tarjeta')}`) con "Pagar con Wompi". Mantener idénticas las opciones "Transferencia Bancaria" y "Depósito en Efectivo". Al seleccionar Wompi y hacer clic en "Confirmar y Crear Pedido", el flujo cambia a: crear orden → solicitar `POST /api/payments/wompi/transaction` → abrir Widget de Wompi con los datos retornados. El callback se maneja en la nueva página `/checkout/callback`.

### Data Flow

```
 FRONTEND                              BACKEND                           WOMPI
    |                                      |                                |
    |  1. POST /orders                     |                                |
    |  { shippingAddress, paymentMethod }  |                                |
    |─────────────────────────────────────>|                                |
    |  <── { _id, status: "pending" } ─────|                                |
    |                                      |                                |
    |  2. POST /api/payments/wompi/transaction                              |
    |  { orderId }                         |                                |
    |─────────────────────────────────────>|                                |
    |                                      |  3. POST /v1/transactions      |
    |                                      |  { amount_in_cents, reference, |
    |                                      |    currency: "COP",            |
    |                                      |    payment_source: {type:"CARD"},                            |
    |                                      |    redirect_url:               |
    |                                      |    ".../checkout/callback" }   |
    |                                      |───────────────────────────────>|
    |                                      |  <── { data: { id, ... } } ────|
    |  <── { reference, amount_in_cents,   |                                |
    |        integrity_signature,          |                                |
    |        public_key } ─────────────────|                                |
    |                                      |                                |
    |  4. Abre Wompi Widget con esos datos                                   |
    |  ┌─────────────────────────────────────────────────┐                   |
    |  │ Modal Wompi (iframe seguro)                     │                   |
    |  │ - Tarjeta / PSE / Nequi / Daviplata             │                   |
    |  │ - Efecty / Baloto                               │                   |
    |  └─────────────────────────────────────────────────┘                   |
    |                                      |                                |
    |  5. Usuario completa pago                                              |
    |                                      |                                |
    |  6. Wompi redirige a /checkout/callback                                |
    |  ←── ?ref=ORDER-xxx&transaction_id=txn_123&status=APPROVED ───────────|
    |                                      |                                |
    |  7. Wompi envía POST /api/webhooks/wompi                               |
    |  (transaction.updated)             |                                |
    |     (event loop, may arrive         |   <─────────────────────────────|
    |      before or after redirect)      |                                |
    |                                      |  8. Verifica SHA256 signature   |
    |                                      |  (X-Eventos-Signature header)   |
    |                                      |                                |
    |                                      |  9. Si APPROVED:                |
    |                                      |     Order.status = 'paid'      |
    |                                      |     Payment.create({           |
    |                                      |       method: 'wompi',         |
    |                                      |       status: 'succeeded'      |
    |                                      |     })                         |
    |                                      |                                |
    |  10. Callback consulta estado        |                                |
    |  GET /api/orders/:id                |                                |
    |─────────────────────────────────────>|                                |
    |  <── { status: "paid" } ─────────────|                                |
```

### File Changes

#### New Files

| File | Purpose |
|------|---------|
| `Back/src/services/wompi.service.js` | Llamadas a API Wompi (`createTransaction`, `getTransaction`) vía axios/undici. Inicializado condicionalmente si env vars presentes. |
| `Back/src/webhooks/wompi.js` | Express Router para `POST /api/webhooks/wompi`. Raw body, verificación SHA256, dispatch de eventos. |
| `Back/src/utils/wompi.js` | Funciones compartidas: `generateIntegritySignature()`, `verifyEventSignature()` |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | Página de retorno post-pago. Lee query params, muestra resultado en español. |
| `Front/src/hooks/useWompiWidget.js` | Hook para cargar dinámicamente el script `widget.js` y abrir el modal de Wompi. |

#### Modified Files

| File | Change |
|------|--------|
| `Back/src/app.js` | Agregar `const wompiWebhooks = require('./webhooks/wompi')` y `app.use('/api/webhooks/wompi', wompiWebhooks)` ANTES de `express.json()` (junto al webhook de Stripe). |
| `Back/src/controllers/payments.controllers.js` | Agregar `createWompiTransaction` controller: valida body con express-validator, llama a `wompiService.createTransaction(orderId, userId)`, retorna datos para el Widget. |
| `Back/src/routes/payments.routes.js` | Agregar `router.post('/wompi/transaction', protect, paymentsControllers.createWompiTransaction)`. |
| `Back/src/models/order.model.js` | Agregar campos: `wompiTransactionId: String`, `wompiStatus: String`. Extender `paymentMethod.enum` con `'wompi'`. Agregar índice `{ wompiTransactionId: 1 }`. |
| `Back/src/models/payment.model.js` | Agregar `'wompi'` al enum `method`. |
| `Back/src/config/env.js` | Agregar exports: `WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTOS_SECRET`, `WOMPI_INTEGRITY_KEY`. Agregar a `requiredEnvs` en producción (o validación condicional como Stripe). |
| `Back/.env.example` | Agregar 4 variables Wompi con valores placeholder comentados. |
| `Front/src/pages/Checkout/components/PaymentForm.jsx` | Reemplazar opción "Tarjeta" con "Pagar con Wompi". Cambiar `handlePayment` para que cuando `paymentMethod === 'wompi'` cree orden → solicite transacción → abra Widget. Mantener "Transferencia" y "Depósito" intactos. |
| `Front/src/router/index.jsx` | Agregar lazy import de `CheckoutCallback` y ruta `/checkout/callback`. |

### Interfaces / Contracts

#### POST /api/payments/wompi/transaction

**Request:**
```json
{
  "orderId": "string (Mongo ObjectId)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Transacción Wompi creada",
  "data": {
    "reference": "SONTERRY-{orderId}-{timestamp}",
    "amountInCents": 15000000,
    "currency": "COP",
    "integritySignature": "sha256 hex digest",
    "publicKey": "pub_test_xxx"
  }
}
```

**Errors:**
- `401` — No autenticado
- `403` — La orden no pertenece al usuario
- `404` — Orden no encontrada
- `400` — Orden no está pendiente

#### POST /api/webhooks/wompi

**Incoming event structure:**
```json
{
  "event": "transaction.updated",
  "data": {
    "transaction": {
      "id": "txn_abc123",
      "status": "APPROVED",
      "amount_in_cents": 15000000,
      "currency": "COP",
      "reference": "SONTERRY-{orderId}-{timestamp}",
      "payment_method_type": "CARD"
    }
  },
  "environment": "test",
  "timestamp": 1700000000,
  "signature": {
    "properties": ["event", "data.transaction.id", "data.transaction.status", "environment", "timestamp"],
    "checksum": "sha256 hex digest"
  }
}
```

**Headers:**
- `X-Eventos-Signature`: SHA256 hex digest

**Response (200):**
```json
{
  "received": true
}
```

#### Wompi Widget Configuration Object

```javascript
{
  reference: 'SONTERRY-{orderId}-{timestamp}',
  amountInCents: 15000000,
  currency: 'COP',
  publicKey: 'pub_test_xxx',
  signature: {
    integrity: 'sha256 hex digest'
  },
  redirectUrl: `${CLIENT_URL}/checkout/callback?ref=${reference}`,
  // Opcional: pre-seleccionar método
}
```

#### Integrity Signature Generation

```javascript
// SHA256( reference + amountInCents + currency + integrityKey )
function generateIntegritySignature(reference, amountInCents, currency, integrityKey) {
  const concat = reference + amountInCents.toString() + currency + integrityKey;
  return crypto.createHash('sha256').update(concat).digest('hex');
}
```

### Testing Strategy

| Layer | Strategy | Tool |
|-------|----------|------|
| **Wompi service** | Unit test con axios mocked (`jest.mock`) — verificar que `createTransaction` hace POST correcto, maneja errores HTTP, retorna datos formateados. | Jest |
| **Signature verification** | Unit test puro — probar `verifyEventSignature` con payload conocido y firma esperada. Probar casos: firma válida, inválida, missing header, timestamp expirado. | Jest |
| **Webhook handler** | Integration test con Supertest — enviar POST a `/api/webhooks/wompi` con mock event, verificar que procesa APPROVED y responde 200. Probar DECLINED, VOIDED, firma inválida. | Jest + Supertest |
| **Frontend Widget** | Manual con Sandbox — abrir Widget, pagar con tarjeta de prueba `4242...` (APPROVED), verificar redirect. | Manual |
| **Full flow** | Manual — flujo completo: checkout → crear orden → Widget → pago → callback → webhook → orden paid. | Manual + Wompi Sandbox |
| **Offline methods** | Smoke test — verificar que "Transferencia" y "Depósito" funcionan exactamente como antes, sin regresión. | Manual |

### Migration / Rollout

No se requiere migración de datos. Los campos `wompiTransactionId` y `wompiStatus` son opcionales en el esquema de Mongoose. La extensión de enums (`paymentMethod`, `method`) es additive — los documentos existentes con valores anteriores siguen siendo válidos.

**Rollout plan:**
1. Feature branch con todos los cambios
2. Pruebas en Sandbox de Wompi (frontend + backend)
3. Configurar URL de eventos en Dashboard de Wompi (Sandbox primero)
4. Una vez verificado, merge a `main`
5. Configurar URL de eventos de Producción en Dashboard de Wompi
6. Cambiar env vars a producción

### Resolved Questions

1. **Fallback Widget**: Si el Widget no carga (CDN caído), redirigir al Checkout Web de Wompi con los mismos parámetros (modalidad redirect). ✅
2. **Idempotencia webhook**: Implementar — verificar `wompiTransactionId` duplicado antes de crear Payment record. Si ya existe Payment para ese ID, responder 200 sin procesar. ✅
3. **Status `PENDING`**: Ignorar por ahora — solo implementar pagos online (tarjeta, PSE, Nequi, Daviplata). ✅
4. **Env vars**: 4 variables separadas en `.env` y `.env.example` con placeholders:
   - `WOMPI_PUBLIC_KEY` — pública, para frontend Widget
   - `WOMPI_PRIVATE_KEY` — privada, para API calls desde backend
   - `WOMPI_INTEGRITY_KEY` — integrity, para firma de transacciones Widget
   - `WOMPI_EVENTOS_SECRET` — eventos, para verificación de webhooks
   ✅
