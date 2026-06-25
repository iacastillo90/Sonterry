import React, { useState } from 'react';
import { Plus, AlertTriangle, Send, Paperclip, ArrowLeft, Download } from 'lucide-react';
import { useUserTickets, useCreateTicket, useReplyTicket } from '../../../queries/useTickets';
import { useUiStore } from '../../../store/uiStore';
import { formatDate } from '../../../utils/formatDate';

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
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Soporte Técnico & Reclamaciones</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        ¿Tienes alguna inconformidad con tu pedido o deseas reportar alguna devolución o retraso? Crea un ticket y te contactaremos por WhatsApp.
      </p>

      {/* Sub-tabs for Support */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
        <button
          onClick={() => { setSupportView('nuevo'); setSelectedTicket(null); }}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: supportView === 'nuevo' && !selectedTicket ? 'var(--color-primary)' : 'var(--color-text-light)',
            borderBottom: supportView === 'nuevo' && !selectedTicket ? '2px solid var(--color-primary)' : 'none',
            paddingBottom: '0.25rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Crear Nuevo Ticket
        </button>
        <button
          onClick={() => { setSupportView('historial'); setSelectedTicket(null); }}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: supportView === 'historial' ? 'var(--color-primary)' : 'var(--color-text-light)',
            borderBottom: supportView === 'historial' ? '2px solid var(--color-primary)' : 'none',
            paddingBottom: '0.25rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Historial de Tickets
        </button>
      </div>

      <div>

        {/* Submit Ticket Form */}
        {supportView === 'nuevo' && (
          <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }} className="animate-fade-in">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Tipo de Solicitud
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="queja">Queja / Inconformidad</option>
                <option value="reclamo">Reclamo Técnico</option>
                <option value="devolucion">Solicitud de Devolución</option>
                <option value="pedido_pendiente">Pedido Pendiente / Retraso</option>
                <option value="otro">Otro Asunto</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Asunto corto
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Ej: Retraso en el envío de gorras"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                Descripción detallada
              </label>
              <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Describe ampliamente tu solicitud. Si aplica, incluye el código del pedido..."
                style={{
                  width: '100%',
                  height: '140px',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingTicket}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'var(--transition-smooth)',
                opacity: isSubmittingTicket ? 0.7 : 1,
                width: 'fit-content'
              }}
            >
              <Plus size={18} />
              <span>{isSubmittingTicket ? 'Creando Ticket...' : 'Generar Ticket'}</span>
            </button>
          </form>
        )}

        {/* Selected Ticket Thread View */}
        {selectedTicket && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '700px' }}>
            <button
              onClick={() => setSelectedTicket(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none',
                color: 'var(--color-text-light)', cursor: 'pointer', width: 'fit-content', padding: 0,
                fontWeight: '600', fontSize: '0.9rem'
              }}
            >
              <ArrowLeft size={16} /> Volver al historial
            </button>

            <div style={{ backgroundColor: '#FDFCFB', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase', backgroundColor: '#EAEAEA', padding: '4px 10px', borderRadius: '4px' }}>
                  {selectedTicket.type}
                </span>
                <span style={{ fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '4px', color: '#FFFFFF', backgroundColor: selectedTicket.status === 'open' ? 'var(--color-primary)' : selectedTicket.status === 'in_progress' ? 'var(--color-accent)' : selectedTicket.status === 'resolved' ? '#2E7D32' : '#888' }}>
                  {selectedTicket.status === 'open' ? 'Abierto' : selectedTicket.status === 'in_progress' ? 'En Curso' : selectedTicket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{selectedTicket.subject}</h4>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>{selectedTicket.description}</p>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>{formatDate(selectedTicket.createdAt)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {selectedTicket.messages && selectedTicket.messages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : '#EAEAEA',
                  color: msg.sender === 'user' ? '#FFFFFF' : 'var(--color-text)',
                  padding: '1rem',
                  borderRadius: '8px',
                  maxWidth: '80%',
                  borderBottomRightRadius: msg.sender === 'user' ? '0' : '8px',
                  borderBottomLeftRadius: msg.sender === 'user' ? '8px' : '0',
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  {msg.attachment && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', background: msg.sender === 'user' ? '#1E40AF' : '#E2E8F0', padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${msg.sender === 'user' ? '#1D4ED8' : '#CBD5E1'}`, width: 'fit-content' }}>
                      <Paperclip size={16} color={msg.sender === 'user' ? '#DBEAFE' : '#475569'} />
                      <span style={{ fontSize: '0.85rem', color: msg.sender === 'user' ? '#DBEAFE' : '#475569', fontWeight: '500' }}>
                        Archivo adjunto
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
                        <button type="button" onClick={() => setPreviewAttachment(msg.attachment)} style={{ fontSize: '0.75rem', color: msg.sender === 'user' ? '#FFF' : '#2563EB', textDecoration: 'none', fontWeight: '600', padding: '4px 8px', backgroundColor: msg.sender === 'user' ? 'rgba(255,255,255,0.2)' : 'rgba(37, 99, 235, 0.1)', borderRadius: '4px', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}>
                          Ver
                        </button>
                        <button type="button" onClick={() => handleDownload(msg.attachment)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: msg.sender === 'user' ? '#FFF' : '#2563EB', textDecoration: 'none', fontWeight: '600', padding: '4px 8px', backgroundColor: msg.sender === 'user' ? 'rgba(255,255,255,0.2)' : 'rgba(37, 99, 235, 0.1)', borderRadius: '4px', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}>
                          <Download size={14} /> Descargar
                        </button>
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: '0.7rem', opacity: 0.8, textAlign: 'right', marginTop: '0.5rem' }}>
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
              <form onSubmit={handleReplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  style={{
                    width: '100%', height: '80px', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                    <Paperclip size={18} />
                    <span>{replyFile ? replyFile.name : 'Adjuntar archivo'}</span>
                    <input type="file" onChange={(e) => setReplyFile(e.target.files[0])} style={{ display: 'none' }} accept="image/*,.pdf" />
                  </label>

                  <button
                    type="submit"
                    disabled={replyTicketMutation.isLoading}
                    style={{
                      backgroundColor: 'var(--color-accent)', color: '#FFFFFF', border: 'none', padding: '0.6rem 1.5rem',
                      borderRadius: 'var(--border-radius-sm)', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      opacity: replyTicketMutation.isLoading ? 0.7 : 1
                    }}
                  >
                    <Send size={16} /> Enviar
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
              <p>Cargando tickets...</p>
            ) : !tickets || tickets.length === 0 ? (
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No tienes tickets creados actualmente.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tickets.map((t) => (
                  <div
                    key={t._id}
                    onClick={() => setSelectedTicket(t)}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      padding: '1.25rem',
                      backgroundColor: '#FDFCFB',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{
                        fontWeight: '600',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        backgroundColor: '#EAEAEA',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        color: 'var(--color-text)'
                      }}>{t.type}</span>

                      <span style={{
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        color: '#FFFFFF',
                        backgroundColor: t.status === 'open' ? 'var(--color-primary)'
                          : t.status === 'in_progress' ? 'var(--color-accent)'
                            : t.status === 'resolved' ? '#2E7D32' : '#888'
                      }}>
                        {t.status === 'open' ? 'Abierto' : t.status === 'in_progress' ? 'En Curso' : t.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                      </span>
                    </div>

                    <h5 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>{t.subject}</h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                      {t.description}
                    </p>
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>Generado el {formatDate(t.createdAt)}</span>
                    </div>
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
