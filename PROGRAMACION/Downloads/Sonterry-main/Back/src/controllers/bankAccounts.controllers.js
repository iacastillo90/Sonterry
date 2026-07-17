const bankAccountsService = require('../services/bankAccounts.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createBankAccount = catchAsync(async (req, res) => {
  const account = await bankAccountsService.createBankAccount(req.body);
  res.status(201).json(formatResponse(true, 'Cuenta bancaria creada', account));
});

const getBankAccountsAdmin = catchAsync(async (req, res) => {
  const accounts = await bankAccountsService.getBankAccounts(false);
  res.status(200).json(formatResponse(true, 'Cuentas bancarias', accounts));
});

const getBankAccountsPublic = catchAsync(async (req, res) => {
  const accounts = await bankAccountsService.getBankAccounts(true);
  res.status(200).json(formatResponse(true, 'Cuentas bancarias activas', accounts));
});

const updateBankAccount = catchAsync(async (req, res) => {
  const account = await bankAccountsService.updateBankAccount(req.params.id, req.body);
  res.status(200).json(formatResponse(true, 'Cuenta bancaria actualizada', account));
});

const deleteBankAccount = catchAsync(async (req, res) => {
  await bankAccountsService.deleteBankAccount(req.params.id);
  res.status(200).json(formatResponse(true, 'Cuenta bancaria eliminada'));
});

module.exports = {
  createBankAccount,
  getBankAccountsAdmin,
  getBankAccountsPublic,
  updateBankAccount,
  deleteBankAccount
};
