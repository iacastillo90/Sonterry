const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.use(protect, restrictTo('admin'));
router.get('/', usersControllers.getAllUsers);
router.patch('/:id/status', usersControllers.updateUserStatus);

module.exports = router;
