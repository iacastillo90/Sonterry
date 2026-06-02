const Review = require('../models/review.model');
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');

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
    { $match: { product: review.product } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
  ]);

  const avgRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  await Product.findByIdAndUpdate(productId, { ratings: avgRating });

  return review;
};

const getProductReviews = async (productId) => {
  return await Review.find({ product: productId }).populate('user', 'name').sort({ createdAt: -1 });
};

const getUserReviews = async (userId) => {
  return await Review.find({ user: userId }).populate('product', 'name slug images').sort({ createdAt: -1 });
};

module.exports = { addReview, getProductReviews, getUserReviews };
