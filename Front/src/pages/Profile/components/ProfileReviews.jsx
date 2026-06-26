import React, { useState, useEffect } from 'react';
import * as productsService from '../../../services/products.service';
import api from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { useUiStore } from '../../../store/uiStore';
import { Trash2, Edit3, Clock, CheckCircle, Star } from 'lucide-react';
import { createPortal } from 'react-dom';

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
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#0F172A' }}>Mis Reseñas de Productos</h3>
      <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Aquí puedes ver y gestionar las opiniones y calificaciones que has aportado a la comunidad.
      </p>

      {isLoadingReviews ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>Cargando tus reseñas...</div>
      ) : reviews.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
          <p style={{ color: '#64748B', margin: 0 }}>No has escrito ninguna reseña todavía.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {reviews.map((rev) => (
            <div
              key={rev._id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.25rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                {rev.product?.images?.[0] ? (
                  <img 
                    src={rev.product.images[0]} 
                    alt={rev.product?.name || 'Producto'} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E2E8F0' }} 
                    onError={e => e.target.style.display='none'}
                  />
                ) : (
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Sin imagen</span>
                  </div>
                )}
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 0.2rem 0', color: '#1E293B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rev.product?.name || 'Producto'}
                    </h4>
                    <div style={{ color: '#F59E0B', fontSize: '0.9rem', minWidth: '70px', textAlign: 'right' }}>
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {formatDate(rev.createdAt)}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {rev.isApproved ? (
                    <>
                      <CheckCircle size={16} color="#10B981" />
                      <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Publicada</span>
                    </>
                  ) : (
                    <>
                      <Clock size={16} color="#F59E0B" />
                      <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 600 }}>En moderación</span>
                    </>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditingReview(rev)} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.borderColor='#3B82F6'; e.currentTarget.style.color='#3B82F6'}} onMouseLeave={e => {e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.color='#475569'}}>
                    <Edit3 size={14} /> <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Editar</span>
                  </button>
                  <button onClick={() => setDeletingReview(rev)} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#EF4444', transition: 'all 0.2s' }} onMouseEnter={e => {e.currentTarget.style.backgroundColor='#FEF2F2'; e.currentTarget.style.borderColor='#FCA5A5'}} onMouseLeave={e => {e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.borderColor='#E2E8F0'}}>
                    <Trash2 size={14} /> <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Borrar</span>
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
