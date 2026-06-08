# Wompi Payment Integration Specification

## Purpose

Integrar Wompi como pasarela de pagos en Sonterry usando el Widget de Wompi (Checkout Web), reemplazando el stub de tarjeta actual en PaymentForm. La solución debe soportar tarjetas, PSE, Nequi, Daviplata, Efecty y Baloto sin requerir certificación PCI DSS, manteniendo los métodos offline existentes (transferencia, depósito) intactos.

---

## Requirements

### WOMPI-FRONT-01 — Widget Integration

The PaymentForm MUST show a "Pagar con Wompi" button as the default payment option. Clicking it MUST open the Wompi Widget modal with the correct amount, reference, and integrity signature. The Widget SHALL be loaded dynamically without blocking page load.

#### Scenario: Happy path — Widget opens and user completes payment

- GIVEN the user is on the Checkout page with a pending order
- AND the user clicks "Pagar con Wompi"
- WHEN the frontend requests transaction data from `POST /api/payments/wompi/transaction`
- AND the backend returns `{ amount_in_cents, reference, integrity_signature, public_key }`
- AND the Wompi Widget opens with those parameters
- AND the user completes the payment inside the Widget modal
- THEN Wompi SHALL redirect to the callback URL with `ref`, `transaction_id`, and `status` query parameters

#### Scenario: Widget closed without completing payment

- GIVEN the Wompi Widget is open
- WHEN the user closes the Widget modal without completing the payment
- THEN the order SHALL remain in `pending` status
- AND no Payment record SHALL be created

#### Scenario: Wompi script CDN unavailable

- GIVEN the Wompi Widget script CDN fails to load
- WHEN the user clicks "Pagar con Wompi"
- THEN the system SHALL display a fallback link to the Wompi Checkout Web (redirect URL)
- AND the user MUST be able to complete the payment via the redirect flow

---

### WOMPI-FRONT-02 — Payment Callback

Wompi SHALL redirect to a callback URL after payment. The callback page MUST display the payment result to the user. All user-facing messages MUST be in Spanish.

#### Scenario: Successful payment callback

- GIVEN Wompi redirects to the callback URL with `status=APPROVED`
- WHEN the callback page renders
- THEN the page SHALL display a success message in Spanish: "Pago exitoso"
- AND it SHALL show the transaction reference and amount
- AND a link to the order detail page MUST be visible

#### Scenario: Failed payment callback

- GIVEN Wompi redirects to the callback URL with `status=DECLINED` or `status=ERROR`
- WHEN the callback page renders
- THEN the page SHALL display an error message in Spanish: "El pago no pudo ser procesado"
- AND it SHALL provide a button to return to the Checkout page to retry

---

### WOMPI-API-01 — Create Transaction Endpoint

The backend MUST expose `POST /api/payments/wompi/transaction`. This endpoint SHALL create a Wompi transaction via the Wompi API and return the transaction data needed by the frontend Widget. The endpoint SHALL require authentication and validate order ownership.

#### Scenario: Authenticated user creates a transaction for their own order

- GIVEN the user is authenticated via JWT
- AND the user has a pending order with a valid amount
- WHEN the user sends `POST /api/payments/wompi/transaction` with `{ orderId }`
- THEN the backend SHALL respond with HTTP 200
- AND the response body MUST contain `{ amount_in_cents, reference, integrity_signature, public_key }`
- AND the `integrity_signature` MUST be generated using the Wompi integrity key

#### Scenario: Unauthenticated request returns 401

- GIVEN the request has no valid JWT token
- WHEN the request is sent to `POST /api/payments/wompi/transaction`
- THEN the backend SHALL respond with HTTP 401
- AND no transaction SHALL be created

#### Scenario: Transaction requested for another user's order

- GIVEN the user is authenticated
- AND the `orderId` belongs to a different user
- WHEN the request is sent to `POST /api/payments/wompi/transaction`
- THEN the backend SHALL respond with HTTP 403
- AND the error message SHALL indicate the order does not belong to the user

---

### WOMPI-WEBHOOK-01 — Webhook Reception

The backend MUST expose `POST /api/webhooks/wompi` for Wompi event notifications. This endpoint MUST be mounted BEFORE `express.json()` middleware in `app.js` because the raw body is required for SHA256 signature verification.

#### Scenario: Wompi sends a transaction event

