const { body } = require('express-validator');

const createProductRules = [
  body('name')
    .trim().notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 200 }).withMessage('Máximo 200 caracteres'),
  body('description')
    .trim().notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 5000 }).withMessage('Máximo 5000 caracteres'),
  body('price')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
  body('category')
    .isMongoId().withMessage('La categoría debe ser un ID válido'),
  body('type')
    .optional()
    .isIn(['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado']).withMessage('Tipo inválido'),
  body('images')
    .optional()
    .isArray().withMessage('images debe ser un array')
    .custom((arr) => arr.every(url => /^https?:\/\/.+/.test(url)))
    .withMessage('Cada imagen debe ser una URL válida (http/https)'),
];

const updateProductRules = [
  body('name').optional().trim().isLength({ max: 200 }).withMessage('Máximo 200 caracteres'),
  body('description').optional().trim().isLength({ max: 5000 }).withMessage('Máximo 5000 caracteres'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock inválido'),
  body('type').optional().isIn(['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado']).withMessage('Tipo inválido'),
  body('images')
    .optional()
    .isArray().withMessage('images debe ser un array')
    .custom((arr) => arr.every(url => /^https?:\/\/.+/.test(url)))
    .withMessage('Cada imagen debe ser una URL válida'),
];

module.exports = { createProductRules, updateProductRules };
