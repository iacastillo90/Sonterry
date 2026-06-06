const authService = require('../services/auth.service');
const usersService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');
const env = require('../config/env');

const setRefreshCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, authService.getCookieOptions());
};

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  setRefreshCookie(res, result.refreshToken);
  res.status(201).json(formatResponse(true, 'Usuario registrado con éxito', {
    token: result.token,
    user: result.user,
  }));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  setRefreshCookie(res, result.refreshToken);
  res.status(200).json(formatResponse(true, 'Sesión iniciada con éxito', {
    token: result.token,
    user: result.user,
  }));
});

const getProfile = catchAsync(async (req, res) => {
  const user = await usersService.getUserById(req.user.id);
  res.status(200).json(formatResponse(true, 'Datos del perfil', { user }));
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(400).json(formatResponse(false, 'Refresh token requerido'));
  }
  const result = await authService.refreshAccessToken(token);
  setRefreshCookie(res, result.refreshToken);
  res.status(200).json(formatResponse(true, 'Token renovado con éxito', {
    accessToken: result.accessToken,
  }));
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json(formatResponse(false, 'El correo es requerido'));
  const result = await authService.forgotPassword(email);
  res.status(200).json(formatResponse(true, result.message));
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json(formatResponse(false, 'La contraseña debe tener al menos 8 caracteres'));
  }
  const result = await authService.resetPassword(token, password);
  setRefreshCookie(res, result.refreshToken);
  res.status(200).json(formatResponse(true, 'Contraseña restablecida con éxito', {
    token: result.token,
    user: result.user,
  }));
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await usersService.updateUserProfile(req.user.id, req.body);
  res.status(200).json(formatResponse(true, 'Perfil actualizado con éxito', { user }));
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.user._id);
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'strict',
    path: '/api/auth',
  });
  res.status(200).json(formatResponse(true, 'Sesión cerrada con éxito'));
});

const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json(formatResponse(false, 'La contraseña actual y la nueva son requeridas'));
  }
  if (newPassword.length < 8) {
    return res.status(400).json(formatResponse(false, 'La nueva contraseña debe tener al menos 8 caracteres'));
  }
  await authService.changePassword(req.user._id, currentPassword, newPassword);
  res.status(200).json(formatResponse(true, 'Contraseña cambiada con éxito'));
});

module.exports = { register, login, getProfile, refreshToken, forgotPassword, resetPassword, updateProfile, logout, changePassword };
