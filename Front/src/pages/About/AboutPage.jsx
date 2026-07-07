import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, Users, Truck, Leaf, ArrowRight, MapPin, Phone, Mail, Sparkles, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useUiStore } from '../../store/uiStore';
import api from '../../services/api';
import aboutImg from '../../assets/img/Nosotros.jpeg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);


const WhatsappIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);


const STATS = [
  { num: '+500', label: 'Diseños entregados' },
  { num: '+8', label: 'Años de experiencia' },
  { num: '100%', label: 'Hecho a mano' },
  { num: '4.9★', label: 'Satisfacción' },
];

const VALUES = [
  { icon: '🤝', title: 'El respeto', desc: 'Por la vida y la valía de cada persona en su esencia.' },
  { icon: '⚖️', title: 'La igualdad', desc: 'Siendo garantes de los derechos de las personas de vivir en un ambiente de oportunidades para todos, donde nadie es más que otro.' },
  { icon: Truck, title: 'Envíos a Colombia', desc: 'Despachamos a todo el país con seguimiento en tiempo real.' },
  { icon: '🌱', title: 'Empoderamiento', desc: 'Potencializar las habilidades de las personas y lo que las apasiona para garantizar que lo que se hace, se hace con el corazón, permitiendo dignificar su vida.' },
];

// Free Unsplash images — mugs & caps printing
const GALLERY = [
  'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80&fit=crop',
];

