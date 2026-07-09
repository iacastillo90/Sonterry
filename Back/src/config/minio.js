const { S3Client, HeadBucketCommand, CreateBucketCommand, PutBucketPolicyCommand } = require('@aws-sdk/client-s3');
const env = require('./env');
const logger = require('../logs/logger');

let minioClient = null;

if (env.MINIO_ACCESS_KEY && env.MINIO_SECRET_KEY) {
  try {
    // Reconstruir la URL completa si no tiene protocolo
    let endpointUrl = env.MINIO_ENDPOINT;
    if (!endpointUrl.startsWith('http')) {
      const protocol = env.MINIO_USE_SSL ? 'https' : 'http';
      const port = env.MINIO_PORT ? `:${env.MINIO_PORT}` : '';
      endpointUrl = `${protocol}://${endpointUrl}${port}`;
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

    // Asegurar que el bucket exista y sea público
    const ensureBucketExists = async () => {
      const bucketName = env.MINIO_BUCKET || 'sonterry';
      try {
        await minioClient.send(new HeadBucketCommand({ Bucket: bucketName }));
      } catch (err) {
        if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
          try {
            await minioClient.send(new CreateBucketCommand({ Bucket: bucketName }));
            logger.info(`[INFO]: Bucket ${bucketName} creado.`);
            
            const policy = JSON.stringify({
              Version: "2012-10-17",
              Statement: [{
                Effect: "Allow",
                Principal: "*",
                Action: "s3:GetObject",
                Resource: [`arn:aws:s3:::${bucketName}/*`]
              }]
            });
            await minioClient.send(new PutBucketPolicyCommand({ Bucket: bucketName, Policy: policy }));
            logger.info(`[INFO]: Política pública aplicada al bucket ${bucketName}.`);
          } catch (createErr) {
            logger.error(`Error al crear/configurar el bucket: ${createErr.message}`);
          }
        } else {
          logger.error(`Error al verificar el bucket: ${err.message}`);
        }
      }
    };
    
    ensureBucketExists();
  } catch (err) {
    logger.warn(`S3 client no pudo inicializarse: ${err.message}. Subidas deshabilitadas.`);
  }
} else {
  logger.warn('MINIO_ACCESS_KEY/SECRET_KEY no configurado. Subidas de MinIO deshabilitadas.');
}

module.exports = minioClient;
