// Set required env vars before any require to avoid process.exit(1) from config/env.js
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRES_IN = '1d';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.MONGO_URI = 'mongodb://localhost:27017/sonterry-test';

jest.mock('../../src/models/product.model');

const Product = require('../../src/models/product.model');

// Mock meilisearch client
const mockIndex = {
  addDocuments: jest.fn(),
  deleteDocument: jest.fn(),
  search: jest.fn(),
  updateSettings: jest.fn(),
};

const mockMeiliClient = {
  index: jest.fn(() => mockIndex),
  waitForTask: jest.fn(),
};

jest.mock('meilisearch', () => ({
  MeiliSearch: jest.fn(() => mockMeiliClient),
}));

// Mock env so getClient returns a client (MEILI_MASTER_KEY set)
jest.mock('../../src/config/env', () => ({
  MEILI_HOST: 'http://localhost:7700',
  MEILI_MASTER_KEY: 'test_key',
  NODE_ENV: 'test',
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
  REDIS_PASSWORD: '',
}));

const searchService = require('../../src/services/search.service');

describe('search.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('indexProduct', () => {
    it('debe indexar un producto con categoría poblada', async () => {
      const product = {
        _id: 'abc123',
        name: 'Camiseta',
        description: 'Camiseta de algodón',
        price: 50000,
        stock: 10,
        images: ['http://example.com/img.jpg'],
        ratings: 4.5,
        slug: 'camiseta',
        type: 'prenda',
        category: { _id: 'cat1', name: 'Ropa' },
        isDeleted: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      await searchService.indexProduct(product);

      expect(mockMeiliClient.index).toHaveBeenCalledWith('products');
      expect(mockIndex.addDocuments).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 'abc123',
          name: 'Camiseta',
          price: 50000,
          categoryId: 'cat1',
          categoryName: 'Ropa',
          isActive: true,
        }),
      ]);
    });

    it('debe indexar producto sin categoría poblada', async () => {
      const product = {
        _id: 'def456',
        name: 'Gorra',
        description: 'Gorra básica',
        price: 30000,
        stock: 5,
        images: [],
        ratings: 0,
        slug: 'gorra',
        type: 'gorra',
        category: 'cat1', // solo ObjectId, sin populate
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await searchService.indexProduct(product);

      expect(mockIndex.addDocuments).toHaveBeenCalledWith([
        expect.objectContaining({
          id: 'def456',
          categoryName: '',
        }),
      ]);
    });
  });

  describe('removeProduct', () => {
    it('debe eliminar un producto del índice por ID', async () => {
      await searchService.removeProduct('abc123');
      expect(mockIndex.deleteDocument).toHaveBeenCalledWith('abc123');
    });
  });

  describe('searchProducts con Meilisearch disponible', () => {
    /**
     * Helper: mock Product.find to return a thenable chain (like Mongoose Query).
     * Use .then() so await on the chain resolves to returnValue.
     */
    const mockProductFind = (returnValue) => {
      const query = {
        populate: jest.fn(() => query),
        skip: jest.fn(() => query),
        limit: jest.fn(() => query),
        sort: jest.fn(() => query),
        then: jest.fn((resolve) => resolve(returnValue)),
      };
      Product.find.mockReturnValue(query);
    };

    beforeEach(() => {
      mockIndex.search.mockResolvedValue({
        hits: [
          { id: 'p1', name: 'Camiseta' },
          { id: 'p2', name: 'Camiseta estampada' },
        ],
        estimatedTotalHits: 2,
        page: 1,
        hitsPerPage: 20,
      });
    });

    it('debe realizar búsqueda con filtros básicos', async () => {
      mockProductFind([]);

      await searchService.searchProducts({ search: 'camiseta' });

      expect(mockIndex.search).toHaveBeenCalledWith('camiseta', {
        filter: 'isActive = true',
        page: 1,
        hitsPerPage: 20,
        sort: ['createdAt:desc'],
      });
    });

    it('debe construir filtros correctamente', async () => {
      mockProductFind([]);

      await searchService.searchProducts({
        search: 'gorra',
        category: 'cat1',
        type: 'gorra',
        minPrice: '10000',
        maxPrice: '50000',
      });

      expect(mockIndex.search).toHaveBeenCalledWith('gorra', {
        filter: 'isActive = true AND categoryId = "cat1" AND type = "gorra" AND price >= 10000 AND price <= 50000',
        page: 1,
        hitsPerPage: 20,
        sort: ['createdAt:desc'],
      });
    });

    it('debe preservar orden de relevancia de Meilisearch', async () => {
      mockProductFind([
        { _id: 'p2', name: 'Camiseta estampada', category: 'cat1' },
        { _id: 'p1', name: 'Camiseta', category: 'cat1' },
      ]);

      const result = await searchService.searchProducts({ search: 'camiseta' });

      // p1 debe aparecer primero (orden de hits de Meilisearch)
      expect(result.data[0]._id.toString()).toBe('p1');
      expect(result.data[1]._id.toString()).toBe('p2');
    });

    it('debe retornar estructura de paginación correcta', async () => {
      mockProductFind([]);

      const result = await searchService.searchProducts({ search: 'test', page: 2, limit: 10 });

      expect(result).toEqual({
        data: [],
        total: 2,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
    });
  });

  describe('fallback a MongoDB $text', () => {
    it('debe caer en fallback cuando Meilisearch lanza error', async () => {
      mockIndex.search.mockRejectedValue(new Error('Connection refused'));

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      const result = await searchService.searchProducts({ search: 'camiseta' });

      // Fallback debe llamar a Product.find con $text
      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({ $text: { $search: 'camiseta' } }),
      );
      expect(result).toEqual({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
    });

    it('debe aplicar filtros en fallback', async () => {
      mockIndex.search.mockRejectedValue(new Error('Timeout'));

      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      await searchService.searchProducts({
        search: 'test',
        category: 'cat1',
        type: 'prenda',
        minPrice: '1000',
        maxPrice: '50000',
      });

      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({
          $text: { $search: 'test' },
          category: 'cat1',
          type: 'prenda',
          price: { $gte: 1000, $lte: 50000 },
        }),
      );
    });
  });
});
