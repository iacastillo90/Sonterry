import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';

const CartItemList = ({ items, onUpdateQty, onRemove }) => {
  return (
    <div className="cart-items-container">
      {items.map((item, idx) => (
        <div key={idx} className="cart-item">
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
              className="cart-qty-btn"
            >
              <Minus size={14} />
            </button>
            <span className="cart-qty-value">{item.quantity}</span>
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
      ))}
    </div>
  );
};

export default CartItemList;
