const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviews.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const zodValidate = require('../middlewares/zodValidate.middleware');
const { addReviewSchema } = require('../validators/review.validators');

// Rutas Públicas / Cliente
router.get('/me', protect, reviewsControllers.getUserReviews);
router.get('/:productId', reviewsControllers.getProductReviews);
router.post('/', protect, zodValidate(addReviewSchema), reviewsControllers.addReview);
// Wait, update schema doesn't need productId, but let's reuse addReviewSchema or create one inline. Let's not use zod for simple put here, or just use protect.
router.put('/:id', protect, reviewsControllers.updateReview);
router.delete('/:id', protect, reviewsControllers.deleteReview);

// Rutas Admin
router.get('/', protect, restrictTo('admin'), reviewsControllers.getAllReviewsAdmin);
router.patch('/:id/approve', protect, restrictTo('admin'), reviewsControllers.updateReviewStatusAdmin);
router.delete('/admin/:id', protect, restrictTo('admin'), reviewsControllers.deleteReviewAdmin);

module.exports = router;
