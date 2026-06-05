import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft, Package } from 'lucide-react';
import api from '../../services/api';

const CheckoutCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const ref = searchParams.get('ref');
  const transactionId = searchParams.get('transaction_id');
  const paymentStatus = searchParams.get('status');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!ref) {
        setLoading(false);
        return;
      }

      try {
        const orderId = ref.split('-')[1];
        if (orderId) {
          const response = await api.get(`/orders/${orderId}`);
          const order = response.data.data || response.data;
          if (order?.status === 'paid') {
            localStorage.removeItem('st_cart');
          }
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [ref, transactionId, paymentStatus]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          <p style={{ marginTop: '1rem', color: '#666' }}>Verificando tu pago...</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'APPROVED') {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <CheckCircle size={64} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>¡Pago Exitoso!</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Tu pago ha sido procesado correctamente. Puedes ver los detalles de tu pedido en tu perfil.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/profile" style={{
            padding: '0.75rem 1.5rem',
            background: '#000',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Package size={18} /> Ver mis pedidos
          </Link>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'DECLINED' || paymentStatus === 'ERROR') {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <XCircle size={64} style={{ color: '#ef4444', margin: '0 auto 1rem' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pago Rechazado</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          El pago no pudo ser procesado. Por favor intenta de nuevo con otro método de pago.
        </p>
        <button onClick={() => navigate('/checkout')} style={{
          padding: '0.75rem 1.5rem',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <ArrowLeft size={18} /> Volver al checkout
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
      <Clock size={64} style={{ color: '#f59e0b', margin: '0 auto 1rem' }} />
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pago en Proceso</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Tu pago está siendo procesado. Te notificaremos cuando se confirme.
      </p>
      <Link to="/profile" style={{
        padding: '0.75rem 1.5rem',
        background: '#000',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Package size={18} /> Mis pedidos
      </Link>
    </div>
  );
};

export default CheckoutCallback;
