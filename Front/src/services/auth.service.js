import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data.data;
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data.data.user;
};

export const updateProfile = async (profileData) => {
  const res = await api.patch('/auth/profile', profileData);
  return res.data.data.user;
};
