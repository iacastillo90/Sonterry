const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No estás autenticado. Por favor inicia sesión.', 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser || !currentUser.isActive) {
      return next(new AppError('El usuario perteneciente a este token ya no está activo.', 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado. Por favor renueva tu sesión.', 401));
    }
    return next(new AppError('Token inválido. Por favor inicia sesión de nuevo.', 401));
  }
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('No tienes permiso para realizar esta acción.', 403));
    }
    next();
  };
};

module.exports = { protect, restrictTo };
