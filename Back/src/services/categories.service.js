const Category = require('../models/category.model');
const AppError = require('../errors/AppError');

const getAllCategories = async () => {
  return await Category.find();
};

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new AppError('Categoría no encontrada', 404);
  }
  return category;
};

module.exports = { getAllCategories, createCategory, deleteCategory };
