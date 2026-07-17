import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import './OrderTracking.css';

const getTrackingLink = (company, trackingNumber) => {
  switch (company) {
    case 'Inter Rapidísimo':
      return `https://www.interrapidisimo.com/sigue-tu-envio/?guia=${trackingNumber}`;
    case 'Coordinadora':
      return `https://www.coordinadora.com/portafolio-de-servicios/servicios-en-linea/rastrear-guias/?guia=${trackingNumber}`;
    case 'Servientrega':
      return `https://www.servientrega.com/wps/portal/Colombia/transacciones-personas/rastreo-envios/?guia=${trackingNumber}`; // Approximate
    case 'Envía':
      return 'https://enviacolombia.com/';
    case 'TCC':
      return 'https://www.tcc.com.co/logistica/rastreo/';
    default:
      return '#';
  }
};

const OrderTracking = ({ order }) => {
  const navigate = useNavigate();

  const steps = [
    { key: 'pending', label: 'Orden Recibida' },
    { key: 'paid', label: 'Pago Aprobado (Preparando Estampado)' },
    { key: 'shipped', label: 'En Tránsito (WhatsApp Notificado)' },
    { key: 'delivered', label: 'Entregado con Éxito' }
  ];

  // Helper to determine step status
  const getStepStatus = (stepKey) => {
    const statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    const currentIdx = statuses.indexOf(order.status);
    const stepIdx = statuses.indexOf(stepKey);

    if (order.status === 'cancelled') return 'cancelled';
    if (currentIdx >= stepIdx) return 'completed';
    return 'pending';
  };

  return (
    <div className="tracking-container">
      <h3 className="tracking-title">Detalles del Pedido #{order._id.substring(18)}</h3>

      {/* Order Items List */}
      <div className="tracking-items-list">
        {order.items && order.items.map((item, index) => {
          const productId = item.product?._id || item.product; // In case it's populated or just ID
          const imageUrl = item.product?.images?.[0];

          return (
            <div key={index} className="tracking-item-card">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={item.name} 
                  className="tracking-item-image" 
                  onClick={() => navigate(`/products/${productId}`)}
                />
              ) : (
                <div 
                  className="tracking-item-placeholder"
                  onClick={() => navigate(`/products/${productId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  Sin IMG
                </div>
              )}
              <div className="tracking-item-details">
                <h4 
                  className="tracking-item-name"
                  onClick={() => navigate(`/products/${productId}`)}
                >
                  {item.name}
                </h4>
                <div className="tracking-item-meta">
                  <span>Cant: <strong>{item.quantity}</strong></span>
                  {item.customization?.type && (
                    <span>
                      Técnica: <strong>{item.customization.type === 'serigrafia' ? 'Serigrafía' : 'DTF'}</strong>
                    </span>
                  )}
                </div>
                <div className="tracking-item-price">
                  {formatCurrency(item.price)} c/u
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="tracking-title" style={{ marginTop: '3rem' }}>Progreso de tu Personalización</h3>

      <div className="tracking-timeline">
        {steps.map((st, idx) => {
          const status = getStepStatus(st.key);
          const isCompleted = status === 'completed';
          const trackingLog = order.trackingHistory?.find(h => h.status === st.key);

          return (
            <div key={idx} className="tracking-step">
              
              {/* Visual timeline circle indicator */}
              <div className="tracking-indicator">
                <div className={`tracking-circle ${isCompleted ? 'completed' : 'pending'}`} />
                {idx < steps.length - 1 && (
                  <div className={`tracking-line ${isCompleted ? 'completed' : 'pending'}`} />
                )}
              </div>

              {/* Status details */}
              <div className="tracking-step-details">
                <h4 className={`tracking-step-label ${isCompleted ? 'completed' : 'pending'}`}>
                  {st.label}
                </h4>
                {trackingLog && (
                  <div className="tracking-step-date">
                    {formatDate(trackingLog.date)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {order.shippingDetails?.trackingNumber && (
        <div className="tracking-shipping-box">
          <h4 className="tracking-shipping-title">Información de Despacho</h4>
          <div className="tracking-shipping-grid">
            <div>
              <span className="tracking-shipping-label">Transportadora</span>
              <span className="tracking-shipping-value">{order.shippingDetails.company || 'N/A'}</span>
            </div>
            <div>
              <span className="tracking-shipping-label">Número de Guía</span>
              <span className="tracking-shipping-value highlight">{order.shippingDetails.trackingNumber}</span>
            </div>
          </div>
          
          <a 
            href={getTrackingLink(order.shippingDetails.company, order.shippingDetails.trackingNumber)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tracking-btn"
          >
            Rastrear en página oficial
          </a>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
