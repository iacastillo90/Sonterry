const express = require('express');
const router = express.Router();
const categoriesControllers = require('../controllers/categories.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.get('/', categoriesControllers.getAllCategories);
router.post('/', protect, restrictTo('admin'), categoriesControllers.createCategory);
router.put('/:id', protect, restrictTo('admin'), categoriesControllers.updateCategory);
router.delete('/:id', protect, restrictTo('admin'), categoriesControllers.deleteCategory);

module.exports = router;
