const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const zodValidate = require('../middlewares/zodValidate.middleware');
const { createOrderSchema, updateOrderStatusSchema, updateOrderItemsSchema, updateOrderShippingSchema } = require('../validators/order.validators');

router.post('/', protect, zodValidate(createOrderSchema), ordersControllers.createOrder);
router.post('/manual', protect, restrictTo('admin'), ordersControllers.createManualOrder);
router.get('/', protect, ordersControllers.getUserOrders);
router.get('/:id', protect, ordersControllers.getOrderById);
router.get('/all', protect, restrictTo('admin'), ordersControllers.getAllOrders);
router.get('/product/:productId', protect, restrictTo('admin'), ordersControllers.getOrdersByProduct);
router.patch('/:id/status', protect, restrictTo('admin'), zodValidate(updateOrderStatusSchema), ordersControllers.updateOrderStatus);
router.patch('/:id/dispatch', protect, restrictTo('admin'), ordersControllers.updateOrderDispatch);
router.patch('/:id/cancel', protect, ordersControllers.cancelOrder);
router.put('/:id/items', protect, zodValidate(updateOrderItemsSchema), ordersControllers.updateOrderItems);
router.put('/:id/shipping', protect, zodValidate(updateOrderShippingSchema), ordersControllers.updateOrderShipping);

module.exports = router;
