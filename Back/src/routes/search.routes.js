const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');
const searchService = require('../services/search.service');

router.get('/suggest', catchAsync(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(200).json(formatResponse(true, 'Suggestions', { suggestions: [] }));
  }

  const result = await searchService.searchProducts({
    search: q.trim(),
    limit: 6,
    page: 1,
  });

  const suggestions = (result.data || []).map(product => ({
    _id: product._id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.images?.[0]?.url || null,
    stock: product.stock,
  }));

  res.status(200).json(formatResponse(true, 'Suggestions', { suggestions }));
}));

module.exports = router;
