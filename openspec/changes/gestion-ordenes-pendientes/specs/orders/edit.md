# Delta for Orders / Editar orden

## ADDED Requirements

### Requirement: Endpoint PUT /orders/:id/items

El sistema MUST exponer un endpoint `PUT /api/orders/:id/items` que permita al usuario dueño de la orden modificar los items (productos, cantidades) de una orden pendiente.

#### Scenario: Editar items exitosamente

- GIVEN un usuario autenticado con una orden en estado `pending` con 2 items
- WHEN envía `PUT /api/orders/:id/items` con `{ items: [{ product: "<id1>", quantity: 3 }, { product: "<id2>", quantity: 1 }] }`
- THEN el sistema MUST verificar que la orden pertenezca al usuario
- AND MUST verificar que `order.status === 'pending'`
- AND MUST re-validar stock disponible para CADA producto en la nueva lista
- AND MUST recalcular `subtotal`, `shipping` y `discount`
- AND MUST actualizar `order.items` con los nuevos valores
- AND MUST responder con `{ success: true, data: { order } }`

#### Scenario: Rechazar edición si orden no está pending

- GIVEN un usuario autenticado con una orden en estado `paid`
- WHEN envía `PUT /api/orders/:id/items`
- THEN el sistema MUST responder con error 400
- AND MUST indicar: "La orden ya no está pendiente"

#### Scenario: Rechazar edición si orden no pertenece al usuario

- GIVEN una orden que pertenece a OTRO usuario
- WHEN envía `PUT /api/orders/:id/items`
- THEN el sistema MUST responder con error 404

#### Scenario: Stock insuficiente al editar

- GIVEN un producto con stock = 2
- AND una orden pending con `[{ product: "<id>", quantity: 1 }]`
- WHEN se envía `PUT /api/orders/:id/items` con `{ items: [{ product: "<id>", quantity: 5 }] }`
- THEN el sistema MUST responder con error 409
- AND MUST incluir en el error: `{ field: "items", detail: [{ product: "<id>", name: "...", available: 2, requested: 5 }] }`
- AND NO MUST modificar los items ni el total de la orden

#### Scenario: Concurrencia — orden cambió a paid entre lectura y escritura

- GIVEN un usuario abre el modal de edición (ve la orden pending)
- WHEN el usuario guarda los cambios
- AND entre que abrió el modal y guardó, una transacción Wompi cambió la orden a `paid`
- THEN el endpoint `PUT /api/orders/:id/items` MUST usar una operación atómica con filtro `{ status: 'pending' }`
- AND si no encuentra la orden (porque ya no está pending), MUST responder con error 409
- AND MUST indicar: "La orden ya no está pendiente. No se pueden editar los items."
- AND la orden NO MUST modificarse

#### Scenario: Editar items invalida referencias Wompi previas

- GIVEN una orden pending con una transacción Wompi `active: true` en `wompiReferences`
- WHEN se editan los items exitosamente
- THEN el sistema MUST marcar TODAS las `wompiReferences[].active = false`
- AND el usuario MUST pagar con una nueva transacción (no puede reusar la anterior)
- AND el webhook de Wompi MUST ignorar la transacción anterior (porque ya no es `active: true`)

#### Scenario: Editar items con producto eliminado

- GIVEN una orden pending con un item cuyo producto fue eliminado del catálogo
- WHEN se envía `PUT /api/orders/:id/items` sin ese producto (usuario lo quitó)
- THEN el sistema MUST permitir la edición (solo se elimina el item, no hay stock que validar para productos removidos)
- AND MUST recalcular el total sin ese producto

### Requirement: Endpoint PUT /orders/:id/shipping

El sistema MUST exponer un endpoint `PUT /api/orders/:id/shipping` que permita al usuario dueño de la orden modificar la dirección de envío de una orden pendiente.

#### Scenario: Editar shipping exitosamente

