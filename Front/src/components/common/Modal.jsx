import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(61, 61, 61, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--border-radius-md)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh',
        animation: 'fadeIn 0.3s ease-out'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h3>
          <Button variant="text" onClick={onClose}><X size={20} /></Button>
        </div>
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, minHeight: 0 }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
