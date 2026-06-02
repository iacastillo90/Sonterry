const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: [true, 'El nombre del banco es requerido'],
    trim: true
  },
  accountNumber: {
    type: String,
    required: [true, 'El número de cuenta es requerido'],
    trim: true
  },
  accountType: {
    type: String,
    required: [true, 'El tipo de cuenta es requerido (ej: Ahorros, Corriente)'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'El nombre del titular es requerido'],
    trim: true
  },
  ownerDocument: {
    type: String,
    required: [true, 'El documento del titular (CC/NIT) es requerido'],
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  supportedMethods: {
    type: String,
    enum: ['transferencia', 'deposito', 'ambas'],
    required: [true, 'Debe especificar si la cuenta soporta transferencia, depósito o ambas'],
    default: 'ambas'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', bankAccountSchema);