- GIVEN un usuario autenticado con una orden en estado `pending`
- WHEN envía `PUT /api/orders/:id/shipping` con `{ shippingAddress: { name: "...", phone: "...", address: "...", city: "...", state: "..." } }`
- THEN el sistema MUST verificar que la orden pertenezca al usuario
- AND MUST verificar que `order.status === 'pending'`
- AND MUST actualizar `order.shippingAddress` con los nuevos valores
- AND NO MUST invalidar referencias Wompi previas (shipping no afecta el monto)
- AND NO MUST recalcular el total
- AND MUST responder con `{ success: true, data: { order } }`

#### Scenario: Rechazar edición de shipping si orden no está pending

- GIVEN un usuario autenticado con una orden en estado `shipped`
- WHEN envía `PUT /api/orders/:id/shipping`
- THEN el sistema MUST responder con error 400
- AND MUST indicar: "La orden ya no está pendiente"

### Requirement: Modal de edición de items en OrderHistory

El componente `OrderHistory.jsx` MUST mostrar un botón "Editar items" para órdenes en estado `pending`, que abre un modal con la lista actual de items.

#### Scenario: Mostrar botón Editar items

- GIVEN un usuario con una orden en estado `pending`
- WHEN el componente OrderHistory se renderiza
- THEN MUST mostrar un botón "Editar items" (estilo secondary/outline)
- AND el botón NO MUST mostrarse para órdenes `paid`, `shipped`, `delivered`, `cancelled`

#### Scenario: Modal de edición con items actuales

- GIVEN el usuario hace clic en "Editar items"
- THEN MUST abrir un modal con:
  - AND lista de items actuales con nombre, cantidad (input numérico), precio unitario y subtotal
  - AND botón de eliminar por item
  - AND botón "Agregar producto" que abre selector de productos
  - AND total calculado de la orden
  - AND botón "Guardar cambios" y "Cancelar"

#### Scenario: Guardar cambios exitosamente

- GIVEN el modal de edición abierto con items modificados (cantidades cambiadas, productos agregados/eliminados)
- WHEN el usuario hace clic en "Guardar cambios"
- AND `PUT /api/orders/:id/items` responde exitosamente
- THEN MUST cerrar el modal
- AND MUST mostrar toast de éxito "Items actualizados"
- AND la orden en la UI MUST reflejar los nuevos items y el nuevo total

#### Scenario: Error al guardar cambios

- GIVEN el modal de edición abierto
- WHEN el usuario hace clic en "Guardar cambios"
- AND `PUT /api/orders/:id/items` responde con error de stock insuficiente
- THEN MUST mostrar el detalle del error (qué productos no tienen stock suficiente)
- AND MUST mantener el modal abierto para que el usuario corrija
- AND los items NO MUST modificarse

#### Scenario: Orden ya no está pendiente al guardar

- GIVEN el modal de edición abierto
- WHEN el usuario hace clic en "Guardar cambios"
- AND `PUT /api/orders/:id/items` responde con error 409 "orden ya no está pendiente"
- THEN MUST cerrar el modal
- AND MUST mostrar toast de error: "La orden ya no está pendiente. Los items no se modificaron."
- AND MUST refrescar el estado de la orden en la UI

### Requirement: Modal de edición de shipping en OrderHistory

El componente `OrderHistory.jsx` MUST mostrar un botón "Editar dirección" para órdenes en estado `pending`, que abre un modal inline con el formulario de dirección.

#### Scenario: Editar dirección exitosamente

- GIVEN un usuario con una orden pending
- WHEN hace clic en "Editar dirección", modifica los campos y guarda
- AND `PUT /api/orders/:id/shipping` responde exitosamente
- THEN MUST cerrar el modal
- AND MUST mostrar toast de éxito "Dirección actualizada"
- AND la dirección en la UI MUST reflejar los nuevos valores

#### Scenario: Error al guardar dirección

- GIVEN el modal de edición de dirección abierto
- WHEN el usuario guarda y la API responde con error
- THEN MUST mostrar toast con el mensaje de error
- AND MUST mantener el modal abierto
