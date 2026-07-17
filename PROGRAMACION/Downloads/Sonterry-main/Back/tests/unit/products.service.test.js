// Set required env vars before any require to avoid process.exit(1) from config/env.js
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRES_IN = '1d';
process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.MONGO_URI = 'mongodb://localhost:27017/sonterry-test';

jest.mock('../../src/models/product.model');

const Product = require('../../src/models/product.model');
const productsService = require('../../src/services/products.service');

// Mock search service to test delegation independently
jest.mock('../../src/services/search.service', () => ({
  searchProducts: jest.fn(),
}));

const { searchProducts: mockSearchProducts } = require('../../src/services/search.service');

describe('products.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts (pagination y filtros)', () => {
    it('debe devolver productos paginados con valores por defecto', async () => {
      const mockProducts = [
        { name: 'Camiseta', price: 50000 },
        { name: 'Gorra', price: 30000 },
      ];
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockProducts),
      });
      Product.countDocuments.mockResolvedValue(2);

      const result = await productsService.getProducts({});
      expect(result.data).toHaveLength(2);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });

    it('debe filtrar por categoría', async () => {
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      await productsService.getProducts({ category: 'cat123' });
      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'cat123' }),
      );
    });

    it('debe delegar búsqueda a searchService cuando search está presente', async () => {
      mockSearchProducts.mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      await productsService.getProducts({ search: 'camiseta' });

      // No debe llamar a Product.find con $text — eso lo maneja searchService
      expect(Product.find).not.toHaveBeenCalled();
      expect(mockSearchProducts).toHaveBeenCalledWith({ search: 'camiseta' });
    });
  });

  describe('getProductBySlug', () => {
    it('debe retornar el producto si existe', async () => {
      Product.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue({ name: 'Camiseta', slug: 'camiseta' }),
      });
      const result = await productsService.getProductBySlug('camiseta');
      expect(result.name).toBe('Camiseta');
    });

    it('debe lanzar 404 si no existe', async () => {
      Product.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });
      await expect(productsService.getProductBySlug('inexistente')).rejects.toThrow('no encontrado');
    });
  });
});
