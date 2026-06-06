const AppError = require('../errors/AppError');

const zodValidate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const messages = result.error.issues.map(i => i.message).join(', ');
    return next(new AppError(`Datos inválidos: ${messages}`, 400));
  }
  req.body = result.data;
  next();
};

module.exports = zodValidate;
