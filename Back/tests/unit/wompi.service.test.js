const mongoose = require('mongoose');

jest.mock('../../src/config/env', () => ({
  WOMPI_PUBLIC_KEY: 'pub_key_test',
  WOMPI_PRIVATE_KEY: 'priv_key_test', // habilita wompiAvailable
  WOMPI_INTEGRITY_KEY: 'int_key_test',
  WOMPI_API_URL: 'https://api.wompi.test',
}));

jest.mock('../../src/utils/wompi', () => ({
  generateIntegritySignature: jest.fn(() => 'mocked-integrity-signature'),
}));

const wompiService = require('../../src/services/wompi.service');
const { generateIntegritySignature } = require('../../src/utils/wompi');

describe('wompi.service', () => {
  describe('createTransaction', () => {
    const mockOrder = {
      _id: new mongoose.Types.ObjectId(),
      wompiTransactionId: null,
      wompiReferences: [],
      save: jest.fn().mockResolvedValue(true),
    };

    beforeEach(() => {
      jest.clearAllMocks();
      mockOrder.wompiTransactionId = null;
      mockOrder.wompiReferences = [];
    });

    it('debe generar reference, guardar en wompiReferences y retornar datos del widget', async () => {
      const amountInCents = 15000000; // $150,000 COP

      const result = await wompiService.createTransaction(mockOrder, amountInCents);

      // Verificar estructura de retorno
      expect(result).toMatchObject({
        amount_in_cents: amountInCents,
        currency: 'COP',
        integrity_signature: 'mocked-integrity-signature',
        public_key: expect.any(String),
      });
      expect(result.reference).toMatch(/^SONTERRY-/);

      // Verificar que guardó en legacy field
      expect(mockOrder.wompiTransactionId).toBe(result.reference);

      // Verificar que pusheó a wompiReferences[]
      expect(mockOrder.wompiReferences).toHaveLength(1);
      expect(mockOrder.wompiReferences[0]).toMatchObject({
        transactionId: result.reference,
        status: 'pending',
        active: true,
      });
      expect(mockOrder.wompiReferences[0].createdAt).toBeInstanceOf(Date);

      // Verificar que se llamó a generateIntegritySignature
      expect(generateIntegritySignature).toHaveBeenCalledWith(
        result.reference,
        amountInCents,
        'COP',
        expect.any(String),
      );

      // Verificar que se guardó la orden
      expect(mockOrder.save).toHaveBeenCalled();
    });

    it('debe preservar referencias previas al agregar una nueva', async () => {
      const oldRef = { transactionId: 'SONTERRY-old-1', status: 'APPROVED', active: false, createdAt: new Date() };
      mockOrder.wompiReferences.push(oldRef);

      await wompiService.createTransaction(mockOrder, 5000000);

      expect(mockOrder.wompiReferences).toHaveLength(2);
      expect(mockOrder.wompiReferences[0]).toBe(oldRef); // preserved
      expect(mockOrder.wompiReferences[1].transactionId).toBe(mockOrder.wompiTransactionId);
      expect(mockOrder.wompiReferences[1].active).toBe(true);
    });
  });
});
