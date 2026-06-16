const { S3Client } = require('@aws-sdk/client-s3');
const env = require('./env');
const logger = require('../logs/logger');

let minioClient = null;

if (env.MINIO_ACCESS_KEY && env.MINIO_SECRET_KEY) {
  try {
    // Reconstruir la URL completa si no tiene protocolo
    let endpointUrl = env.MINIO_ENDPOINT;
    if (!endpointUrl.startsWith('http')) {
      const protocol = env.MINIO_USE_SSL ? 'https' : 'http';
      endpointUrl = `${protocol}://${endpointUrl}`;
    }

    minioClient = new S3Client({
      forcePathStyle: true,
      region: 'auto',
      endpoint: endpointUrl,
      credentials: {
        accessKeyId: env.MINIO_ACCESS_KEY,
        secretAccessKey: env.MINIO_SECRET_KEY,
      },
    });
    logger.info(`S3 client inicializado → ${endpointUrl}`);
  } catch (err) {
    logger.warn(`S3 client no pudo inicializarse: ${err.message}. Subidas deshabilitadas.`);
  }
} else {
  logger.warn('MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.');
}

module.exports = minioClient;
