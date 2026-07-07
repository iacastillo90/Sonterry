import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useCartStore } from './store/cartStore';
import { useAuthStore } from './store/authStore';
import './assets/css/App.css';

const queryClient = new QueryClient();

function AppContent() {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const verifySession = useAuthStore((state) => state.verifySession);
  const sessionChecked = useAuthStore((state) => state.sessionChecked);

  useEffect(() => {
    // Verificar token silenciosamente al arrancar.
    // Si está expirado, limpia el estado sin redirigir al login.
    verifySession().then(() => {
      fetchCart();
    });
  }, [verifySession, fetchCart]);

  // No montar el router hasta saber el estado real de la sesión.
  // Evita que ProtectedRoute redirija al login con un token expirado todavía en localStorage.
  if (!sessionChecked) {
    return <LoadingSpinner size="large" />;
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner size="large" />}>
          <AppContent />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

