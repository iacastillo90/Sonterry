jest.mock('../../src/models/cart.model');
jest.mock('../../src/models/product.model');

const Cart = require('../../src/models/cart.model');
const Product = require('../../src/models/product.model');
const cartService = require('../../src/services/cart.service');

describe('cart.service', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('addToCart', () => {
    it('debe lanzar 404 si el producto no existe', async () => {
      Product.findById.mockResolvedValue(null);
      await expect(cartService.addToCart('user1', 'prod1', 1)).rejects.toThrow('no encontrado');
    });

    it('debe lanzar 400 si no hay stock suficiente', async () => {
      Product.findById.mockResolvedValue({ stock: 2, price: 10000, name: 'X' });
      await expect(cartService.addToCart('user1', 'prod1', 5)).rejects.toThrow('Stock insuficiente');
    });
  });
});
