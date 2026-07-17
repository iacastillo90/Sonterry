const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';
  const status = dbStatus === 'up' ? 200 : 503;
  res.status(status).json({
    status: dbStatus === 'up' ? 'healthy' : 'unhealthy',
    timestamp: new Date(),
    services: {
      database: dbStatus,
      uptime: process.uptime()
    }
  });
});

module.exports = router;
