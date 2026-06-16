const minioClient = require('../config/minio');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const logger = require('../logs/logger');
const crypto = require('crypto');
const path = require('path');

let bucketInitialized = false;

const initBucket = async () => {
  if (bucketInitialized) return;
  if (!minioClient) return;
  
  // Supabase no soporta makeBucket ni setBucketPolicy vía S3 (usa RLS)
  if (env.MINIO_ENDPOINT.includes('supabase.co')) {
    bucketInitialized = true;
    return;
  }

  const bucketName = env.MINIO_BUCKET;
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, '');
      logger.info(`[MinIO] Bucket creado: ${bucketName}`);

      // Configurar política de lectura pública para que el navegador pueda acceder a las fotos
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      logger.info(`[MinIO] Política pública aplicada a: ${bucketName}`);
    }
    bucketInitialized = true;
  } catch (error) {
    logger.error(`[MinIO] Error inicializando bucket: ${error.message}`);
  }
};

const uploadToMinio = async (fileBuffer, originalName, mimeType) => {
  if (!minioClient) {
    logger.warn('[MinIO] MinIO no está configurado. Retornando URL placeholder.');
    return null; // Dev sin credenciales → no crashea
  }

  await initBucket();

  const bucketName = env.MINIO_BUCKET;
  const ext = path.extname(originalName).toLowerCase();
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;
  const objectName = `products/${randomName}`;

  try {
    await minioClient.putObject(bucketName, objectName, fileBuffer, fileBuffer.length, {
      'Content-Type': mimeType || 'image/jpeg',
    });

    // Resolver URL pública externa para navegador
    let publicUrlBase = env.MINIO_PUBLIC_URL;
    if (!publicUrlBase) {
      const protocol = env.MINIO_USE_SSL ? 'https' : 'http';
      const endpoint = env.MINIO_ENDPOINT === 'minio' ? 'localhost' : env.MINIO_ENDPOINT;
      publicUrlBase = `${protocol}://${endpoint}:${env.MINIO_PORT}`;
    }

    return `${publicUrlBase}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new AppError(`Error al subir imagen a MinIO: ${error.message}`, 500);
  }
};

const uploadMultipleToMinio = async (files) => {
  const results = await Promise.all(
    files.map(f => uploadToMinio(f.buffer, f.originalname, f.mimetype))
  );
  return results.filter(Boolean);
};

module.exports = { uploadToMinio, uploadMultipleToMinio };
