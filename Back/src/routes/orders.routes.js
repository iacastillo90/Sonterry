const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createOrderRules, updateOrderStatusRules } = require('../validators/order.validators');

router.post('/', protect, createOrderRules, validate, ordersControllers.createOrder);
router.post('/manual', protect, restrictTo('admin'), ordersControllers.createManualOrder);
router.get('/', protect, ordersControllers.getUserOrders);
router.get('/all', protect, restrictTo('admin'), ordersControllers.getAllOrders);
router.get('/product/:productId', protect, restrictTo('admin'), ordersControllers.getOrdersByProduct);
router.patch('/:id/status', protect, restrictTo('admin'), updateOrderStatusRules, validate, ordersControllers.updateOrderStatus);
router.patch('/:id/dispatch', protect, restrictTo('admin'), ordersControllers.updateOrderDispatch);

module.exports = router;
