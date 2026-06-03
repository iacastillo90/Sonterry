import React from 'react';
import { useUiStore } from '../../store/uiStore';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Toast = (props) => {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div {...props} style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      zIndex: 2000,
      maxWidth: '350px',
      width: '100%'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        
        return (
          <div key={toast.id} style={{
            padding: '1rem',
            borderRadius: 'var(--border-radius-sm)',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: '#FFFFFF',
            borderLeft: `4px solid ${isSuccess ? 'var(--color-success)' : isError ? 'var(--color-danger)' : 'var(--color-warning)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isSuccess && <CheckCircle size={18} color="var(--color-success)" />}
              {isError && <AlertCircle size={18} color="var(--color-danger)" />}
              {!isSuccess && !isError && <Info size={18} color="var(--color-warning)" />}
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
