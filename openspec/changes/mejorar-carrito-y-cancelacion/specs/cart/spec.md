# Cart Specification

## Purpose

Define el comportamiento esperado del carrito de compras: sincronización con backend, manejo de cantidades, eliminación de items y limpieza.

## Requirements

### Requirement: Auto-refresh del carrito desde backend

Cuando el usuario está autenticado y navega a la página del carrito, el carrito MUST sincronizarse con el backend para reflejar el estado actual.

#### Scenario: Auto-refresh al montar el componente Cart

- GIVEN un usuario autenticado con items en su carrito de MongoDB
- WHEN navega a la página `/cart`
- THEN el componente Cart MUST llamar `fetchCart()` del store
- AND los items del frontend SHALL reemplazarse con los del backend
- AND el UI SHALL mostrar los items actualizados

#### Scenario: Usuario no autenticado no llama al backend

- GIVEN un usuario NO autenticado
- WHEN navega a `/cart`
- THEN NO MUST llamar al backend
- AND MUST usar solo los items de localStorage/Zustand

#### Scenario: Backend vacío pero localStorage con datos

- GIVEN un usuario autenticado con items en localStorage pero carrito vacío en MongoDB
- WHEN navega a `/cart`
- THEN el frontend SHOULD mantener los items locales (no reemplazar con vacío)
- AND SHOULD mostrar los items locales
- AND SHOULD intentar sincronizarlos al backend

### Requirement: Input numérico para cantidad

El usuario MAY ingresar la cantidad de un producto escribiendo directamente en un input numérico, además de usar los botones `-`/`+`.

#### Scenario: Usuario escribe cantidad en el input

- GIVEN un item en el carrito con quantity = 1
- WHEN el usuario escribe "5" en el input numérico
- THEN el item quantity MUST actualizarse a 5
- AND `updateItemQuantity` MUST llamarse con el nuevo valor
- AND NO MUST permitir valores menores a 1

#### Scenario: Usuario escribe cantidad mayor al stock disponible

- GIVEN un item en el carrito con stock = 10
- WHEN el usuario escribe "15" en el input
- THEN la cantidad MUST limitarse al stock disponible (10)
- AND el UI SHOULD mostrar un mensaje indicando el máximo disponible

### Requirement: Fix removeFromCart con backend

Cuando el usuario elimina un item del carrito que existe en MongoDB, MUST borrarse del backend también.

#### Scenario: Eliminar item sincronizado con backend

- GIVEN un item en el carrito que tiene `_id` (existe en MongoDB)
- WHEN el usuario hace clic en "Quitar"
- THEN `removeFromCart` MUST llamar `DELETE /cart/:itemId` en backend
- AND MUST eliminar el item del store local
- AND localStorage MUST actualizarse

#### Scenario: Eliminar item solo local

- GIVEN un item en el carrito SIN `_id` (nunca sincronizado)
- WHEN el usuario hace clic en "Quitar"
- THEN `removeFromCart` MUST eliminar el item del store local
- AND MUST actualizar localStorage
- AND NO MUST llamar al backend

### Requirement: Endpoint DELETE /cart (clearCart)

El backend MUST exponer un endpoint `DELETE /cart` para limpiar todos los items del carrito del usuario autenticado.

#### Scenario: Limpiar carrito con items

- GIVEN un usuario autenticado con 3 items en su carrito de MongoDB
- WHEN se llama `DELETE /api/cart`
- THEN el carrito en MongoDB MUST quedar con items vacío
- AND MUST responder con `{ success: true, data: { items: [] } }`

#### Scenario: Limpiar carrito vacío

- GIVEN un usuario autenticado con carrito vacío en MongoDB
- WHEN se llama `DELETE /api/cart`
- THEN MUST responder exitosamente (no debe fallar)
- AND MUST retornar `{ success: true, data: { items: [] } }`

### Requirement: syncCartToBackend optimizado (PaymentForm)

El `syncCartToBackend` en PaymentForm SHOULD usar el endpoint de clearCart en lugar de borrar items uno por uno.

#### Scenario: Sincronizar carrito antes de crear orden

- GIVEN un usuario con 3 items en Zustand y 2 items en MongoDB
- WHEN se ejecuta `syncCartToBackend`
- THEN MUST llamar `DELETE /api/cart` primero (en lugar de DELETE individual)
- AND MUST insertar los items de Zustand vía `POST /api/cart`
- AND MUST retornar el carrito sincronizado
