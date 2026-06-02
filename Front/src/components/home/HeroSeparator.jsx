import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSeparator = () => {
  const navigate = useNavigate();
  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        padding: '5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderTop: '4px solid var(--green-deep)',
        borderBottom: '4px solid var(--green-deep)'
      }}
    >
      {/* Imagen de fondo free (Unsplash - referente a textiles/colores/estampados) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', /* Efecto parallax */
          zIndex: 0,
          filter: 'brightness(0.5) saturate(1.2)'
        }}
      />
      
      {/* Capa de gradiente para integrarlo con los colores de la marca */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(30, 74, 40, 0.85) 0%, rgba(59, 122, 71, 0.70) 50%, rgba(30, 74, 40, 0.80) 100%)',
          zIndex: 1
        }}
      />

      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          color: '#fff'
        }}
      >
        <h2 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            lineHeight: '1.2'
          }}
        >
          Dale vida a tus ideas con color puro
        </h2>
        <p 
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            marginBottom: '2rem',
            fontWeight: '500',
            lineHeight: '1.6',
            color: '#eaeaea'
          }}
        >
          Nuestras técnicas de Estampado DTF, Serigrafía y Bordado garantizan durabilidad y una explosión de color en cada prenda.
        </p>
        <button
          onClick={() => navigate('/productos')}
          className="snt-btn snt-btn-primary-inverted rounded-full uppercase"
          style={{ padding: '14px 36px', letterSpacing: '1px' }}
        >
          Explorar Técnicas
        </button>
      </div>
    </section>
  );
};

export default HeroSeparator;
