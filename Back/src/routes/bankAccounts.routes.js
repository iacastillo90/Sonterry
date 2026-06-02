const express = require('express');
const router = express.Router();
const bankAccountsControllers = require('../controllers/bankAccounts.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

// Public or User routes
router.get('/', bankAccountsControllers.getBankAccountsPublic);

// Admin routes
router.use(protect, restrictTo('admin'));
router.get('/all', bankAccountsControllers.getBankAccountsAdmin);
router.post('/', bankAccountsControllers.createBankAccount);
router.put('/:id', bankAccountsControllers.updateBankAccount);
router.delete('/:id', bankAccountsControllers.deleteBankAccount);

module.exports = router;
