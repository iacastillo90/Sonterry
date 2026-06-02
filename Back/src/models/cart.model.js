const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    customization: {
      type: { type: String, enum: ['serigrafia', 'dtf'] },
      details: { type: String, maxlength: 500 },
    },
  }],
}, { timestamps: true });

cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model('Cart', cartSchema);
