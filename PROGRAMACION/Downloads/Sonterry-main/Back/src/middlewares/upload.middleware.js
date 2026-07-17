const multer = require('multer');
const path = require('path');
const AppError = require('../errors/AppError');

// Almacenamiento en memoria → se sube directo a Cloudinary sin escribir al disco
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Solo se permiten imágenes JPG, PNG o WebP', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB máximo por imagen
});

module.exports = upload;
