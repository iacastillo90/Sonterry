# Delta for Payments / Retomar Pago

## ADDED Requirements

### Requirement: Botón "Pagar ahora" en OrderHistory

El componente `OrderHistory.jsx` MUST mostrar un botón "Pagar ahora" para órdenes en estado `pending` con `paymentMethod === 'wompi'`. El botón MUST permitir al usuario retomar el flujo de pago Wompi sin crear una nueva orden.

#### Scenario: Mostrar botón para orden pending con Wompi

- GIVEN un usuario autenticado con una orden en estado `pending` y `paymentMethod === 'wompi'` en su historial
- WHEN el componente OrderHistory se renderiza
- THEN MUST mostrar un botón "Pagar ahora" con estilo primary/accent
- AND el botón NO MUST mostrarse para órdenes con `paymentMethod !== 'wompi'`
- AND el botón NO MUST mostrarse para órdenes con `status !== 'pending'`

#### Scenario: Click en "Pagar ahora" inicia transacción Wompi

- GIVEN un usuario en OrderHistory con una orden Wompi pendiente
- WHEN hace clic en "Pagar ahora"
- THEN MUST mostrar un loading state en el botón
- AND MUST llamar a `POST /payments/wompi/transaction` con `{ orderId }` (no crea nueva orden)
- AND MUST abrir el widget de Wompi con la nueva transacción
- AND el callback de Wompi MUST redirigir a `/checkout/callback?ref=<orderId>&transaction_id=...&status=...`

#### Scenario: Error al iniciar transacción

- GIVEN un usuario hace clic en "Pagar ahora"
- WHEN `POST /payments/wompi/transaction` responde con error
- THEN MUST ocultar el loading state
- AND MUST mostrar un toast con el mensaje de error
- AND NO MUST abrir el widget de Wompi

### Requirement: POST /payments/wompi/transaction con orderId existente

El endpoint `POST /payments/wompi/transaction` MUST aceptar un `orderId` para crear una nueva transacción Wompi sobre una orden existente, sin crear una nueva orden.

#### Scenario: Crear transacción para orden existente pending

- GIVEN una orden en estado `pending` con `paymentMethod === 'wompi'` que pertenece al usuario autenticado
- WHEN se envía `POST /payments/wompi/transaction` con `{ orderId: "<existing_order_id>" }`
- THEN el sistema MUST verificar que `order.status === 'pending'`
- AND MUST crear una nueva transacción en Wompi con el monto actual de la orden
- AND MUST guardar la referencia en `order.wompiReferences[]` con `{ transactionId, status: 'pending', active: true }`
- AND MUST responder con `{ success: true, data: { transaction } }` incluyendo la URL del widget

#### Scenario: Rechazar si orden no está pending

- GIVEN una orden en estado `paid` (no pending)
- WHEN se envía `POST /payments/wompi/transaction` con `{ orderId: "<id>" }`
- THEN el sistema MUST responder con error 400
- AND MUST indicar que la orden no está pendiente

#### Scenario: Rechazar si orden no pertenece al usuario

- GIVEN una orden que pertenece a OTRO usuario
- WHEN se envía `POST /payments/wompi/transaction` con `{ orderId: "<id>" }`
- THEN el sistema MUST responder con error 404

#### Scenario: Múltiples transacciones en wompiReferences

- GIVEN una orden pending con una transacción Wompi previa (fallida)
- WHEN se envía `POST /payments/wompi/transaction` exitosamente
- THEN MUST agregar una NUEVA entrada en `wompiReferences[]`
- AND NO MUST sobrescribir ni eliminar la referencia anterior
- AND la referencia anterior MUST mantener `active: false`

### Requirement: CheckoutCallback maneja orden existente

El componente `CheckoutCallback.jsx` MUST detectar si el callback corresponde a una orden existente (vs una recién creada) y actualizarla en lugar de crear una nueva.

#### Scenario: Callback actualiza orden existente con pago APPROVED

- GIVEN una orden existente en estado `pending` con `wompiReferences` que contiene la transacción actual
- WHEN Wompi redirige a `/checkout/callback?ref=<orderId>&transaction_id=...&status=APPROVED`
- THEN `confirmWompiPayment` MUST actualizar la orden existente:
  - AND `order.status` MUST cambiar a `paid`
  - AND `order.wompiReferences[].status` de la transacción actual MUST ser `APPROVED`
  - AND MUST ejecutar `deductOrderStock` (flujo normal)
  - AND MUST mostrar mensaje de éxito al usuario

#### Scenario: Callback con pago DECLINED o pendiente

- GIVEN una orden existente en estado `pending`
- WHEN Wompi redirige a `/checkout/callback?ref=<orderId>&transaction_id=...&status=DECLINED`
- THEN `confirmWompiPayment` MUST actualizar `order.wompiReferences[].status` a `DECLINED`
- AND `order.status` MUST permanecer `pending`
- AND MUST mostrar mensaje: "El pago no fue aprobado. Puedes intentar nuevamente desde tu historial de pedidos."
- AND el usuario MUST poder retomar el pago desde OrderHistory

### Requirement: Modelo Order con wompiReferences

El modelo Order MUST reemplazar el campo `wompiTransactionId: String` por `wompiReferences: Array` para soportar múltiples intentos de pago.

#### Scenario: Migración backward-compatible

- GIVEN una orden existente con `wompiTransactionId` definido
- WHEN se ejecuta el script de migración
- THEN MUST copiar el valor a `wompiReferences[0]` con `{ transactionId, status: 'APPROVED', active: false }`
- AND el código MUST leer de `wompiReferences` o `wompiTransactionId` por un ciclo de compatibilidad

#### Scenario: Nueva orden sin wompiReferences

- GIVEN una orden nueva creada sin transacciones Wompi
- THEN `wompiReferences` MUST ser un array vacío por defecto

### Requirement: Protección contra concurrencia en webhook

El webhook de Wompi MUST ignorar transacciones si la orden ya no está en estado `pending`.

#### Scenario: Webhook recibe confirmación después de cancelar

- GIVEN una orden en estado `cancelled` con una transacción en `wompiReferences`
- WHEN el webhook de Wompi recibe `transaction.finished` para esa transacción
- THEN el sistema MUST verificar `order.status !== 'cancelled'`
- AND MUST ignorar el cambio de status (NO pasar a `paid`)
- AND MUST actualizar `wompiReferences[].status` con el resultado pero mantener `active: false`
- AND NO MUST descontar stock

#### Scenario: Webhook procesa transacción active correctamente

- GIVEN una orden en estado `pending` con una transacción `active: true` en `wompiReferences`
- WHEN el webhook de Wompi recibe `transaction.finished` con `status: APPROVED`
- THEN el sistema MUST verificar `order.status === 'pending'`
- AND MUST cambiar `order.status` a `paid`
- AND MUST ejecutar `deductOrderStock`
