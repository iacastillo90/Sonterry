const axios = require('axios');
const config = require('../config/env');
const AppError = require('../errors/AppError');
const logger = require('../logs/logger');
const { generateIntegritySignature } = require('../utils/wompi');

let wompiAvailable = false;

if (config.WOMPI_PRIVATE_KEY) {
  wompiAvailable = true;
} else {
  logger.warn('WOMPI_PRIVATE_KEY no configurado. Pagos Wompi deshabilitados.');
}

/**
 * Creates a Wompi transaction reference and generates integrity signature for the Widget.
 * Does NOT call the Wompi API — the Widget handles payment client-side.
 *
 * @param {Object} order - Mongoose order document
 * @param {number} amountInCents - Amount in cents (e.g., 15000000 for $150,000 COP)
 * @returns {Object} Transaction data for frontend Widget
 */
async function createTransaction(order, amountInCents) {
  if (!wompiAvailable) {
    throw new AppError('Wompi no está configurado', 500);
  }

  const reference = `SONTERRY-${order._id}-${Date.now()}`;
  const currency = 'COP';

  const integritySignature = generateIntegritySignature(
    reference,
    amountInCents,
    currency,
    config.WOMPI_INTEGRITY_KEY
  );

  order.wompiTransactionId = reference;
  await order.save();

  return {
    amount_in_cents: amountInCents,
    reference,
    currency,
    integrity_signature: integritySignature,
    public_key: config.WOMPI_PUBLIC_KEY,
  };
}

/**
 * Gets transaction status from Wompi API.
 *
 * @param {string} transactionId - Wompi transaction ID
 * @returns {Object} Transaction data from Wompi
 */
async function getTransaction(transactionId) {
  const response = await axios.get(
    `${config.WOMPI_API_URL}/v1/transactions/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${config.WOMPI_PRIVATE_KEY}`,
      },
    }
  );
  return response.data;
}

module.exports = {
  createTransaction,
  getTransaction,
};
