const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const AppError = require('../errors/AppError');
const { getCart } = require('./cart.service');
const { addNotificationJob } = require('../jobs/notificationQueue');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('./email.service');
const logger = require('../logs/logger');

const deductOrderStock = async (order) => {
  const stockResults = await Promise.all(
    order.items.map(item =>
      Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true, projection: { name: 1 } }
      )
    )
  );

  const failedIndex = stockResults.findIndex(r => !r);
  if (failedIndex !== -1) {
    // Compensate successful decrements
    await Promise.all(
      stockResults.map((r, i) =>
        r
          ? Product.findByIdAndUpdate(order.items[i].product, { $inc: { stock: order.items[i].quantity } })
          : Promise.resolve()
      )
    );
    throw new AppError(`Stock insuficiente para: ${order.items[failedIndex].name}`, 400);
  }
};

const createOrder = async (userId, shippingAddress, customerName, paymentMethod = 'tarjeta') => {
  const cart = await getCart(userId);
  if (!cart || cart.items.length === 0) {
    throw new AppError('El carrito está vacío', 400);
  }

  // Stock is NOT deducted here anymore — it's deducted at payment confirmation
  // (see deductOrderStock called from confirmWompiPayment, Wompi webhook, Stripe webhook)

  const items = cart.items.map((item, i) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    customization: item.customization || undefined,
  }));

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    items,
    total,
    shippingAddress,
    paymentMethod,
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  // Fire-and-forget notification + email (never block order creation)
  addNotificationJob({
    orderId: order._id,
    type: 'ORDER_CREATED',
    recipientPhone: shippingAddress.phone,
    customerName: customerName || 'Cliente',
  }).catch(err => logger.error(`[Orders] Failed to enqueue notification: ${err.message}`));

  User.findById(userId).select('email').then(user => {
    if (user?.email) sendOrderConfirmation(user.email, order);
  }).catch(err => logger.error(`[Orders] Failed to send email: ${err.message}`));

  return order;
};

const updateOrderStatus = async (orderId, newStatus) => {
  const order = await Order.findById(orderId).populate('user');
  if (!order) throw new AppError('Pedido no encontrado', 404);

  const previousStatus = order.status;
  order.status = newStatus;
  await order.save();

  addNotificationJob({
    orderId: order._id,
    type: 'STATUS_UPDATED',
    status: newStatus,
    recipientPhone: order.shippingAddress.phone,
    customerName: order.user.name,
  }).catch(err => logger.error(`[Orders] Failed to enqueue notification: ${err.message}`));

  if (order.user?.email) {
    sendOrderStatusUpdate(order.user.email, order, previousStatus);
  }

  return order;
};

const getUserOrders = async (userId, filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Order.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({ user: userId }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getAllOrders = async (filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Order.find().populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const getOrdersByProduct = async (productId, filters = {}) => {
  const page = Math.max(1, parseInt(filters.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit, 10) || 50));
  const skip = (page - 1) * limit;

  const query = { 'items.product': productId };

  const [data, total] = await Promise.all([
    Order.find(query).populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(query),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

const updateOrderDispatch = async (orderId, shippingDetails) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError('Pedido no encontrado', 404);

  order.shippingDetails = shippingDetails;
  if (shippingDetails.trackingNumber && order.status === 'paid') {
    order.status = 'shipped';
  }
  
  await order.save();
  return order;
};

const createManualOrder = async (orderData) => {
  const { user, items, shippingAddress, paymentMethod, shippingDetails } = orderData;
  
  if (!user) throw new AppError('Usuario requerido', 400);
  if (!items || items.length === 0) throw new AppError('Artículos requeridos', 400);

  const stockResults = await Promise.all(
    items.map(item =>
      Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true, projection: { price: 1, name: 1 } }
      )
    )
  );

  const failedIndex = stockResults.findIndex(r => !r);
  if (failedIndex !== -1) {
    await Promise.all(
      stockResults.map((r, i) =>
        r ? Product.findByIdAndUpdate(items[i].product, { $inc: { stock: items[i].quantity } }) : Promise.resolve()
      )
    );
    throw new AppError('Stock insuficiente para uno de los artículos seleccionados', 400);
  }

  const finalItems = items.map((item, i) => ({
    product: item.product,
    name: stockResults[i].name,
    price: stockResults[i].price,
    quantity: item.quantity,
  }));

  const total = finalItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user,
    items: finalItems,
    total,
    shippingAddress,
    paymentMethod: paymentMethod || 'efectivo',
    shippingDetails,
    status: shippingDetails?.trackingNumber ? 'shipped' : 'paid',
  });

  return order;
};

const getOrderById = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new AppError('Pedido no encontrado', 404);
  return order;
};

const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) throw new AppError('Pedido no encontrado', 404);

  if (order.status === 'cancelled') throw new AppError('El pedido ya fue cancelado', 400);

  if (order.status === 'shipped' || order.status === 'delivered') {
    throw new AppError('No se puede cancelar un pedido que ya fue enviado o entregado', 400);
  }

  // paid only allowed if not yet shipped (no tracking number)
  if (order.status === 'paid' && order.shippingDetails?.trackingNumber) {
    throw new AppError('No se puede cancelar un pedido que ya está en proceso de envío', 400);
  }

  // Restore stock for each item
  await Promise.all(
    order.items.map(item =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: +item.quantity } })
    )
  );

  // Invalidate all active Wompi references
  if (order.wompiReferences?.length > 0) {
    let invalidatedCount = 0;
    order.wompiReferences.forEach(ref => {
      if (ref.active) {
        ref.active = false;
        invalidatedCount++;
      }
    });
    if (invalidatedCount > 0) {
      logger.info(`[Orders] Invalidated ${invalidatedCount} Wompi reference(s) for cancelled order ${order._id}`);
    }
  }

  order.status = 'cancelled';
  await order.save();

  // Fire-and-forget notification
  addNotificationJob({
    orderId: order._id,
    type: 'STATUS_UPDATED',
    status: 'cancelled',
    recipientPhone: order.shippingAddress?.phone,
    customerName: order.user?.name || 'Cliente',
  }).catch(err => logger.error(`[Orders] Failed to enqueue notification: ${err.message}`));

  return order;
};

module.exports = { createOrder, updateOrderStatus, getUserOrders, getAllOrders, getOrdersByProduct, updateOrderDispatch, createManualOrder, getOrderById, deductOrderStock, cancelOrder };
