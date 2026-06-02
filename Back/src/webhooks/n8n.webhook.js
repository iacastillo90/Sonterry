const express = require('express');
const router = express.Router();
const env = require('../config/env');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const validateWebhookSecret = (req, res, next) => {
  const secret = req.headers['x-webhook-secret'];
  if (!secret || secret !== env.N8N_API_KEY) {
    return res.status(401).json(formatResponse(false, 'No autorizado. Secreto de webhook inválido.'));
  }
  next();
};

router.post('/dispatch-callback', validateWebhookSecret, catchAsync(async (req, res) => {
  const { orderId, deliveryConfirmed } = req.body;

  if (!orderId) {
    return res.status(400).json(formatResponse(false, 'orderId es requerido.'));
  }

  if (deliveryConfirmed) {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'delivered' }, { new: true });
    if (!order) {
      return res.status(404).json(formatResponse(false, 'Pedido no encontrado.'));
    }
    return res.status(200).json(formatResponse(true, 'Pedido marcado como entregado por n8n', order));
  }

  res.status(200).json(formatResponse(true, 'Callback recibido sin cambios.'));
}));

module.exports = router;
