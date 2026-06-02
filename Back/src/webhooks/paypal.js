const express = require('express');
const router = express.Router();
const logger = require('../logs/logger');

router.post('/', (req, res) => {
  logger.info('PayPal Webhook event received.');
  res.status(200).json({ received: true });
});

module.exports = router;
