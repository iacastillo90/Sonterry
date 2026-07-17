const express = require('express');
const router = express.Router();
const paymentsControllers = require('../controllers/payments.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.post('/create-payment-intent', protect, paymentsControllers.createPayment);
router.post('/wompi/transaction', protect, paymentsControllers.createWompiTransaction);
router.post('/wompi/confirm', protect, paymentsControllers.confirmWompiPayment);

module.exports = router;
