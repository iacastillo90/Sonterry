const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If null, it's a global admin notification
  targetRole: { type: String, enum: ['client', 'admin'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String }, // e.g. '/profile?tab=tickets' or '/admin'
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

notificationSchema.index({ user: 1, targetRole: 1, isRead: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
