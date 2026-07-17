const { PutObjectCommand } = require('@aws-sdk/client-s3');
const minioClient = require('../config/minio');
const env = require('../config/env');
const AppError = require('../errors/AppError');
const logger = require('../logs/logger');
const crypto = require('crypto');
const path = require('path');

const uploadToMinio = async (fileBuffer, originalName, mimeType, folder = 'products') => {
  if (!minioClient) {
    logger.warn('[S3] Cliente S3 no configurado. Retornando URL placeholder.');
    return null;
  }

  const bucketName = env.MINIO_BUCKET;
  const ext = path.extname(originalName).toLowerCase();
  const randomName = `${crypto.randomBytes(16).toString('hex')}${ext}`;
  const objectName = `${folder}/${randomName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectName,
      Body: fileBuffer,
      ContentType: mimeType || 'image/jpeg',
    });

    await minioClient.send(command);

    // Resolver URL pública externa para navegador
    let publicUrlBase = env.MINIO_PUBLIC_URL;
    if (!publicUrlBase) {
      // Si el endpoint de supabase ya contiene /storage/v1/s3, construir la URL pública correcta de Supabase
      if (env.MINIO_ENDPOINT.includes('supabase.co')) {
        const urlObj = new URL(env.MINIO_ENDPOINT.startsWith('http') ? env.MINIO_ENDPOINT : `https://${env.MINIO_ENDPOINT}`);
        // Supabase public URL structure: https://[project_id].supabase.co/storage/v1/object/public/[bucket]/[object]
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
        return `${baseUrl}/storage/v1/object/public/${bucketName}/${objectName}`;
      }

      const protocol = env.MINIO_USE_SSL ? 'https' : 'http';
      const endpoint = env.MINIO_ENDPOINT === 'minio' ? 'localhost' : env.MINIO_ENDPOINT;
      publicUrlBase = `${protocol}://${endpoint}:${env.MINIO_PORT || 9000}`;
      return `${publicUrlBase}/${bucketName}/${objectName}`;
    }

    return `${publicUrlBase}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new AppError(`Error al subir imagen a S3: ${error.message}`, 500);
  }
};

const uploadMultipleToMinio = async (files, folder = 'products') => {
  const results = await Promise.all(
    files.map(f => uploadToMinio(f.buffer, f.originalname, f.mimetype, folder))
  );
  return results.filter(Boolean);
};

module.exports = { uploadToMinio, uploadMultipleToMinio };
