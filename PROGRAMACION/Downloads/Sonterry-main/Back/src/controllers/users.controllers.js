const usersService = require('../services/users.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await usersService.getAllUsers(req.query);
  res.status(200).json(formatResponse(true, 'Usuarios listados', users));
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const user = await usersService.updateUserStatus(id, isActive);
  res.status(200).json(formatResponse(true, 'Estado de usuario actualizado', user));
});

const updateUserAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUserDataAdmin(id, req.body);
  res.status(200).json(formatResponse(true, 'Usuario actualizado', user));
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.status(200).json(formatResponse(true, 'Usuario eliminado', null));
});

module.exports = { getAllUsers, updateUserStatus, updateUserAdmin, deleteUser };
