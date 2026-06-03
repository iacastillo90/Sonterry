const { MeiliSearch } = require('meilisearch');
const env = require('./env');
const logger = require('../logs/logger');

/** @type {import('meilisearch').MeiliSearch|null} */
let meiliClient = null;

const INDEX_NAME = 'products';

const getClient = () => {
  if (!meiliClient) {
    if (!env.MEILI_MASTER_KEY) {
      logger.warn(
        'MEILI_MASTER_KEY no configurado. Meilisearch deshabilitado. ' +
          'Las búsquedas usarán fallback a MongoDB $text.'
      );
      return null;
    }

    meiliClient = new MeiliSearch({
      host: env.MEILI_HOST,
      apiKey: env.MEILI_MASTER_KEY,
    });

    logger.info(`[MeiliSearch] Client initialized at ${env.MEILI_HOST}`);
  }

  return meiliClient;
};

/**
 * Ensures the products index exists with proper settings.
 * Call once at startup.
 */
const ensureIndex = async () => {
  const client = getClient();
  if (!client) return;

  try {
    const index = client.index(INDEX_NAME);

    // Update filterable and searchable attributes for product search
    const task = await index.updateSettings({
      searchableAttributes: [
        'name',
        'description',
        'categoryName',
        'tags',
      ],
      filterableAttributes: [
        'categoryId',
        'price',
        'isActive',
        'tags',
      ],
      sortableAttributes: ['price', 'createdAt'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness',
      ],
    });

    await client.waitForTask(task.taskUid);
    logger.info('[MeiliSearch] Index settings applied for "products"');
  } catch (err) {
    logger.error(`[MeiliSearch] Failed to initialize index: ${err.message}`);
  }
};

module.exports = { getClient, ensureIndex, INDEX_NAME };
