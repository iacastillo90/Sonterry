import api from './api';

export const fetchProducts = async (params) => {
  const res = await api.get('/products', { params });
  return res.data.data?.data || res.data.data || [];
};

export const fetchProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data.data;
};

export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data.data;
};

export const fetchCategories = async () => {
  const res = await api.get('/categories');
  return res.data.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data.data;
};

export const restoreProduct = async (id) => {
  const res = await api.patch(`/products/${id}/restore`);
  return res.data.data;
};

export const fetchReviews = async (productId) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data.data;
};

export const createReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data.data;
};

export const fetchUserReviews = async () => {
  const res = await api.get('/reviews/me');
  return res.data.data;
};

export const fetchRelatedProducts = async (categoryId, currentProductId) => {
  const res = await api.get('/products', { params: { category: categoryId, limit: 10 } });
  let filtered = res.data.data.data.filter(p => p._id !== currentProductId && !p.isDeleted);
  
  if (filtered.length < 3) {
    const generalRes = await api.get('/products', { params: { limit: 15 } });
    const additional = generalRes.data.data.data.filter(p => 
      p._id !== currentProductId && 
      !p.isDeleted && 
      !filtered.some(f => f._id === p._id)
    );
    filtered = [...filtered, ...additional];
  }
  
  return filtered.slice(0, 3);
};
