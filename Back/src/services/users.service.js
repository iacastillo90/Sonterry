const User = require('../models/user.model');
const AppError = require('../errors/AppError');

const getAllUsers = async (filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(),
  ]);

  return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const updateUserStatus = async (id, isActive) => {
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const updateUserProfile = async (id, profileData) => {
  const update = {};
  if (profileData.phone !== undefined) update.phone = profileData.phone;
  if (profileData.shippingAddress !== undefined) {
    update.shippingAddress = {
      address: profileData.shippingAddress.address || '',
      city: profileData.shippingAddress.city || '',
      zipCode: profileData.shippingAddress.zipCode || '',
    };
  }

  const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const updateUserDataAdmin = async (id, data) => {
  const update = {};
  if (data.name) update.name = data.name;
  if (data.email) update.email = data.email;
  
  const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-password');
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError('Usuario no encontrado', 404);
  return user;
};

module.exports = { getAllUsers, getUserById, updateUserStatus, updateUserProfile, updateUserDataAdmin, deleteUser };
