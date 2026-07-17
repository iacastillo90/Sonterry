import api from './api';

export const sendContactMessage = async (contactData) => {
  const res = await api.post('/contact', contactData);
  return res.data.data;
};
