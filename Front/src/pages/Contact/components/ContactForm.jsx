import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Package, MessageSquare, HelpCircle, Headphones } from 'lucide-react';
import { sendContactMessage } from '../../../services/contact.service';

/* ─── Validation schema ─────────────────────────────────────── */
const contactSchema = z.object({
  name:    z.string().min(2, 'Tu nombre debe tener al menos 2 caracteres'),
  email:   z.string().email('Ingresa un correo electrónico válido'),
  phone:   z.string().min(7, 'Ingresa un número de contacto válido').optional().or(z.literal('')),
  subject: z.enum(['pedido', 'contacto', 'queja', 'duda', 'consulta'], {
    errorMap: () => ({ message: 'Selecciona un motivo de contacto' }),
  }),
  message: z.string().min(20, 'Tu mensaje debe tener al menos 20 caracteres'),
});

/* ─── Contact reason options ──────────────────────────────── */
const SUBJECTS = [
  { value: 'pedido',   label: '📦 Pedido personalizado',   icon: Package },
  { value: 'contacto', label: '💬 Contacto general',        icon: MessageSquare },
  { value: 'queja',    label: '⚠️ Queja o reclamo',         icon: AlertCircle },
  { value: 'duda',     label: '❓ Tengo una duda',           icon: HelpCircle },
  { value: 'consulta', label: '🔍 Consulta mayorista',       icon: Headphones },
];

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    setSending(true);
    setError('');
    try {
      await sendContactMessage(data);
      setSent(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="contact-success">
        <CheckCircle size={56} strokeWidth={1.5} color="var(--green-brand)" />
        <h3>¡Mensaje enviado!</h3>
        <p>
          Gracias por contactarnos. Un miembro de nuestro equipo revisará tu mensaje y te responderá en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setSent(false)}
          className="contact-success-btn"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Header */}
      <div className="contact-form-header">
        <h3 className="contact-form-title">
          Formulario de contacto
        </h3>
        <p className="contact-form-sub">
          Todos los campos marcados con <span style={{ color: 'var(--terra-mid)' }}>*</span> son obligatorios.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Name + Email */}
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">
              Nombre <span>*</span>
            </label>
            <input
              {...register('name')}
              placeholder="Tu nombre completo"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && (
              <span className="form-error">
                <AlertCircle size={12} /> {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Correo electrónico <span>*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="tu@correo.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <span className="form-error">
                <AlertCircle size={12} /> {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="form-field">
          <label className="form-label">Teléfono / WhatsApp</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="(Opcional) 300 000 0000"
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && (
            <span className="form-error">
              <AlertCircle size={12} /> {errors.phone.message}
            </span>
          )}
        </div>

        {/* Subject chips */}
        <div className="form-field">
          <label className="form-label">
            Motivo de contacto <span>*</span>
          </label>
          <div className="subject-chips">
            {SUBJECTS.map(({ value, label }) => (
              <div key={value} className="subject-chip">
                <input
                  {...register('subject')}
                  type="radio"
                  id={`subject-${value}`}
                  value={value}
                />
                <label htmlFor={`subject-${value}`}>{label}</label>
              </div>
            ))}
          </div>
          {errors.subject && (
            <span className="form-error" style={{ marginTop: 4 }}>
              <AlertCircle size={12} /> {errors.subject.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="form-field">
          <label className="form-label">
            Mensaje <span>*</span>
          </label>
          <textarea
            {...register('message')}
            placeholder="Cuéntanos con detalle: tipo de producto, cantidad, colores, técnica, fecha de entrega... entre más detalle, mejor podemos ayudarte."
            className={`form-textarea ${errors.message ? 'error' : ''}`}
          />
          {errors.message && (
            <span className="form-error">
              <AlertCircle size={12} /> {errors.message.message}
            </span>
          )}
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="contact-submit-btn"
        >
          {sending ? (
            <>Enviando mensaje...</>
          ) : (
            <><Send size={16} strokeWidth={2} /> Enviar mensaje</>
          )}
        </button>

        <p className="contact-form-disclaimer">
          Al enviar aceptas que nos comuniquemos contigo para atender tu solicitud.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
