const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviews.controllers');
const { protect } = require('../middlewares/auth.middleware');
const zodValidate = require('../middlewares/zodValidate.middleware');
const { addReviewSchema } = require('../validators/review.validators');

router.get('/me', protect, reviewsControllers.getUserReviews);
router.get('/:productId', reviewsControllers.getProductReviews);
router.post('/', protect, zodValidate(addReviewSchema), reviewsControllers.addReview);

module.exports = router;
