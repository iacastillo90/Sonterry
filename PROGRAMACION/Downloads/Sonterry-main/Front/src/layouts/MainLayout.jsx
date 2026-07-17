import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import Toast from '../components/common/Toast';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <CartDrawer />
      <Toast data-cy="auth-toast" />
    </div>
  );
};

export default MainLayout;
