const Minio = require('minio');
const env = require('./env');
const logger = require('../logs/logger');

let minioClient = null;

if (env.MINIO_ACCESS_KEY && env.MINIO_SECRET_KEY) {
  try {
    minioClient = new Minio.Client({
      endPoint: env.MINIO_ENDPOINT,
      port: env.MINIO_PORT,
      useSSL: env.MINIO_USE_SSL,
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
    });
    logger.info(`MinIO client inicializado → ${env.MINIO_ENDPOINT}:${env.MINIO_PORT}`);
  } catch (err) {
    logger.warn(`MinIO client no pudo inicializarse: ${err.message}. Subidas deshabilitadas.`);
  }
} else {
  logger.warn('MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.');
}

module.exports = minioClient;
