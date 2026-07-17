import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.querySelector('.cta-card'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="cta-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '1px solid rgba(226, 219, 208, 0.7)',
          background: 'var(--white)',
          boxShadow: 'var(--shadow-md)',
          boxSizing: 'border-box'
        }}
      >
        {/* Soft Organic Glow Background Elements */}
        <div 
          style={{ 
            position: 'absolute',
            top: '-8rem',
            left: '-8rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            opacity: 0.2,
            backgroundColor: 'var(--color-primary)' 
          }}
        />
        <div 
          style={{ 
            position: 'absolute',
            bottom: '-8rem',
            right: '-8rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            opacity: 0.15,
            backgroundColor: 'var(--color-accent)' 
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              color: 'var(--color-primary)', 
              backgroundColor: 'rgba(107, 158, 92, 0.1)',
              border: '1px solid rgba(107, 158, 92, 0.2)'
            }}
          >
            <Sparkles size={12} />
            Configurador 3D Activo
          </span>

          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: 'var(--color-text)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: '1rem'
            }}
          >
            ¿Listo para crear tu propia pieza única?
          </h2>

          <p style={{ color: 'var(--color-text-light)', fontWeight: '300', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Usa nuestro visualizador interactivo 3D para experimentar con parches, bordados y colores. Convierte tu idea en un accesorio exclusivo en pocos pasos.
          </p>

          <Button
            variant="primary"
            onClick={() => {
              handleScrollToTop();
              navigate('/configurador');
            }}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(107, 158, 92, 0.2)',
              transition: 'var(--transition-smooth)'
            }}
          >
            Diseñar en 3D Ahora
            <ArrowRight size={18} style={{ marginLeft: '6px' }} />
          </Button>

          <div 
            style={{ 
              marginTop: '3rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.5rem', 
              fontSize: '0.75rem', 
              color: '#A09787', 
              fontWeight: '600', 
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#6B9E5C' }} /> Pago Seguro
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E2DBD0' }} />
            <span>Garantía SonTerry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
