import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWishlist, toggleWishlistItem } from '../services/wishlist.service';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
};
