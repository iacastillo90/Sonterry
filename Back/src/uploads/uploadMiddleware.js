const upload = require('./multer.config');
module.exports = upload.single('image');
