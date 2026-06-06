# Orders / Cancelación Specification

## Purpose

Define el comportamiento esperado para la cancelación de órdenes por parte del usuario: endpoint público, restauración de stock, restricciones de estado, y UI en perfil y checkout.

## Requirements

### Requirement: Endpoint público PATCH /orders/:id/cancel

El sistema MUST exponer un endpoint `PATCH /api/orders/:id/cancel` que permita al usuario dueño de la orden cancelarla.

#### Scenario: Cancelar orden pending exitosamente

- GIVEN un usuario autenticado con una orden en estado `pending`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST verificar que la orden pertenezca al usuario
- AND MUST cambiar el status de la orden a `cancelled`
- AND MUST restaurar el stock de cada producto en la orden (`$inc: { stock: +item.quantity }`)
- AND MUST responder con `{ success: true, message: "Orden cancelada exitosamente", data: { order } }`
- AND `order.trackingHistory` MUST contener un entry con status `cancelled`
- AND SHOULD enviar notificación al usuario (WhatsApp/email)

#### Scenario: Cancelar orden paid (no despachada)

- GIVEN un usuario autenticado con una orden en estado `paid`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST verificar que la orden NO tenga `shippingDetails.trackingNumber`
- AND MUST permitir la cancelación
- AND MUST restaurar el stock
- AND MUST cambiar status a `cancelled`

#### Scenario: Cancelar orden shipped (rechazado)

- GIVEN un usuario autenticado con una orden en estado `shipped`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST responder con error 400
- AND MUST indicar que la orden ya fue despachada y no se puede cancelar

#### Scenario: Cancelar orden de otro usuario (rechazado)

- GIVEN un usuario autenticado
- WHEN envía `PATCH /api/orders/:id/cancel` donde `:id` es una orden de OTRO usuario
- THEN el sistema MUST responder con error 404 (no revelar existencia de la orden)
- AND NO MUST modificar la orden ni el stock

#### Scenario: Cancelar orden ya cancelada (rechazado)

- GIVEN un usuario autenticado con una orden en estado `cancelled`
- WHEN envía `PATCH /api/orders/:id/cancel`
- THEN el sistema MUST responder con error 400
- AND MUST indicar que la orden ya fue cancelada

### Requirement: Restauración de stock al cancelar

Cuando una orden se cancela, el sistema MUST restaurar el stock de cada producto usando `$inc: { stock: +item.quantity }`.

#### Scenario: Restaurar stock de orden con 3 items

- GIVEN un producto A con stock 5, producto B con stock 3
- AND una orden cancelada con items: { product: A, quantity: 2 }, { product: B, quantity: 1 }
- WHEN la orden se cancela exitosamente
- THEN producto A MUST tener stock = 7
- AND producto B MUST tener stock = 4

#### Scenario: Doble cancelación no restaura stock dos veces

- GIVEN una orden cancelada exitosamente (stock ya restaurado)
- WHEN se intenta cancelar la misma orden nuevamente
- THEN el sistema MUST rechazar con error 400
- AND el stock NO MUST incrementarse nuevamente

### Requirement: Botón cancelar en OrderHistory (perfil)

El componente `OrderHistory.jsx` MUST mostrar un botón "Cancelar pedido" para órdenes en estado `pending` o `paid` (no despachadas).

#### Scenario: Mostrar botón para orden pending

- GIVEN un usuario con una orden en estado `pending` en su historial
- WHEN el componente OrderHistory se renderiza
- THEN MUST mostrar un botón "Cancelar pedido" con estilo rojo/danger
- AND el botón NO MUST mostrarse para órdenes `shipped`, `delivered`, `cancelled`

#### Scenario: Confirmación modal antes de cancelar

- GIVEN un usuario hace clic en "Cancelar pedido"
- THEN MUST aparecer un modal de confirmación
- AND el modal MUST decir "¿Estás seguro de cancelar este pedido? Esta acción no se puede deshacer."
- AND MUST tener botones "Sí, cancelar" (danger) y "No, mantener" (secondary)
- AND MUST tener un loading state mientras se procesa

#### Scenario: Cancelación exitosa desde el modal

- GIVEN el modal de confirmación abierto
- WHEN el usuario hace clic en "Sí, cancelar"
- AND la API responde exitosamente
- THEN MUST cerrar el modal
- AND MUST mostrar un toast de éxito
- AND el status de la orden en la UI MUST actualizarse a `cancelled`
- AND el botón "Cancelar pedido" MUST desaparecer

#### Scenario: Error al cancelar desde el modal

- GIVEN el modal de confirmación abierto
- WHEN el usuario hace clic en "Sí, cancelar"
- AND la API responde con error
- THEN MUST mostrar un toast con el mensaje de error
- AND MUST mantener el modal abierto (o cerrarlo y mostrar el error)
- AND el estado de la orden NO MUST cambiar

### Requirement: Botón cancelar en CheckoutCallback

El componente `CheckoutCallback.jsx` MUST mostrar un botón para cancelar la orden cuando el pago quedó en estado "pendiente" (no APPROVED ni DECLINED).

#### Scenario: Mostrar botón cancelar cuando pago está en proceso

- GIVEN un usuario en la página de callback con status `pending` (en proceso)
- WHEN el componente se renderiza
- THEN MUST mostrar un botón "Cancelar pedido"
- AND MUST estar debajo del mensaje "Tu pago está siendo procesado"

#### Scenario: No mostrar botón si pago fue exitoso

- GIVEN un usuario en la página de callback con status `APPROVED`
- WHEN el componente se renderiza
- THEN NO MUST mostrar el botón de cancelar
- AND MUST mostrar solo el mensaje de éxito

#### Scenario: Cancelar desde callback navega al perfil

- GIVEN el modal de confirmación en CheckoutCallback
- WHEN el usuario confirma la cancelación
- AND la API responde exitosamente
- THEN MUST navegar a `/profile?tab=pedidos`
- AND MUST mostrar toast de éxito
