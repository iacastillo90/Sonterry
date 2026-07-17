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
import './OrderHistory.css';

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
  <div onClick={onClose} className="order-modal-overlay">
    <div onClick={e => e.stopPropagation()} className="order-modal-content">
      <h3 className="order-modal-title">Cancelar pedido</h3>
      <p className="order-modal-text">
        ¿Estás seguro de cancelar este pedido? Esta acción no se puede deshacer.
      </p>
      <div className="order-modal-actions">
        <button onClick={onClose} disabled={loading} className="order-action-btn secondary">
          No, mantener
        </button>
        <button onClick={onConfirm} disabled={loading} className="order-action-btn danger">
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
    <div className="orders-container">
      <div className="orders-header">
        <h3 className="orders-title">Historial de Trabajos</h3>
        
        <div className="orders-filters">
          {[{ key: '', label: 'Todos' }, { key: 'pending', label: 'Pendiente' }, { key: 'paid', label: 'En Proceso' }, { key: 'shipped', label: 'En Camino' }, { key: 'delivered', label: 'Completado' }].map(f => (
            <button
              key={f.key}
              onClick={() => { setStatusFilter(f.key); setSelectedOrder(null); }}
              className={`order-filter-btn ${statusFilter === f.key ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="orders-empty-state">
          <p>No hay trabajos que coincidan con este estado.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => {
            const canCancel = CANCELABLE_STATUSES.includes(order.status);

          return (
            <div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
              className={`order-card ${selectedOrder?._id === order._id ? 'selected' : ''}`}
            >
              <div className="order-card-header">
                <span className="order-card-id">Trabajo #{order._id.substring(18)}</span>
                <span className={`order-status-badge ${order.status}`}>
                  {order.status === 'shipped' ? 'En Tránsito' : order.status === 'cancelled' ? 'Cancelado' : order.status}
                </span>
              </div>
              
              <div className="order-card-date">
                Solicitado el {formatDate(order.createdAt)}
              </div>

              {order.items && order.items.length > 0 && (
                <div className="order-card-items-preview">
                  {order.items[0].product && order.items[0].product.images && order.items[0].product.images.length > 0 ? (
                    <img 
                      src={order.items[0].product.images[0]} 
                      alt={order.items[0].name} 
                      className="order-preview-image"
                    />
                  ) : (
                    <div className="order-preview-image-placeholder">Sin IMG</div>
                  )}
                  <div className="order-preview-details">
                    <h4 className="order-preview-title">{order.items[0].name}</h4>
                    <p className="order-preview-summary">
                      {order.items.length > 1 
                        ? `+${order.items.length - 1} artículo(s) más` 
                        : `Cant: ${order.items[0].quantity}`}
                    </p>
                  </div>
                </div>
              )}

              <div className="order-card-total">
                Total: {formatCurrency(order.total)}
              </div>

              <div className="order-card-actions">
                {order.status === 'pending' && order.paymentMethod === 'wompi' && (
                  <button
                    onClick={e => handlePayNow(e, order)}
                    disabled={payingId === order._id}
                    className="order-action-btn primary"
                  >
                    {payingId === order._id ? 'Procesando...' : 'Pagar ahora'}
                  </button>
                )}
                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={e => handleEditItemsClick(e, order)}
                      className="order-action-btn secondary"
                    >
                      Editar items
                    </button>
                    <button
                      onClick={e => handleEditShippingClick(e, order)}
                      className="order-action-btn secondary"
                    >
                      Editar dirección
                    </button>
                  </>
                )}
                {canCancel && (
                  <button
                    onClick={e => handleCancelClick(e, order)}
                    className="order-action-btn danger"
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
                    className="order-action-btn review"
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
        <div className="order-tracking-wrapper">
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
