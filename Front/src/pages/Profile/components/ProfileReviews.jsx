import React, { useState, useEffect } from 'react';
import * as productsService from '../../../services/products.service';
import { formatDate } from '../../../utils/formatDate';

const ProfileReviews = ({ isActive }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    if (isActive) {
      loadUserReviews();
    }
  }, [isActive]);

  const loadUserReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const data = await productsService.fetchUserReviews();
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Mis Reseñas de Productos</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Aquí puedes ver y gestionar las opiniones y calificaciones que has aportado a la comunidad.
      </p>

      {isLoadingReviews ? (
        <p>Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No has escrito ninguna reseña todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reviews.map((rev) => (
            <div
              key={rev._id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>
                  {rev.product?.name || 'Producto'}
                </h4>
                <div style={{ color: '#FFD700', fontSize: '0.95rem' }}>
                  {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
                Publicada el {formatDate(rev.createdAt)}
              </div>

              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--color-text)', backgroundColor: '#F9F7F2', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid var(--color-primary)' }}>
                "{rev.comment}"
              </p>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--color-text-light)', alignItems: 'center' }}>
                <span>Retroalimentación de la comunidad: <strong>Leída</strong></span>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>El administrador valoró positivamente tu comentario</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileReviews;
