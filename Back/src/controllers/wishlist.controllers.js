const wishlistService = require('../services/wishlist.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.user._id);
  res.status(200).json(formatResponse(true, 'Wishlist obtenida', wishlist));
});

const toggleWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const wishlist = await wishlistService.toggleWishlist(req.user._id, productId);
  res.status(200).json(formatResponse(true, 'Wishlist actualizada', wishlist));
});

module.exports = { getWishlist, toggleWishlist };
