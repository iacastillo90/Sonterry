import React from 'react';
import Toast from '../components/common/Toast';

const AuthLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)',
        animation: 'fadeIn 0.4s ease-out'
      }}>
        {children}
      </div>
      <Toast />
    </div>
  );
};

export default AuthLayout;
