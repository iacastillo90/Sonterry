import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { User, ShoppingBag, CreditCard, MessageSquare, LifeBuoy, LogOut, Menu, X } from 'lucide-react';
import OrderHistory from './components/OrderHistory';
import ProfileWallet from './components/ProfileWallet';
import ProfileReviews from './components/ProfileReviews';
import ProfileSupport from './components/ProfileSupport';
import ProfileInfo from './components/ProfileInfo';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const addToast = useUiStore((state) => state.addToast);
  
  const [activeTab, setActiveTab] = useState('perfil');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar on route or tab change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    addToast('Sesión cerrada con éxito', 'info');
    navigate('/login');
  };

  return (
    <>
      <div className="container profile-root">
        <div className="profile-header">
          <h2 className="profile-title">Mi Cuenta</h2>
          <button 
            className="profile-hamburger" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="profile-layout">
          
          {/* Overlay for mobile */}
          <div 
            className={`profile-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
            onClick={() => setIsSidebarOpen(false)} 
          />

          {/* Sidebar Menu */}
          <div className={`profile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>Hola, {user?.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{user?.email}</span>
              </div>
              <button 
                className="profile-hamburger" 
                style={{ display: isSidebarOpen ? 'flex' : 'none', background: 'transparent', color: 'var(--text-primary)' }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

          <button
            onClick={() => setActiveTab('perfil')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'perfil' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'perfil' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'perfil' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <User size={18} />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'pedidos' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'pedidos' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'pedidos' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ShoppingBag size={18} />
            <span>Mis Pedidos / Trabajos</span>
          </button>

          <button
            onClick={() => setActiveTab('billetera')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'billetera' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'billetera' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'billetera' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <CreditCard size={18} />
            <span>Mi Billetera</span>
          </button>

          <button
            onClick={() => setActiveTab('comentarios')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'comentarios' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'comentarios' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'comentarios' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <MessageSquare size={18} />
            <span>Mis Reseñas</span>
          </button>

          <button
            onClick={() => setActiveTab('soporte')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'soporte' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'soporte' ? '#FFFFFF' : 'var(--color-text)',
              fontWeight: activeTab === 'soporte' ? '600' : '500',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LifeBuoy size={18} />
            <span>Soporte Técnico</span>
          </button>

          {/* Separator line */}
          <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.75rem 0' }} />

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--color-danger)',
              fontWeight: '600',
              textAlign: 'left',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          
          {/* TAB 1: PERFIL */}
          {activeTab === 'perfil' && (
            <ProfileInfo />
          )}

          {/* TAB 2: PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="animate-fade-in">
              <OrderHistory />
            </div>
          )}

          {/* TAB 3: BILLETERA */}
          {activeTab === 'billetera' && (
            <ProfileWallet />
          )}

          {/* TAB 4: COMENTARIOS */}
          {activeTab === 'comentarios' && (
            <ProfileReviews isActive={activeTab === 'comentarios'} />
          )}

          {/* TAB 5: SOPORTE */}
          {activeTab === 'soporte' && (
            <ProfileSupport />
          )}

        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
