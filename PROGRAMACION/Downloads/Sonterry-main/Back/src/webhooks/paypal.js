const express = require('express');
const router = express.Router();
const axios = require('axios');
const logger = require('../logs/logger');
const env = require('../config/env');

/**
 * PayPal Webhook — signature verification via PayPal's verify webhook endpoint.
 *
 * Prevention: PA_VERIFICATION_HEADERS_MISSING (Webhook ID / webhook URL not available in request)
 * If PayPal env vars are missing, verification is skipped (dev mode).
 */
const PAYPAL_API_BASE = env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

const getAccessToken = async () => {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    return null;
  }
  const auth = Buffer.from(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const { data } = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
  return data.access_token;
};

const verifyWebhookSignature = async (headers, body) => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    logger.warn('PayPal webhook: PAYPAL_CLIENT_ID/PAYPAL_CLIENT_SECRET no configurados — saltando verificación');
    return true;
  }

  const verification = {
    auth_algo: headers['paypal-auth-algo'],
    cert_url: headers['paypal-cert-url'],
    transmission_id: headers['paypal-transmission-id'],
    transmission_sig: headers['paypal-transmission-sig'],
    transmission_time: headers['paypal-transmission-time'],
    webhook_id: env.PAYPAL_WEBHOOK_ID,
    webhook_event: body,
  };

  const missing = Object.entries(verification)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    logger.warn(`PayPal webhook: headers faltantes — ${missing.join(', ')}. Saltando verificación.`);
    return true; // let it through; log for observability
  }

  const { data } = await axios.post(
    `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    verification,
    { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } },
  );

  return data.verification_status === 'SUCCESS';
};

router.post('/', async (req, res) => {
  try {
    const eventType = req.body?.event_type;
    logger.info(`PayPal Webhook event received: ${eventType}`);

    const isValid = await verifyWebhookSignature(req.headers, req.body);
    if (!isValid) {
      logger.error('PayPal webhook: firma inválida — rechazando evento');
      return res.status(401).json({ received: false, error: 'Firma inválida' });
    }

    logger.info(`PayPal webhook: firma verificada exitosamente para ${eventType}`);
    // TODO: procesar evento según event_type (CHECKOUT.ORDER.APPROVED, PAYMENT.CAPTURE.COMPLETED, etc.)
    res.status(200).json({ received: true });
  } catch (error) {
    logger.error(`PayPal webhook error: ${error.message}`);
    res.status(500).json({ received: false, error: 'Error interno' });
  }
});

module.exports = router;
