const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const AppError = require('../errors/AppError');

const getCart = async (userId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate('items.product');
  return cart;
};

const addToCart = async (userId, productId, quantity, customization) => {
  const product = await Product.findById(productId, { stock: 1, price: 1, name: 1 });
  if (!product) throw new AppError('Producto no encontrado', 404);
  if (product.stock < quantity) throw new AppError('Stock insuficiente', 400);

  let cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const existingItemIndex = cart.items.findIndex(item =>
    item.product.toString() === productId &&
    (!customization || item.customization?.type === customization.type)
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, customization: customization || undefined });
  }

  await cart.save();
  return await cart.populate('items.product');
};

const removeFromCart = async (userId, itemId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  await cart.save();
  return await cart.populate('items.product');
};

const updateCartItemQuantity = async (userId, itemId, quantity) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  if (itemIndex === -1) throw new AppError('Producto no encontrado en el carrito', 404);

  const product = await Product.findById(cart.items[itemIndex].product, { stock: 1 });
  if (product && product.stock < quantity) throw new AppError('Stock insuficiente en tienda', 400);

  cart.items[itemIndex].quantity = quantity;
  await cart.save();
  return await cart.populate('items.product');
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItemQuantity };
