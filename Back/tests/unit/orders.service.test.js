const mongoose = require('mongoose');

jest.mock('../../src/models/order.model');
jest.mock('../../src/models/product.model');
jest.mock('../../src/models/user.model');
jest.mock('../../src/services/cart.service', () => ({
  getCart: jest.fn(),
}));
jest.mock('../../src/jobs/notificationQueue', () => ({
  addNotificationJob: jest.fn(() => Promise.resolve()),
}));
jest.mock('../../src/services/email.service', () => ({
  sendOrderConfirmation: jest.fn(() => Promise.resolve()),
  sendOrderStatusUpdate: jest.fn(() => Promise.resolve()),
}));

const Order = require('../../src/models/order.model');
const Product = require('../../src/models/product.model');
const ordersService = require('../../src/services/orders.service');

describe('orders.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsersOrders (pagination)', () => {
    it('debe aplicar paginación por defecto (page=1, limit=20)', async () => {
      Order.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });
      Order.countDocuments.mockResolvedValue(0);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({});

      expect(Order.find).toHaveBeenCalled();
      expect(Order.countDocuments).toHaveBeenCalled();
      expect(result).toMatchObject({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
    });

    it('debe respetar page y limit enviados', async () => {
      Order.countDocuments.mockResolvedValue(50);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({ page: '2', limit: '10' });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(5);
    });

    it('debe limitar el máximo a 100 registros por página', async () => {
      Order.countDocuments.mockResolvedValue(500);
      Order.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      const result = await ordersService.getAllOrders({ limit: '999' });

      expect(result.limit).toBe(100);
    });
  });

  describe('createOrder stock atomicity', () => {
    it('debe lanzar error si el carrito está vacío', async () => {
      const cartService = require('../../src/services/cart.service');
      cartService.getCart.mockResolvedValue({ items: [] });

      await expect(ordersService.createOrder('user1', {}, 'Test')).rejects.toThrow('vacío');
    });
  });
});
