import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('st_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry the refresh endpoint itself
    if (error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')) {

      // Solo intentar refresh si el usuario tenía una sesión activa (había token).
      // Si es un visitante anónimo, simplemente rechazar sin redirigir al login.
      const hadToken = !!localStorage.getItem('st_token');
      if (!hadToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token is auto-sent via HttpOnly cookie (withCredentials: true)
        const baseURL = import.meta.env.VITE_API_URL || '/api';
        const { data } = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = data.data.accessToken;

        localStorage.setItem('st_token', newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('st_token');
        localStorage.removeItem('st_user');
        // Limpiar el estado de Zustand sin redirigir — ProtectedRoute
        // se encarga de proteger las rutas que lo necesitan.
        // Un visitante anónimo con token expirado puede seguir navegando.
        try {
          const { useAuthStore } = await import('../store/authStore');
          useAuthStore.setState({ token: null, user: null, isAuthenticated: false, sessionChecked: true });
        } catch { /* ignorar si el store no está disponible */ }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
