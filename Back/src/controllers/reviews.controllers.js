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

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await reviewsService.updateReview(id, req.user._id, rating, comment);
  res.status(200).json(formatResponse(true, 'Opinión actualizada', review));
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  await reviewsService.deleteReview(id, req.user._id);
  res.status(200).json(formatResponse(true, 'Opinión eliminada', null));
});

// Admin Controllers
const getAllReviewsAdmin = catchAsync(async (req, res) => {
  const reviews = await reviewsService.getAllReviewsAdmin();
  res.status(200).json(formatResponse(true, 'Todas las opiniones', reviews));
});

const updateReviewStatusAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;
  const review = await reviewsService.updateReviewStatusAdmin(id, isApproved);
  res.status(200).json(formatResponse(true, 'Estado de la reseña actualizado', review));
});

const deleteReviewAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  await reviewsService.deleteReviewAdmin(id);
  res.status(200).json(formatResponse(true, 'Reseña eliminada por el administrador', null));
});

module.exports = { 
  getProductReviews, addReview, getUserReviews, updateReview, deleteReview, 
  getAllReviewsAdmin, updateReviewStatusAdmin, deleteReviewAdmin 
};
