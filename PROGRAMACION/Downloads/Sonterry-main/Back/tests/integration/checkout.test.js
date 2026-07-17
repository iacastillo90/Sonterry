const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

let server;
let authToken;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);

  const res = await request(app).post('/api/auth/login').send({
    email: 'admin@sonterry.com',
    password: 'admin123456',
  });
  authToken = res.body.data?.token;
});

afterAll(async () => {
  if (server) {
    await server.close();
    await mongoose.connection.close();
  }
});

describe('GET /api/profile', () => {
  it('debe rechazar sin token', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('debe devolver perfil con token válido', async () => {
    if (!authToken) return;
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user).toHaveProperty('name');
    expect(res.body.data.user).not.toHaveProperty('password');
  });
});
