const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cart.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/', cartControllers.getCart);
router.post('/', cartControllers.addToCart);
router.delete('/:itemId', cartControllers.removeFromCart);
router.patch('/:itemId', cartControllers.updateCartItemQuantity);

module.exports = router;
