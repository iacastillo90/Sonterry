import React, { useState } from 'react';
import { useUserOrders } from '../../../queries/useOrders';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import OrderTracking from './OrderTracking';

const OrderHistory = () => {
  const { data: orders, isLoading } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  if (!orders || orders.length === 0) {
    return <p style={{ opacity: 0.7 }}>Aún no has solicitado ningún trabajo en el taller.</p>;
  }

  return (
    <div>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Historial de Trabajos</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.map((order) => (
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
                backgroundColor: order.status === 'paid' ? 'var(--color-primary)' : order.status === 'shipped' ? 'var(--color-accent)' : '#ccc',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>{order.status === 'shipped' ? 'En Tránsito' : order.status}</span>
            </div>
            
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
              Solicitado el {formatDate(order.createdAt)}
            </div>

            <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>
              Total: {formatCurrency(order.total)}
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{ marginTop: '2.5rem' }}>
          <OrderTracking order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
