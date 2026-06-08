# Proposal: Integrar Wompi como pasarela de pagos (Widget & Checkout Web)

## Intent

Reemplazar el stub de pago con tarjeta y agregar Wompi como pasarela de pagos real para Colombia,
soportando todos los medios de pago disponibles (tarjetas, PSE, Nequi, Daviplata, Efecty, Baloto)
sin necesidad de certificación PCI DSS.

## Scope

### In Scope
- Implementar Wompi Checkout Widget en el frontend (PaymentForm reemplaza stub de tarjeta)
- Crear endpoint backend para generar transacción Wompi con firma de integridad
- Crear webhook handler para evento `transaction.updated` con verificación SHA256
- Actualizar Order model: agregar `wompiTransactionId`, extender `paymentMethod` enum
- Actualizar Payment model: agregar `'wompi'` al enum de `method`
- Agregar variables de entorno Wompi (public_key, private_key, event_secret, webhook_secret)
- Agregar página de callback post-pago en frontend
- Mantener métodos offline existentes (transferencia/depósito) como alternativas

### Out of Scope
- Payment Links (para WhatsApp/Email) — futura iteración
- Integración con API de Wompi para tokenización de tarjetas (recurrencia)
- Migración de Stripe/PayPal existente (se mantienen)
- Cancelación/void de transacciones desde el panel de admin
- Refunds desde la aplicación (se harían desde dashboard de Wompi)

## Approach

Usar el **Widget de Wompi** con el siguiente flujo:

1. Frontend crea orden vía `POST /orders` → recibe `order._id`
2. Frontend solicita datos de transacción a `POST /api/payments/wompi/transaction`
3. Backend se comunica con API de Wompi para crear transacción, guarda referencia, retorna `{ amount_in_cents, reference, integrity_signature, public_key }`
4. Frontend abre el Widget de Wompi con esos datos
5. Usuario completa pago en el modal de Wompi (iframe seguro)
6. Wompi redirige a `redirectUrl` con `?ref=...&transaction_id=...&status=...`
7. Frontend callback captura parámetros, consulta estado al backend
8. Wompi envía `POST /api/webhooks/wompi` con evento `transaction.updated`
9. Backend verifica firma SHA256 (concatenación properties + timestamp + event_secret)
10. Si `APPROVED` → `order.status = 'paid'`, crea Payment record
11. Si `DECLINED`/`VOIDED`/`ERROR` → marca orden como fallida, notifica al usuario

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `Back/src/services/wompi.service.js` | **New** | Llamadas a API Wompi (create transaction, get transaction) |
| `Back/src/webhooks/wompi.js` | **New** | Router Express para webhook de Wompi con verificación SHA256 |
| `Back/src/controllers/payments.controllers.js` | **Modified** | +`createWompiTransaction` controller |
| `Back/src/routes/payments.routes.js` | **Modified** | +`POST /payments/wompi/transaction` |
| `Back/src/app.js` | **Modified** | Montar webhook de Wompi ANTES de express.json() |
| `Back/src/models/order.model.js` | **Modified** | +`wompiTransactionId`, +`wompiStatus`, extender `paymentMethod` enum |
| `Back/src/models/payment.model.js` | **Modified** | +`'wompi'` en enum `method` |
| `Back/src/config/env.js` | **Modified** | +`WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTOS_SECRET` |
| `Back/.env.example` | **Modified** | +Wompi env vars |
| `Front/src/pages/Checkout/components/PaymentForm.jsx` | **Modified** | Reemplazar stub tarjeta con Wompi Widget |
| `Front/src/services/wompi.service.js` | **New** | Helpers para interactuar con backend Wompi endpoints |
| `Front/src/pages/Checkout/CheckoutCallback.jsx` | **New** | Página de retorno post-pago (recibe ?ref=...) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Webhook no dispara en Sandbox Widget | High | Probar con API REST directamente (POST /v1/transactions con token de prueba) |
| Usuario cierra widget sin pagar | Medium | Polling de estado + timeout; sesión de pago expirable |
| Firma de integridad expuesta en frontend | Low | Es diseño de Wompi (pública); la firma se genera en backend con integrity_key |
| Widget script CDN caído | Low | Fallback: mostrar enlace a Checkout Web (redirect) |
| Transición de stub a Widget rompe flujo existente | Medium | Mantener métodos offline sin cambios; solo reemplazar opción "Tarjeta" |

## Rollback Plan

- **Frontend**: Revertir PaymentForm.jsx a la versión anterior (git revert del commit)
- **Backend**: Eliminar webhook de app.js, restaurar env vars, revertir modelos
- **Completo**: `git revert <commit-hash>` del merge del feature branch

## Dependencies

- Cuenta de Wompi activa (registro en comercios.wompi.co)
- API Keys: public_key, private_key, event_secret, integrity_key
- URL de eventos configurada en Dashboard de Wompi (una para Sandbox, otra para Producción)
- DNS/HTTPS: la URL de eventos debe ser HTTPS en producción

## Success Criteria

- [ ] Widget de Wompi se abre correctamente desde PaymentForm con monto y referencia correctos
- [ ] Usuario puede pagar con Nequi, PSE, tarjeta, Daviplata exitosamente
- [ ] Webhook recibe `transaction.updated` con status APPROVED
- [ ] Firma SHA256 del webhook se verifica correctamente
- [ ] Order.status cambia a 'paid' cuando el webhook confirma APPROVED
- [ ] Payment record se crea con method='wompi' y status='succeeded'
- [ ] Métodos offline (transferencia, depósito) siguen funcionando sin cambios
- [ ] Rollback: git revert del feature branch restaura todo el estado anterior
