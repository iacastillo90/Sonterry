const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['stripe', 'paypal'], required: true },
  status: { type: String, enum: ['pending', 'succeeded', 'failed', 'refunded'], default: 'pending' },
  paymentIntentId: { type: String, select: false },
}, { timestamps: true });

paymentSchema.index({ order: 1 });
paymentSchema.index({ order: 1, status: 1 });
paymentSchema.index({ paymentIntentId: 1 }, { sparse: true });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
