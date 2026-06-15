const { Queue } = require('bullmq');
const env = require('../config/env');
const logger = require('../logs/logger');
const { triggerN8nWorkflow } = require('../services/n8n.service');

const QUEUE_NAME = 'notifications';

const isTLS = env.REDIS_HOST !== 'localhost' && env.REDIS_HOST !== 'redis';

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
  ...(isTLS && { tls: {} }),
};

let notificationQueue = null;

const getQueue = () => {
  if (!notificationQueue) {
    notificationQueue = new Queue(QUEUE_NAME, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 }, // 5s → 25s → 125s
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 50 },
      },
    });

    notificationQueue.on('error', (err) => {
      logger.error(`[Queue] BullMQ error: ${err.message}`);
    });
  }
  return notificationQueue;
};

const _fallback = (data) => {
  setTimeout(async () => {
    try {
      await triggerN8nWorkflow({
        event: data.type,
        orderId: data.orderId,
        status: data.status || 'ORDER_CREATED',
        phone: data.recipientPhone,
        customerName: data.customerName,
      });
    } catch (e) {
      logger.error(`[Queue Fallback] N8N trigger failed: ${e.message}`);
    }
  }, 1000);
};

const addNotificationJob = async (data) => {
  try {
    const queue = getQueue();
    // jobId único: evita duplicados si hay un retry del request HTTP
    await queue.add(data.type, data, {
      jobId: `notif-${data.orderId || data.ticketId || 'global'}-${data.type}-${Date.now()}`,
    });
    logger.info(`[Queue] Job enqueued: ${data.type} for order ${data.orderId}`);
  } catch (err) {
    logger.warn(`[Queue] Redis unavailable, using fallback: ${err.message}`);
    _fallback(data);
  }
};

module.exports = { addNotificationJob, getQueue, connection, QUEUE_NAME };

