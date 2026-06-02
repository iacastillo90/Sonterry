import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { useCheckoutStore } from '../../../store/checkoutStore';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUiStore } from '../../../store/uiStore';
import Button from '../../../components/common/Button';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { Landmark, CreditCard, Banknote } from 'lucide-react';

const PaymentForm = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [bankAccounts, setBankAccounts] = useState([]);
  
  const { shippingAddress } = useCheckoutStore();
  const { items, getCartTotal, clearCart } = useCartStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const { data } = await api.get('/bank-accounts');
        setBankAccounts(data.data || []);
      } catch (err) {
        console.error('Error fetching bank accounts:', err);
      }
    };
    fetchBankAccounts();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order in Backend
      const orderResponse = await api.post('/orders', {
        shippingAddress,
        paymentMethod
      });
      const order = orderResponse.data.data;

      // 2. If it's a card payment, process with Stripe (Stub)
      if (paymentMethod === 'tarjeta') {
        await api.post('/payments/charge', {
          orderId: order._id,
          paymentMethodId: 'stripe_payment_stub_id'
        });
        addToast('¡Pedido creado y pagado con éxito!', 'success');
      } else {
        // If it's transfer or deposit, just mark as created (pending payment validation)
        addToast('¡Pedido creado! Pendiente de validación de pago.', 'success');
      }

      clearCart();
      navigate('/profile');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error en el procesamiento del pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredBanks = bankAccounts.filter(acc => acc.supportedMethods === 'ambas' || acc.supportedMethods === paymentMethod);

  return (
    <div className="payment-form">
      <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <h4 style={{ marginBottom: '0.5rem' }}>Resumen de Envío:</h4>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
        <p>WhatsApp: {shippingAddress.phone}</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Selecciona tu método de pago:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          
          <div onClick={() => setPaymentMethod('tarjeta')} style={{ border: `2px solid ${paymentMethod === 'tarjeta' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'tarjeta' ? '#F0FDF4' : '#FFF' }}>
            <CreditCard size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'tarjeta' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Tarjeta (Crédito/Débito)</span>
          </div>

          <div onClick={() => setPaymentMethod('transferencia')} style={{ border: `2px solid ${paymentMethod === 'transferencia' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'transferencia' ? '#F0FDF4' : '#FFF' }}>
            <Landmark size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'transferencia' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Transferencia Bancaria</span>
          </div>

          <div onClick={() => setPaymentMethod('deposito')} style={{ border: `2px solid ${paymentMethod === 'deposito' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'deposito' ? '#F0FDF4' : '#FFF' }}>
            <Banknote size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'deposito' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Depósito en Efectivo</span>
          </div>

        </div>
      </div>

      {paymentMethod === 'tarjeta' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#475569' }}>Información de Tarjeta de Crédito (Demostración):</h4>
          <input type="text" placeholder="4242 4242 4242 4242" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
          <div className="shipping-form-row">
            <input type="text" placeholder="12 / 29" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
            <input type="text" placeholder="123" disabled style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--color-bg)' }} />
          </div>
        </div>
      )}

      {(paymentMethod === 'transferencia' || paymentMethod === 'deposito') && (
        <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
            Cuentas Disponibles para {paymentMethod === 'transferencia' ? 'Transferencias' : 'Depósitos'}:
          </h4>
          {filteredBanks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: '#D9534F' }}>No hay cuentas habilitadas para este método de pago por el momento.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBanks.map(acc => (
                <div key={acc._id} style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '1rem', background: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Landmark size={18} color="var(--color-primary)" />
                    <strong style={{ fontSize: '1rem' }}>{acc.bankName}</strong>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li><strong>Tipo de Cuenta:</strong> {acc.accountType}</li>
                    <li><strong>Número:</strong> {acc.accountNumber}</li>
                    <li><strong>Titular:</strong> {acc.ownerName}</li>
                    <li><strong>Documento:</strong> {acc.ownerDocument}</li>
                    {acc.phoneNumber && <li><strong>Teléfono / Celular:</strong> {acc.phoneNumber}</li>}
                  </ul>
                </div>
              ))}
              <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#B45309' }}>
                <p style={{ margin: 0 }}><strong>Nota importante:</strong> Una vez finalices tu pedido, te contactaremos por WhatsApp o correo para que nos envíes el comprobante de pago.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="payment-actions">
        <Button variant="outline" onClick={onBack} disabled={loading}>Atrás</Button>
        <Button variant="accent" style={{ flexGrow: 1 }} onClick={handlePayment} disabled={loading || ((paymentMethod === 'transferencia' || paymentMethod === 'deposito') && filteredBanks.length === 0)}>
          {loading ? 'Procesando...' : `Confirmar y Crear Pedido por ${formatCurrency(getCartTotal())}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
