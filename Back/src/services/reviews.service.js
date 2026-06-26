const Review = require('../models/review.model');
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');
const notificationsService = require('./notifications.service');
const logger = require('../logs/logger');

const addReview = async (userId, productId, rating, comment) => {
  let review;
  try {
    review = await Review.create({ user: userId, product: productId, rating, comment });
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('Ya has reseñado este producto anteriormente', 400);
    }
    throw error;
  }

  const result = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);

  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(productId, { ratings: avgRating });

  return review;
};

const getProductReviews = async (productId) => {
  return await Review.find({ product: productId, isApproved: true }).populate('user', 'name').sort({ createdAt: -1 });
};

const getUserReviews = async (userId) => {
  return await Review.find({ user: userId }).populate('product', 'name slug images').sort({ createdAt: -1 });
};

const updateReview = async (reviewId, userId, rating, comment) => {
  const review = await Review.findOneAndUpdate(
    { _id: reviewId, user: userId },
    { rating, comment, isApproved: false }, // resets approval
    { new: true }
  );
  if (!review) throw new AppError('Reseña no encontrada o no autorizada', 404);
  
  // Recalculate average (in case it was approved before)
  const result = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);
  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(review.product, { ratings: avgRating });

  return review;
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) throw new AppError('Reseña no encontrada o no autorizada', 404);

  // Recalculate average
  const result = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);
  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(review.product, { ratings: avgRating });

  return review;
};

// --- ADMIN METHODS ---
const getAllReviewsAdmin = async () => {
  return await Review.find().populate('user', 'name email').populate('product', 'name images').sort({ createdAt: -1 });
};

const updateReviewStatusAdmin = async (reviewId, isApproved) => {
  const review = await Review.findByIdAndUpdate(reviewId, { isApproved }, { new: true });
  if (!review) throw new AppError('Reseña no encontrada', 404);

  // Recalculate average
  const result = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);
  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(review.product, { ratings: avgRating });

  if (isApproved) {
    notificationsService.createNotification({
      user: review.user,
      targetRole: 'client',
      title: 'Reseña Aprobada',
      message: '¡Tu reseña ha sido aprobada y ahora es pública!',
      link: '/profile',
    }).catch(err => logger.error(`[Notifications] Failed to create in-app notification: ${err.message}`));
  }

  return review;
};

const deleteReviewAdmin = async (reviewId) => {
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) throw new AppError('Reseña no encontrada', 404);

  // Recalculate average
  const result = await Review.aggregate([
    { $match: { product: review.product, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);
  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(review.product, { ratings: avgRating });

  return review;
};

module.exports = { addReview, getProductReviews, getUserReviews, updateReview, deleteReview, getAllReviewsAdmin, updateReviewStatusAdmin, deleteReviewAdmin };
