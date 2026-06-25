import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { ShoppingBag, User as UserIcon, Search, Truck, Store, Phone, MapPin, Coffee, Menu, X } from 'lucide-react';
import logo from '../../assets/img/logo23.png';
import api from '../../services/api';
import SearchAutocomplete from './SearchAutocomplete';
import './Navbar.css';

const WhatsappIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const toggleCart = useUiStore((state) => state.toggleCart);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="nav-root">
        {/* Row 1: Top Bar */}
        <div className="nav-top-bar">
          <div className="container nav-top-inner">
            <Link to="/productos" className="nav-top-item" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Truck size={14} /> <span>Envíos a todo Colombia</span>
            </Link>
            <Link to="/productos" className="nav-top-item" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Store size={14} /> <span>Tiendas por departamentos</span>
            </Link>
            <a href="https://wa.me/573018267373" target="_blank" rel="noopener noreferrer" className="nav-top-item" style={{ color: 'inherit', textDecoration: 'none' }}>
              <WhatsappIcon size={14} /> <span>¿Necesitas ayuda? 301 826 7373</span>
            </a>
          </div>
        </div>

        {/* Row 2: Main Header */}
        <div className="nav-main glass">
          <div className="container nav-main-inner">
            {/* Left Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Hamburger Mobile */}
              <button className="nav-action-btn mobile-only" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={24} color="var(--green-deep)" />
              </button>

              {/* Logo */}
              <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} alt="SonTerry" className="nav-logo" />
                <div className="nav-brand-divider" />
                <div className="nav-brand-text">
                  <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--green-deep)', lineHeight: '1.2', fontFamily: 'var(--font-display)' }}>SonTerry<br />Tienda</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '500' }}>DTF</span>
                </div>
              </Link>
            </div>

            {/* Search (Desktop) */}
            <div className="nav-search desktop-only">
              <SearchAutocomplete variant="desktop" />
            </div>

            {/* Actions */}
            <div className="nav-actions">
              {/* Search Toggle (Mobile) */}
              <button className="nav-action-btn mobile-only" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                <Search size={22} color="var(--green-deep)" />
              </button>

              {isAuthenticated ? (
                <>
                  <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="nav-action-btn">
                    <UserIcon size={22} color="var(--green-deep)" />
                    <span>Mi Cuenta</span>
                  </Link>
                  <button onClick={() => { logout(); navigate('/login'); }} className="nav-action-btn desktop-only" style={{ color: '#E53E3E' }}>
                    <span>Salir</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-action-btn">
                  <UserIcon size={22} color="var(--green-deep)" />
                  <span>Ingresar</span>
                </Link>
              )}

              <button onClick={() => toggleCart()} className="nav-action-btn">
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingBag size={22} color="var(--green-deep)" />
                  {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
                </div>
                <span>Carrito</span>
              </button>
            </div>
          </div>

          {/* Search Expandable (Mobile) */}
          {isMobileSearchOpen && (
            <div className="mobile-search-container mobile-only container">
              <SearchAutocomplete variant="mobile" onSearchSubmit={() => setIsMobileSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Row 3: Sub-navbar (Desktop) */}
        <div className="nav-sub desktop-only">
          <div className="container nav-sub-inner">
            {categories.map((c) => (
              <Link key={c._id} to={`/productos?category=${c._id}`} className="nav-sub-link">
                <Store size={14} color="var(--green-brand)" strokeWidth={2.5} />
                <span style={{ textTransform: 'uppercase' }}>{c.name}</span>
              </Link>
            ))}
            <Link to="/nosotros" className="nav-sub-link">
              <Store size={14} color="var(--green-brand)" strokeWidth={2.5} />
              <span>NOSOTROS</span>
            </Link>
            {(isAuthenticated && user?.role !== 'admin') && (
              <Link to="/profile" state={{ tab: 'pedidos' }} className="nav-sub-link">
                <MapPin size={14} color="var(--green-brand)" strokeWidth={2.5} />
                <span>RASTREA TU PEDIDO</span>
              </Link>
            )}
            <Link to="/contacto" className="nav-sub-link">
              <WhatsappIcon size={14} color="var(--green-brand)" strokeWidth={2.5} />
              <span>CONTACTO</span>
            </Link>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className={`nav-mobile-overlay ${mobileMenuOpen ? 'open' : ''} mobile-only`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''} mobile-only`}>
          <div className="nav-mobile-header">
            <h3>Menú SonTerry</h3>
            <button className="nav-action-btn" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} color="var(--text-primary)" />
            </button>
          </div>
          <div className="nav-mobile-links">
            <Link to="/productos" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <Store size={18} color="var(--green-brand)" /> Catálogo Completo
            </Link>
            {categories.map((c) => (
              <Link key={c._id} to={`/productos?category=${c._id}`} className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <Store size={18} color="var(--green-brand)" /> {c.name}
              </Link>
            ))}
            <Link to="/nosotros" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <Store size={18} color="var(--green-brand)" /> Nosotros
            </Link>
            {(isAuthenticated && user?.role !== 'admin') && (
              <Link to="/profile" state={{ tab: 'pedidos' }} className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                <MapPin size={18} color="var(--green-brand)" /> Rastrea tu Pedido
              </Link>
            )}
            <Link to="/contacto" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <WhatsappIcon size={18} color="var(--green-brand)" /> Contacto
            </Link>

            {/* Additional user actions in mobile menu */}
            {isAuthenticated && (
              <>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '1rem 0' }} />
                <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  <UserIcon size={18} color={user?.role === 'admin' ? 'var(--terra-mid)' : 'var(--green-brand)'} /> Mi Cuenta
                </Link>
                <button
                  onClick={() => { logout(); navigate('/login'); setMobileMenuOpen(false); }}
                  className="nav-mobile-link"
                  style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', color: '#E53E3E' }}
                >
                  <UserIcon size={18} color="#E53E3E" /> Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
