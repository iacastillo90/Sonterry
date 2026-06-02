import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ContactPreview = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      padding: '2rem 2rem 6rem',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        padding: '4rem 2rem',
        borderRadius: '32px',
        boxShadow: '0 10px 40px rgba(30,74,40,0.06)',
        maxWidth: '900px',
        width: '100%',
        border: '1px solid rgba(82,143,88,0.1)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--green-ghost)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--green-deep)'
        }}>
          <MessageCircle size={32} />
        </div>
        
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          ¿Tienes un proyecto en mente?
        </h2>
        
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          maxWidth: '560px',
          margin: '0 auto 2.5rem'
        }}>
          Cotizaciones al por mayor, diseños exclusivos o dudas técnicas. Escríbenos y nuestro equipo te asesorará para lograr el mejor resultado en tus prendas.
        </p>
        
        <button
          onClick={() => navigate('/configurador')}
          className="snt-btn snt-btn-primary rounded-full uppercase"
          style={{ padding: '14px 36px', letterSpacing: '1px' }}
        >
          Empieza a diseñar
        </button>
      </div>
    </section>
  );
};

export default ContactPreview;
