const reviewsService = require('../services/reviews.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getProductReviews = catchAsync(async (req, res) => {
  const reviews = await reviewsService.getProductReviews(req.params.productId);
  res.status(200).json(formatResponse(true, 'Opiniones obtenidas con éxito', reviews));
});

const addReview = catchAsync(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = await reviewsService.addReview(req.user._id, productId, rating, comment);
  res.status(201).json(formatResponse(true, 'Opinión agregada con éxito', review));
});

const getUserReviews = catchAsync(async (req, res) => {
  const reviews = await reviewsService.getUserReviews(req.user._id);
  res.status(200).json(formatResponse(true, 'Tus opiniones obtenidas con éxito', reviews));
});

module.exports = { getProductReviews, addReview, getUserReviews };
