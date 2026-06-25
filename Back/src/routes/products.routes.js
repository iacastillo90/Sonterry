const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const zodValidate = require('../middlewares/zodValidate.middleware');
const { createProductSchema, updateProductSchema } = require('../validators/product.validators');
const upload = require('../middlewares/upload.middleware');

router.get('/', productsControllers.getProducts);
router.get('/collections', productsControllers.getCollections);
router.get('/:slug', productsControllers.getProductBySlug);
router.post('/', protect, restrictTo('admin'), upload.array('images', 5), zodValidate(createProductSchema), productsControllers.createProduct);
router.put('/:id', protect, restrictTo('admin'), upload.array('images', 5), zodValidate(updateProductSchema), productsControllers.updateProduct);
router.patch('/:id/toggle-active', protect, restrictTo('admin'), productsControllers.toggleActiveProduct);
router.delete('/:id', protect, restrictTo('admin'), productsControllers.deleteProduct);
router.patch('/:id/restore', protect, restrictTo('admin'), productsControllers.restoreProduct);

module.exports = router;
