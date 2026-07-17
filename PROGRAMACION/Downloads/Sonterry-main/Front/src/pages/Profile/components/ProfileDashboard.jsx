import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { useUserOrders } from '../../../queries/useOrders';
import { useWishlist } from '../../../queries/useWishlist';
import { Package, Clock, Heart, CreditCard, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import './ProfileDashboard.css';

const ProfileDashboard = ({ setActiveTab }) => {
  const { user } = useAuthStore();
  const { data: orders, isLoading: loadingOrders } = useUserOrders();
  const { data: wishlistData, isLoading: loadingWishlist } = useWishlist();

  if (loadingOrders || loadingWishlist) {
    return <LoadingSpinner />;
  }

  // Calculate quick stats
  const activeOrders = orders?.filter(o => ['pending', 'paid', 'shipped'].includes(o.status)) || [];
  const completedOrders = orders?.filter(o => o.status === 'delivered') || [];
  const wishlistItems = wishlistData?.products || [];

  // Get 3 most recent orders
  const recentOrders = orders?.slice(0, 3) || [];

  return (
    <div className="profile-dashboard-container animate-fade-in">
      <div className="pd-header">
        <h3 className="pd-title">¡Hola de nuevo, {user?.name.split(' ')[0]}! 👋</h3>
        <p className="pd-subtitle">Bienvenido a tu panel de control de SonTerry. Aquí tienes un resumen de tu actividad reciente.</p>
      </div>

      <div className="pd-stats-grid">
        <div className="pd-stat-card" onClick={() => setActiveTab('pedidos')}>
          <div className="pd-stat-icon" style={{ background: '#E8F5EA', color: 'var(--green-brand)' }}>
            <Clock size={24} />
          </div>
          <div className="pd-stat-info">
            <h4>{activeOrders.length}</h4>
            <p>Trabajos en Proceso</p>
          </div>
        </div>

        <div className="pd-stat-card" onClick={() => setActiveTab('pedidos')}>
          <div className="pd-stat-icon" style={{ background: '#F0F9FF', color: '#0EA5E9' }}>
            <Package size={24} />
          </div>
          <div className="pd-stat-info">
            <h4>{completedOrders.length}</h4>
            <p>Trabajos Completados</p>
          </div>
        </div>

        <div className="pd-stat-card" onClick={() => setActiveTab('deseos')}>
          <div className="pd-stat-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}>
            <Heart size={24} />
          </div>
          <div className="pd-stat-info">
            <h4>{wishlistItems.length}</h4>
            <p>En Lista de Deseos</p>
          </div>
        </div>
      </div>

      <div className="pd-sections-grid">
        {/* Recent Orders */}
        <div className="pd-section-card">
          <div className="pd-section-header">
            <h4>Actividad Reciente</h4>
            <button className="pd-link-btn" onClick={() => setActiveTab('pedidos')}>
              Ver todo <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="pd-recent-orders">
            {recentOrders.length === 0 ? (
              <div className="pd-empty">
                <p>Aún no has solicitado ningún trabajo.</p>
                <button className="pd-btn-outline" onClick={() => window.location.href = '/shop'}>
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              recentOrders.map(order => (
                <div key={order._id} className="pd-recent-item" onClick={() => setActiveTab('pedidos')}>
                  <div className="pd-recent-item-icon">
                    <Package size={20} />
                  </div>
                  <div className="pd-recent-item-details">
                    <h5>Pedido #{order._id.substring(18)}</h5>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="pd-recent-item-status">
                    <span className={`pd-badge ${order.status}`}>
                      {order.status === 'shipped' ? 'En Tránsito' : order.status === 'cancelled' ? 'Cancelado' : order.status}
                    </span>
                    <strong>{formatCurrency(order.total)}</strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Wishlist */}
        <div className="pd-side-column">
          <div className="pd-section-card" style={{ marginBottom: '1.5rem' }}>
            <div className="pd-section-header">
              <h4>Acciones Rápidas</h4>
            </div>
            <div className="pd-quick-actions">
              <button className="pd-action-btn" onClick={() => setActiveTab('billetera')}>
                <CreditCard size={18} /> Gestionar Métodos de Pago
              </button>
              <button className="pd-action-btn" onClick={() => setActiveTab('perfil')}>
                <Clock size={18} /> Actualizar Dirección de Envío
              </button>
            </div>
          </div>

          <div className="pd-section-card">
            <div className="pd-section-header">
              <h4>Lista de Deseos</h4>
              <button className="pd-link-btn" onClick={() => setActiveTab('deseos')}>
                Ver todo <ArrowRight size={14} />
              </button>
            </div>
            <div className="pd-wishlist-preview">
              {wishlistItems.length === 0 ? (
                <p className="pd-empty-text">Tu lista de deseos está vacía.</p>
              ) : (
                <div className="pd-wishlist-grid">
                  {wishlistItems.slice(0, 4).map(item => (
                    <img 
                      key={item._id} 
                      src={item.images?.[0] || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      title={item.name}
                      onClick={() => window.location.href = `/productos/${item.slug}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
