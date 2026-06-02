const authService = require('../services/auth.service');
const usersService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(formatResponse(true, 'Usuario registrado con éxito', result));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(formatResponse(true, 'Sesión iniciada con éxito', result));
});

const getProfile = catchAsync(async (req, res) => {
  const user = await usersService.getUserById(req.user.id);
  res.status(200).json(formatResponse(true, 'Datos del perfil', { user }));
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return res.status(400).json(formatResponse(false, 'Refresh token requerido'));
  }
  const result = await authService.refreshAccessToken(token);
  res.status(200).json(formatResponse(true, 'Token renovado con éxito', result));
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
  res.status(200).json(formatResponse(true, 'Contraseña restablecida con éxito', result));
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await usersService.updateUserProfile(req.user.id, req.body);
  res.status(200).json(formatResponse(true, 'Perfil actualizado con éxito', { user }));
});

module.exports = { register, login, getProfile, refreshToken, forgotPassword, resetPassword, updateProfile };
