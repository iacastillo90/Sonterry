import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productsService from '../../../services/products.service';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (categoryId && currentProductId) {
      loadRelatedProducts();
    }
  }, [categoryId, currentProductId]);

  const loadRelatedProducts = async () => {
    setLoadingRelated(true);
    try {
      const relProds = await productsService.fetchRelatedProducts(categoryId, currentProductId);
      setRelatedProducts(relProds);
    } catch (err) {
      console.error('Error fetching related products:', err);
    } finally {
      setLoadingRelated(false);
    }
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
        También te puede interesar
      </h3>
      
      {loadingRelated ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
        </div>
      ) : relatedProducts.length === 0 ? (
        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>No hay otros productos recomendados en esta categoría.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2rem'
        }}>
          {relatedProducts.map((p) => (
            <Link
              key={p._id}
              to={`/productos/${p.slug}`}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)',
                maxWidth: '320px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300'}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Playfair Display, serif',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>{p.name}</h4>
                <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                  {formatCurrency(p.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
