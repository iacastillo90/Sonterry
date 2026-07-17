const categoriesService = require('../services/categories.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoriesService.getAllCategories();
  res.status(200).json(formatResponse(true, 'Categorías listadas', categories));
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoriesService.createCategory(req.body);
  res.status(201).json(formatResponse(true, 'Categoría creada', category));
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoriesService.deleteCategory(req.params.id);
  res.status(200).json(formatResponse(true, 'Categoría eliminada'));
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoriesService.updateCategory(req.params.id, req.body);
  res.status(200).json(formatResponse(true, 'Categoría actualizada', category));
});

module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory };
