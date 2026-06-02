const paymentsService = require('../services/payments.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const result = await paymentsService.createPaymentIntent(orderId);
  res.status(200).json(formatResponse(true, 'Intención de pago creada', result));
});

module.exports = { createPayment };
