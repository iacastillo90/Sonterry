const notificationsService = require('../services/notifications.service');
const catchAsync = require('../utils/catchAsync');
const formatResponse = require('../utils/formatResponse');

const getNotifications = catchAsync(async (req, res) => {
  const targetRole = req.user.role === 'admin' && req.query.asAdmin === 'true' ? 'admin' : 'client';
  const notifications = await notificationsService.getNotifications(req.user._id, targetRole);
  const unreadCount = await notificationsService.getUnreadCount(req.user._id, targetRole);
  
  res.status(200).json(formatResponse(true, 'Notificaciones obtenidas', { notifications, unreadCount }));
});

const markAsRead = catchAsync(async (req, res) => {
  const targetRole = req.user.role === 'admin' && req.query.asAdmin === 'true' ? 'admin' : 'client';
  const notification = await notificationsService.markAsRead(req.params.id, req.user._id, targetRole);
  res.status(200).json(formatResponse(true, 'Notificación leída', notification));
});

const markAllAsRead = catchAsync(async (req, res) => {
  const targetRole = req.user.role === 'admin' && req.query.asAdmin === 'true' ? 'admin' : 'client';
  await notificationsService.markAllAsRead(req.user._id, targetRole);
  res.status(200).json(formatResponse(true, 'Todas las notificaciones leídas', null));
});

const deleteNotification = catchAsync(async (req, res) => {
  const targetRole = req.user.role === 'admin' && req.query.asAdmin === 'true' ? 'admin' : 'client';
  await notificationsService.deleteNotification(req.params.id, req.user._id, targetRole);
  res.status(200).json(formatResponse(true, 'Notificación eliminada', null));
});

const deleteAllNotifications = catchAsync(async (req, res) => {
  const targetRole = req.user.role === 'admin' && req.query.asAdmin === 'true' ? 'admin' : 'client';
  await notificationsService.deleteAllNotifications(req.user._id, targetRole);
  res.status(200).json(formatResponse(true, 'Todas las notificaciones eliminadas', null));
});

module.exports = { getNotifications, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications };
