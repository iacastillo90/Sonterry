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

    // Products
    await Product.create([
      {
        name: 'Camiseta de Algodón Premium',
        description: 'Camiseta base perfecta para estampados de alta fidelidad. 100% algodón hilado.',
        price: 15.00,
        stock: 120,
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'],
        category: prendasCat._id,
        type: 'prenda'
      },
      {
        name: 'Sudadera Térmica Orgánica',
        description: 'Sudadera premium, ideal para climas fríos y personalización DTF de gran tamaño.',
        price: 32.50,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'],
        category: prendasCat._id,
        type: 'prenda'
      },
      {
        name: 'Personalización Serigrafía Clásica',
        description: 'Estampado a una tinta con pintura premium a base de agua. Tacto suave y durabilidad.',
        price: 8.00,
        stock: 9999,
        images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500'],
        category: serigrafiaCat._id,
        type: 'serigrafia'
      },
      {
        name: 'Personalización DTF Full Color',
        description: 'Estampado digital transfer direct to film. Ideal para fotos y degradados complejos.',
        price: 12.00,
        stock: 9999,
        images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500'],
        category: dtfCat._id,
        type: 'dtf'
      }
    ]);

    logger.info('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed: ' + error.message);
    process.exit(1);
  }
};

seedDB();
