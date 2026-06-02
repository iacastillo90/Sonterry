const { body } = require('express-validator');

const addReviewRules = [
  body('productId')
    .isMongoId().withMessage('ID de producto inválido'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser entre 1 y 5'),
  body('comment')
    .trim().notEmpty().withMessage('El comentario es requerido')
    .isLength({ max: 2000 }).withMessage('Máximo 2000 caracteres'),
];

module.exports = { addReviewRules };
