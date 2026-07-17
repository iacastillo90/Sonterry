const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');
const env = require('../config/env');
const logger = require('../logs/logger');

let redisClient;
try {
  redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
    lazyConnect: true,
  });
  redisClient.on('error', () => {});
} catch (e) {
  redisClient = null;
}

const isRedisAvailable = async () => {
  if (env.NODE_ENV === 'test') return false;
  if (!redisClient) return false;
  try {
    await redisClient.connect();
    await redisClient.ping();
    return true;
  } catch {
    redisClient = null;
    logger.warn('Redis no disponible. Rate limiter usará memoria local (no funciona en multi-instancia).');
    return false;
  }
};

let storeReady = false;
(async () => {
  storeReady = await isRedisAvailable();
})();

const getStore = () => {
  if (storeReady && redisClient) {
    return new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    });
  }
  return undefined;
};

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 'fail',
    message: 'Demasiadas peticiones desde esta IP. Por favor intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore(),
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    status: 'fail',
    message: 'Demasiados intentos de inicio de sesión. Por favor intenta en una hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore(),
});

module.exports = { generalLimiter, authLimiter };