const AboutPage = () => {
  const pageRef = useRef(null);
  const navigate = useNavigate();
  const addToast = useUiStore((state) => state.addToast);

  // Quote form state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteImages, setQuoteImages] = useState([]);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail || !quotePhone || !quoteDetails) {
      addToast('Por favor, completa todos los campos requeridos.', 'warning');
      return;
    }
    setQuoteLoading(true);
    const formData = new FormData();
    formData.append('name', quoteName);
    formData.append('email', quoteEmail);
    formData.append('phone', quotePhone);
    formData.append('details', quoteDetails);
    for (let i = 0; i < quoteImages.length; i++) {
      formData.append('images', quoteImages[i]);
    }
    try {
      await api.post('/quotes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      addToast('Cotización enviada exitosamente. Revisa tu correo.', 'success');
      setIsQuoteModalOpen(false);
      setQuoteName('');
      setQuoteEmail('');
      setQuotePhone('');
      setQuoteDetails('');
      setQuoteImages([]);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al enviar cotización', 'error');
    } finally {
      setQuoteLoading(false);
    }
  };

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo('.about-hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out' }
    );
    // Stats
    gsap.fromTo('.about-stat',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-stats-row', start: 'top 85%' }
      }
    );
    // Story section
    gsap.fromTo('.about-story-img',
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' }
      }
    );
    gsap.fromTo('.about-story-text > *',
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' }
      }
    );
    // Values
    gsap.fromTo('.about-value-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 82%' }
      }
    );
    // Gallery
    gsap.fromTo('.about-gallery-item',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-gallery', start: 'top 82%' }
      }
    );
    // Map
    gsap.fromTo('.about-map-section',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-map-section', start: 'top 85%' }
      }
    );
  }, { scope: pageRef });

  return (
    <>
      <div ref={pageRef}>

        {/* ═══ HERO ═══════════════════════════════════════════════════ */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow about-eyebrow-hero">
              <Sparkles size={11} /> Nuestra Historia
            </span>
            <h1 className="about-hero-title">
              Más que estampados,<br />
              <span style={{ color: 'var(--green-light)' }}>creamos identidad</span>
            </h1>
            <p className="about-hero-subtitle">
              SonTerry nació de la pasión por el arte textil y el DTF de última generación para darle vida a tu marca en gorras, mugs y prendas únicas.
            </p>
          </div>
        </section>

        {/* ═══ STATS ══════════════════════════════════════════════════ */}
        <div className="about-stats-row">
          <div className="about-stats-inner">
            {STATS.map(({ num, label }) => (
              <div key={label} className="about-stat">
                <div className="about-stat-num">{num}</div>
                <div className="about-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ OUR STORY ══════════════════════════════════════════════ */}
        <div className="about-story">
          <div className="about-story-img">
            <img src={aboutImg} alt="Taller SonTerry — serigrafía y DTF en gorras y mugs" />
          </div>
          <div className="about-story-text">
            <span className="about-eyebrow about-eyebrow-story">
              <Sparkles size={11} /> Quiénes somos
            </span>
            <h2 className="about-section-title">
              Un taller artesanal con tecnología de punta
            </h2>
            <p className="about-section-sub">
              Somos una empresa dedicada a personalizar tus gustos a través del estampado de prendas de vestir, buscamos brindarte comodidad e identidad
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Serigrafía', 'DTF Premium', 'Sublimación'].map((t) => (
                <span key={t} className="about-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ VALUES ═════════════════════════════════════════════════ */}
        <section className="about-values">
          <div className="about-values-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="about-eyebrow about-eyebrow-story">
              <Sparkles size={11} /> Nuestros valores
            </span>
              <h2 className="about-section-title">¿Por qué elegir SonTerry?</h2>
              <p className="about-section-sub" style={{ margin: '0 auto' }}>
                Cada decisión que tomamos en el taller está guiada por estos pilares.
              </p>
            </div>
            <div className="about-values-grid">
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} className="about-value-card">
                  <div className="about-value-icon">
                    {typeof icon === 'string'
                      ? <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{icon}</span>
                      : React.createElement(icon, { size: 22, strokeWidth: 1.8 })
                    }
                  </div>
                  <div className="about-value-title">{title}</div>
                  <p className="about-value-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GALLERY ════════════════════════════════════════════════ */}
        <section className="about-gallery">
          <div className="about-gallery-inner">
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <span className="about-eyebrow about-eyebrow-gallery">
                Nuestro trabajo
              </span>
              <h2 className="about-section-title">El taller en imágenes</h2>
            </div>
            <div className="about-gallery-grid">
              {GALLERY.map((src, i) => (
                <div key={i} className="about-gallery-item">
                  <img src={src} alt={`SonTerry trabajo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MAP ════════════════════════════════════════════════════ */}
        <section className="about-map-section">
          <div className="about-map-inner">
            <div style={{ textAlign: 'center' }}>
              <span className="about-eyebrow about-eyebrow-story">
                <MapPin size={11} /> Encuéntranos
              </span>
              <h2 className="about-section-title">Información</h2>
              <p className="about-section-sub" style={{ margin: '0 auto 0' }}>
                Atendemos a nivel nacional. Contáctanos por WhatsApp para cotizaciones o asistencia personalizada.
              </p>
            </div>
            <div className="about-map-grid">
              {/* Info sidebar */}
              <div className="about-map-info">
                {[
                  { icon: MapPin, title: 'Ubicación', value: 'Colombia\nAtención a nivel nacional' },
                  { icon: WhatsappIcon, title: 'Whatsapp', value: '+57 324 2796288' },
                ].map(({ icon: Icon, title, value }) => (
                  <div key={title} className="about-map-info-item">
                    <div className="about-map-info-icon">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="about-map-info-title">{title}</div>
                      <div className="about-map-info-value" style={{ whiteSpace: 'pre-line' }}>{value}</div>
                    </div>
                  </div>
                ))}
                <div className="about-schedule-box">
                  <strong className="about-schedule-title">
                    Horarios de atención:
                  </strong><br />
                  Lunes a Viernes: 8:00 am – 6:00 pm<br />
                  Solo pedidos online
                </div>
              </div>

              {/* Large WhatsApp CTA instead of Map */}
              <div className="about-map-frame" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(82, 143, 88, 0.05)',
                borderRadius: '24px',
                border: '1px solid rgba(82, 143, 88, 0.1)',
                padding: '2rem',
                minHeight: '300px'
              }}>
                <a
                  href="https://wa.me/573242796288"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    textDecoration: 'none',
                    color: 'var(--green-brand)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--green-brand)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(82, 143, 88, 0.25)'
                  }}>
                    <WhatsappIcon size={54} strokeWidth={2} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--green-deep)' }}>
                      Escríbenos por WhatsApp
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Estamos listos para ayudarte al instante
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ═════════════════════════════════════════════ */}
        <section className="about-cta">
          <div className="about-cta-inner">
            <span className="about-eyebrow about-eyebrow-hero">
              <Sparkles size={11} /> ¿Tienes un proyecto?
            </span>
            <h2 className="about-cta-title">
              Hagámoslo juntos
            </h2>
            <p className="about-cta-subtitle">
              Desde uniformes corporativos hasta líneas de merch para tu marca. Cotización sin costo, atención personalizada y calidad garantizada.
            </p>
            <div className="about-cta-actions">
              <button
                className="about-cta-btn-primary"
                onClick={() => setIsQuoteModalOpen(true)}
                style={{
                  background: 'linear-gradient(45deg, #D4A373, #E6C287)',
                  border: 'none',
                  boxShadow: '0 8px 20px rgba(212, 163, 115, 0.4)',
                  transform: 'scale(1.05)',
                  animation: 'pulse-subtle 2s infinite'
                }}
              >
                <ImageIcon size={18} /> ¡Cotiza tu Diseño Personalizado!
              </button>
              <button className="about-cta-btn-outline" onClick={() => navigate('/contacto')}>
                Contacto
              </button>
              <button className="about-cta-btn-outline" onClick={() => navigate('/productos')}>
                Ver catálogo
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL DE COTIZACIÓN */}
      <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} title="Cotizar Diseño Personalizado">
        <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Tu Nombre completo *</label>
            <input type="text" value={quoteName} onChange={e => setQuoteName(e.target.value)} className="snt-input" style={{ width: '100%', padding: '0.6rem 0.8rem' }} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Email *</label>
              <input type="email" value={quoteEmail} onChange={e => setQuoteEmail(e.target.value)} className="snt-input" style={{ width: '100%', padding: '0.6rem 0.8rem' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Teléfono / WhatsApp *</label>
              <input type="tel" value={quotePhone} onChange={e => setQuotePhone(e.target.value)} className="snt-input" style={{ width: '100%', padding: '0.6rem 0.8rem' }} required />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>¿Qué diseño y objeto deseas? (Ej: quiero una camiseta negra, y estampado en la espalda de Naruto...) *</label>
            <textarea placeholder="Describe el color, tamaño y posición del diseño..." value={quoteDetails} onChange={e => setQuoteDetails(e.target.value)} className="snt-input" style={{ width: '100%', minHeight: '100px', padding: '0.6rem 0.8rem' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Sube la foto de referencia (Prenda y/o Diseño) (Max 5)</label>
            <input type="file" multiple accept="image/*" onChange={e => setQuoteImages(Array.from(e.target.files))} style={{ fontSize: '0.85rem', width: '100%' }} />
          </div>
          <button type="submit" disabled={quoteLoading} className="about-cta-btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center', width: '100%' }}>
            {quoteLoading ? 'Enviando...' : 'Enviar Cotización'} <Sparkles size={16} />
          </button>
        </form>
      </Modal>

    </>
  );
};

export default AboutPage;
