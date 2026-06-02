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

module.exports = { getAllUsers, updateUserStatus };
