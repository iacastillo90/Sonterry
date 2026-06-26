import React, { useState, useEffect } from 'react';
import * as productsService from '../../../services/products.service';
import api from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { useUiStore } from '../../../store/uiStore';
import { Trash2, Edit3, Clock, CheckCircle, Star } from 'lucide-react';
import { createPortal } from 'react-dom';
import './ProfileReviews.css';

const EditReviewModal = ({ review, onClose, onSuccess }) => {
  const addToast = useUiStore(s => s.addToast);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      addToast('El comentario no puede estar vacío', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.put(`/reviews/${review._id}`, { rating, comment });
      addToast('Reseña actualizada. Volverá a ser revisada por moderación.', 'success');
      onSuccess();
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al actualizar reseña', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backdropFilter: 'blur(5px)' }}>
      <div className="animate-fade-in" style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '2rem', maxWidth: '450px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#0F172A' }}>Editar Reseña</h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{review.product?.name}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              size={32} 
              fill={star <= rating ? '#F59E0B' : 'transparent'} 
              color={star <= rating ? '#F59E0B' : '#CBD5E1'}
              style={{ cursor: 'pointer', transition: 'transform 0.1s' }}
              onClick={() => setRating(star)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>

        <textarea 
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Tu comentario..."
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outlineColor: '#3B82F6', minHeight: '80px', fontSize: '0.9rem', resize: 'none', marginBottom: '1.5rem' }}
        ></textarea>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFF', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const DeleteConfirmModal = ({ review, onClose, onSuccess }) => {
  const addToast = useUiStore(s => s.addToast);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/reviews/${review._id}`);
      addToast('Reseña eliminada correctamente', 'success');
      onSuccess();
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al eliminar reseña', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const modalContent = (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backdropFilter: 'blur(5px)' }}>
      <div className="animate-fade-in" style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '2rem', maxWidth: '400px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', textAlign: 'center' }}>
        <div style={{ width: '50px', height: '50px', backgroundColor: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <Trash2 color="#DC2626" size={24} />
        </div>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#0F172A' }}>¿Eliminar reseña?</h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Esta acción no se puede deshacer.</p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleDelete} disabled={isDeleting} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#DC2626', color: '#FFF', fontWeight: 600, cursor: isDeleting ? 'not-allowed' : 'pointer' }}>
            {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ProfileReviews = ({ isActive }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);

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
    <div className="reviews-container">
      <div className="reviews-header">
        <h3 className="reviews-title">Mis Reseñas de Productos</h3>
        <p className="reviews-subtitle">
          Aquí puedes ver y gestionar las opiniones y calificaciones que has aportado a la comunidad.
        </p>
      </div>

      {isLoadingReviews ? (
        <div className="reviews-state">
          <p>Cargando tus reseñas...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="reviews-state">
          <Star size={48} strokeWidth={1} color="var(--text-muted)" />
          <h3>Sin reseñas</h3>
          <p>No has escrito ninguna reseña todavía.</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev._id} className="review-card">
              <div className="review-card-header">
                {rev.product?.images?.[0] ? (
                  <img 
                    src={rev.product.images[0]} 
                    alt={rev.product?.name || 'Producto'} 
                    className="review-product-img"
                    onError={e => e.target.style.display='none'}
                  />
                ) : (
                  <div className="review-product-no-img">
                    Sin imagen
                  </div>
                )}
                
                <div className="review-product-info">
                  <h4 className="review-product-name">
                    {rev.product?.name || 'Producto'}
                  </h4>
                  <div className="review-rating-stars">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                  <div className="review-date">
                    {formatDate(rev.createdAt)}
                  </div>
                </div>
              </div>

              <div className="review-comment-box">
                <p className="review-comment-text">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="review-card-footer">
                {rev.isApproved ? (
                  <div className="review-status approved">
                    <CheckCircle size={16} />
                    <span>Publicada</span>
                  </div>
                ) : (
                  <div className="review-status pending">
                    <Clock size={16} />
                    <span>En moderación</span>
                  </div>
                )}
                
                <div className="review-actions">
                  <button onClick={() => setEditingReview(rev)} className="review-action-btn edit">
                    <Edit3 size={14} /> <span>Editar</span>
                  </button>
                  <button onClick={() => setDeletingReview(rev)} className="review-action-btn delete">
                    <Trash2 size={14} /> <span>Borrar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingReview && (
        <EditReviewModal 
          review={editingReview} 
          onClose={() => setEditingReview(null)} 
          onSuccess={() => { setEditingReview(null); loadUserReviews(); }} 
        />
      )}

      {deletingReview && (
        <DeleteConfirmModal 
          review={deletingReview} 
          onClose={() => setDeletingReview(null)} 
          onSuccess={() => { setDeletingReview(null); loadUserReviews(); }} 
        />
      )}
    </div>
  );
};

export default ProfileReviews;
