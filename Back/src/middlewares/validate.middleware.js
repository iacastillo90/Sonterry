const { validationResult } = require('express-validator');
const AppError = require('../errors/AppError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(`Datos inválidos: ${messages}`, 400));
  }
  next();
};

module.exports = validate;
