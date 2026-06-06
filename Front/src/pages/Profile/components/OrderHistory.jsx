import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserOrders } from '../../../queries/useOrders';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import OrderTracking from './OrderTracking';
import api from '../../../services/api';
import { useUiStore } from '../../../store/uiStore';

const CANCELABLE_STATUSES = ['pending', 'paid'];

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
  const addToast = useUiStore(s => s.addToast);
  const { data: orders, isLoading } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancelClick = (e, order) => {
    e.stopPropagation();
    setShowCancelModal(true);
    setCancellingId(order._id);
  };

  const handleConfirmCancel = async () => {
    if (!cancellingId) return;
    try {
      await api.patch(`/orders/${cancellingId}/cancel`);
      addToast('Pedido cancelado exitosamente', 'success');
      setShowCancelModal(false);
      setCancellingId(null);
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al cancelar el pedido';
      addToast(msg, 'error');
      setShowCancelModal(false);
      setCancellingId(null);
    }
  };

  const handleCloseModal = () => {
    if (!cancellingId) {
      setShowCancelModal(false);
      setCancellingId(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!orders || orders.length === 0) {
    return <p style={{ opacity: 0.7 }}>Aún no has solicitado ningún trabajo en el taller.</p>;
  }

  return (
    <div>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Historial de Trabajos</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.map((order) => {
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
            </div>
          );
        })}
      </div>

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
          loading={!!cancellingId && showCancelModal}
        />
      )}
    </div>
  );
};

export default OrderHistory;
