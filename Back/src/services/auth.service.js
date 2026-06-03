const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const { sendPasswordReset } = require('./email.service');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const generateRefreshToken = (id) => {
  const jti = crypto.randomBytes(32).toString('hex');
  const token = jwt.sign({ id, jti }, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN });
  return { token, jti };
};

const hashToken = (value) => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: 'strict',
  path: '/api/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches REFRESH_TOKEN_EXPIRES_IN)
});

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
  const { token: refreshToken, jti } = generateRefreshToken(user._id);
  user.refreshTokenHash = hashToken(jti);
  await user.save();
  return {
    token,
    refreshToken,
    refreshJti: jti,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');
  if (!user) {
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  // Check account lockout
  if (user.lockUntil && user.lockUntil > Date.now()) {
    const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / 60000);
    throw new AppError(`Cuenta bloqueada. Intenta de nuevo en ${remainingMinutes} minutos.`, 429);
  }

  if (!user.isActive) {
    throw new AppError('Tu cuenta está desactivada', 403);
  }

  if (!(await user.comparePassword(password))) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
      user.loginAttempts = 0;
    }
    await user.save();
    throw new AppError('Correo o contraseña incorrectos', 401);
  }

  // Successful login — reset lockout
  user.loginAttempts = 0;
  user.lockUntil = null;
  const token = signToken(user._id);
  const { token: refreshToken, jti } = generateRefreshToken(user._id);
  user.refreshTokenHash = hashToken(jti);
  await user.save();

  return {
    token,
    refreshToken,
    refreshJti: jti,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const refreshAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-password +refreshTokenHash');
    if (!user || !user.isActive) {
      throw new AppError('Token inválido o usuario inactivo', 401);
    }

    // Refresh token rotation — verify jti hash
    const tokenHash = hashToken(decoded.jti);
    if (user.refreshTokenHash && tokenHash !== user.refreshTokenHash) {
      // Token reuse detected! Invalidate ALL sessions for this user
      user.refreshTokenHash = undefined;
      await user.save();
      throw new AppError('Token reutilizado. Sesión revocada por seguridad.', 401);
    }

    // Rotate: issue new tokens, update stored hash
    const newAccessToken = signToken(user._id);
    const { token: newRefreshToken, jti: newJti } = generateRefreshToken(user._id);
    user.refreshTokenHash = hashToken(newJti);
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken, refreshJti: newJti };
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 401) throw error;
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw new AppError('Refresh token inválido o expirado', 401);
    }
    throw error;
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
  const { token: refreshToken, jti } = generateRefreshToken(user._id);
  user.refreshTokenHash = hashToken(jti);
  await user.save();

  return { token: accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login, signToken, refreshAccessToken, forgotPassword, resetPassword, getCookieOptions };
