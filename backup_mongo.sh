#!/bin/bash
# backup_mongo.sh
# Script para realizar backup de MongoDB y subirlo a MinIO (Carpeta Respaldo)
# Mantiene solo la última versión del backup sobrescribiendo el archivo.

# Cargar variables de entorno
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: No se encontró el archivo .env"
  exit 1
fi

BUCKET_NAME=${MINIO_BUCKET:-sonterry}
BACKUP_PATH="Respaldo/latest_backup.archive"

echo "📦 Creando backup de MongoDB..."
docker exec sonterry_db mongodump \
  --username "$MONGO_USER" \
  --password "$MONGO_PASS" \
  --authenticationDatabase admin \
  --archive > ./latest_backup.archive

if [ $? -ne 0 ]; then
  echo "❌ Error al crear el backup de MongoDB"
  rm -f ./latest_backup.archive
  exit 1
fi

echo "☁️  Subiendo backup a MinIO..."
docker run --rm --network sonterry_network \
  -v $(pwd)/latest_backup.archive:/latest_backup.archive \
  minio/mc:latest \
  sh -c "mc alias set myminio http://sonterry_storage:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD && \
         mc cp /latest_backup.archive myminio/$BUCKET_NAME/$BACKUP_PATH"

if [ $? -ne 0 ]; then
  echo "❌ Error al subir el backup a MinIO"
  rm -f ./latest_backup.archive
  exit 1
fi

echo "🧹 Limpiando archivos temporales..."
rm -f ./latest_backup.archive

echo "✅ Backup completado y subido exitosamente a MinIO en $BUCKET_NAME/$BACKUP_PATH"
