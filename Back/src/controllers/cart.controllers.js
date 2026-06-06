const cartService = require('../services/cart.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.status(200).json(formatResponse(true, 'Carrito obtenido', cart));
});

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity, customization } = req.body;
  const cart = await cartService.addToCart(req.user._id, productId, quantity, customization);
  res.status(200).json(formatResponse(true, 'Producto añadido al carrito', cart));
});

const removeFromCart = catchAsync(async (req, res) => {
  const cart = await cartService.removeFromCart(req.user._id, req.params.itemId);
  res.status(200).json(formatResponse(true, 'Producto eliminado del carrito', cart));
});

const updateCartItemQuantity = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartService.updateCartItemQuantity(req.user._id, req.params.itemId, quantity);
  res.status(200).json(formatResponse(true, 'Cantidad de producto actualizada', cart));
});

const clearCart = catchAsync(async (req, res) => {
  await cartService.clearCart(req.user._id);
  res.status(200).json(formatResponse(true, 'Carrito limpiado exitosamente', { items: [] }));
});

module.exports = { getCart, addToCart, removeFromCart, updateCartItemQuantity, clearCart };
