const Notification = require('../models/notification.model');

const createNotification = async ({ user, targetRole, title, message, link }) => {
  return await Notification.create({ user, targetRole, title, message, link });
};

const getNotifications = async (userId, targetRole) => {
  const query = { targetRole };
  if (targetRole === 'client') {
    query.user = userId;
  }
  return await Notification.find(query).sort({ createdAt: -1 }).limit(50);
};

const getUnreadCount = async (userId, targetRole) => {
  const query = { targetRole, isRead: false };
  if (targetRole === 'client') {
    query.user = userId;
  }
  return await Notification.countDocuments(query);
};

const markAsRead = async (id, userId, targetRole) => {
  const query = { _id: id, targetRole };
  if (targetRole === 'client') query.user = userId;
  return await Notification.findOneAndUpdate(query, { isRead: true }, { new: true });
};

const markAllAsRead = async (userId, targetRole) => {
  const query = { targetRole, isRead: false };
  if (targetRole === 'client') query.user = userId;
  return await Notification.updateMany(query, { isRead: true });
};

const deleteNotification = async (id, userId, targetRole) => {
  const query = { _id: id, targetRole };
  if (targetRole === 'client') query.user = userId;
  return await Notification.findOneAndDelete(query);
};

const deleteAllNotifications = async (userId, targetRole) => {
  const query = { targetRole };
  if (targetRole === 'client') query.user = userId;
  return await Notification.deleteMany(query);
};

module.exports = { createNotification, getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications };
