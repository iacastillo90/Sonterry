const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const env = require('../config/env');
const logger = require('../logs/logger');
const { handlePaymentSucceeded, handlePaymentFailed } = require('../services/payments.service');

let stripe = null;
if (env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(env.STRIPE_SECRET_KEY);
}

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    logger.warn('Stripe no configurado. Webhook ignorado.');
    return res.status(500).json({ received: false, error: 'Stripe no configurado' });
  }

  const sig = req.headers['stripe-signature'];

  if (!sig) {
    logger.warn('Stripe webhook recibido sin firma.');
    return res.status(400).json({ received: false, error: 'Firma requerida' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Stripe webhook: firma inválida - ${err.message}`);
    return res.status(400).json({ received: false, error: 'Firma inválida' });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    default:
      logger.info(`Stripe webhook: evento no manejado - ${event.type}`);
  }

  res.status(200).json({ received: true });
});

module.exports = router;
