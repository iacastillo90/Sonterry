const mongoose = require('mongoose');
const env = require('../src/config/env');
const User = require('../src/models/user.model');
const Category = require('../src/models/category.model');
const Product = require('../src/models/product.model');
const logger = require('../src/logs/logger');

const seedDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    
    // Clear Existing
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Users
    const admin = await User.create({
      name: 'Admin SonTerry',
      email: 'admin@sonterry.com',
      password: 'password123',
      role: 'admin'
    });

    // Categories
    const prendas = await Category.create({ name: 'Prendas Personalizadas', description: 'Estampados en camisas y busos (con chompa y sin chompa)' });
    const mugs = await Category.create({ name: 'Mugs', description: 'Tus mañanas con mucho más estilo. Piezas de cerámica de alta calidad con colores vibrantes que no se decoloran, perfectas para coleccionar o regalar.' });
    const gorras = await Category.create({ name: 'Gorras', description: 'El toque final para tu estilo. Gorras de alta calidad con estructura impecable y estampados de alta definición. Diseños urbanos creados para destacar y resistir tu ritmo diario sin perder color.' });

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed: ' + error.message);
    process.exit(1);
  }
};

seedDB();
