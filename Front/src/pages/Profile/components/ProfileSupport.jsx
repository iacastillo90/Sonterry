import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { useUserTickets, useCreateTicket } from '../../../queries/useTickets';
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

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Soporte Técnico & Reclamaciones</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        ¿Tienes alguna inconformidad con tu pedido o deseas reportar alguna devolución o retraso? Crea un ticket y te contactaremos por WhatsApp.
      </p>

      {/* Sub-tabs for Support */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setSupportView('nuevo')}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            color: supportView === 'nuevo' ? 'var(--color-primary)' : 'var(--color-text-light)',
            borderBottom: supportView === 'nuevo' ? '2px solid var(--color-primary)' : 'none',
            paddingBottom: '0.25rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          Crear Nuevo Ticket
        </button>
        <button
          onClick={() => setSupportView('historial')}
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

        {/* Tickets list */}
        {supportView === 'historial' && (
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
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      padding: '1.25rem',
                      backgroundColor: '#FDFCFB',
                      boxShadow: 'var(--shadow-sm)'
                    }}
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
    </div>
  );
};

export default ProfileSupport;
