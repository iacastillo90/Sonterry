const dotenv = require('dotenv');
dotenv.config();

const logger = require('../logs/logger');

const requiredEnvs = [
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'REFRESH_TOKEN_SECRET',
  'REFRESH_TOKEN_EXPIRES_IN',
];

const productionRequiredEnvs = [
  'REDIS_HOST',
  'REDIS_PORT',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'N8N_WEBHOOK_URL',
  'N8N_API_KEY',
  'MINIO_ENDPOINT',
  'MINIO_PORT',
  'MINIO_ACCESS_KEY',
  'MINIO_SECRET_KEY',
  'MINIO_BUCKET',
];

const missing = [];

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    missing.push(env);
  }
}

if (process.env.NODE_ENV === 'production') {
  for (const env of productionRequiredEnvs) {
    if (!process.env[env]) {
      missing.push(env);
    }
  }
}

if (missing.length > 0) {
  const msg = `CRITICAL: Missing required environment variables: ${missing.join(', ')}`;
  logger.error(msg);
  console.error(msg);
  process.exit(1);
}

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  MONGO_MAX_POOL_SIZE: parseInt(process.env.MONGO_MAX_POOL_SIZE, 10) || 50,
  MONGO_MIN_POOL_SIZE: parseInt(process.env.MONGO_MIN_POOL_SIZE, 10) || 5,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || 'localhost',
  MINIO_PORT: parseInt(process.env.MINIO_PORT, 10) || 9000,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.MINIO_BUCKET || 'sonterry',
  MINIO_USE_SSL: process.env.MINIO_USE_SSL === 'true',
  MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_API_URL: process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com',
  PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_API_KEY: process.env.N8N_API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@sonterry.com',
};
