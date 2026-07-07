import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWishlist, toggleWishlistItem } from '../services/wishlist.service';
import { useAuthStore } from '../store/authStore';

export const useWishlist = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
    // Solo ejecutar si el usuario está autenticado.
    // Evita 401s en masa para visitantes anónimos.
    enabled: isAuthenticated,
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
