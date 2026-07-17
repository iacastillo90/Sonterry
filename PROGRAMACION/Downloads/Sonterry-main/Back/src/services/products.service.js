const Product = require('../models/product.model');
const AppError = require('../errors/AppError');
const { uploadMultipleToMinio } = require('../utils/minioUpload');
const { searchProducts } = require('./search.service');

const getProducts = async (filters = {}) => {
  // Delegate to Meilisearch when a search query is present
  if (filters.search) {
    return searchProducts(filters);
  }

  // Non-search queries hit MongoDB directly
  const query = { isDeleted: false };
  if (filters.isActive !== 'all') {
    query.isActive = filters.isActive === 'false' ? false : { $ne: false };
    
    // Fetch inactive categories to exclude their products
    const Category = require('../models/category.model');
    const inactiveCategories = await Category.find({ isActive: false }).select('_id');
    const inactiveCategoryIds = inactiveCategories.map(c => c._id.toString());
    
    if (inactiveCategoryIds.length > 0) {
      if (filters.category) {
        if (inactiveCategoryIds.includes(filters.category)) {
          return { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
        }
        query.category = filters.category;
      } else {
        query.category = { $nin: inactiveCategoryIds };
      }
    } else if (filters.category) {
      query.category = filters.category;
    }
  } else {
    if (filters.category) query.category = filters.category;
  }

  if (filters.type) query.type = filters.type;
  if (filters.collectionName) query.collectionName = filters.collectionName;
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

const getCollections = async () => {
  const collections = await Product.distinct('collectionName', { isDeleted: false, collectionName: { $ne: null, $ne: '' } });
  return collections;
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isDeleted: false }).populate('category', 'name');
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const createProduct = async (productData, files = []) => {
  let imageUrls = productData.images || [];
  if (files.length > 0) {
    const uploaded = await uploadMultipleToMinio(files);
    imageUrls = [...imageUrls, ...uploaded];
  }
  return await Product.create({ ...productData, images: imageUrls });
};

const updateProduct = async (id, updateData, files = []) => {
  if (files.length > 0) {
    const uploaded = await uploadMultipleToMinio(files);
    updateData.images = [...(updateData.images || []), ...uploaded];
  }
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true, runValidators: true }
  );
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

const restoreProduct = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: true },
    { isDeleted: false, deletedAt: null },
    { new: true }
  );
  if (!product) throw new AppError('Producto no encontrado o no estaba eliminado', 404);
  return product;
};

const toggleActiveProduct = async (id) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) throw new AppError('Producto no encontrado', 404);
  product.isActive = !product.isActive;
  await product.save();
  return product;
};

module.exports = { getProducts, getCollections, getProductBySlug, createProduct, updateProduct, deleteProduct, restoreProduct, toggleActiveProduct };

