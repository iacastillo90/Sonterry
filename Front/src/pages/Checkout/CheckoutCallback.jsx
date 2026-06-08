import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft, Package } from 'lucide-react';
import api from '../../services/api';
import { useUiStore } from '../../store/uiStore';

const CancelModal = ({ onConfirm, onClose, loading }) => (
  <div
    onClick={onClose}
    style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '420px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1.25rem' }}>
        Cancelar pedido
      </h3>
      <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        ¿Estás seguro de cancelar este pedido? Esta acción no se puede deshacer.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#FFF',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          No, mantener
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#DC2626',
            color: '#FFF',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Cancelando...' : 'Sí, cancelar'}
        </button>
      </div>
    </div>
  </div>
);

const CheckoutCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const addToast = useUiStore(s => s.addToast);
  const [loading, setLoading] = useState(true);
  const [confirmResult, setConfirmResult] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const ref = searchParams.get('ref');
  const transactionId = searchParams.get('transaction_id');
  const paymentStatus = searchParams.get('status');
  const orderId = ref ? ref.split('-')[1] : null;

  useEffect(() => {
    const confirmPayment = async () => {
      if (!ref) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.post('/payments/wompi/confirm', {
          reference: ref,
          transactionId,
        });
        const result = response.data;
        const order = result?.data?.order;
        const txStatus = result?.data?.transactionStatus;

        setConfirmResult({
          success: txStatus === 'APPROVED',
          orderStatus: order?.status,
          txStatus,
        });

        if (txStatus === 'APPROVED' || order?.status === 'paid') {
          localStorage.removeItem('st_cart');
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        setConfirmResult({
          success: paymentStatus === 'APPROVED',
          orderStatus: 'pending',
          txStatus: paymentStatus,
        });
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [ref, transactionId, paymentStatus]);

  const handleCancelClick = () => {
    if (!orderId) {
      addToast('No se pudo identificar el pedido a cancelar', 'error');
      return;
    }
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!orderId) return;
    setCancelling(true);
    try {
      await api.patch(`/orders/${orderId}/cancel`);
      addToast('Pedido cancelado exitosamente', 'success');
      setShowCancelModal(false);
      setCancelling(false);
      navigate('/profile');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al cancelar el pedido';
      addToast(msg, 'error');
      setShowCancelModal(false);
      setCancelling(false);
    }
  };

  const handleCloseModal = () => {
    if (!cancelling) {
      setShowCancelModal(false);
    }
  };

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

  const isApproved = confirmResult?.success ?? paymentStatus === 'APPROVED';
  const isDeclined = !isApproved && (paymentStatus === 'DECLINED' || paymentStatus === 'ERROR');

  if (isApproved) {
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

  if (isDeclined) {
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
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        {orderId && (
          <button
            onClick={handleCancelClick}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#FFF',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Cancelar pedido
          </button>
        )}
      </div>

      {showCancelModal && (
        <CancelModal
          onConfirm={handleConfirmCancel}
          onClose={handleCloseModal}
          loading={cancelling}
        />
      )}
    </div>
  );
};

export default CheckoutCallback;
