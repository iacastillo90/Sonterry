const BankAccount = require('../models/bankAccount.model');
const AppError = require('../errors/AppError');

const createBankAccount = async (data) => {
  return await BankAccount.create(data);
};

const getBankAccounts = async (onlyActive = false) => {
  const query = onlyActive ? { isActive: true } : {};
  return await BankAccount.find(query).sort({ createdAt: -1 });
};

const updateBankAccount = async (id, data) => {
  const account = await BankAccount.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!account) throw new AppError('Cuenta bancaria no encontrada', 404);
  return account;
};

const deleteBankAccount = async (id) => {
  const account = await BankAccount.findByIdAndDelete(id);
  if (!account) throw new AppError('Cuenta bancaria no encontrada', 404);
  return account;
};

module.exports = {
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount
};
