const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');
const Product = require('../../src/models/product.model');
const Category = require('../../src/models/category.model');

let server, adminToken, categoryId, createdProductId;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);

  // Limpieza inicial para evitar errores de clave duplicada por ejecuciones previas abortadas
  await Category.deleteMany({ name: 'Test Category' });
  await User.deleteMany({ email: 'admin-products@sonterry.com' });

  const cat = await Category.create({ name: 'Test Category', slug: 'test-category' });
  categoryId = cat._id.toString();

  await User.create({
    name: 'Admin Products', email: 'admin-products@sonterry.com',
    password: 'adminpass123', role: 'admin'
  });
  const res = await request(app).post('/api/auth/login').send({
    email: 'admin-products@sonterry.com', password: 'adminpass123'
  });
  adminToken = res.body.data?.token;
});

afterAll(async () => {
  if (server) {
    await Product.deleteMany({});
    await Category.deleteMany({ name: 'Test Category' });
    await User.deleteMany({ email: 'admin-products@sonterry.com' });
    await server.close();
    await mongoose.connection.close();
  }
});

describe('GET /api/products', () => {
  it('debe devolver lista paginada sin autenticación', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('total');
    expect(res.body.data).toHaveProperty('page', 1);
    expect(Array.isArray(res.body.data.data)).toBe(true);
  });
});

describe('POST /api/products', () => {
  it('debe rechazar sin autenticación (401)', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Test' });
    expect(res.status).toBe(401);
  });

  it('debe rechazar precio negativo (400)', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'X', description: 'Y', price: -100, stock: 10, category: categoryId });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/precio/i);
  });

  it('debe rechazar stock no entero (400)', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'X', description: 'Y', price: 50000, stock: 'mucho', category: categoryId });
    expect(res.status).toBe(400);
  });

  it('debe crear producto válido y generar slug automático', async () => {
    if (!adminToken || !categoryId) return;
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Camiseta Test', description: 'Una camiseta de prueba', price: 55000, stock: 100, category: categoryId });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('slug', 'camiseta-test');
    createdProductId = res.body.data._id;
  });
});

describe('DELETE /api/products/:id (soft-delete)', () => {
  it('debe hacer soft-delete — producto no aparece en listado público', async () => {
    if (!adminToken || !createdProductId) return;

    const del = await request(app)
      .delete(`/api/products/${createdProductId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(del.status).toBe(200);

    // Verificar que ya no aparece en el catálogo
    const list = await request(app).get('/api/products');
    const found = list.body.data.data.find(p => p._id === createdProductId);
    expect(found).toBeUndefined();
  });

  it('debe restaurar el producto con PATCH /:id/restore', async () => {
    if (!adminToken || !createdProductId) return;

    const res = await request(app)
      .patch(`/api/products/${createdProductId}/restore`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.isDeleted).toBe(false);
  });
});
