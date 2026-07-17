const env = require('../config/env');
const logger = require('../logs/logger');
const formatResponse = require('../utils/formatResponse');

const handleCastErrorDB = (err) => {
  const message = `ID inválido: ${err.value}`;
  return { statusCode: 400, message };
};

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `El valor '${err.keyValue[field]}' para el campo '${field}' ya existe.`;
  return { statusCode: 409, message };
};

const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return { statusCode: 400, message: messages.join('. ') };
};

const handleJWTError = () => ({ statusCode: 401, message: 'Token inválido. Por favor inicia sesión de nuevo.' });

const handleJWTExpiredError = () => ({ statusCode: 401, message: 'Token expirado. Por favor inicia sesión de nuevo.' });

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  logger.error(`[${req.method}] ${req.originalUrl} - ${err.statusCode} - ${err.message} - Stack: ${err.stack}`);

  if (env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json(
      formatResponse(false, err.message, {
        stack: err.stack,
        error: err,
      }),
    );
  }

  let error = { ...err, message: err.message, name: err.name };

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (error.isOperational) {
    return res.status(error.statusCode).json(formatResponse(false, error.message));
  }

  return res.status(500).json(formatResponse(false, 'Error interno del servidor. Por favor intenta de nuevo más tarde.'));
};

module.exports = errorHandler;
