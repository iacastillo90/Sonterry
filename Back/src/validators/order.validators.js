const { body } = require('express-validator');

const createOrderRules = [
  body('shippingAddress.address')
    .trim().notEmpty().withMessage('La dirección es requerida'),
  body('shippingAddress.city')
    .trim().notEmpty().withMessage('La ciudad es requerida'),
  body('shippingAddress.postalCode')
    .trim().notEmpty().withMessage('El código postal es requerido'),
  body('shippingAddress.country')
    .trim().notEmpty().withMessage('El país es requerido'),
  body('shippingAddress.phone')
    .trim().notEmpty().withMessage('El teléfono es requerido')
    .matches(/^[0-9+\s\-()]{7,20}$/).withMessage('Formato de teléfono inválido'),
];

const updateOrderStatusRules = [
  body('status')
    .isIn(['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Estado de pedido inválido. Valores permitidos: pending, paid, shipped, delivered, cancelled'),
];

module.exports = { createOrderRules, updateOrderStatusRules };
