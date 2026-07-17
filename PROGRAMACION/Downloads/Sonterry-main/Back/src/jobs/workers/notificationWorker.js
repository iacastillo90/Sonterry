const { Worker } = require('bullmq');
const { connection, QUEUE_NAME } = require('../notificationQueue');
const { triggerN8nWorkflow } = require('../../services/n8n.service');
const logger = require('../../logs/logger');

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    logger.info(`[Worker] Processing job ${job.id}: ${job.name} for item ${job.data.orderId || job.data.ticketId}`);

    await triggerN8nWorkflow({
      event: job.data.type,
      orderId: job.data.orderId,
      ticketId: job.data.ticketId,
      ticketType: job.data.ticketType,
      subject: job.data.subject,
      status: job.data.status || 'CREATED',
      phone: job.data.recipientPhone,
      customerName: job.data.customerName,
    });

    logger.info(`[Worker] Job ${job.id} completed successfully.`);
  },
  {
    connection,
    concurrency: 5,
  }
);

worker.on('failed', (job, err) => {
  logger.error(`[Worker] Job ${job?.id} failed (attempt ${job?.attemptsMade}/${job?.opts?.attempts}): ${err.message}`);
});

worker.on('error', (err) => {
  logger.error(`[Worker] Worker error: ${err.message}`);
});

module.exports = worker;

