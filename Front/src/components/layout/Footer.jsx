import React from 'react';
import footerWave from '../../assets/img/footer_wave.png';
import logoImg from '../../assets/img/logo.jpg';
import { Instagram, MessageCircle, PlayCircle } from 'lucide-react';

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
          z-index: 10; /* Aseguramos que el texto esté por encima de la imagen opaca */
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
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
            padding-top: 10rem; /* Hacemos el footer más alto arriba para que la imagen quepa sin cortarse */
          }
          .footer-wave {
            height: 550px; /* Casi tan grande como desktop para mantener el sobremontado */
            right: 0;
            bottom: 0; /* Pegado al fondo */
            opacity: 1;
            z-index: 0;
          }
        }

        /* RESPONSIVE: Mobile (768px) */
        @media (max-width: 768px) {
          .main-footer { padding: 8rem 0 2rem; } /* Más altura para acomodar la imagen grande */
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            background: transparent;
            border-radius: 0;
            padding: 0;
            backdrop-filter: none;
          }
          .footer-col {
            border-top: 1px solid var(--border-subtle);
            padding-top: 1.5rem;
          }
          .footer-brand p { max-width: 100%; }
          .footer-bottom { flex-direction: column; text-align: center; justify-content: center; }
          
          .footer-wave {
            height: 450px; /* Aumentado drásticamente para tablet/móvil */
            right: 0; /* Completamente al borde para no crear scroll horizontal extra */
            bottom: 0; /* Pegado al fondo */
            opacity: 1;
            z-index: 0;
          }
        }
      `}</style>

      <footer className="main-footer">
        <img src={footerWave} alt="Wave Decoration" className="footer-wave" />

        <div className="footer-content">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <img src={logoImg} alt="SonTerry" style={{ height: '40px', borderRadius: '8px' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--green-brand)' }}>
                SonTerry Tienda
              </span>
            </div>
            <p>
              Taller artesanal de personalización textil. Expertos en serigrafía tradicional y estampado digital DTF con calidad boutique.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon"><Instagram size={20} /></a>
              <a href="#" className="footer-social-icon"><MessageCircle size={20} /></a>
              <a href="#" className="footer-social-icon"><PlayCircle size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Taller Físico</h4>
            <p><strong>Ubicación:</strong> Bogotá, Colombia</p>
            <p><strong>Teléfono:</strong> +57 301 826 7373</p>
            <p><strong>Email:</strong> taller@sonterry.com</p>
          </div>

          {/* Info */}
          <div className="footer-col">
            <h4>Información</h4>
            <p>Políticas de Envío</p>
            <p>Términos y Condiciones</p>
            <p>Preguntas Frecuentes</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SonTerry. Todos los derechos reservados.</p>
          <p>Creado con dedicación por Iván Castillo.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
