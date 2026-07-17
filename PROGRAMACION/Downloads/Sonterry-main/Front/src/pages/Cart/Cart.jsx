import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { formatCurrency } from '../../utils/formatCurrency';
import CartEmptyState from './components/CartEmptyState';
import CartItemList from './components/CartItemList';
import CartSummaryPanel from './components/CartSummaryPanel';
import './Cart.css';

const Cart = () => {
  const { items, fetchCart, removeFromCart, updateItemQuantity, getCartTotal } = useCartStore();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const navigate = useNavigate();

  // Auto-refresh cart from backend on mount if user is authenticated
  // Only replace local items if backend returns data (don't empty local cart)
  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();
    
    fetchCart().then(/* no-op — fetchCart handles the update */);
    
    return () => controller.abort();
  }, [isAuthenticated, fetchCart]);

  const handleQtyChange = (item, delta) => {
    const newQty = item.quantity + delta;
    updateItemQuantity(item.product._id, newQty, item.customization?.type);
  };

  const total = getCartTotal();
  const freeShippingLimit = 150000;
  const progressPercent = Math.min(100, (total / freeShippingLimit) * 100);

  return (
    <div className="container cart-root">
      <h2 className="cart-title">Tu Bolsa de Proyectos</h2>
      <p className="cart-subtitle">
        Revisa las prendas y los accesorios que deseas estampar antes de proceder a la pasarela de pago seguro.
      </p>

      {items.length === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="cart-layout">
          
          {/* Left Panel: Items and Shipping Progress */}
          <div className="cart-panel">
            {/* Free Shipping Progress */}
            <div className="cart-shipping-bar">
              <div className="cart-shipping-text">
                <strong>
                  {total >= freeShippingLimit 
                    ? '¡Felicidades! Tienes Envío Gratis a toda Colombia' 
                    : `Te faltan ${formatCurrency(freeShippingLimit - total)} para Envío Gratis`}
                </strong>
                <span className="cart-summary-label">{Math.round(progressPercent)}%</span>
              </div>
              <div className="cart-shipping-progress">
                <div 
                  className="cart-shipping-fill" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>

            {/* List */}
            <CartItemList 
              items={items} 
              onUpdateQty={handleQtyChange} 
              onRemove={removeFromCart} 
            />
          </div>

          {/* Right Panel: Checkout Summary */}
          <CartSummaryPanel 
            total={total} 
            freeShippingLimit={freeShippingLimit} 
            onCheckout={() => navigate('/checkout')} 
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
