const mongoose = require('mongoose');

const MAX_TRACKING_ENTRIES = 50;

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    customization: {
      type: { type: String, enum: ['serigrafia', 'dtf'] },
      details: { type: String, maxlength: 1000 },
    },
  }],
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentIntentId: { type: String },
  paymentMethod: {
    type: String,
    enum: ['tarjeta', 'efectivo', 'transferencia', 'deposito'],
    default: 'tarjeta',
  },
  shippingDetails: {
    company: { type: String, enum: ['Servientrega', 'Inter Rapidísimo', 'Coordinadora', 'Envía', 'TCC', 'Mensajería Local', 'Otro'] },
    trackingNumber: String,
    dispatchDate: Date,
    estimatedDeliveryDate: Date,
    notes: String,
  },
  trackingHistory: [{
    status: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comment: { type: String, maxlength: 500 },
  }],
}, { timestamps: true });

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentIntentId: 1 });

orderSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('status')) {
    this.trackingHistory.push({
      status: this.status,
      date: new Date(),
      comment: this.isNew ? 'Pedido creado' : `Estado del pedido actualizado a ${this.status}`,
    });
    if (this.trackingHistory.length > MAX_TRACKING_ENTRIES) {
      this.trackingHistory = this.trackingHistory.slice(-MAX_TRACKING_ENTRIES);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
