const ordersService = require('../services/orders.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const createOrder = catchAsync(async (req, res) => {
  const { shippingAddress } = req.body;
  const order = await ordersService.createOrder(req.user._id, shippingAddress, req.user.name);
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

module.exports = { createOrder, updateOrderStatus, getUserOrders, getAllOrders, getOrdersByProduct, updateOrderDispatch, createManualOrder };
