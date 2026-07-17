const ordersService = require('../services/orders.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createOrder = catchAsync(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const order = await ordersService.createOrder(req.user._id, shippingAddress, req.user.name, paymentMethod);
  res.status(201).json(formatResponse(true, 'Pedido creado con éxito', order));
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await ordersService.updateOrderStatus(id, status);
  res.status(200).json(formatResponse(true, 'Estado del pedido actualizado', order));
});

const getUserOrders = catchAsync(async (req, res) => {
  const orders = await ordersService.getUserOrders(req.user._id, req.query);
  res.status(200).json(formatResponse(true, 'Tus pedidos', orders));
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await ordersService.getAllOrders(req.query);
  res.status(200).json(formatResponse(true, 'Pedidos listados (Admin)', orders));
});

const getOrdersByProduct = catchAsync(async (req, res) => {
  const orders = await ordersService.getOrdersByProduct(req.params.productId, req.query);
  res.status(200).json(formatResponse(true, 'Pedidos del producto', orders));
});

const updateOrderDispatch = catchAsync(async (req, res) => {
  const order = await ordersService.updateOrderDispatch(req.params.id, req.body);
  res.status(200).json(formatResponse(true, 'Despacho actualizado', order));
});

const createManualOrder = catchAsync(async (req, res) => {
  const order = await ordersService.createManualOrder(req.body);
  res.status(201).json(formatResponse(true, 'Pedido manual creado', order));
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await ordersService.getOrderById(req.params.id, req.user._id);
  res.status(200).json(formatResponse(true, 'Pedido encontrado', order));
});

const cancelOrder = catchAsync(async (req, res) => {
  const order = await ordersService.cancelOrder(req.params.id, req.user._id);
  res.status(200).json(formatResponse(true, 'Orden cancelada exitosamente', { order }));
});

const updateOrderItems = catchAsync(async (req, res) => {
  const order = await ordersService.updateOrderItems(req.params.id, req.user._id, req.body.items);
  res.status(200).json(formatResponse(true, 'Pedido actualizado', order));
});

const updateOrderShipping = catchAsync(async (req, res) => {
  const order = await ordersService.updateOrderShipping(req.params.id, req.user._id, req.body.shippingAddress);
  res.status(200).json(formatResponse(true, 'Dirección de envío actualizada', order));
});

const deleteOrder = catchAsync(async (req, res) => {
  await ordersService.deleteOrder(req.params.id);
  res.status(200).json(formatResponse(true, 'Orden eliminada exitosamente'));
});

const updateOrderItemsAdmin = catchAsync(async (req, res) => {
  const order = await ordersService.updateOrderItems(req.params.id, null, req.body.items, true, req.body.paymentMethod);
  res.status(200).json(formatResponse(true, 'Pedido actualizado por admin', order));
});

module.exports = { createOrder, updateOrderStatus, getUserOrders, getAllOrders, getOrdersByProduct, updateOrderDispatch, createManualOrder, getOrderById, cancelOrder, updateOrderItems, updateOrderShipping, deleteOrder, updateOrderItemsAdmin };
