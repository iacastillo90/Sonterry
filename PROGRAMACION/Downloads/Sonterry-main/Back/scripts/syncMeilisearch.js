/**
 * Initial bulk sync script: indexes all active products into Meilisearch.
 *
 * Usage:
 *   node scripts/syncMeilisearch.js
 *
 * Requires MEILI_HOST and MEILI_MASTER_KEY in the environment (or .env file).
 * Safe to run multiple times — upserts documents by _id.
 */
const mongoose = require('mongoose');
const env = require('../src/config/env');
const logger = require('../src/logs/logger');

const run = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('[SyncMeilisearch] Connected to MongoDB');

    const { syncAll } = require('../src/services/search.service');
    const result = await syncAll();

    logger.info(`[SyncMeilisearch] Done! Indexed ${result.indexed} products.`);
    process.exit(0);
  } catch (err) {
    logger.error(`[SyncMeilisearch] Failed: ${err.message}`);
    process.exit(1);
  }
};

run();
