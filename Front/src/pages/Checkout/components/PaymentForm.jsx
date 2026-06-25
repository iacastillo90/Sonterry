import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../../store/cartStore';
import { useCheckoutStore } from '../../../store/checkoutStore';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUiStore } from '../../../store/uiStore';
import Button from '../../../components/common/Button';
import api from '../../../services/api';
import { createWompiTransaction } from '../../../services/wompi.service';
import { useNavigate } from 'react-router-dom';
import { Landmark, CreditCard, Banknote } from 'lucide-react';

const PaymentForm = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wompi');
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

  const syncCartToBackend = async () => {
    // Reemplaza el carrito de MongoDB con los items de Zustand
    try {
      // Clear ALL server cart items with single request
      await api.delete('/cart');

      // Add ALL items from Zustand
      for (const item of items) {
        await api.post('/cart', {
          productId: item.product._id || item.product,
          quantity: item.quantity,
          customization: item.customization || undefined,
        });
      }
    } catch (err) {
      console.error('Error syncing cart:', err);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Sync Zustand cart to MongoDB before creating order
      await syncCartToBackend();

      const orderResponse = await api.post('/orders', {
        shippingAddress,
        paymentMethod
      });
      const order = orderResponse.data.data;

      if (paymentMethod === 'wompi') {
        let transactionData;
        try {
          transactionData = await createWompiTransaction(order._id);

          await loadWompiScript(transactionData.publicKey);

          const user = JSON.parse(localStorage.getItem('st_user'));

          const widget = new window.WidgetCheckout({
            currency: transactionData.currency || 'COP',
            amountInCents: transactionData.amountInCents,
            reference: transactionData.reference,
            publicKey: transactionData.publicKey,
            signature: {
              integrity: transactionData.integritySignature,
            },
            customerData: {
              email: user?.email || '',
            },
          });

          widget.open((result) => {
            console.log('Wompi transaction result:', result);
            const transaction = result?.transaction;
            if (transaction) {
              const status = transaction.status === 'APPROVED' ? 'APPROVED' : 'DECLINED';
              navigate(`/checkout/callback?ref=${transaction.reference}&transaction_id=${transaction.id}&status=${status}`);
            }
          });
        } catch (wompiError) {
          setLoading(false);
          console.error('Wompi error:', wompiError);
          console.error('Wompi error name:', wompiError.name);
          console.error('Wompi error message:', wompiError.message);
          console.error('Wompi error stack:', wompiError.stack);
          console.error('Wompi error response:', wompiError.response);

          const errorMsg = wompiError.response?.data?.message
            || wompiError.message
            || 'Error al procesar el pago';

          addToast(errorMsg, 'error');

          if (wompiError.message === 'WOMPI_SCRIPT_TIMEOUT' && transactionData) {
            const checkoutUrl = `https://checkout.wompi.co/pay?public-key=${transactionData.publicKey}&currency=COP&amount-in-cents=${transactionData.amountInCents}&reference=${transactionData.reference}&redirect-url=${window.location.origin}/checkout/callback`;
            window.open(checkoutUrl, '_blank');
          }
        }
      } else {
        addToast('¡Pedido creado! Pendiente de validación de pago.', 'success');
        clearCart();
        navigate('/profile');
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Error en el procesamiento del pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadWompiScript = (publicKey) => {
    return new Promise((resolve, reject) => {
      if (window.WompiWidget) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.async = true;
      script.setAttribute('data-public-key', publicKey);

      const timeout = setTimeout(() => {
        script.onload = null;
        script.onerror = null;
        reject(new Error('WOMPI_SCRIPT_TIMEOUT'));
      }, 5000);

      script.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('WOMPI_SCRIPT_TIMEOUT'));
      };

      document.head.appendChild(script);
    });
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
          
          <div onClick={() => setPaymentMethod('wompi')} style={{ border: `2px solid ${paymentMethod === 'wompi' ? 'var(--color-primary)' : 'var(--border-subtle)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', backgroundColor: paymentMethod === 'wompi' ? '#F0FDF4' : '#FFF' }}>
            <CreditCard size={24} style={{ margin: '0 auto 0.5rem', color: paymentMethod === 'wompi' ? 'var(--color-primary)' : '#64748B' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Pagar con Wompi</span>
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

      {paymentMethod === 'wompi' && (
        <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>Pago Seguro con Wompi</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
            Paga de forma segura con Wompi. Aceptamos tarjetas, PSE, Nequi, Daviplata y más.
          </p>
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
                    <li><strong>Documento:</strong> {acc.ownerDoc}</li>
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
