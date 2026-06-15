const { Queue } = require('bullmq');
const env = require('../config/env');
const logger = require('../logs/logger');

const QUEUE_NAME = 'search-sync';

const isTLS = env.REDIS_HOST !== 'localhost' && env.REDIS_HOST !== 'redis';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
  ...(isTLS && { tls: {} }),
};

let searchSyncQueue = null;

const getQueue = () => {
  if (!searchSyncQueue) {
    searchSyncQueue = new Queue(QUEUE_NAME, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 50 },
      },
    });

    searchSyncQueue.on('error', (err) => {
      logger.error(`[SearchSyncQueue] BullMQ error: ${err.message}`);
    });
  }
  return searchSyncQueue;
};

/**
 * Enqueue a search-index sync job for a product.
 * @param {'index'|'remove'} action
 * @param {string} productId
 */
const addSearchSyncJob = async (action, productId) => {
  try {
    const queue = getQueue();
    await queue.add(action, { productId, action }, {
      jobId: `search-sync-${productId}-${action}-${Date.now()}`,
    });
    logger.debug(`[SearchSyncQueue] Job enqueued: ${action} for product ${productId}`);
  } catch (err) {
    logger.warn(`[SearchSyncQueue] Redis unavailable, sync skipped for ${productId}: ${err.message}`);
    // Silently fail — eventual consistency via syncAll
  }
};

module.exports = { addSearchSyncJob, getQueue, connection, QUEUE_NAME };
