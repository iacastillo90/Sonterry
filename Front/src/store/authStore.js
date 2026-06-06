import { create } from 'zustand';
import { useCartStore } from './cartStore';

import api from '../services/api';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('st_user')) || null,
  token: localStorage.getItem('st_token') || null,
  isAuthenticated: !!localStorage.getItem('st_token'),
  loading: false,
  error: null,

  /**
   * Synchronize token after silent refresh (called by api.js interceptor).
   * Keeps Zustand state in sync with localStorage without a full page reload.
   */
  setToken: (token) => {
    set({ token, isAuthenticated: true });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem('st_token', token);
      localStorage.setItem('st_user', JSON.stringify(user));

      set({ token, user, isAuthenticated: true, loading: false });

      await useCartStore.getState().fetchCart();

      return user;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error al iniciar sesión';
      set({ error: errMsg, loading: false });
      throw new Error(errMsg);
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data.data;

      localStorage.setItem('st_token', token);
      localStorage.setItem('st_user', JSON.stringify(user));

      set({ token, user, isAuthenticated: true, loading: false });

      await useCartStore.getState().fetchCart();

      return user;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Error al registrarse';
      set({ error: errMsg, loading: false });
      throw new Error(errMsg);
    }
  },
  
  updateUser: (updatedUser) => {
    localStorage.setItem('st_user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // If logout endpoint fails (network, etc.), still clear local state
    }
    localStorage.removeItem('st_token');
    localStorage.removeItem('st_user');
    set({ token: null, user: null, isAuthenticated: false, error: null });

    useCartStore.getState().clearCart();
  },
}));
