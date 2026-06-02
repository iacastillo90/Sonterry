import React, { useState } from 'react';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import CheckoutSummary from './components/CheckoutSummary';
import './Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment

  return (
    <div className="container checkout-root">
      <h2 className="checkout-title">Formulario de Pedido & Especificaciones</h2>

      <div className="checkout-grid">
        
        {/* Step Form Box */}
        <div className="checkout-form-box">
          {step === 1 ? (
            <div>
              <h3 className="checkout-step-title">1. Información de Despacho</h3>
              <ShippingForm onNext={() => setStep(2)} />
            </div>
          ) : (
            <div>
              <h3 className="checkout-step-title">2. Método de Pago</h3>
              <PaymentForm onBack={() => setStep(1)} />
            </div>
          )}
        </div>

        {/* Order Summary Side */}
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
