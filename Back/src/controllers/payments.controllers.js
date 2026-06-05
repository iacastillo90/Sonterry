const paymentsService = require('../services/payments.service');
const wompiService = require('../services/wompi.service');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../errors/AppError');
const formatResponse = require('../utils/formatResponse');

const createPayment = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const result = await paymentsService.createPaymentIntent(orderId, req.user._id);
  res.status(200).json(formatResponse(true, 'Intención de pago creada', result));
});

const confirmWompiPayment = catchAsync(async (req, res) => {
  const { reference, transactionId } = req.body;

  if (!reference || !transactionId) {
    throw new AppError('reference y transactionId son requeridos', 400);
  }

  // Verify transaction with Wompi API
  const wompiResponse = await wompiService.getTransaction(transactionId);

  if (!wompiResponse?.data) {
    throw new AppError('No se pudo verificar la transacción', 502);
  }

  const transaction = wompiResponse.data;
  const orderId = reference.split('-')[1];

  // Find order by ID embedded in reference OR by wompiTransactionId
  const order = await Order.findOne({
    $or: [
      { _id: orderId },
      { wompiTransactionId: reference },
    ],
  });

  if (!order) {
    throw new AppError('Orden no encontrada', 404);
  }

  // Only update if still pending
  if (order.status !== 'pending') {
    return res.status(200).json(formatResponse(true, 'La orden ya fue procesada', {
      order,
      transactionStatus: transaction.status,
    }));
  }

  // Update order with Wompi transaction info
  if (!order.wompiTransactionId) {
    order.wompiTransactionId = reference;
  }
  order.wompiStatus = transaction.status;

  if (transaction.status === 'APPROVED') {
    order.status = 'paid';
    order.paidAt = new Date();

    await Payment.create({
      order: order._id,
      amount: order.total,
      method: 'wompi',
      status: 'succeeded',
      paymentIntentId: transaction.id || transactionId,
    });
  } else {
    await Payment.create({
      order: order._id,
      amount: order.total,
      method: 'wompi',
      status: 'failed',
      paymentIntentId: transaction.id || transactionId,
    });
  }

  await order.save();

  res.status(200).json(formatResponse(true, 'Pago verificado exitosamente', {
    order,
    transactionStatus: transaction.status,
  }));
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

module.exports = { createPayment, createWompiTransaction, confirmWompiPayment };
