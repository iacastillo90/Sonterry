import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { X } from 'lucide-react';
import Button from '../common/Button';
import CartItem from './CartItem';

const CartDrawer = () => {
  const { cartOpen, toggleCart } = useUiStore();
  const { items, removeFromCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(61, 61, 61, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 500,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s'
    }} onClick={() => toggleCart(false)}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#FFFFFF',
        height: '100%',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} onClick={(e) => e.stopPropagation()}>

        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Bolsa de Personalización</h3>
          <Button variant="text" onClick={() => toggleCart(false)}><X size={22} /></Button>
        </div>

        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: 'var(--color-text-light)' }}>Tu bolsa está vacía.</p>
              <Button variant="primary" style={{ marginTop: '1rem' }} onClick={() => { toggleCart(false); navigate('/productos'); }}>Ver Diseños</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item, idx) => (
                <CartItem
                  key={idx}
                  item={item}
                  onRemove={() => removeFromCart(item.product._id, item.customization?.type)}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '700', fontSize: '1.1rem' }}>
              <span>Total Estimado:</span>
              <span>{formatCurrency(getCartTotal())}</span>
            </div>
            <Button variant="accent" style={{ width: '100%' }} onClick={() => { toggleCart(false); navigate('/checkout'); }}>
              Iniciar Proyecto / Pago
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
