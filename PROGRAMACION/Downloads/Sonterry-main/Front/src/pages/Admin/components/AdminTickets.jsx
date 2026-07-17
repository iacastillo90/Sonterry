import React, { useState, useMemo } from 'react';
import { AlertCircle, MessageSquare, CheckCircle, Mail, Phone, Paperclip, Download, Search, Filter, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
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
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const [deleteConfirmTicketId, setDeleteConfirmTicketId] = useState(null);

  // Filtering & Pagination
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = url.split('/').pop() || 'adjunto';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar:', error);
      // Fallback a abrir en nueva pestaña si falla el CORS
      window.open(url, '_blank');
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

  const executeDeleteTicket = async (id) => {
    setUpdatingTicketId(id);
    try {
      await api.delete(`/tickets/${id}`);
      addToast('Ticket eliminado permanentemente', 'success');
      setDeleteConfirmTicketId(null);
      if (refetchTickets) refetchTickets();
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al eliminar el ticket', 'error');
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

  const filteredTickets = useMemo(() => {
    return (tickets || []).filter(t => {
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchType = typeFilter === 'all' || t.type === typeFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch = (t.subject || '').toLowerCase().includes(q) || 
                          (t.user?.name || '').toLowerCase().includes(q) || 
                          (t.user?.email || '').toLowerCase().includes(q);
      return matchStatus && matchType && matchSearch;
    });
  }, [tickets, statusFilter, typeFilter, searchQuery]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Tickets de Soporte de Clientes</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Monitorea y atiende las consultas, quejas y reclamos que los usuarios registran en la plataforma. Responde directamente a los clientes.
      </p>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Buscar por asunto, nombre o correo del cliente..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', flex: '1 1 auto' }}>
          <Filter size={18} color="#64748B" style={{ flexShrink: 0 }} />
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '150px' }}
          >
            <option value="all">Todas las Categorías</option>
            <option value="queja">Quejas</option>
            <option value="reclamo">Reclamos</option>
            <option value="devolucion">Devoluciones</option>
            <option value="pedido_pendiente">Pedidos Pendientes</option>
            <option value="otro">Otros</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '150px' }}
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="open">Abiertos</option>
            <option value="in_progress">En Curso</option>
            <option value="resolved">Resueltos</option>
            <option value="closed">Cerrados</option>
          </select>
        </div>
      </div>

      {loadingTickets ? (
        <LoadingSpinner />
      ) : filteredTickets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', color: '#94A3B8' }} />
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>No se encontraron tickets.</p>
          <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); setTypeFilter('all'); }} style={{ marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Limpiar filtros</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {paginatedTickets.map((t) => {
              const statusColor = getStatusColor(t.status);
              return (
                <div key={t._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem', backgroundColor: '#FDFCFB', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'box-shadow 0.2s', height: '100%', minWidth: 0 }} onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ backgroundColor: 'rgba(0,0,0,0.06)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', marginRight: '0.5rem', textTransform: 'uppercase', color: '#475569', display: 'inline-block', marginBottom: '0.25rem' }}>{t.type}</span>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0F172A', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.subject}</span>
                    </div>
                    <span style={{ color: statusColor, fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', background: `${statusColor}15`, padding: '4px 12px', borderRadius: '20px', border: `1px solid ${statusColor}30`, flexShrink: 0 }}>{t.status === 'in_progress' ? 'en curso' : t.status}</span>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                    {t.description.length > 180 ? t.description.substring(0, 180) + '...' : t.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: '#64748B' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><Mail size={14} flexShrink={0} /> <strong>{t.user?.email || 'N/A'}</strong></span>
                      <span style={{ fontSize: '0.75rem' }}>{formatDate(t.createdAt)}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'nowrap' }}>
                      <select
                        value={t.status}
                        onChange={(e) => handleUpdateTicket(t._id, e.target.value)}
                        disabled={updatingTicketId === t._id}
                        style={{ flex: 1, minWidth: 0, padding: '0.4rem 0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', backgroundColor: '#F8FAFC', cursor: 'pointer', outline: 'none', fontWeight: '500', color: '#334155' }}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="open">Abierto</option>
                        <option value="in_progress">En Curso</option>
                        <option value="resolved">Resuelto</option>
                        <option value="closed">Cerrado</option>
                      </select>
                      
                      <Button variant="primary" onClick={() => setSelectedTicket(t)} style={{ flex: 1, padding: '0.4rem 0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        <MessageSquare size={16} /> Gestionar
                      </Button>
                      <button onClick={() => setDeleteConfirmTicketId(t._id)} title="Eliminar ticket permanentemente" style={{ flexShrink: 0, background: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA', padding: '0.4rem 0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '500' }}>
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredTickets.length)} de {filteredTickets.length} tickets
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFF', color: currentPage === 1 ? '#94A3B8' : '#334155', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFF', color: currentPage === totalPages ? '#94A3B8' : '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
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
                  {msg.attachment && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', background: msg.sender === 'admin' ? '#D1FAE5' : '#E2E8F0', padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${msg.sender === 'admin' ? '#A7F3D0' : '#CBD5E1'}`, width: 'fit-content' }}>
                      <Paperclip size={16} color={msg.sender === 'admin' ? '#065F46' : '#475569'} />
                      <span style={{ fontSize: '0.85rem', color: msg.sender === 'admin' ? '#065F46' : '#475569', fontWeight: '500' }}>
                        Archivo adjunto
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
                        <button type="button" onClick={() => setPreviewAttachment(msg.attachment)} style={{ fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none', fontWeight: '600', padding: '4px 8px', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '4px', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}>
                          Ver
                        </button>
                        <button type="button" onClick={() => handleDownload(msg.attachment)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none', fontWeight: '600', padding: '4px 8px', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '4px', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}>
                          <Download size={14} /> Descargar
                        </button>
                      </div>
                    </div>
                  )}
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

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10001, backdropFilter: 'blur(3px)' }} onClick={() => setPreviewAttachment(null)}>
          <button onClick={() => setPreviewAttachment(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', fontSize: '2rem', color: '#FFF', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10002, transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.9)'} onMouseLeave={e => e.currentTarget.style.backgroundColor='rgba(0,0,0,0.6)'}>&times;</button>
          <div style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            {previewAttachment.toLowerCase().endsWith('.pdf') ? (
              <iframe src={previewAttachment} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px', backgroundColor: '#FFF' }} title="PDF Adjunto" />
            ) : (
              <img src={previewAttachment} alt="Adjunto" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} />
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTicketId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 12000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#0F172A' }}>¿Eliminar Ticket?</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Esta acción es permanente e irreversible. Se borrará todo el hilo de mensajes y archivos adjuntos asociados. ¿Estás seguro?
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="button" variant="outline" onClick={() => setDeleteConfirmTicketId(null)} style={{ flex: 1, padding: '0.75rem' }}>
                Cancelar
              </Button>
              <Button type="button" variant="primary" disabled={updatingTicketId === deleteConfirmTicketId} onClick={() => executeDeleteTicket(deleteConfirmTicketId)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#EF4444', borderColor: '#EF4444' }}>
                {updatingTicketId === deleteConfirmTicketId ? 'Eliminando...' : 'Sí, Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTickets;
