const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviews.controllers');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { addReviewRules } = require('../validators/review.validators');

router.get('/me', protect, reviewsControllers.getUserReviews);
router.get('/:productId', reviewsControllers.getProductReviews);
router.post('/', protect, addReviewRules, validate, reviewsControllers.addReview);

module.exports = router;
