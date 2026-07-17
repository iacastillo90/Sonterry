import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'var(--color-primary)' }) => {
  const sizes = { small: '20px', medium: '40px', large: '60px' };
  const spinnerSize = sizes[size] || sizes.medium;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{
        width: spinnerSize,
        height: spinnerSize,
        border: '3px solid var(--color-border)',
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