- GIVEN the Express app is configured
- WHEN a `POST /api/webhooks/wompi` request arrives from Wompi
- THEN the endpoint SHALL receive the raw request body (not parsed JSON)
- AND the endpoint SHALL attempt SHA256 signature verification before any processing

---

### WOMPI-WEBHOOK-02 — Signature Verification

Every incoming webhook MUST have its SHA256 signature verified using the Wompi concatenation algorithm: the concatenation of all property values (in the order they appear in the event object) + timestamp + event_secret → SHA256 hex digest. If verification fails, the webhook SHALL be rejected.

#### Scenario: Valid signature — webhook processed

- GIVEN an incoming webhook with a valid `X-Eventos-Signature` header
- WHEN the signature is verified using the SHA256 concatenation algorithm
- THEN the webhook SHALL be accepted
- AND the event data SHALL be processed

#### Scenario: Invalid signature — webhook rejected

- GIVEN an incoming webhook with an invalid or missing `X-Eventos-Signature` header
- WHEN the signature verification fails
- THEN the endpoint SHALL respond with HTTP 401
- AND the webhook payload SHALL NOT be processed

---

### WOMPI-WEBHOOK-03 — Payment Approved

On `transaction.updated` with `APPROVED` status, the Order MUST transition to `'paid'` and a Payment record MUST be created.

#### Scenario: Transaction approved updates order and creates payment

- GIVEN a valid webhook event with `type=transaction.updated` and `data.transaction.status=APPROVED`
- WHEN the webhook handler processes the event
- THEN the corresponding Order SHALL have its `status` changed to `'paid'`
- AND a Payment record SHALL be created with `method: 'wompi'` and `status: 'succeeded'`
- AND the handler SHALL respond with HTTP 200

---

### WOMPI-WEBHOOK-04 — Payment Declined or Voided

On `transaction.updated` with `DECLINED` or `VOIDED` status, the Order SHALL remain unchanged. A Payment record MAY be created with `status: 'failed'`.

#### Scenario: Transaction declined — order unchanged

- GIVEN a valid webhook event with `type=transaction.updated` and `data.transaction.status=DECLINED`
- WHEN the webhook handler processes the event
- THEN the Order SHALL retain its current status
- AND a Payment record MAY be created with `status: 'failed'`
- AND the handler SHALL respond with HTTP 200

#### Scenario: Transaction voided — order unchanged

- GIVEN a valid webhook event with `type=transaction.updated` and `data.transaction.status=VOIDED`
- WHEN the webhook handler processes the event
- THEN the Order SHALL retain its current status
- AND a Payment record MAY be created with `status: 'failed'`
- AND the handler SHALL respond with HTTP 200

---

### WOMPI-MODEL-01 — Order Model Extension

The Order model MUST add `wompiTransactionId` (String, optional) and `wompiStatus` (String, optional). The `paymentMethod` enum MUST be extended to include `'wompi'`. These changes MUST NOT break existing data.

#### Scenario: Existing orders remain valid after migration

- GIVEN existing Order documents in the database that have no `wompiTransactionId` or `wompiStatus` fields
- WHEN the application starts with the updated Order schema
- THEN all existing documents SHALL remain readable and valid
- AND queries on existing orders SHALL NOT throw validation errors

---

### WOMPI-MODEL-02 — Payment Model Extension

The Payment model MUST add `'wompi'` to the `method` enum.

#### Scenario: Wompi payment record created with valid enum

- GIVEN a Payment record is being created for a Wompi transaction
- WHEN the record is saved with `method: 'wompi'`
- THEN the record SHALL be persisted successfully
- AND the `method` field SHALL be `'wompi'`

---

### WOMPI-ENV-01 — Environment Variables

The backend MUST read `WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTOS_SECRET`, and `WOMPI_INTEGRITY_KEY` from environment variables. `.env.example` MUST include these with placeholder values. The app SHALL validate required Wompi env vars at startup.

#### Scenario: All Wompi env vars present — app starts normally

- GIVEN all four Wompi environment variables are set
- WHEN the application starts
- THEN the app SHALL initialize the Wompi service
- AND no startup error SHALL be thrown related to Wompi configuration

#### Scenario: Missing required Wompi env var — app fails with clear error

- GIVEN one or more Wompi environment variables are missing
- WHEN the application starts
- THEN the app SHALL log a descriptive error message indicating which variables are missing
- AND the app SHALL exit or prevent Wompi functionality from being used
