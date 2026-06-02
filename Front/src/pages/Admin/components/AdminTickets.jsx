import React, { useState } from 'react';
import { AlertCircle, MessageSquare, CheckCircle, Mail, Phone } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { formatDate } from '../../../utils/formatDate';
import { useUpdateTicketStatus } from '../../../queries/useTickets';
import api from '../../../services/api';

const AdminTickets = ({ tickets, loadingTickets, addToast, refetchTickets }) => {
  const [updatingTicketId, setUpdatingTicketId] = useState(null);
  const updateTicketStatusMutation = useUpdateTicketStatus();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleUpdateTicket = async (ticketId, nextStatus) => {
    setUpdatingTicketId(ticketId);
    try {
      await updateTicketStatusMutation.mutateAsync({ id: ticketId, status: nextStatus });
      addToast(`Ticket actualizado a estado: ${nextStatus.toUpperCase()}`, 'success');
      if (refetchTickets) refetchTickets();
    } catch (error) {
      addToast('Error al actualizar estado del ticket', 'error');
    } finally {
      setUpdatingTicketId(null);
    }
  };

  const handleReply = async (statusUpdate = null) => {
    if (!replyContent.trim()) {
      addToast('Debes escribir un mensaje para responder', 'warning');
      return;
    }
    setUpdatingTicketId(selectedTicket._id);
    try {
      await api.post(`/tickets/${selectedTicket._id}/reply`, { content: replyContent, statusUpdate });
      addToast(statusUpdate === 'resolved' ? 'Respuesta enviada y ticket resuelto' : 'Respuesta enviada', 'success');
      setReplyContent('');
      setSelectedTicket(null);
      if (refetchTickets) refetchTickets();
    } catch (error) {
      addToast('Error al enviar respuesta', 'error');
    } finally {
      setUpdatingTicketId(null);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'pending') return '#D9534F'; // red
    if (status === 'open' || status === 'in_progress') return '#F0AD4E'; // orange
    if (status === 'resolved' || status === 'closed') return '#166534'; // green
    return '#999';
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Tickets de Soporte de Clientes</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Monitorea y atiende las consultas, quejas y reclamos que los usuarios registran en la plataforma. Responde directamente a los clientes.
      </p>

      {loadingTickets ? (
        <LoadingSpinner />
      ) : (!tickets || tickets.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-primary)' }} />
          <p>No hay tickets de soporte registrados.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {tickets.map((t) => {
            const statusColor = getStatusColor(t.status);
            return (
              <div key={t._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem', backgroundColor: '#FDFCFB', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '600', marginRight: '0.5rem', textTransform: 'uppercase' }}>{t.type}</span>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E293B' }}>{t.subject}</span>
                  </div>
                  <span style={{ color: statusColor, fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', background: `${statusColor}20`, padding: '4px 10px', borderRadius: '20px' }}>{t.status}</span>
                </div>

                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: '1.4' }}>
                  {t.description.length > 150 ? t.description.substring(0, 150) + '...' : t.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0F0F0', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Por: <strong>{t.user?.name || 'Cliente'}</strong></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {t.user?.email}</span>
                    <span>{formatDate(t.createdAt)}</span>
                  </div>
                  
                  <Button variant="primary" onClick={() => setSelectedTicket(t)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MessageSquare size={14} /> Gestionar y Responder
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Management Modal */}
      {selectedTicket && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '95%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginRight: '0.5rem' }}>{selectedTicket.type}</span>
                <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#0F172A' }}>{selectedTicket.subject}</span>
              </div>
              <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}>&times;</button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Cliente</p>
                <p style={{ margin: 0, fontWeight: 700, color: '#1E293B' }}>{selectedTicket.user?.name}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}><Mail size={14} /> {selectedTicket.user?.email}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Estado Actual</p>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', color: getStatusColor(selectedTicket.status) }}>{selectedTicket.status}</span>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', marginTop: '0.25rem' }}>Abierto: {formatDate(selectedTicket.createdAt)}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Original Message */}
              <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>MENSAJE ORIGINAL ({formatDate(selectedTicket.createdAt)})</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{selectedTicket.description}</p>
              </div>

              {/* Thread */}
              {selectedTicket.messages && selectedTicket.messages.map((msg, idx) => (
                <div key={idx} style={{ 
                  alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'admin' ? '#E6F4EA' : '#F1F5F9',
                  border: `1px solid ${msg.sender === 'admin' ? '#CEEAD6' : '#E2E8F0'}`,
                  padding: '1rem', 
                  borderRadius: '8px',
                  maxWidth: '85%'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: msg.sender === 'admin' ? '#166534' : '#64748B', fontWeight: 700 }}>
                    {msg.sender === 'admin' ? 'TÚ (ADMIN)' : 'CLIENTE'} • {formatDate(msg.createdAt)}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' ? (
              <div style={{ marginTop: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.5rem' }}>Responder al Cliente</label>
                <textarea 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta aquí. El cliente la verá en su panel..."
                  style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                  <Button variant="outline" onClick={() => handleReply('in_progress')} disabled={updatingTicketId === selectedTicket._id}>
                    Enviar Respuesta
                  </Button>
                  <Button variant="primary" onClick={() => handleReply('resolved')} disabled={updatingTicketId === selectedTicket._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} /> Enviar y Resolver Ticket
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', color: '#166534' }}>
                <CheckCircle size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ margin: '0 0 0.25rem 0' }}>Ticket Resuelto</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Este caso ya ha sido solucionado y cerrado. El cliente puede reabrirlo si envía un nuevo mensaje.</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTickets;
