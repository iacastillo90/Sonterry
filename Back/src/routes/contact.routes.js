const express = require('express');
const router = express.Router();
const contactControllers = require('../controllers/contact.controllers');
const { generalLimiter } = require('../middlewares/rateLimiter');

router.post('/', generalLimiter, contactControllers.createContact);

module.exports = router;
