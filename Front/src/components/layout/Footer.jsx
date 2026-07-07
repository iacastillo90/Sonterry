import React from 'react';
import { Link } from 'react-router-dom';
import footerWave from '../../assets/img/Footer2.png';
import logoImg from '../../assets/img/logo.jpg';

const Footer = () => {
  return (
    <>
      <style>{`
        .main-footer {
          position: relative;
          background-color: var(--white);
          border-top: 1px solid rgba(82, 143, 88, 0.1);
          padding: 6rem 0 2rem 0;
          margin-top: auto;
        }

        .footer-wave {
          position: absolute;
          bottom: 0; /* Pegado estrictamente al fondo */
          right: 0; /* Estrictamente pegada al lado derecho */
          width: auto;
          height: 600px; /* Extragrande */
          max-height: none; /* Sin límite para que pueda sobremontar hacia arriba */
          object-fit: contain;
          object-position: bottom right;
          z-index: 0;
          opacity: 1;
          pointer-events: none; /* Para que la imagen grande no bloquee clicks en enlaces */
          transition: all 0.3s ease;
        }

        .footer-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .footer-brand {
          flex: 2 1 350px;
        }
        
        .footer-col {
          flex: 1 1 200px;
        }

        .footer-brand h3 {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--green-deep);
          margin-bottom: 1rem;
        }
        .footer-brand p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 320px;
        }

        .footer-col h4 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .footer-col p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .footer-socials {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .footer-social-icon {
          color: var(--green-deep);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .footer-social-icon:hover {
          color: var(--terra-mid);
          transform: translateY(-2px);
        }

        .footer-bottom {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 3rem auto 0;
          padding: 1.5rem 1.5rem 0;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-bottom p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        /* RESPONSIVE: Laptops y Tablets (1048px) */
        @media (max-width: 1048px) {
          .main-footer {
            padding-top: 8rem;
          }
          .footer-wave {
            height: 550px;
            right: 0;
            bottom: 0;
            opacity: 1;
            z-index: 0;
          }
        }

        /* RESPONSIVE: Tablets/iPads (768px) */
        @media (max-width: 820px) {
          .footer-content {
            gap: 2rem;
          }
          .footer-brand {
            flex: 1 1 100%;
          }
          .footer-brand p {
            max-width: 100%;
          }
          .footer-col {
            flex: 1 1 45%;
          }
        }

        /* RESPONSIVE: Mobile (500px) */
        @media (max-width: 500px) {
          .main-footer { padding: 4rem 0 2rem; }
          .footer-content {
            gap: 1.5rem;
          }
          .footer-brand {
            margin-bottom: 0.5rem;
          }
          .footer-col {
            flex: 1 1 40%;
            padding-top: 1rem;
            border-top: 1px solid var(--border-subtle);
          }
          .footer-col h4 {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          .footer-col p {
            font-size: 0.8rem;
          }
          .footer-bottom { 
            flex-direction: column; 
            text-align: center; 
            justify-content: center; 
            margin-top: 2rem;
            padding-top: 1rem;
          }
          .footer-wave {
            height: 300px;
          }
        }
      `}</style>

      <footer className="main-footer">
        <img src={footerWave} alt="Wave Decoration" className="footer-wave" />

        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
              <img src={logoImg} alt="SonTerry" style={{ height: '60px', borderRadius: '12px', boxShadow: 'var(--s-xs)' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '800', color: 'var(--green-brand)', lineHeight: '1.1' }}>
                  SonTerry
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Tienda
                </span>
              </div>
            </div>
            <p>
              Taller artesanal de personalización textil. Expertos en estampado digital DTF con excelente calidad.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contáctanos</h4>
            <a
              href="https://wa.me/573242796288"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                marginBottom: '10px',
                boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              Escríbenos
            </a>
            <p style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              +57 324 2796288
            </p>
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--terra-mid, #C97D5C)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              💬 Solo mensajes — no llamadas
            </p>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4>Información</h4>
            <p>
              <Link to="/politicas-envio" style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--green-brand)'}
                onMouseLeave={e => e.target.style.color = 'inherit'}>
                Políticas de Envío
              </Link>
            </p>
            <p>
              <Link to="/terminos-condiciones" style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--green-brand)'}
                onMouseLeave={e => e.target.style.color = 'inherit'}>
                Términos y Condiciones
              </Link>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SonTerry. Todos los derechos reservados.</p>
          <p>Creado con dedicación por KronoSoft.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
