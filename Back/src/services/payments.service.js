const Stripe = require('stripe');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const AppError = require('../errors/AppError');
const env = require('../config/env');
const logger = require('../logs/logger');

let stripe = null;
if (env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(env.STRIPE_SECRET_KEY);
} else {
  logger.warn('STRIPE_SECRET_KEY no configurado. Pagos Stripe deshabilitados.');
}

const createPaymentIntent = async (orderId) => {
  if (!stripe) throw new AppError('Stripe no está configurado', 500);

  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Pedido no encontrado', 404);
  if (order.status !== 'pending') throw new AppError('El pedido ya no está pendiente', 400);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100),
    currency: 'cop',
    metadata: { orderId: order._id.toString() },
  });

  await Payment.create({
    order: orderId,
    amount: order.total,
    method: 'stripe',
    status: 'pending',
    paymentIntentId: paymentIntent.id,
  });

  return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id };
};

const handlePaymentSucceeded = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) {
    logger.warn('Stripe webhook: payment intent sin orderId en metadata');
    return;
  }

  const order = await Order.findById(orderId);
  if (!order) {
    logger.warn(`Stripe webhook: orden ${orderId} no encontrada`);
    return;
  }

  order.status = 'paid';
  await order.save();

  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: 'succeeded' },
  );

  logger.info(`Pago confirmado para orden ${orderId}: $${order.total}`);
};

const handlePaymentFailed = async (paymentIntent) => {
  const orderId = paymentIntent.metadata.orderId;
  if (!orderId) return;

  await Payment.findOneAndUpdate(
    { paymentIntentId: paymentIntent.id },
    { status: 'failed' },
  );

  logger.warn(`Pago fallido para orden ${orderId}`);
};

module.exports = { createPaymentIntent, handlePaymentSucceeded, handlePaymentFailed };
