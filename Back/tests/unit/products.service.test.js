jest.mock('../../src/models/product.model');

const Product = require('../../src/models/product.model');
const productsService = require('../../src/services/products.service');

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

    it('debe usar búsqueda de texto cuando search está presente', async () => {
      Product.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });
      Product.countDocuments.mockResolvedValue(0);

      await productsService.getProducts({ search: 'camiseta' });
      expect(Product.find).toHaveBeenCalledWith(
        expect.objectContaining({ $text: { $search: 'camiseta' } }),
      );
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
