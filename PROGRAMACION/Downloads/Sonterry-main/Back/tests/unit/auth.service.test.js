/**
 * auth.service — unit tests
 *
 * Covers:
 * - Account lockout (5 failed attempts → 15min lock)
 * - Refresh token rotation with jti (store, verify, reuse detection)
 * - Cookie options shape
 */
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRES_IN = '1d';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.MONGO_URI = 'mongodb://localhost:27017/sonterry-test';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.mock('../../src/models/user.model');
const User = require('../../src/models/user.model');
const authService = require('../../src/services/auth.service');

// ── Helpers ────────────────────────────────────────────────────────────────
const buildMockUser = (overrides = {}) => ({
  _id: '661d5f8a1a2b3c4d5e6f7a8b',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  isActive: true,
  password: 'hashed_password',
  refreshTokenHash: undefined,
  loginAttempts: 0,
  lockUntil: null,
  comparePassword: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(true),
  ...overrides,
});

const mockFindOne = (user) => {
  // login path: User.findOne({ email }).select('+password +loginAttempts +lockUntil')
  User.findOne.mockImplementation(() => ({
    select: jest.fn().mockResolvedValue(user),
  }));
};

const mockFindById = (user) => {
  // refresh path: User.findById(id).select('-password +refreshTokenHash')
  User.findById.mockImplementation(() => ({
    select: jest.fn().mockResolvedValue(user),
  }));
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ── getCookieOptions ───────────────────────────────────────────────────────
describe('getCookieOptions', () => {
  it('debe devolver opciones con httpOnly, sameSite strict, path /api/auth', () => {
    const opts = authService.getCookieOptions();
    expect(opts).toMatchObject({
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/auth',
    });
    expect(opts.maxAge).toBeGreaterThan(0);
    expect(typeof opts.secure).toBe('boolean');
  });
});

// ── login / lockout ────────────────────────────────────────────────────────
describe('login / account lockout', () => {
  it('debe lanzar error si el usuario no existe', async () => {
    mockFindOne(null);

    await expect(authService.login('nobody@test.com', 'pass')).rejects.toThrow(/incorrectos/);
  });

  it('debe lanzar error si la cuenta está bloqueada', async () => {
    const lockedUntil = new Date(Date.now() + 10 * 60 * 1000); // future → locked
    mockFindOne(buildMockUser({ lockUntil: lockedUntil }));

    await expect(authService.login('test@example.com', 'any')).rejects.toThrow(/bloqueada/);
  });

  it('debe incrementar loginAttempts si la contraseña es incorrecta', async () => {
    const mockUser = buildMockUser();
    mockUser.comparePassword.mockResolvedValue(false);
    mockFindOne(mockUser);

    await expect(authService.login('test@example.com', 'bad')).rejects.toThrow(/incorrectos/);
    expect(mockUser.loginAttempts).toBe(1);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('debe bloquear la cuenta después de 5 intentos fallidos', async () => {
    const mockUser = buildMockUser({ loginAttempts: 4 });
    mockUser.comparePassword.mockResolvedValue(false);
    mockFindOne(mockUser);

    await expect(authService.login('test@example.com', 'bad')).rejects.toThrow(/incorrectos/);
    expect(mockUser.loginAttempts).toBe(0);
    expect(mockUser.lockUntil).toBeInstanceOf(Date);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('debe resetear lockout y retornar token en login exitoso', async () => {
    const mockUser = buildMockUser({
      loginAttempts: 3,
      lockUntil: null, // not locked
    });
    mockUser.comparePassword.mockResolvedValue(true);
    mockFindOne(mockUser);

    const result = await authService.login('test@example.com', 'correct');

    expect(mockUser.loginAttempts).toBe(0);
    expect(mockUser.lockUntil).toBeNull();
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('refreshToken');
    expect(result.user.email).toBe('test@example.com');
  });
});

// ── refreshAccessToken / rotation ──────────────────────────────────────────
describe('refreshAccessToken / rotation', () => {
  it('debe lanzar error si el token JWT es inválido', async () => {
    const err = new Error('jwt malformed');
    err.name = 'JsonWebTokenError';
    jest.spyOn(jwt, 'verify').mockImplementation(() => { throw err; });

    await expect(authService.refreshAccessToken('bad-token')).rejects.toThrow(/inválido o expirado/);
  });

  it('debe lanzar error si el usuario no existe', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123', jti: 'some-jti' });
    mockFindById(null);

    await expect(authService.refreshAccessToken('valid-token')).rejects.toThrow(/inválido o usuario inactivo/);
  });

  it('debe rotar tokens cuando el refresh es válido', async () => {
    const jti = 'original-jti';
    const jtiHash = crypto.createHash('sha256').update(jti).digest('hex');
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123', jti });
    const mockUser = buildMockUser({ refreshTokenHash: jtiHash });
    mockFindById(mockUser);

    const result = await authService.refreshAccessToken('valid-token');

    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('debe detectar token reuse (jti mismatch) e invalidar sesiones', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 'user123', jti: 'stolen-jti' });
    const mockUser = buildMockUser({
      refreshTokenHash: crypto.createHash('sha256').update('different-jti').digest('hex'),
    });
    mockFindById(mockUser);

    await expect(authService.refreshAccessToken('reused-token')).rejects.toThrow(/revocada/);
    expect(mockUser.refreshTokenHash).toBeUndefined();
    expect(mockUser.save).toHaveBeenCalled();
  });
});
