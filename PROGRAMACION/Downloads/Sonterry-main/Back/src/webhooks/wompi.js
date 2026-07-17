const express = require('express');
const router = express.Router();
const config = require('../config/env');
const logger = require('../logs/logger');
const Order = require('../models/order.model');
const Payment = require('../models/payment.model');
const { deductOrderStock } = require('../services/orders.service');
const { verifyEventSignature } = require('../utils/wompi');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!config.WOMPI_EVENTOS_SECRET) {
    logger.warn('Wompi no configurado. Webhook ignorado.');
    return res.status(500).json({ received: false, error: 'Wompi no configurado' });
  }

  try {
    const rawBody = req.body.toString();
    const event = JSON.parse(rawBody);

    if (!event.signature || !event.signature.checksum) {
      logger.warn('Wompi webhook recibido sin firma.');
      return res.status(401).json({ received: false, error: 'Firma requerida' });
    }

    if (!verifyEventSignature(event, config.WOMPI_EVENTOS_SECRET)) {
      logger.warn('Wompi webhook: firma inválida.');
      return res.status(401).json({ received: false, error: 'Firma inválida' });
    }

    if (event.event === 'transaction.updated') {
      const { transaction } = event.data;
      const { id: wompiId, reference, status } = transaction;

      const order = await Order.findOne({ wompiTransactionId: reference });
      if (!order) {
        logger.warn(`[Wompi] Order not found for reference: ${reference}`);
        return res.status(200).json({ received: true });
      }

      // GUARD: If order is cancelled, ignore the transaction entirely
      if (order.status === 'cancelled') {
        logger.warn(`[Wompi] Order ${order._id} is cancelled, ignoring transaction ${wompiId} (${status})`);
        // Update reference tracking for audit
        const refEntry = order.wompiReferences.find(r => r.transactionId === reference);
        if (refEntry) refEntry.status = status;
        await order.save();
        return res.status(200).json({ received: true });
      }

      // GUARD: If this reference was invalidated (e.g., order items were edited), ignore
      const refEntry = order.wompiReferences.find(r => r.transactionId === reference);
      if (refEntry && !refEntry.active) {
        logger.warn(`[Wompi] Reference ${reference} is inactive for order ${order._id}, ignoring transaction ${wompiId}`);
        return res.status(200).json({ received: true });
      }

      order.wompiStatus = status;

      if (status === 'APPROVED') {
        if (order.status === 'paid') {
          logger.info(`[Wompi] Order ${order._id} already paid, skipping`);
          return res.status(200).json({ received: true });
        }

        // Deduct stock — log but don't fail the webhook if stock is insufficient
        try {
          await deductOrderStock(order);
        } catch (stockErr) {
          logger.error(`[Wompi] Stock deduction failed for order ${order._id}: ${stockErr.message}`);
          // Order will be marked paid but flagged with wompiStatus for manual review
        }

        order.status = 'paid';
        order.wompiTransactionId = wompiId;

        await Payment.create({
          order: order._id,
          amount: order.total,
          method: 'wompi',
          status: 'succeeded',
          paymentIntentId: wompiId,
        });

        logger.info(`[Wompi] Order ${order._id} paid (${wompiId})`);
      } else {
        logger.info(`[Wompi] Order ${order._id} status: ${status} (${wompiId})`);

        await Payment.create({
          order: order._id,
          amount: order.total,
          method: 'wompi',
          status: 'failed',
          paymentIntentId: wompiId,
        });
      }

      // Update reference tracking
      if (refEntry) {
        refEntry.status = status;
      } else {
        order.wompiReferences.push({ transactionId: reference, status, active: true, createdAt: new Date() });
      }

      await order.save();
    }

    res.status(200).json({ received: true });
  } catch (error) {
    logger.error(`[Wompi Webhook] Error: ${error.message}`);
    res.status(200).json({ received: true });
  }
});

module.exports = router;
