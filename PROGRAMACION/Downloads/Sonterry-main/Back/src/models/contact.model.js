const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true, default: '' },
  subject: {
    type: String,
    required: true,
    enum: ['pedido', 'contacto', 'queja', 'duda', 'consulta'],
  },
  message: { type: String, required: true, minlength: 20 },
  status: {
    type: String,
    enum: ['pending', 'read', 'replied'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
