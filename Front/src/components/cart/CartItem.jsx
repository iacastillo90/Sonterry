import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Trash2 } from 'lucide-react';
import Button from '../common/Button';

const CartItem = ({ item, onRemove }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      borderBottom: '1px solid var(--color-border)',
      paddingBottom: '1.25rem'
    }}>
      <img
        src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500'}
        alt={item.product.name}
        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }}
      />
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.product.name}</h4>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '500', margin: '2px 0' }}>
          {item.quantity} x {formatCurrency(item.product.price)}
        </div>
        {item.customization && (
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', borderLeft: '2px solid var(--color-primary)', paddingLeft: '4px' }}>
            Estampado: {item.customization.type.toUpperCase()} ({item.customization.details})
          </div>
        )}
      </div>
      {onRemove && (
        <Button variant="text" onClick={onRemove}>
          <Trash2 size={16} color="var(--color-danger)" />
        </Button>
      )}
    </div>
  );
};

export default CartItem;
