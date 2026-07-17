import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';

const getItemKey = (item, idx) => `${item.product._id}-${item.customization?.type || 'none'}-${idx}`;

const CartItemList = ({ items, onUpdateQty, onRemove }) => {
  const [inputValues, setInputValues] = useState({});
  const debounceTimers = useRef({});

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(t => clearTimeout(t));
    };
  }, []);

  const handleInputChange = (item, idx, rawValue) => {
    const key = getItemKey(item, idx);
    const parsed = parseInt(rawValue, 10);
    const clamped = Math.max(1, Math.min(parsed || 1, item.product.stock));

    setInputValues(prev => ({ ...prev, [key]: rawValue }));

    // Clear existing debounce
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }

    // Debounce the actual update (150ms)
    debounceTimers.current[key] = setTimeout(() => {
      if (clamped !== item.quantity) {
        onUpdateQty(item, clamped - item.quantity);
      }
      setInputValues(prev => ({ ...prev, [key]: String(clamped) }));
    }, 150);
  };

  const handleInputBlur = (item, idx) => {
    const key = getItemKey(item, idx);
    // Clear debounce on blur — apply immediately
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    const val = parseInt(inputValues[key], 10);
    const clamped = Math.max(1, Math.min(val || item.quantity, item.product.stock));
    if (clamped !== item.quantity) {
      onUpdateQty(item, clamped - item.quantity);
    }
    setInputValues(prev => ({ ...prev, [key]: String(clamped) }));
  };

  return (
    <div className="cart-items-container">
      {items.map((item, idx) => {
        const key = getItemKey(item, idx);
        const displayValue = key in inputValues ? inputValues[key] : String(item.quantity);
        const atMin = item.quantity <= 1;

        return (
          <div key={key} className="cart-item">
            <img
              src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
              alt={item.product.name}
              className="cart-item-img"
            />

            <div className="cart-item-info">
              <h4 className="cart-item-title">{item.product.name}</h4>
              
              {item.customization && item.customization.type !== 'none' && (
                <div className="cart-item-customization">
                  Personalización: {item.customization.type.toUpperCase()} 
                  {item.customization.details ? ` (${item.customization.details})` : ''}
                </div>
              )}

              <div className="cart-item-price">
                {formatCurrency(item.product.price)} c/u
              </div>
            </div>

            <div className="cart-qty-ctrl">
              <button
                onClick={() => onUpdateQty(item, -1)}
                disabled={atMin}
                className="cart-qty-btn"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                min={1}
                max={item.product.stock}
                value={displayValue}
                onChange={e => handleInputChange(item, idx, e.target.value)}
                onBlur={() => handleInputBlur(item, idx)}
                className="cart-qty-input"
              />
              <button
                onClick={() => onUpdateQty(item, 1)}
                disabled={item.quantity >= item.product.stock}
                className="cart-qty-btn"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="cart-item-action">
              <div className="cart-item-total">
                {formatCurrency(item.product.price * item.quantity)}
              </div>
              <button
                onClick={() => onRemove(item.product._id, item.customization?.type)}
                className="cart-item-remove"
              >
                <Trash2 size={14} />
                <span>Quitar</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemList;
