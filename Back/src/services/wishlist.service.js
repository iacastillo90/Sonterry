const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist.model');
const AppError = require('../errors/AppError');

const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate('products');
  return wishlist;
};

const toggleWishlist = async (userId, productId) => {
  let wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const index = wishlist.products.findIndex(id => id.toString() === productId);
  if (index > -1) {
    wishlist.products.splice(index, 1);
  } else {
    if (wishlist.products.length >= 100) {
      throw new AppError('La lista de deseos no puede contener más de 100 productos', 400);
    }
    wishlist.products.push(new mongoose.Types.ObjectId(productId));
  }

  await wishlist.save();
  return await wishlist.populate('products');
};

module.exports = { getWishlist, toggleWishlist };
