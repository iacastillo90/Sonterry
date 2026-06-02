const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const { sendPasswordReset } = require('./email.service');

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });
};

const register = async (userData) => {
  let user;
  try {
    user = await User.create(userData);
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('El correo electrónico ya está registrado', 400);
    }
    throw error;
  }
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  return { token, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }
  if (!user.isActive) {
    throw new AppError('Tu cuenta está desactivada', 403);
  }
  const token = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  return { token, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const refreshAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      throw new AppError('Token inválido o usuario inactivo', 401);
    }
    const newAccessToken = signToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Refresh token inválido o expirado', 401);
  }
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  sendPasswordReset(email, resetURL);

  return { message: 'Si el correo está registrado, recibirás un enlace de recuperación.' };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+password');

  if (!user) throw new AppError('Token inválido o expirado', 400);

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const accessToken = signToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  return { token: accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login, signToken, signRefreshToken, refreshAccessToken, forgotPassword, resetPassword };
