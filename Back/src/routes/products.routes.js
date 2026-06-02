const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createProductRules, updateProductRules } = require('../validators/product.validators');
const upload = require('../middlewares/upload.middleware');

router.get('/', productsControllers.getProducts);
router.get('/:slug', productsControllers.getProductBySlug);
router.post('/', protect, restrictTo('admin'), upload.array('images', 5), createProductRules, validate, productsControllers.createProduct);
router.put('/:id', protect, restrictTo('admin'), upload.array('images', 5), updateProductRules, validate, productsControllers.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), productsControllers.deleteProduct);
router.patch('/:id/restore', protect, restrictTo('admin'), productsControllers.restoreProduct);

module.exports = router;
