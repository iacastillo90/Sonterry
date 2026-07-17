import React from 'react';
import { useProducts } from '../../../queries/useProducts';
import ProductCard from '../../Products/components/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const ProductCarousel = () => {
  // Solicitamos un buen número de productos para el carrusel (ej. los últimos 10)
  const { data: products, isLoading } = useProducts({ limit: 10 });

  if (isLoading) return <LoadingSpinner />;
  if (!products || products.length === 0) return null;

  // Duplicamos la lista de productos un par de veces para garantizar que el scroll infinito nunca se corte en pantallas anchas
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section style={{
      padding: '5rem 0',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      position: 'relative'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
        <span style={{
          display: 'inline-block',
          color: 'var(--green-deep)',
          fontWeight: '800',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '0.5rem'
        }}>
          Catálogo Extendido
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          margin: 0
        }}>
          Explora todos nuestros diseños
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Difuminado Izquierdo */}
        <div className="carousel-fade-left" />
        
        {/* Pista del Carrusel */}
        <div className="carousel-track">
          {duplicatedProducts.map((prod, index) => (
            <div key={`${prod._id}-${index}`} className="carousel-card-wrapper">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

        {/* Difuminado Derecho */}
        <div className="carousel-fade-right" />
      </div>
    </section>
  );
};

export default ProductCarousel;
