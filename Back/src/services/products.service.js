const Product = require('../models/product.model');
const AppError = require('../errors/AppError');
const { uploadMultipleToMinio } = require('../utils/minioUpload');

const getProducts = async (filters = {}) => {
  const query = { isDeleted: false };
  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;
  if (filters.search) {
    query.$text = { $search: filters.search };
  }
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

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, restoreProduct };

