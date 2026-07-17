const mongoose = require('mongoose');

const MAX_WISHLIST_PRODUCTS = 100;

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    validate: {
      validator: function (v) {
        return v.length <= MAX_WISHLIST_PRODUCTS;
      },
      message: `Wishlist cannot contain more than ${MAX_WISHLIST_PRODUCTS} products`,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
