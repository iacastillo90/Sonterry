import api from './api';

export const createOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data.data;
};

export const fetchUserOrders = async () => {
  const res = await api.get('/orders');
  return res.data.data?.data || res.data.data || [];
};

export const fetchAllOrdersAdmin = async () => {
  const res = await api.get('/orders/all');
  return res.data.data?.data || res.data.data || [];
};

export const updateOrderStatusAdmin = async (id, status) => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return res.data.data;
};
