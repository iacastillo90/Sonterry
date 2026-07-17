import React, { useState } from 'react';
import { Plus, AlertTriangle, Send, Paperclip, ArrowLeft, Download } from 'lucide-react';
import { useUserTickets, useCreateTicket, useReplyTicket } from '../../../queries/useTickets';
import { useUiStore } from '../../../store/uiStore';
import { formatDate } from '../../../utils/formatDate';
import './ProfileSupport.css';

const ProfileSupport = () => {
  const addToast = useUiStore((state) => state.addToast);
  const { data: tickets, isLoading: isLoadingTickets } = useUserTickets();
  const createTicketMutation = useCreateTicket();

  const [ticketType, setTicketType] = useState('queja');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [supportView, setSupportView] = useState('nuevo');

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyFile, setReplyFile] = useState(null);
  const [previewAttachment, setPreviewAttachment] = useState(null);
  const replyTicketMutation = useReplyTicket();

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      return addToast('Por favor completa todos los campos del ticket', 'warning');
    }
    setIsSubmittingTicket(true);
    try {
      await createTicketMutation.mutateAsync({
        type: ticketType,
        subject: ticketSubject.trim(),
        description: ticketDescription.trim()
      });
      addToast('Ticket enviado al equipo de soporte', 'success');
      setTicketSubject('');
      setTicketDescription('');
      setSupportView('historial');
    } catch (error) {
      addToast('Error al enviar el ticket de soporte', 'error');
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() && !replyFile) {
      return addToast('Por favor escribe un mensaje o adjunta un archivo', 'warning');
    }
    try {
      const formData = new FormData();
      if (replyContent.trim()) formData.append('content', replyContent.trim());
      else formData.append('content', 'Archivo adjunto'); // Default content if only file

      if (replyFile) formData.append('attachment', replyFile);

      await replyTicketMutation.mutateAsync({ id: selectedTicket._id, formData });
      addToast('Respuesta enviada', 'success');
      setReplyContent('');
      setReplyFile(null);

      // Update selectedTicket from the refetched list if possible, or just let the query update it.
      // Since queryClient.invalidateQueries runs, we might need to manually update selectedTicket or let it re-render.
      // Easiest is to close it or refetch it. Let's just null it out or fetch updated.
      // For now, we rely on the parent list updating it.
      setSelectedTicket(null);
      setSelectedTicket(null);
    } catch (error) {
      addToast('Error al enviar la respuesta', 'error');
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
      window.open(url, '_blank');
    }
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <h3 className="support-title">Soporte Técnico & Reclamaciones</h3>
        <p className="support-subtitle">
          ¿Tienes alguna inconformidad con tu pedido o deseas reportar alguna devolución o retraso? Crea un ticket y te contactaremos por WhatsApp.
        </p>
      </div>

      {/* Sub-tabs for Support */}
      <div className="support-tabs">
        <button
          className={`support-tab ${supportView === 'nuevo' && !selectedTicket ? 'active' : ''}`}
          onClick={() => { setSupportView('nuevo'); setSelectedTicket(null); }}
        >
          Crear Nuevo Ticket
        </button>
        <button
          className={`support-tab ${supportView === 'historial' && !selectedTicket ? 'active' : ''}`}
          onClick={() => { setSupportView('historial'); setSelectedTicket(null); }}
        >
          Historial de Tickets
        </button>
      </div>

      <div>
        {/* Submit Ticket Form */}
        {supportView === 'nuevo' && (
          <div className="support-card animate-fade-in">
            <form onSubmit={handleSubmitTicket} className="support-form">
              <div className="support-field">
                <label>Tipo de Solicitud</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="support-select"
                >
                  <option value="queja">Queja / Inconformidad</option>
                  <option value="reclamo">Reclamo Técnico</option>
                  <option value="devolucion">Solicitud de Devolución</option>
                  <option value="pedido_pendiente">Pedido Pendiente / Retraso</option>
                  <option value="otro">Otro Asunto</option>
                </select>
              </div>

              <div className="support-field">
                <label>Asunto corto</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Ej: Retraso en el envío de gorras"
                  className="support-input"
                />
              </div>

              <div className="support-field">
                <label>Descripción detallada</label>
                <textarea
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Describe ampliamente tu solicitud. Si aplica, incluye el código del pedido..."
                  className="support-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingTicket}
                className="support-submit-btn"
              >
                <Plus size={18} />
                <span>{isSubmittingTicket ? 'Creando Ticket...' : 'Generar Ticket'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Selected Ticket Thread View */}
        {selectedTicket && (
          <div className="animate-fade-in">
            <button
              onClick={() => setSelectedTicket(null)}
              className="support-back-btn"
            >
              <ArrowLeft size={16} /> Volver al historial
            </button>

            <div className="support-card">
              <div className="support-ticket-header">
                <span className="ticket-type-badge">
                  {selectedTicket.type}
                </span>
                <span className={`ticket-status-badge ${selectedTicket.status}`}>
                  {selectedTicket.status === 'open' ? 'Abierto' : selectedTicket.status === 'in_progress' ? 'En Curso' : selectedTicket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                </span>
              </div>
              <h4 className="support-ticket-subject">{selectedTicket.subject}</h4>
              <p className="support-ticket-desc" style={{ WebkitLineClamp: 'unset' }}>{selectedTicket.description}</p>
              <div className="support-ticket-date">Generado el {formatDate(selectedTicket.createdAt)}</div>
            </div>

            <div className="support-thread-messages">
              {selectedTicket.messages && selectedTicket.messages.map((msg, idx) => (
                <div key={idx} className={`support-message ${msg.sender === 'user' ? 'user' : 'admin'}`}>
                  <p className="support-message-content">{msg.content}</p>
                  
                  {msg.attachment && (
                    <div className="support-attachment">
                      <Paperclip size={16} />
                      <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Archivo adjunto</span>
                      <div className="attachment-actions">
                        <button type="button" onClick={() => setPreviewAttachment(msg.attachment)} className="attachment-btn">
                          Ver
                        </button>
                        <button type="button" onClick={() => handleDownload(msg.attachment)} className="attachment-btn">
                          <Download size={14} /> Descargar
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="support-message-date">
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
              <form onSubmit={handleReplySubmit} className="support-reply-form">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="support-textarea"
                  style={{ minHeight: '80px' }}
                />
                <div className="support-reply-controls">
                  <label className="file-upload-label">
                    <Paperclip size={18} />
                    <span>{replyFile ? replyFile.name : 'Adjuntar archivo'}</span>
                    <input type="file" onChange={(e) => setReplyFile(e.target.files[0])} style={{ display: 'none' }} accept="image/*,.pdf" />
                  </label>

                  <button
                    type="submit"
                    disabled={replyTicketMutation.isLoading}
                    className="support-submit-btn"
                    style={{ marginTop: 0 }}
                  >
                    <Send size={16} /> Enviar Respuesta
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tickets list */}
        {supportView === 'historial' && !selectedTicket && (
          <div className="animate-fade-in">
            {isLoadingTickets ? (
              <div className="wishlist-state">
                <Loader size={32} className="spin" color="var(--green-brand)" />
                <p>Cargando tickets...</p>
              </div>
            ) : !tickets || tickets.length === 0 ? (
              <div className="wishlist-empty">
                <AlertTriangle size={48} strokeWidth={1} color="var(--color-text-light)" />
                <h3 style={{fontFamily: 'var(--font-display)', margin: 0, color: 'var(--text-primary)'}}>Sin tickets</h3>
                <p>No tienes tickets creados actualmente.</p>
              </div>
            ) : (
              <div className="support-tickets-grid">
                {tickets.map((t) => (
                  <div
                    key={t._id}
                    onClick={() => setSelectedTicket(t)}
                    className="support-ticket-item"
                  >
                    <div className="support-ticket-header">
                      <span className="ticket-type-badge">{t.type}</span>
                      <span className={`ticket-status-badge ${t.status}`}>
                        {t.status === 'open' ? 'Abierto' : t.status === 'in_progress' ? 'En Curso' : t.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                      </span>
                    </div>

                    <h5 className="support-ticket-subject">{t.subject}</h5>
                    <p className="support-ticket-desc">{t.description}</p>
                    <div className="support-ticket-date">Generado el {formatDate(t.createdAt)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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

    </div>
  );
};

export default ProfileSupport;
