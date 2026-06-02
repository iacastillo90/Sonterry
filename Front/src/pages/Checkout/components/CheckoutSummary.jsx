import React from 'react';
import { useCartStore } from '../../../store/cartStore';
import { formatCurrency } from '../../../utils/formatCurrency';

const CheckoutSummary = () => {
  const { items, getCartTotal } = useCartStore();

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--color-border)'
    }}>
      <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Resumen del Proyecto</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>{item.quantity}x {item.product.name}</span>
            <span style={{ fontWeight: '600' }}>{formatCurrency(item.product.price * item.quantity)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
          <span>Total:</span>
          <span>{formatCurrency(getCartTotal())}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
