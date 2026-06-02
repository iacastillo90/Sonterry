const logger = require('../logs/logger');

const generateInvoicePDF = async (order) => {
  logger.info(`[PDF Generator] Invoice stub generated for order ${order._id}`);
  return Buffer.from('PDF_INVOICE_STUB');
};

module.exports = { generateInvoicePDF };
