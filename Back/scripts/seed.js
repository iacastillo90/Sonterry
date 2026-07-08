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

    const customer = await User.create({
      name: 'Ivan Castillo',
      email: 'cliente@sonterry.com',
      password: 'password123',
      role: 'user'
    });

    // Categories
    const serigrafiaCat = await Category.create({ name: 'Serigrafía', description: 'Técnica artesanal con rasqueta' });
    const dtfCat = await Category.create({ name: 'Estampado DTF', description: 'Tecnología digital de alta definición' });
    const prendasCat = await Category.create({ name: 'Prendas Base', description: 'Poleras, sudaderas y accesorios' });

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed: ' + error.message);
    process.exit(1);
  }
};

seedDB();
