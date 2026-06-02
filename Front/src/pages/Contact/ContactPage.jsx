import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles,
} from 'lucide-react';
import ContactForm from './components/ContactForm';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Trust info cards ────────────────────────────────────── */
const INFO_CARDS = [
  { icon: Phone,      title: 'Llámanos', desc: '301 826 7373', sub: 'Lun–Sáb, 9am – 6pm' },
  { icon: Mail,       title: 'Escríbenos', desc: 'taller@sonterry.com', sub: 'Respondemos en < 24h' },
  { icon: MapPin,     title: 'Visítanos', desc: 'Bogotá, Colombia', sub: 'Taller físico con cita previa' },
  { icon: Clock,      title: 'Tiempo de resp.', desc: '< 24 horas', sub: 'En días hábiles' },
];

const ContactPage = () => {
  const pageRef = useRef(null);

  /* ─── GSAP entrance animations ──────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo('.contact-hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 }
    );

    gsap.fromTo('.contact-info-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info-row', start: 'top 82%' } }
    );

    gsap.fromTo('.contact-form-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form-card', start: 'top 85%' } }
    );
  }, { scope: pageRef });

  return (
    <>
      <div ref={pageRef}>

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section className="contact-hero">
          {/* Background blobs */}
          <div className="contact-hero-blob contact-hero-blob-1" />
          <div className="contact-hero-blob contact-hero-blob-2" />

          <div className="contact-hero-content">
            <div className="contact-hero-content">
              {/* Eyebrow */}
              <span className="contact-eyebrow">
                <Sparkles size={11} /> Centro de Atención SonTerry
              </span>

              <h1 className="contact-hero-title">
                ¿Cómo podemos<br />
                <span style={{ color: 'var(--green-light)' }}>ayudarte hoy?</span>
              </h1>

              <p className="contact-hero-subtitle">
                Ya sea un pedido personalizado, una consulta mayorista, una queja o simplemente quieres conocer más sobre nuestras técnicas — estamos aquí para ti.
              </p>

              {/* Stats row */}
              <div className="contact-stats-container">
                {[['< 24h', 'Tiempo de respuesta'], ['500+', 'Clientes atendidos'], ['5★', 'Satisfacción']].map(([n, l]) => (
                  <div key={l} className="contact-stat-item">
                    <div className="contact-stat-num">{n}</div>
                    <div className="contact-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            TRUST BANNER (4 info cards)
        ════════════════════════════════════════════ */}
        <div className="contact-banner">
          <div className="contact-info-row">
            {INFO_CARDS.map(({ icon: Icon, title, desc, sub }) => (
              <div key={title} className="contact-info-card">
                <div className="contact-info-icon">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="contact-info-title">{title}</div>
                  <div className="contact-info-value">{desc}</div>
                  <div className="contact-info-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            FORM SECTION
        ════════════════════════════════════════════ */}
        <section className="contact-form-section">
          <div className="contact-form-inner">

            {/* ── Sidebar ── */}
            <div className="contact-form-sidebar">
              <h2>Escríbenos, estamos listos para atenderte</h2>
              <p>
                Nuestro equipo del taller revisa cada mensaje personalmente. Cuéntanos qué necesitas y te orientaremos en el proceso de personalización, precio o seguimiento de tu pedido.
              </p>
              <ul className="contact-trust-list">
                {[
                  'Respondemos todos los mensajes',
                  'Asesoría en serigrafía y DTF',
                  'Cotizaciones sin compromiso',
                  'Atención mayorista especializada',
                  'Seguimiento de pedidos en tiempo real',
                ].map((t) => (
                  <li key={t} className="contact-trust-item">
                    <span className="contact-trust-check">
                      <ShieldCheck size={12} strokeWidth={2.5} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Form card ── */}
            <div className="contact-form-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
