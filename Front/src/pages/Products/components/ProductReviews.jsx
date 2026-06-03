import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, AlertCircle } from 'lucide-react';
import * as productsService from '../../../services/products.service';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';

const ProductReviews = ({ productId }) => {
  const user = useAuthStore((state) => state.user);
  const addToast = useUiStore((state) => state.addToast);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const loadReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const revs = await productsService.fetchReviews(productId);
      setReviews(revs);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId, loadReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Por favor escribe un comentario', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      await productsService.createReview({
        productId,
        rating,
        comment
      });
      addToast('¡Reseña publicada con éxito!', 'success');
      setComment('');
      setRating(5);
      loadReviews();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al publicar reseña', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={24} style={{ color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Playfair Display, serif' }}>
          Experiencias de Clientes ({reviews.length})
        </h3>
      </div>

      {/* Current reviews list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {loadingReviews ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '2.5rem',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
            color: 'var(--color-text-light)'
          }}>
            <Star size={32} style={{ color: '#D0D0D0', marginBottom: '0.75rem' }} />
            <p style={{ margin: 0 }}>Nadie ha dejado una opinión aún. ¡Sé el primero en compartir tu experiencia!</p>
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r._id}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{r.user?.name || 'Cliente de SonTerry'}</span>
                <div style={{ display: 'flex', color: '#F5C60D' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= r.rating ? '#F5C60D' : 'none'}
                      stroke={s <= r.rating ? '#F5C60D' : '#D0D0D0'}
                    />
                  ))}
                </div>
              </div>
              <p style={{ margin: 0, color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6' }}>{r.comment}</p>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.75rem' }}>
                Publicado el {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Review submit form */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>
          Comparte tu Experiencia
        </h4>

        {user ? (
          <form onSubmit={handleReviewSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Calificación</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? '#F5C60D' : 'none'}
                      stroke={star <= rating ? '#F5C60D' : '#B0B0B0'}
                      style={{ transition: 'transform 0.1s ease' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Tu Comentario *</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos qué te pareció la calidad de la tela, el estampado o el servicio de despacho..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem'
                }}
                required
              />
            </div>

            <Button type="submit" variant="primary" disabled={submittingReview}>
              {submittingReview ? 'Publicando...' : 'Publicar Comentario'}
            </Button>
          </form>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--color-bg)',
            padding: '1.25rem',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-light)'
          }}>
            <AlertCircle size={20} style={{ color: 'var(--color-accent)' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Debes estar registrado e iniciar sesión para calificar un producto.{' '}
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'underline' }}>
                Inicia Sesión aquí
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
