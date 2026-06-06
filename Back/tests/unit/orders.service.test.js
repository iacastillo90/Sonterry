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

  describe('updateOrderItems', () => {
    const userId = 'user123';
    const orderId = 'order456';
    const existingProduct = { _id: 'prod1', name: 'Camiseta', price: 50000 };
    const newProduct = { _id: 'prod2', name: 'Taza', price: 25000 };

    const mockPendingOrder = (overrides = {}) => ({
      _id: orderId,
      user: userId,
      status: 'pending',
      items: [
        { product: existingProduct._id, name: existingProduct.name, price: existingProduct.price, quantity: 2 },
      ],
      total: 100000,
      wompiReferences: [
        { transactionId: 'ref-old', status: 'pending', active: true, createdAt: new Date() },
      ],
      shippingAddress: { address: 'Calle 123', city: 'Med', postalCode: '000', country: 'Col', phone: '300000' },
      save: jest.fn().mockResolvedValue(true),
      ...overrides,
    });

    it('debe reemplazar items, recalcular total e invalidar refs activas', async () => {
      const order = mockPendingOrder();
      Order.findOne.mockResolvedValue(order);

      // Restore old item stock (findByIdAndUpdate)
      Product.findByIdAndUpdate.mockResolvedValueOnce({ price: existingProduct.price, name: existingProduct.name });
      // Deduct new item stock (findOneAndUpdate)
      Product.findOneAndUpdate.mockResolvedValueOnce({ _id: newProduct._id, price: newProduct.price, name: newProduct.name });

      const result = await ordersService.updateOrderItems(orderId, userId, [
        { product: newProduct._id, quantity: 3 },
      ]);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].product).toBe(newProduct._id);
      expect(result.items[0].name).toBe(newProduct.name);
      expect(result.total).toBe(75000); // 3 × 25000
      expect(result.wompiReferences[0].active).toBe(false);
      expect(result.save).toHaveBeenCalled();
    });

    it('debe lanzar 404 si la orden no existe', async () => {
      Order.findOne.mockResolvedValue(null);

      await expect(
        ordersService.updateOrderItems(orderId, userId, [{ product: 'prod1', quantity: 1 }])
      ).rejects.toMatchObject({ statusCode: 404 });
    });

    it('debe lanzar 400 si la orden no está pending', async () => {
      Order.findOne.mockResolvedValue(mockPendingOrder({ status: 'paid' }));

      await expect(
        ordersService.updateOrderItems(orderId, userId, [{ product: 'prod1', quantity: 1 }])
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it('debe lanzar 409 si hay stock insuficiente y compensar decrementos', async () => {
      const order = mockPendingOrder();
      Order.findOne.mockResolvedValue(order);

      // Step 1: Restore old items (findByIdAndUpdate) → succeeds
      Product.findByIdAndUpdate
        .mockResolvedValueOnce({ price: 50000, name: 'Prod' });
      // Step 2: Deduct new item (findOneAndUpdate) → returns null = out of stock
      Product.findOneAndUpdate.mockResolvedValueOnce(null);

      await expect(
        ordersService.updateOrderItems(orderId, userId, [
          { product: 'out-of-stock-prod', quantity: 99 },
        ])
      ).rejects.toMatchObject({ statusCode: 409 });

      // Step 3: Compensate: restore old items again via findByIdAndUpdate
      expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(2);
      expect(Product.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateOrderShipping', () => {
    const userId = 'user123';
    const orderId = 'order456';

    const mockPendingOrder = (overrides = {}) => ({
      _id: orderId,
      user: userId,
      status: 'pending',
      items: [],
      total: 0,
      shippingAddress: { address: 'Calle 123', city: 'Med', postalCode: '000', country: 'Col', phone: '300000' },
      save: jest.fn().mockResolvedValue(true),
      ...overrides,
    });

    it('debe actualizar la dirección de envío', async () => {
      const order = mockPendingOrder();
      Order.findOne.mockResolvedValue(order);

      const newAddress = {
        address: 'Carrera 45 #67-89',
        city: 'Bogotá',
        postalCode: '110111',
        country: 'Colombia',
        phone: '+571234567890',
      };

      const result = await ordersService.updateOrderShipping(orderId, userId, newAddress);

      expect(result.shippingAddress).toEqual(newAddress);
      expect(result.save).toHaveBeenCalled();
    });

    it('debe lanzar 404 si la orden no existe', async () => {
      Order.findOne.mockResolvedValue(null);

      await expect(
        ordersService.updateOrderShipping(orderId, userId, { address: 'test' })
      ).rejects.toMatchObject({ statusCode: 404 });
    });

    it('debe lanzar 400 si la orden no está pending', async () => {
      Order.findOne.mockResolvedValue(mockPendingOrder({ status: 'shipped' }));

      await expect(
        ordersService.updateOrderShipping(orderId, userId, { address: 'test' })
      ).rejects.toMatchObject({ statusCode: 400 });
    });
  });
});
