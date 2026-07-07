import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPreview = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      position: 'relative',
      padding: '8rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderTop: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Imagen visual (Taller / Serigrafía) */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(30,74,40,0.15)',
          aspectRatio: '4/3'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=1000" 
            alt="Taller de estampado SonTerry" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {/* Overlay sutil verde */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(30,74,40,0.5) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Textos y CTA */}
        <div style={{ zIndex: 2 }}>
          <span style={{
            display: 'inline-block',
            color: 'var(--green-deep)',
            fontWeight: '800',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            padding: '4px 12px',
            background: 'var(--green-ghost)',
            borderRadius: '999px'
          }}>
            Sobre Nosotros
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: 'var(--green-brand)',
            marginBottom: '1.5rem',
            lineHeight: '1.15'
          }}>
            Técnica artesanal y precisión visual
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            fontWeight: '500'
          }}>
            Sonterry nació en el año 2018 en respuesta a la inquietud constante de una persona con discapacidad auditiva por crear espacios de inclusión en una sociedad donde se visibilice “verdaderamente” al otro con todas sus “capacidades”; de la resiliencia y su deseo de superación; de quién fue relegado por la sociedad por muchos años y que aún siente en el día a día la negación del acceso a los derechos fundamentales de las personas en igualdad de condiciones.
          </p>
          <button 
            onClick={() => navigate('/nosotros')}
            className="snt-btn snt-btn-primary rounded-full uppercase"
            style={{ padding: '14px 36px', letterSpacing: '1px' }}
          >
            Nuestra Historia
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
