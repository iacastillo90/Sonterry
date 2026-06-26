import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUserOrders } from '../../../queries/useOrders';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import OrderTracking from './OrderTracking';
import api from '../../../services/api';
import { createWompiTransaction } from '../../../services/wompi.service';
import { useUiStore } from '../../../store/uiStore';
import EditItemsModal from './EditItemsModal';
import EditShippingModal from './EditShippingModal';
import ReviewOrderModal from './ReviewOrderModal';

const CANCELABLE_STATUSES = ['pending', 'paid'];

const loadWompiScript = (publicKey) => {
  return new Promise((resolve, reject) => {
    if (window.WompiWidget) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.setAttribute('data-public-key', publicKey);
    const timeout = setTimeout(() => {
      script.onload = null;
      script.onerror = null;
      reject(new Error('WOMPI_SCRIPT_TIMEOUT'));
    }, 5000);
    script.onload = () => { clearTimeout(timeout); resolve(); };
    script.onerror = () => { clearTimeout(timeout); reject(new Error('WOMPI_SCRIPT_TIMEOUT')); };
    document.head.appendChild(script);
  });
};

const CancelModal = ({ order, onConfirm, onClose, loading }) => (
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

const OrderHistory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToast = useUiStore(s => s.addToast);
  const { data: orders, isLoading } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [editItemsOrder, setEditItemsOrder] = useState(null);
  const [editShippingOrder, setEditShippingOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [orderToReview, setOrderToReview] = useState(null);

  React.useEffect(() => {
    if (orders && orders.length > 0) {
      // Find the first delivered order that hasn't been dismissed OR submitted
      const deliveredOrder = orders.find(o => 
        o.status === 'delivered' && 
        !localStorage.getItem(`has_dismissed_review_${o._id}`) &&
        !localStorage.getItem(`has_submitted_review_${o._id}`)
      );
      if (deliveredOrder) {
        setOrderToReview(deliveredOrder);
      }
    }
  }, [orders]);

  const handlePayNow = async (e, order) => {
    e.stopPropagation();
    setPayingId(order._id);
    try {
      const transactionData = await createWompiTransaction(order._id);
      await loadWompiScript(transactionData.publicKey);

      const user = JSON.parse(localStorage.getItem('st_user'));

      const widget = new window.WidgetCheckout({
        currency: transactionData.currency || 'COP',
        amountInCents: transactionData.amountInCents,
        reference: transactionData.reference,
        publicKey: transactionData.publicKey,
        signature: { integrity: transactionData.integritySignature },
        customerData: { email: user?.email || '' },
      });

      widget.open((result) => {
        const transaction = result?.transaction;
        if (transaction) {
          const status = transaction.status === 'APPROVED' ? 'APPROVED' : 'DECLINED';
          navigate(`/checkout/callback?ref=${transaction.reference}&transaction_id=${transaction.id}&status=${status}`);
        }
      });
    } catch (wompiError) {
      const errorMsg = wompiError.response?.data?.message || wompiError.message || 'Error al procesar el pago';
      addToast(errorMsg, 'error');

      // Fallback: si el script no cargó, abrir checkout directo
      if (wompiError.message === 'WOMPI_SCRIPT_TIMEOUT') {
        addToast('El widget no cargó, intenta de nuevo', 'error');
      }
    } finally {
      setPayingId(null);
    }
  };

  const handleCancelClick = (e, order) => {
    e.stopPropagation();
    setCancellingId(order._id);
    setShowCancelModal(true);
    setIsCancelling(false);
  };

  const handleConfirmCancel = async () => {
    if (!cancellingId) return;
    setIsCancelling(true);
    try {
      await api.patch(`/orders/${cancellingId}/cancel`);
      addToast('Pedido cancelado exitosamente', 'success');
      setShowCancelModal(false);
      setCancellingId(null);
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al cancelar el pedido';
      addToast(msg, 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleEditItemsClick = (e, order) => {
    e.stopPropagation();
    setEditItemsOrder(order);
  };

  const handleEditShippingClick = (e, order) => {
    e.stopPropagation();
    setEditShippingOrder(order);
  };

  const handleCloseModal = () => {
    if (isCancelling) return;
    setShowCancelModal(false);
    setCancellingId(null);
    setIsCancelling(false);
  };

  if (isLoading) return <LoadingSpinner />;

  if (!orders) {
    return <p style={{ opacity: 0.7 }}>Aún no has solicitado ningún trabajo en el taller.</p>;
  }

  const filteredOrders = orders.filter(o => statusFilter ? o.status === statusFilter : true);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Historial de Trabajos</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[{ key: '', label: 'Todos' }, { key: 'pending', label: 'Pendiente' }, { key: 'paid', label: 'En Proceso' }, { key: 'shipped', label: 'En Camino' }, { key: 'delivered', label: 'Completado' }].map(f => (
            <button
              key={f.key}
              onClick={() => { setStatusFilter(f.key); setSelectedOrder(null); }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: statusFilter === f.key ? 'none' : '1px solid #cbd5e1',
                background: statusFilter === f.key ? 'var(--color-primary)' : '#fff',
                color: statusFilter === f.key ? '#fff' : '#475569',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', margin: 0 }}>No hay trabajos que coincidan con este estado.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredOrders.map((order) => {
            const canCancel = CANCELABLE_STATUSES.includes(order.status);

          return (
            <div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem',
                borderRadius: 'var(--border-radius-sm)',
                border: selectedOrder?._id === order._id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Trabajo #{order._id.substring(18)}</span>
                <span style={{
                  backgroundColor: order.status === 'paid' ? 'var(--color-primary)' : order.status === 'shipped' ? 'var(--color-accent)' : order.status === 'cancelled' ? '#DC2626' : '#ccc',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>{order.status === 'shipped' ? 'En Tránsito' : order.status === 'cancelled' ? 'Cancelado' : order.status}</span>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                Solicitado el {formatDate(order.createdAt)}
              </div>

              <div style={{ fontWeight: '600', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Total: {formatCurrency(order.total)}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {order.status === 'pending' && order.paymentMethod === 'wompi' && (
                  <button
                    onClick={e => handlePayNow(e, order)}
                    disabled={payingId === order._id}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--color-primary)',
                      backgroundColor: 'var(--color-primary)',
                      color: '#FFFFFF',
                      cursor: payingId === order._id ? 'not-allowed' : 'pointer',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      opacity: payingId === order._id ? 0.7 : 1,
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    {payingId === order._id ? 'Procesando...' : 'Pagar ahora'}
                  </button>
                )}
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={e => handleEditItemsClick(e, order)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFF',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      Editar items
                    </button>
                    <button
                      onClick={e => handleEditShippingClick(e, order)}
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFF',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      Editar dirección
                    </button>
                  </>
                )}
                {canCancel && (
                  <button
                    onClick={e => handleCancelClick(e, order)}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid #FCA5A5',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      transition: 'var(--transition-smooth)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                  >
                    Cancelar pedido
                  </button>
                )}
                {order.status === 'delivered' && !localStorage.getItem(`has_submitted_review_${order._id}`) && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setOrderToReview(order);
                    }}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid #FCD34D',
                      backgroundColor: '#FFFBEB',
                      color: '#D97706',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      transition: 'var(--transition-smooth)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEF3C7'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFBEB'}
                  >
                    ★ Dejar Reseña
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}

      {selectedOrder && (
        <div style={{ marginTop: '2.5rem' }}>
          <OrderTracking order={selectedOrder} />
        </div>
      )}

      {showCancelModal && (
        <CancelModal
          order={orders.find(o => o._id === cancellingId)}
          onConfirm={handleConfirmCancel}
          onClose={handleCloseModal}
          loading={isCancelling}
        />
      )}

      {editItemsOrder && (
        <EditItemsModal
          order={editItemsOrder}
          onClose={() => setEditItemsOrder(null)}
        />
      )}

      {editShippingOrder && (
        <EditShippingModal
          order={editShippingOrder}
          onClose={() => setEditShippingOrder(null)}
        />
      )}

      {orderToReview && (
        <ReviewOrderModal
          order={orderToReview}
          onClose={() => setOrderToReview(null)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
