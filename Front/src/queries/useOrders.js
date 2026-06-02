import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as ordersService from '../services/orders.service';

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['userOrders'],
    queryFn: ordersService.fetchUserOrders
  });
};

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['adminOrders'],
    queryFn: ordersService.fetchAllOrdersAdmin
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => ordersService.updateOrderStatusAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    }
  });
};
