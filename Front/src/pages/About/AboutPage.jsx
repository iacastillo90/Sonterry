import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, Users, Truck, Leaf, ArrowRight, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import aboutImg from '../../assets/img/about_workshop.png';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '+500', label: 'Diseños entregados' },
  { num: '+8',   label: 'Años de experiencia' },
  { num: '100%', label: 'Hecho a mano' },
  { num: '4.9★', label: 'Satisfacción' },
];

const VALUES = [
  { icon: Award,  title: 'Calidad Premium',      desc: 'Cada pieza pasa por control de calidad antes de salir del taller.' },
  { icon: Users,  title: 'Atención Personalizada', desc: 'Te acompañamos desde el diseño hasta la entrega de tu pedido.' },
  { icon: Truck,  title: 'Envíos a Colombia',     desc: 'Despachamos a todo el país con seguimiento en tiempo real.' },
  { icon: Leaf,   title: 'Proceso Sostenible',    desc: 'Tintas ecológicas y materiales de bajo impacto ambiental.' },
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

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo('.about-hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out' }
    );
    // Stats
    gsap.fromTo('.about-stat',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-stats-row', start: 'top 85%' } }
    );
    // Story section
    gsap.fromTo('.about-story-img',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' } }
    );
    gsap.fromTo('.about-story-text > *',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 80%' } }
    );
    // Values
    gsap.fromTo('.about-value-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 82%' } }
    );
    // Gallery
    gsap.fromTo('.about-gallery-item',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-gallery', start: 'top 82%' } }
    );
    // Map
    gsap.fromTo('.about-map-section',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-map-section', start: 'top 85%' } }
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
              SonTerry nació de la pasión por el arte textil. Combinamos serigrafía artesanal y DTF de última generación para darle vida a tu marca en gorras, mugs y prendas únicas.
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
              Fundado en Bogotá, Colombia, SonTerry es un taller especializado en la personalización textil de alta calidad. Nuestro equipo combina más de 8 años de experiencia en serigrafía tradicional con la precisión del estampado DTF (Direct-to-Film) para ofrecer resultados que duran.
            </p>
            <p className="about-story-p2">
              Trabajamos con marcas emergentes, emprendedores, equipos deportivos y empresas que buscan diferenciarse. Desde una sola pieza hasta producción mayorista, cada pedido recibe la misma dedicación y cuidado.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Serigrafía', 'DTF Premium', 'Bordado', 'Sublimación'].map((t) => (
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
                Nuestros valores
              </span>
              <h2 className="about-section-title">¿Por qué elegir SonTerry?</h2>
              <p className="about-section-sub" style={{ margin: '0 auto' }}>
                Cada decisión que tomamos en el taller está guiada por estos pilares.
              </p>
            </div>
            <div className="about-values-grid">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="about-value-card">
                  <div className="about-value-icon">
                    <Icon size={22} strokeWidth={1.8} />
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
              <h2 className="about-section-title">Visita nuestro taller</h2>
              <p className="about-section-sub" style={{ margin: '0 auto 0' }}>
                Estamos en Bogotá, Colombia. Visítanos con cita previa para conocer el proceso en persona.
              </p>
            </div>
            <div className="about-map-grid">
              {/* Info sidebar */}
              <div className="about-map-info">
                {[
                  { icon: MapPin, title: 'Dirección', value: 'Bogotá, Colombia\nTaller disponible con cita' },
                  { icon: Phone,  title: 'Teléfono',  value: '301 826 7373' },
                  { icon: Mail,   title: 'Correo',    value: 'taller@sonterry.com' },
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
                  Lunes a Sábado: 9:00 am – 6:00 pm<br />
                  Domingo: Solo pedidos online
                </div>
              </div>

              {/* Map */}
              <div className="about-map-frame">
                <iframe
                  title="Ubicación SonTerry Bogotá Colombia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127244.60636287903!2d-74.1952219808381!3d4.648283699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2s!4v1717000000000!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
              Desde uniformes corporativos hasta líneas de merch para tu marca. Cotización sin costo, atención personalizada y entrega garantizada.
            </p>
            <div className="about-cta-actions">
              <button className="about-cta-btn-primary" onClick={() => navigate('/contacto')}>
                Solicitar cotización <ArrowRight size={16} />
              </button>
              <button className="about-cta-btn-outline" onClick={() => navigate('/productos')}>
                Ver catálogo
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
