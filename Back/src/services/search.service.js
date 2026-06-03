const { getClient, INDEX_NAME } = require('../config/meilisearch');
const Product = require('../models/product.model');
const logger = require('../logs/logger');

/**
 * Transform a Mongoose product doc (populated with category) into a Meilisearch document.
 */
const toSearchDoc = (product) => ({
  _id: product._id.toString(),
  name: product.name,
  description: product.description,
  price: product.price,
  stock: product.stock,
  images: product.images || [],
  ratings: product.ratings || 0,
  slug: product.slug,
  type: product.type || 'prenda',
  categoryId: product.category?._id?.toString() || product.category?.toString() || '',
  categoryName: product.category?.name || '',
  tags: [product.type].filter(Boolean),
  isActive: !product.isDeleted,
  createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
  updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
});

/**
 * Index (add or update) a single product in Meilisearch.
 * @param {import('mongoose').Document} product — must be populated with 'category' to include name
 */
const indexProduct = async (product) => {
  const client = getClient();
  if (!client) return;

  try {
    const doc = toSearchDoc(product);
    await client.index(INDEX_NAME).addDocuments([doc]);
    logger.debug(`[SearchService] Indexed product ${product._id}`);
  } catch (err) {
    logger.error(`[SearchService] Failed to index product ${product._id}: ${err.message}`);
  }
};

/**
 * Remove a product from Meilisearch by its _id.
 */
const removeProduct = async (productId) => {
  const client = getClient();
  if (!client) return;

  try {
    await client.index(INDEX_NAME).deleteDocument(productId.toString());
    logger.debug(`[SearchService] Removed product ${productId}`);
  } catch (err) {
    logger.error(`[SearchService] Failed to remove product ${productId}: ${err.message}`);
  }
};

/**
 * Search products using Meilisearch, with automatic fallback to MongoDB $text.
 *
 * Accepts the same filter params as getProducts:
 *   search, category, type, minPrice, maxPrice, page, limit
 *
 * Returns the same shape: { data, total, page, limit, totalPages }
 */
const searchProducts = async (filters = {}) => {
  const client = getClient();

  if (!client) {
    logger.debug('[SearchService] No Meilisearch client — using MongoDB $text fallback');
    return fallbackSearch(filters);
  }

  try {
    const {
      search = '',
      category,
      type,
      minPrice,
      maxPrice,
      page: rawPage = 1,
      limit: rawLimit = 20,
    } = filters;

    const page = Math.max(1, parseInt(rawPage, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(rawLimit, 10) || 20));

    // Build Meilisearch filter string
    const filterParts = ['isActive = true'];
    if (category) filterParts.push(`categoryId = "${category}"`);
    if (type) filterParts.push(`type = "${type}"`);
    if (minPrice !== undefined && minPrice !== '') {
      filterParts.push(`price >= ${parseFloat(minPrice)}`);
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      filterParts.push(`price <= ${parseFloat(maxPrice)}`);
    }

    const result = await client.index(INDEX_NAME).search(search, {
      filter: filterParts.length > 0 ? filterParts.join(' AND ') : undefined,
      page,
      hitsPerPage: limit,
      sort: ['createdAt:desc'],
    });

    // Fetch full MongoDB documents to preserve populated data
    const ids = result.hits.map((h) => h._id);
    const products = ids.length > 0
      ? await Product.find({ _id: { $in: ids }, isDeleted: false })
          .populate('category', 'name')
      : [];

    // Preserve Meilisearch relevance ranking order
    const idOrder = Object.fromEntries(ids.map((_id, i) => [_id, i]));
    products.sort((a, b) => (idOrder[a._id.toString()] ?? Infinity) - (idOrder[b._id.toString()] ?? Infinity));

    const total = result.estimatedTotalHits ?? result.totalHits ?? 0;

    return {
      data: products,
      total,
      page: result.page ?? page,
      limit: result.hitsPerPage ?? limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  } catch (err) {
    logger.warn(`[SearchService] Meilisearch error, falling back to MongoDB: ${err.message}`);
    return fallbackSearch(filters);
  }
};

/**
 * MongoDB $text fallback — mirrors the original getProducts logic exactly.
 * Used when Meilisearch is unavailable or throws an error.
 */
const fallbackSearch = async (filters = {}) => {
  const query = { isDeleted: false };

  if (filters.search) query.$text = { $search: filters.search };
  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;
  if (filters.minPrice !== undefined && filters.minPrice !== '') {
    query.price = { ...query.price, $gte: parseFloat(filters.minPrice) };
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
    query.price = { ...query.price, $lte: parseFloat(filters.maxPrice) };
  }

  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return { data: products, total, page, limit, totalPages: Math.ceil(total / limit) };
};

/**
 * Bulk sync all active products to Meilisearch using cursor-based pagination.
 * @returns {{ indexed: number }}
 */
const syncAll = async () => {
  const client = getClient();
  if (!client) throw new Error('Meilisearch client not available');

  const BATCH_SIZE = 100;
  let lastId = null;
  let totalIndexed = 0;

  while (true) {
    const query = { isDeleted: false };
    if (lastId) query._id = { $gt: lastId };

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ _id: 1 })
      .limit(BATCH_SIZE)
      .lean();

    if (products.length === 0) break;

    const docs = products.map(toSearchDoc);
    const task = await client.index(INDEX_NAME).addDocuments(docs);
    await client.waitForTask(task.taskUid);

    totalIndexed += products.length;
    lastId = products[products.length - 1]._id;

    logger.info(`[SearchService] Synced ${totalIndexed} products...`);
  }

  logger.info(`[SearchService] Sync complete: ${totalIndexed} products indexed`);
  return { indexed: totalIndexed };
};

module.exports = { indexProduct, removeProduct, searchProducts, syncAll };
