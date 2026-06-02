import React, { useRef } from 'react';
import { useProducts } from '../../../queries/useProducts';
import ProductCard from '../../Products/components/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const containerRef = useRef(null);
  const { data: products, isLoading } = useProducts({ limit: 3 });

  useGSAP(() => {
    if (isLoading || !products?.length) return;

    gsap.fromTo(
      containerRef.current.querySelector('.fp-header'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo(
      containerRef.current.querySelectorAll('.fp-card'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
  }, { dependencies: [isLoading, products], scope: containerRef });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <style>{`
        .fp-section {
          padding: 6rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .fp-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .fp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 999px;
          background: var(--green-ghost, #E8F5EA);
          color: var(--green-deep, #1E4A28);
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .fp-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .fp-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .fp-section { padding: 4rem 1.5rem; }
          .fp-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>      <section ref={containerRef} className="fp-section">
        {/* Header */}
        <div className="fp-header">
          <div className="fp-eyebrow">
            <Sparkles size={11} strokeWidth={2.5} />
            Curaduría Limitada
          </div>
          <h2 className="fp-title">Destacados del Taller</h2>
          <p className="fp-sub">
            Nuestras piezas más solicitadas, creadas con dedicación y acabados de calidad boutique.
          </p>
        </div>

        {/* Cards — mismo componente que /productos */}
        <div className="fp-grid">
          {products?.map((prod) => (
            <div key={prod._id} className="fp-card">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
