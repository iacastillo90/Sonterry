const env = require('./env');

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
];

if (env.CORS_ORIGIN) {
  for (const origin of env.CORS_ORIGIN.split(',')) {
    const trimmed = origin.trim();
    if (trimmed) {
      whitelist.push(trimmed);
    }
  }
}

const corsOptions = {
  origin: function (origin, callback) {
    if (env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

module.exports = corsOptions;
