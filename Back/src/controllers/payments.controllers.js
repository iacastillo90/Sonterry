const paymentsService = require('../services/payments.service');
const wompiService = require('../services/wompi.service');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../errors/AppError');
const formatResponse = require('../utils/formatResponse');

const createPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const result = await paymentsService.createPaymentIntent(orderId, req.user._id);
  res.status(200).json(formatResponse(true, 'Intención de pago creada', result));
});

const createWompiTransaction = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    throw new AppError('El ID de la orden es requerido', 400);
  }

  const order = await Order.findOne({ _id: orderId, user: req.user._id });
  if (!order) {
    throw new AppError('Orden no encontrada', 404);
  }

  if (order.status !== 'pending') {
    throw new AppError('La orden ya fue procesada', 400);
  }

  const amountInCents = Math.round(order.total * 100);
  const transactionData = await wompiService.createTransaction(order, amountInCents);

  res.status(200).json(formatResponse(true, 'Transacción creada exitosamente', {
    reference: transactionData.reference,
    amountInCents: transactionData.amount_in_cents,
    currency: transactionData.currency,
    integritySignature: transactionData.integrity_signature,
    publicKey: transactionData.public_key,
  }));
});

module.exports = { createPayment, createWompiTransaction };
