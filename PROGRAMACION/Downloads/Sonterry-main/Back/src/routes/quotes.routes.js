const express = require('express');
const router = express.Router();
const quotesControllers = require('../controllers/quotes.controllers');
const upload = require('../middlewares/upload.middleware');

router.post('/', upload.array('images', 5), quotesControllers.createQuote);

module.exports = router;
