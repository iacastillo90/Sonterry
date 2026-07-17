const app = require('./app');
const env = require('./config/env');
const connectDB = async () => {
  const db = require('./config/db');
  await db();
};
const logger = require('./logs/logger');

const startServer = async () => {
  await connectDB();

  // Inicializar Meilisearch — no en test
  if (env.NODE_ENV !== 'test') {
    const { ensureIndex } = require('./config/meilisearch');
    await ensureIndex();
    logger.info('[Server] Meilisearch index ensured.');
  }

  // Iniciar workers BullMQ — no en test para no interferir con Jest
  if (env.NODE_ENV !== 'test') {
    require('./jobs/workers/notificationWorker');
    logger.info('[Server] Notification worker started.');

    require('./jobs/workers/searchSyncWorker');
    logger.info('[Server] Search sync worker started.');
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
