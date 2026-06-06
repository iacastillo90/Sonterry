# Delta for Orders / Cancelación (mejoras)

## MODIFIED Requirements

### Requirement: Cancelar orden invalida referencias Wompi

Cuando una orden se cancela, el sistema MUST marcar todas las `wompiReferences[].active = false` para evitar que el webhook de Wompi procese una transacción posterior.

*Reemplaza el comportamiento existente de cancelOrder.*

#### Scenario: Cancelar orden pending con referencias Wompi activas

- GIVEN un usuario autenticado con una orden en estado `pending`
- AND la orden tiene 2 entradas en `wompiReferences`, la última con `active: true`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST cambiar `order.status` a `cancelled`
- AND MUST restaurar el stock de cada producto
- AND MUST marcar TODAS las `wompiReferences[].active = false`
- AND MUST responder con `{ success: true, message: "Orden cancelada exitosamente" }`

#### Scenario: Cancelar orden paid con referencias Wompi

- GIVEN un usuario autenticado con una orden en estado `paid` (sin tracking)
- AND la orden tiene una referencia Wompi con `status: 'APPROVED'` y `active: true`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST permitir la cancelación
- AND MUST marcar `wompiReferences[].active = false`
- AND MUST restaurar stock

## ADDED Requirements

### Requirement: Webhook Wompi ignora transacciones de órdenes canceladas

El webhook de Wompi NO MUST procesar transacciones si `order.status === 'cancelled'`, eliminando la race condition entre cancelación del usuario y llegada del webhook.

#### Scenario: Webhook llega después de cancelar orden

- GIVEN una orden en estado `cancelled`
- AND con una referencia Wompi `active: false` en `wompiReferences`
- WHEN el webhook de Wompi recibe `transaction.finished` con `status: APPROVED` para esa referencia
- THEN el sistema MUST verificar `order.status`
- AND `order.status === 'cancelled'` → MUST ignorar el cambio de status
- AND MUST actualizar `wompiReferences[].status` a `APPROVED` (para tracking)
- AND NO MUST cambiar `order.status` a `paid`
- AND NO MUST descontar stock

#### Scenario: Webhook llega para transacción inactiva

- GIVEN una orden en estado `pending`
- AND con una referencia Wompi `active: false` en `wompiReferences` (invalidada por edición de items)
- WHEN el webhook de Wompi recibe `transaction.finished` para esa referencia
- THEN el sistema MUST verificar `wompiReferences[].active`
- AND MUST ignorar la transacción (no cambiar status de la orden, no descontar stock)
- AND MUST actualizar `wompiReferences[].status` para tracking histórico
