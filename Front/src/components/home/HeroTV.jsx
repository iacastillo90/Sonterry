import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroVideo from '../../assets/video/sonterry-hero2.mp4';
import bgVideo from '../../assets/video/bg-escena-inicial.mp4';

const HeroTV = () => {
  const navigate = useNavigate();
  // Referencias DOM
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRef = useRef(null);
  const bgVideoRef = useRef(null);

  useGSAP(() => {
    // Animaciones de Entrada (UI principal)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.2"
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    );

    tl.fromTo(cardRef.current,
      { opacity: 0, x: 60, rotateY: 8 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: "power2.out" },
      0.2
    );

    // Animación idle del glow de la TV
    gsap.to(cardRef.current, {
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.05),
        0 0 40px 8px rgba(109,191,71,0.4),
        0 0 80px 20px rgba(109,191,71,0.2),
        0 20px 40px rgba(0,0,0,0.4)
      `,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  const handleMouseEnter = () => gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: "power2.out" });
  const handleMouseLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power2.inOut" });

  return (
    <>
      <section ref={containerRef} className="hero-section">
        {/* ─── FONDO DE VIDEO (Z-INDEX: 0) ─── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <video
            ref={bgVideoRef}
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(248, 244, 238, 0.4)', // Overlay crema
            }}
          />
        </div>

        {/* ─── CONTENIDO EN PRIMER PLANO ─── */}
        <div className="hero-content">

          {/* Columna Izquierda (Texto y CTA) */}
          <div className="hero-text-col">
            <p
              ref={eyebrowRef}
              style={{
                color: 'var(--green-dark)',
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                textShadow: '0px 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              Estampado DTF · Serigrafía · Personalización
            </p>

            <h1 ref={titleRef} className="font-display hero-title">
              Tu marca estampada con alma y precisión textil
            </h1>

            <p ref={subtitleRef} className="hero-subtitle">
              Diseños únicos que hablan por tu negocio.
            </p>

            <div ref={ctaRef} className="hero-buttons">
              <button
                onClick={() => navigate('/productos')}
                className="snt-btn snt-btn-primary rounded-full"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                Ver productos
              </button>

              <button
                onClick={() => window.open('https://wa.me/573242796288', '_blank')}
                className="snt-btn rounded-full"
                style={{
                  padding: '14px 32px',
                  fontSize: '1.05rem',
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                Cotiza en WhatsApp
              </button>
            </div>
          </div>

          {/* Columna Derecha (Card Pantalla Flotante TV) */}
          <div className="hero-card-col">
            <div
              ref={cardRef}
              className="tv-card"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Pantalla interna con video */}
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--color-bg)',
                  aspectRatio: '16/9'
                }}
              >
                {/* El Video (Zorro) */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>

                {/* Overlay: Scanlines sutiles */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 0, 0, 0.03) 2px,
                      rgba(0, 0, 0, 0.03) 4px
                    )`,
                    pointerEvents: 'none',
                    zIndex: 2,
                    borderRadius: '12px'
                  }}
                />

                {/* Reflejo de luz LCD */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '40%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    borderRadius: '12px 0 0 0'
                  }}
                />
              </div>

              {/* Indicador LED de encendido */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#6DBF47',
                  boxShadow: '0 0 6px 2px rgba(109,191,71,0.8)',
                  margin: '8px auto 0',
                  animation: 'pulseLED 2s infinite alternate'
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroTV;
