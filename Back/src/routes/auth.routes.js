const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const { protect } = require('../middlewares/auth.middleware');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, authControllers.register);
router.post('/login', authLimiter, authControllers.login);
router.post('/refresh', authControllers.refreshToken);
router.post('/forgot-password', authLimiter, authControllers.forgotPassword);
router.post('/reset-password/:token', authLimiter, authControllers.resetPassword);
router.get('/profile', protect, authControllers.getProfile);
router.patch('/profile', protect, authControllers.updateProfile);

module.exports = router;
