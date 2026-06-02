const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');

mongoose.connect("mongodb://admin:changeme_mongo_password@localhost:27017/mi-ecommerce?authSource=admin").then(async () => {
  const hash = await bcrypt.hash('password123', 12);
  await User.updateOne({ email: 'admin@sonterry.com' }, { password: hash });
  console.log('Password reset to password123');
  process.exit(0);
});
