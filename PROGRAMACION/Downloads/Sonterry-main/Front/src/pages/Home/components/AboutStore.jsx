import React, { useRef } from 'react';
import { Users, Truck, Printer, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutStore = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Stagger bento items entrance
    gsap.fromTo(
      containerRef.current.querySelectorAll('.bento-item'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="container" style={{ padding: '6rem 1.5rem', maxWidth: '1100px' }}>
      

      {/* Header */}
      <div className="bento-item text-center mb-8">
        <span className="text-sm font-bold uppercase tracking-widest mb-2 block text-accent">
          El Sello SonTerry
        </span>
        <h2 className="font-display text-primary font-bold m-0" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
          Creación con Alma y Técnica
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid-container">
        {/* Main Bento Box - Technique */}
        <div className="bento-card-main bento-item">
          <div>
            <div className="flex gap-4 mb-6">
              <div className="icon-box-primary">
                <Printer size={24} />
              </div>
              <div className="icon-box-accent">
                <Layers size={24} />
              </div>
            </div>
            <h3 className="font-display text-primary font-bold mb-4 text-2xl">
              Nuestra Técnica Artesanal
            </h3>
            <p className="text-secondary mb-4 font-medium" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              En SonTerry fusionamos la serigrafía textil tradicional —donde cada pasada de tinta se realiza con precisión milimétrica a mano— con la tecnología digital DTF premium de última generación.
            </p>
            <p className="text-secondary m-0 font-medium" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              Esta combinación nos permite garantizar colores vibrantes que no pierden intensidad con las lavadas, estampados que se adaptan a la flexibilidad de las fibras y acabados con detalles impecables que elevan tu prenda al nivel de una boutique exclusiva.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-subtle flex items-center justify-between flex-wrap gap-4">
            <span className="text-sm font-bold tracking-widest text-muted">
              PROCESO ORGÁNICO & SOSTENIBLE
            </span>
            <span className="text-sm font-bold text-brand bg-brand-mist rounded-full" style={{ padding: '4px 12px' }}>
              100% Hecho a Mano
            </span>
          </div>
        </div>

        {/* Column of Stacked Bento Cards */}
        <div className="bento-stack">
          {/* Card 1: Wholesale */}
          <div className="bento-card-secondary bento-item">
            <div>
              <div className="icon-box-accent mb-4">
                <Users size={20} />
              </div>
              <h4 className="font-display text-primary font-bold mb-2 text-xl">
                Atención Mayorista
              </h4>
              <p className="text-secondary font-medium m-0 text-sm" style={{ lineHeight: '1.5' }}>
                ¿Tienes una marca, evento o negocio? Ofrecemos tarifas especiales por volumen y asesoramiento personalizado para tus proyectos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between">
              <span className="text-sm font-bold text-muted">Desde 12 unidades</span>
              <span className="text-sm font-bold text-accent cursor-pointer">
                COTIZAR AHORA →
              </span>
            </div>
          </div>

          {/* Card 2: Shipping */}
          <div className="bento-card-secondary bento-item">
            <div>
              <div className="icon-box-primary mb-4">
                <Truck size={20} />
              </div>
              <h4 className="font-display text-primary font-bold mb-2 text-xl">
                Envíos a toda Colombia
              </h4>
              <p className="text-secondary font-medium m-0 text-sm" style={{ lineHeight: '1.5' }}>
                Despachamos tu pedido con empaques premium y seguimiento integrado. Tus productos llegarán seguros y listos para lucir.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-subtle flex items-center justify-between">
              <span className="text-sm font-bold text-muted">Entregas seguras</span>
              <span className="text-sm font-bold text-brand cursor-pointer">
                VER POLÍTICAS →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStore;
