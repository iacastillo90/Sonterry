const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

let server;

beforeAll(async () => {
  const { MONGO_URI } = require('../../src/config/env');
  if (!MONGO_URI.includes('test')) {
    console.warn('⚠️  Usando BD que no es de test. Saltando integración.');
    return;
  }
  await mongoose.connect(MONGO_URI);
  server = app.listen(0);
});

afterAll(async () => {
  if (server) {
    await User.deleteMany({});
    await server.close();
    await mongoose.connection.close();
  }
});

const testUser = { name: 'Test', email: 'test@sonterry.com', password: 'password123' };

describe('POST /api/auth/register', () => {
  it('debe registrar un usuario y devolver token + refreshToken', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('refreshToken');
    expect(res.body.data.user.email).toBe(testUser.email);
  });

  it('debe rechazar email duplicado', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/ya está registrado/i);
  });
});

describe('POST /api/auth/login', () => {
  it('debe iniciar sesión con credenciales válidas', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('refreshToken');
  });

  it('debe rechazar contraseña incorrecta', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
  });
});

describe('POST /api/auth/refresh', () => {
  it('debe renovar tokens con refreshToken válido', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    const refreshToken = loginRes.body.data.refreshToken;

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('refreshToken');
  });
});
