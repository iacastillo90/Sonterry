import api from './api';

export const fetchWishlist = async () => {
  const res = await api.get('/wishlist');
  return res.data.data;
};

export const toggleWishlistItem = async (productId) => {
  const res = await api.post('/wishlist', { productId });
  return res.data.data;
};
