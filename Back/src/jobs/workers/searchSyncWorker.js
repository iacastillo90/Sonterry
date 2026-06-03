const { Worker } = require('bullmq');
const { connection, QUEUE_NAME } = require('../searchSyncQueue');
const Product = require('../../models/product.model');
const { indexProduct, removeProduct } = require('../../services/search.service');
const logger = require('../../logs/logger');

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    logger.info(`[SearchSyncWorker] Processing job ${job.id}: ${job.data.action} for product ${job.data.productId}`);

    if (job.data.action === 'remove') {
      await removeProduct(job.data.productId);
    } else {
      // Fetch full product with populated category for indexing
      const product = await Product.findById(job.data.productId)
        .populate('category', 'name');

      if (product && !product.isDeleted) {
        await indexProduct(product);
      } else if (product && product.isDeleted) {
        // Was soft-deleted between enqueue and processing
        await removeProduct(job.data.productId);
      }
      // If product is null, it was deleted — remove from index
      if (!product) {
        await removeProduct(job.data.productId);
      }
    }

    logger.info(`[SearchSyncWorker] Job ${job.id} completed successfully.`);
  },
  {
    connection,
    concurrency: 5,
  }
);

worker.on('failed', (job, err) => {
  logger.error(`[SearchSyncWorker] Job ${job?.id} failed (attempt ${job?.attemptsMade}/${job?.opts?.attempts}): ${err.message}`);
});

worker.on('error', (err) => {
  logger.error(`[SearchSyncWorker] Worker error: ${err.message}`);
});

module.exports = worker;
