const productsService = require('../services/products.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getProducts = catchAsync(async (req, res) => {
  const products = await productsService.getProducts(req.query);
  res.status(200).json(formatResponse(true, 'Productos listados', products));
});

const getProductBySlug = catchAsync(async (req, res) => {
  const product = await productsService.getProductBySlug(req.params.slug);
  res.status(200).json(formatResponse(true, 'Detalle del producto', product));
});

const getCollections = catchAsync(async (req, res) => {
  const collections = await productsService.getCollections();
  res.status(200).json(formatResponse(true, 'Colecciones listadas', collections));
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productsService.createProduct(req.body, req.files || []);
  res.status(201).json(formatResponse(true, 'Producto creado', product));
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productsService.updateProduct(req.params.id, req.body, req.files || []);
  res.status(200).json(formatResponse(true, 'Producto actualizado', product));
});

const deleteProduct = catchAsync(async (req, res) => {
  await productsService.deleteProduct(req.params.id);
  res.status(200).json(formatResponse(true, 'Producto eliminado', null));
});

const restoreProduct = catchAsync(async (req, res) => {
  const product = await productsService.restoreProduct(req.params.id);
  res.status(200).json(formatResponse(true, 'Producto restaurado', product));
});

const toggleActiveProduct = catchAsync(async (req, res) => {
  const product = await productsService.toggleActiveProduct(req.params.id);
  res.status(200).json(formatResponse(true, product.isActive ? 'Producto activado' : 'Producto dado de baja', product));
});

module.exports = { getProducts, getCollections, getProductBySlug, createProduct, updateProduct, deleteProduct, restoreProduct, toggleActiveProduct };
