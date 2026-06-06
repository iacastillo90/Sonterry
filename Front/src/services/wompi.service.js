import api from './api';

export const createWompiTransaction = async (orderId) => {
  const response = await api.post('/payments/wompi/transaction', { orderId });
  return response.data.data;
};
