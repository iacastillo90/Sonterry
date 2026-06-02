import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as productsService from '../services/products.service';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsService.fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useProductDetail = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsService.fetchProductBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};
