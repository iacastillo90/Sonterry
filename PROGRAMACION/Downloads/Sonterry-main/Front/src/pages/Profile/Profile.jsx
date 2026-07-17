import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { User, ShoppingBag, CreditCard, MessageSquare, LifeBuoy, Heart, Settings as SettingsIcon, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import ProfileDashboard from './components/ProfileDashboard';
import OrderHistory from './components/OrderHistory';
import ProfileWallet from './components/ProfileWallet';
import ProfileReviews from './components/ProfileReviews';
import ProfileSupport from './components/ProfileSupport';
import ProfileInfo from './components/ProfileInfo';
import Wishlist from './Wishlist';
import Settings from './Settings';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const addToast = useUiStore((state) => state.addToast);
  
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Listen for state changes to update tab if navigating to profile while already inside
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  
  // Close sidebar on route or tab change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const handleLogout = async () => {
    await logout();
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
            onClick={() => setActiveTab('inicio')}
            className={`profile-nav-btn ${activeTab === 'inicio' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`profile-nav-btn ${activeTab === 'perfil' ? 'active' : ''}`}
          >
            <User size={18} />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`profile-nav-btn ${activeTab === 'pedidos' ? 'active' : ''}`}
          >
            <ShoppingBag size={18} />
            <span>Mis Pedidos / Trabajos</span>
          </button>

          <button
            onClick={() => setActiveTab('billetera')}
            className={`profile-nav-btn ${activeTab === 'billetera' ? 'active' : ''}`}
          >
            <CreditCard size={18} />
            <span>Mi Billetera</span>
          </button>

          <button
            onClick={() => setActiveTab('comentarios')}
            className={`profile-nav-btn ${activeTab === 'comentarios' ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>Mis Reseñas</span>
          </button>

          <button
            onClick={() => setActiveTab('soporte')}
            className={`profile-nav-btn ${activeTab === 'soporte' ? 'active' : ''}`}
          >
            <LifeBuoy size={18} />
            <span>Soporte Técnico</span>
          </button>

          <button
            onClick={() => setActiveTab('deseos')}
            className={`profile-nav-btn ${activeTab === 'deseos' ? 'active' : ''}`}
          >
            <Heart size={18} />
            <span>Lista de Deseos</span>
          </button>

          <button
            onClick={() => setActiveTab('configuracion')}
            className={`profile-nav-btn ${activeTab === 'configuracion' ? 'active' : ''}`}
          >
            <SettingsIcon size={18} />
            <span>Configuración</span>
          </button>

          {/* Separator line */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.75rem 0' }} />

          <button
            onClick={handleLogout}
            className="profile-nav-btn danger"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content">
          
          {/* TAB 0: INICIO (DASHBOARD) */}
          {activeTab === 'inicio' && (
            <ProfileDashboard setActiveTab={setActiveTab} />
          )}

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

          {/* TAB 6: LISTA DE DESEOS */}
          {activeTab === 'deseos' && (
            <div className="animate-fade-in">
              <Wishlist />
            </div>
          )}

          {/* TAB 7: CONFIGURACIÓN */}
          {activeTab === 'configuracion' && (
            <div className="animate-fade-in">
              <Settings />
            </div>
          )}

        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
