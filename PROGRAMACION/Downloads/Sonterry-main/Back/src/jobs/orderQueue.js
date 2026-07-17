const logger = require('../logs/logger');

const addOrderJob = async (data) => {
  logger.info(`[Queue] Enqueued order post-processing job: ${data.orderId}`);
};

module.exports = { addOrderJob };
