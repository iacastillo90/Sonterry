const express = require('express');
const router = express.Router();
const notificationsControllers = require('../controllers/notifications.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/', notificationsControllers.getNotifications);
router.patch('/read-all', notificationsControllers.markAllAsRead);
router.patch('/:id/read', notificationsControllers.markAsRead);
router.delete('/all', notificationsControllers.deleteAllNotifications);
router.delete('/:id', notificationsControllers.deleteNotification);

module.exports = router;
