import React from 'react';
import Header from '../components/layout/Header';
import Toast from '../components/common/Toast';

const CheckoutLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '2rem 0' }}>{children}</main>
      <Toast />
    </div>
  );
};

export default CheckoutLayout;
