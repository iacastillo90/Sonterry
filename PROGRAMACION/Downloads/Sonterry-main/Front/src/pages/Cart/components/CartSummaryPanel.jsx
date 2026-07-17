import React from 'react';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import Button from '../../../components/common/Button';

const CartSummaryPanel = ({ total, freeShippingLimit, onCheckout }) => {
  const progressPercent = Math.min(100, (total / freeShippingLimit) * 100);

  return (
    <div className="cart-panel cart-summary-panel">
      <h3 className="cart-summary-title">Resumen del Pedido</h3>

      <div className="cart-summary-rows">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Subtotal artículos</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="cart-summary-row">
          <span className="cart-summary-label">Envío a Colombia</span>
          <span>{total >= freeShippingLimit ? 'Gratis' : '$12,000 COP'}</span>
        </div>
        <div className="cart-summary-total">
          <span>Total Estimado</span>
          <span className="cart-summary-total-price">
            {formatCurrency(total + (total >= freeShippingLimit ? 0 : 12000))}
          </span>
        </div>
      </div>

      <Button
        variant="accent"
        onClick={onCheckout}
        className="cart-summary-btn"
      >
        <span>Proceder al Checkout</span>
        <ArrowRight size={18} />
      </Button>

      {/* Simulated CTA Banner / Brand security guarantees */}
      <div className="cart-summary-guarantees">
        <div className="cart-guarantee-item">
          <ShieldCheck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span className="cart-guarantee-text">
            Pasarela 100% encriptada y segura. Soportamos tarjetas de crédito y PSE.
          </span>
        </div>
        <div className="cart-guarantee-item">
          <Truck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          <span className="cart-guarantee-text">
            Despachos rápidos por Servientrega o Coordinadora con guía de rastreo.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryPanel;
