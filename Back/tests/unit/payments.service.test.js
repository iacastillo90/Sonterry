describe('payments.service', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('debe lanzar 500 si Stripe no está configurado', async () => {
    // Mockear el archivo de config env directamente
    jest.doMock('../../src/config/env', () => ({
      STRIPE_SECRET_KEY: undefined,
    }));

    // Mockear los modelos
    jest.doMock('../../src/models/order.model', () => ({
      findById: jest.fn().mockResolvedValue({ _id: 'ord1', total: 100000, status: 'pending' }),
    }));
    jest.doMock('../../src/models/payment.model', () => ({
      create: jest.fn(),
    }));

    // Cargar el servicio ahora que las dependencias están mockeadas
    const svc = require('../../src/services/payments.service');

    await expect(svc.createPaymentIntent('ord1')).rejects.toThrow('no está configurado');
  });
});
