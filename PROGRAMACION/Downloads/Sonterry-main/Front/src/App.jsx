import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useCartStore } from './store/cartStore';
import './assets/css/App.css';

const queryClient = new QueryClient();

function AppContent() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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

