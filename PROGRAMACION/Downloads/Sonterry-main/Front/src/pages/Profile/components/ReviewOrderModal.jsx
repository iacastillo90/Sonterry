import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../services/api';
import { useUiStore } from '../../../store/uiStore';
import { Star, X } from 'lucide-react';

const ReviewOrderModal = ({ order, onClose }) => {
  const addToast = useUiStore(s => s.addToast);
  
  // Deduplicate products safely in case the product was deleted from DB (product is null)
  const uniqueProducts = Array.from(
    new Map(
      order.items
        .filter(item => item.product && item.product._id)
        .map(item => [item.product._id, item])
    ).values()
  );
  
  const [reviews, setReviews] = useState(
    uniqueProducts.map(item => ({
      productId: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0],
      rating: 5,
      comment: ''
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = reviews[currentIndex];

  const handleRatingChange = (val) => {
    const newReviews = [...reviews];
    newReviews[currentIndex].rating = val;
    setReviews(newReviews);
  };

  const handleCommentChange = (e) => {
    const newReviews = [...reviews];
    newReviews[currentIndex].comment = e.target.value;
    setReviews(newReviews);
  };

  const handleNextOrSubmit = async () => {
    if (!currentItem.comment.trim()) {
      addToast('Por favor escribe un breve comentario', 'error');
      return;
    }

    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Submit all reviews
      setIsSubmitting(true);
      let successCount = 0;
      let alreadyReviewedCount = 0;

      for (const rev of reviews) {
        if (rev.comment.trim()) {
          try {
            await api.post('/reviews', {
              productId: rev.productId,
              rating: rev.rating,
              comment: rev.comment
            });
            successCount++;
          } catch (error) {
            const msg = error.response?.data?.message || '';
            if (msg.includes('Ya has reseñado')) {
              alreadyReviewedCount++;
            } else {
              addToast(`Error al reseñar ${rev.name}: ${msg}`, 'error');
            }
          }
        }
      }
      
      setIsSubmitting(false);
      
      if (successCount > 0) {
        addToast('¡Gracias por tus reseñas! Tu opinión es muy valiosa.', 'success');
        localStorage.setItem(`has_submitted_review_${order._id}`, 'true');
      } else if (alreadyReviewedCount > 0) {
        addToast('Al parecer ya habías dejado reseñas para estos productos anteriormente.', 'info');
        localStorage.setItem(`has_submitted_review_${order._id}`, 'true');
      }

      onClose(true); // true indicates successful submission
    }
  };

  const handleLater = () => {
    localStorage.setItem(`has_dismissed_review_${order._id}`, 'true');
    onClose(false);
  };

  const modalContent = (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backdropFilter: 'blur(5px)' }}>
      <div className="animate-fade-in" style={{ backgroundColor: '#FFF', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '450px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', textAlign: 'center', position: 'relative' }}>
        
        <button onClick={handleLater} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.2rem' }}>
          <X size={20} />
        </button>

        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#0F172A' }}>¡Tu pedido ha sido entregado! 🎉</h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Nos encantaría saber qué te parecieron los artículos. Tu opinión ayuda a otros compradores.</p>

        <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {currentItem.image && (
              <img src={currentItem.image} alt={currentItem.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Artículo {currentIndex + 1} de {reviews.length}</span>
              <h4 style={{ margin: '0.2rem 0 0 0', color: '#1E293B', fontSize: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{currentItem.name}</h4>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={32} 
                fill={star <= currentItem.rating ? '#F59E0B' : 'transparent'} 
                color={star <= currentItem.rating ? '#F59E0B' : '#CBD5E1'}
                style={{ cursor: 'pointer', transition: 'transform 0.1s' }}
                onClick={() => handleRatingChange(star)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            ))}
          </div>

          <textarea 
            value={currentItem.comment}
            onChange={handleCommentChange}
            placeholder="¿Qué te pareció la calidad? ¿Cumplió tus expectativas?"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outlineColor: '#3B82F6', minHeight: '80px', fontSize: '0.9rem', resize: 'none' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleLater} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#64748B', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor='#F1F5F9'} onMouseLeave={e => e.currentTarget.style.backgroundColor='#F8FAFC'}>
            Quizás más tarde
          </button>
          <button onClick={handleNextOrSubmit} disabled={isSubmitting} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFF', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
            {isSubmitting ? 'Enviando...' : (currentIndex < reviews.length - 1 ? 'Siguiente Artículo' : 'Publicar Reseña')}
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ReviewOrderModal;
