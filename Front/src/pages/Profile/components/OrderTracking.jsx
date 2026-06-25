import React from 'react';
import { formatDate } from '../../../utils/formatDate';

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
  const steps = [
    { key: 'pending', label: 'Orden Recibida' },
    { key: 'paid', label: 'Pago Aprobado (Preparando Estampado)' },
    { key: 'shipped', label: 'En Tránsito ( WhatsApp Notificado)' },
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
    <div style={{
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
      animation: 'fadeIn 0.4s'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Progreso de tu Personalización</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {steps.map((st, idx) => {
          const status = getStepStatus(st.key);
          const isCompleted = status === 'completed';
          const trackingLog = order.trackingHistory?.find(h => h.status === st.key);

          return (
            <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              
              {/* Visual timeline circle indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                  border: isCompleted ? '4px solid #F5F1E8' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2
                }} />
                {idx < steps.length - 1 && (
                  <div style={{
                    width: '2px',
                    height: '50px',
                    backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                    margin: '4px 0',
                    zIndex: 1
                  }} />
                )}
              </div>

              {/* Status details */}
              <div style={{ flexGrow: 1 }}>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  margin: 0,
                  color: isCompleted ? 'var(--color-text)' : 'var(--color-text-light)'
                }}>{st.label}</h4>
                {trackingLog && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
                    {formatDate(trackingLog.date)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {order.shippingDetails?.trackingNumber && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1rem' }}>Información de Despacho</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Transportadora</span>
              <span style={{ fontSize: '1rem', fontWeight: '500', color: '#334155' }}>{order.shippingDetails.company || 'N/A'}</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Número de Guía</span>
              <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary)' }}>{order.shippingDetails.trackingNumber}</span>
            </div>
          </div>
          
          <a 
            href={getTrackingLink(order.shippingDetails.company, order.shippingDetails.trackingNumber)} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block', 
              padding: '0.75rem 1.5rem', 
              background: 'var(--color-primary)', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'background 0.2s',
              textAlign: 'center',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            Rastrear en página oficial
          </a>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
