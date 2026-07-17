const crypto = require('crypto');

/**
 * Verifies a Wompi webhook event signature.
 *
 * Wompi concatenates values from signature.properties (in order) + timestamp + event_secret,
 * then SHA256 hashes the whole string. Compares with signature.checksum (uppercase).
 *
 * @param {Object} event - Full webhook event payload
 * @param {string} eventSecret - Wompi eventos secret
 * @returns {boolean}
 */
function verifyEventSignature(event, eventSecret) {
  const { signature, timestamp } = event;

  const dataString = signature.properties
    .map(prop => {
      return prop.split('.').reduce((obj, key) => {
        if (obj === null || obj === undefined) return '';
        return obj[key];
      }, event.data);
    })
    .filter(val => val !== null && val !== undefined)
    .join('');

  const toHash = dataString + String(timestamp) + eventSecret;

  const checksum = crypto
    .createHash('sha256')
    .update(toHash)
    .digest('hex')
    .toUpperCase();

  return checksum === signature.checksum.toUpperCase();
}

/**
 * Generates the integrity signature for the Wompi Widget frontend.
 * SHA256(reference + amountInCents + currency + integrityKey)
 *
 * @param {string} reference - Unique transaction reference
 * @param {number} amountInCents - Amount in cents
 * @param {string} currency - Currency code (e.g., 'COP')
 * @param {string} integrityKey - Wompi integrity key
 * @returns {string} SHA256 hex digest
 */
function generateIntegritySignature(reference, amountInCents, currency, integrityKey) {
  const toHash = `${reference}${amountInCents}${currency}${integrityKey}`;
  return crypto
    .createHash('sha256')
    .update(toHash)
    .digest('hex');
}

module.exports = { verifyEventSignature, generateIntegritySignature };
