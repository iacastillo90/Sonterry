import React, { useRef } from 'react';
import Button from '../../../components/common/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PromoBanner = () => {
  const bannerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      bannerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: bannerRef });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      ref={bannerRef} 
      style={{
        width: '100%',
        backgroundColor: '#1C3A27',
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        margin: '4rem 0',
        boxSizing: 'border-box'
      }}
    >
      

      {/* Visual Organic Glow Backgrounds */}
      <div 
        style={{ 
          position: 'absolute',
          top: '-6rem',
          left: '-6rem',
          width: '18rem',
          height: '18rem',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          opacity: 0.2,
          backgroundColor: 'var(--color-accent)' 
        }}
      />
      <div 
        style={{ 
          position: 'absolute',
          bottom: '-6rem',
          right: '-6rem',
          width: '20rem',
          height: '20rem',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          opacity: 0.15,
          backgroundColor: 'var(--color-primary)' 
        }}
      />

      <div className="promo-flex-container">
        <div className="promo-text-content">
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
              marginBottom: '1rem',
              color: 'var(--color-accent)', 
              backgroundColor: 'rgba(201, 125, 92, 0.15)',
              border: '1px solid rgba(201, 125, 92, 0.3)'
            }}
          >
            <Sparkles size={12} />
            Calidad Premium Garantizada
          </span>
          <h2 
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: '#FFFFFF',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              margin: 0
            }}
          >
            Personalización Textil <br className="hidden md:inline" /> de Alta Definición
          </h2>
          <p style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Damos vida a tus diseños utilizando técnicas avanzadas de serigrafía tradicional y DTF premium. Resistente al lavado, tacto suave.
          </p>
        </div>

        <div style={{ flexShrink: 0, width: 'auto' }}>
          <Button
            variant="accent"
            onClick={handleScrollToTop}
            style={{
              padding: '1rem 2rem',
              borderRadius: '8px',
              backgroundColor: 'var(--color-accent)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(201, 125, 92, 0.3)',
              transition: 'var(--transition-smooth)'
            }}
          >
            Empieza a Diseñar
            <ArrowRight size={18} style={{ marginLeft: '6px' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
