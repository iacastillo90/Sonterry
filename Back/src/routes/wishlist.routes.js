const express = require('express');
const router = express.Router();
const wishlistControllers = require('../controllers/wishlist.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/', wishlistControllers.getWishlist);
router.post('/', wishlistControllers.toggleWishlist);

module.exports = router;
