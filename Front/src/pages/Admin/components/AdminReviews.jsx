import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useUiStore } from '../../../store/uiStore';
import { formatDate } from '../../../utils/formatDate';
import { CheckCircle, XCircle, Trash2, Clock, Star, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminReviews = () => {
  const addToast = useUiStore(s => s.addToast);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved'

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/reviews');
      setReviews(data?.data || []);
    } catch (error) {
      addToast(error.response?.data?.message || 'Error cargando reseñas', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleApproval = async (id, currentStatus) => {
    try {
      await api.patch(`/reviews/${id}/approve`, { isApproved: !currentStatus });
      addToast(`Reseña ${!currentStatus ? 'aprobada' : 'ocultada'} exitosamente`, 'success');
      setReviews(prev => prev.map(r => r._id === id ? { ...r, isApproved: !currentStatus } : r));
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al actualizar reseña', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta reseña permanentemente?')) return;
    try {
      await api.delete(`/reviews/admin/${id}`);
      addToast('Reseña eliminada permanentemente', 'success');
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al eliminar reseña', 'error');
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !r.isApproved;
    if (filter === 'approved') return r.isApproved;
    return true;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '1.5rem', borderRadius: '16px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#0F172A', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={24} color="#3B82F6" /> Moderación de Reseñas
          </h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.95rem' }}>Aprueba o rechaza los comentarios de los clientes antes de ser públicos.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#FFF', padding: '0.3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {[
            { id: 'pending', label: 'Pendientes', icon: <Clock size={14} /> },
            { id: 'approved', label: 'Aprobadas', icon: <CheckCircle size={14} /> },
            { id: 'all', label: 'Todas', icon: null }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: filter === f.id ? '#EFF6FF' : 'transparent',
                color: filter === f.id ? '#2563EB' : '#64748B',
                fontWeight: filter === f.id ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
          <MessageSquare size={48} color="#CBD5E1" style={{ marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>No hay reseñas {filter === 'pending' ? 'pendientes' : ''}</h3>
          <p style={{ color: '#94A3B8', margin: 0 }}>Todo está al día.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
          {filteredReviews.map(rev => (
            <div key={rev._id} style={{ backgroundColor: '#FFF', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  {rev.product?.images?.[0] ? (
                    <img src={rev.product.images[0]} alt="img" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <div style={{ width: '45px', height: '45px', backgroundColor: '#F1F5F9', borderRadius: '8px' }}></div>
                  )}
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem 0', color: '#1E293B', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{rev.product?.name || 'Producto eliminado'}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Por: {rev.user?.name || 'Usuario'} ({rev.user?.email || 'N/A'})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                  <div style={{ color: '#F59E0B', fontSize: '0.9rem' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{formatDate(rev.createdAt)}</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', borderLeft: `3px solid ${rev.isApproved ? '#10B981' : '#F59E0B'}`, flex: 1, marginBottom: '1.5rem' }}>
                <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.5 }}>"{rev.comment}"</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: 'auto' }}>
                <button
                  onClick={() => handleToggleApproval(rev._id, rev.isApproved)}
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: rev.isApproved ? '#FEF2F2' : '#ECFDF5',
                    color: rev.isApproved ? '#DC2626' : '#10B981',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem'
                  }}
                >
                  {rev.isApproved ? <><XCircle size={16} /> Ocultar</> : <><CheckCircle size={16} /> Aprobar</>}
                </button>
                
                <button
                  onClick={() => handleDelete(rev._id)}
                  style={{
                    padding: '0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFF',
                    color: '#64748B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Eliminar permanentemente"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
