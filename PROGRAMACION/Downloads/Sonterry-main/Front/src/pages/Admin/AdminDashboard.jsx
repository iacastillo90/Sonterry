import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';
import api from '../../services/api';
import * as productsService from '../../services/products.service';
import { useAdminOrders } from '../../queries/useOrders';
import { useAdminTickets } from '../../queries/useTickets';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  LayoutDashboard, 
  Package, 
  FolderKanban, 
  TrendingUp, 
  LifeBuoy, 
  Users, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Truck, 
  Search, 
  CheckCircle, 
  Clock, 
  ShieldAlert,
  UserCheck,
  UserX,
  PlusCircle,
  Layers,
  Sparkles,
  Landmark,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import './Admin.css';
import AdminProducts from './components/AdminProducts';
import AdminCategories from './components/AdminCategories';
import AdminOrders from './components/AdminOrders';
import AdminTickets from './components/AdminTickets';
import AdminUsers from './components/AdminUsers';
import AdminBankAccounts from './components/AdminBankAccounts';
import AdminReviews from './components/AdminReviews';

const AdminDashboard = () => {
  const location = useLocation();
  const addToast = useUiStore((state) => state.addToast);

  // Active View Tab state
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('/despacho')) return 'ventas';
    if (location.pathname.includes('/productos')) return 'productos';
    return 'dashboard';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  // Data lists states
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // React Query mutations and queries
  const { data: orders, isLoading: loadingOrders, refetch: refetchOrders } = useAdminOrders();
  const { data: tickets, isLoading: loadingTickets, refetch: refetchTickets } = useAdminTickets();

  // Load all initial lists
  const loadCatalogData = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const [cats, prods] = await Promise.all([
        productsService.fetchCategories(),
        api.get('/products?limit=100&isActive=all').then((r) => r.data.data.data),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al cargar datos del catálogo', 'error');
    } finally {
      setLoadingProducts(false);
    }
  }, [addToast]);

  const fetchUsersList = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get('/users');
      // Extract array from the standard pagination schema
      setUsers(res.data.data?.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    loadCatalogData();
    fetchUsersList();
  }, [loadCatalogData, fetchUsersList]);

  // Calculate statistics
  const totalIngresos = (orders || [])
    .filter(o => ['paid', 'shipped', 'delivered'].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const pedidosActivos = (orders || []).filter(o => ['paid', 'shipped', 'pending'].includes(o.status)).length;
  const stockCriticoCount = products.filter(p => p.stock <= 5 && !p.isDeleted).length;
  const soporteAbiertoCount = (tickets || []).filter(t => ['pending', 'open', 'in_progress'].includes(t.status)).length;
  const nuevosUsuarios = (users || []).slice(0, 5); // Assuming latest are first, or we can sort
  
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container admin-container">
      <div className="admin-header">
        <div className="admin-title-wrap">
          <h2>
            <Sparkles style={{ color: 'var(--color-primary)' }} /> Panel del Dueño
          </h2>
          <span>
            Administración centralizada de inventario, ventas, clientes y tickets de soporte.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => {
              loadCatalogData();
              fetchUsersList();
              refetchOrders();
              refetchTickets();
              addToast('Datos actualizados', 'info');
            }}
            className="admin-sync-btn"
          >
            <RefreshCw size={14} /> Sincronizar
          </button>
          <button 
            className="admin-hamburger" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="admin-layout">
        
        {/* Overlay for mobile */}
        <div 
          className={`admin-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
          onClick={() => setIsSidebarOpen(false)} 
        />

        {/* Left Admin Sidebar */}
        <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4>SonTerry Admin</h4>
              <span>Modo Administrador</span>
            </div>
            <button 
              className="admin-hamburger" 
              style={{ display: isSidebarOpen ? 'flex' : 'none', background: 'transparent', color: 'var(--text-primary)', padding: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : 'inactive'}`}
          >
            <LayoutDashboard size={18} />
            <span>Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('productos')}
            className={`admin-tab-btn ${activeTab === 'productos' ? 'active' : 'inactive'}`}
          >
            <Package size={18} />
            <span>Inventario & Artículos</span>
          </button>

          <button
            onClick={() => setActiveTab('categorias')}
            className={`admin-tab-btn ${activeTab === 'categorias' ? 'active' : 'inactive'}`}
          >
            <Layers size={18} />
            <span>Categorías</span>
          </button>

          <button
            onClick={() => setActiveTab('ventas')}
            className={`admin-tab-btn ${activeTab === 'ventas' ? 'active' : 'inactive'}`}
          >
            <Truck size={18} />
            <span>Despachos & Logística</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`admin-tab-btn ${activeTab === 'tickets' ? 'active' : 'inactive'}`}
          >
            <LifeBuoy size={18} />
            <span>Tickets de Soporte</span>
          </button>

          <button
            onClick={() => setActiveTab('bancos')}
            className={`admin-tab-btn ${activeTab === 'bancos' ? 'active' : 'inactive'}`}
          >
            <Landmark size={18} />
            <span>Cuentas Bancarias</span>
          </button>

          <button
            onClick={() => setActiveTab('resenas')}
            className={`admin-tab-btn ${activeTab === 'resenas' ? 'active' : 'inactive'}`}
          >
            <MessageSquare size={18} />
            <span>Moderación de Reseñas</span>
          </button>

          <button
            onClick={() => setActiveTab('usuarios')}
            className={`admin-tab-btn ${activeTab === 'usuarios' ? 'active' : 'inactive'}`}
          >
            <Users size={18} />
            <span>Usuarios / Clientes</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="admin-content-area">

          {/* TAB 1: SUMMARY DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in" style={{ padding: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0F172A', fontWeight: 800, letterSpacing: '-0.5px' }}>Resumen de Operación</h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.95rem' }}>Bienvenido de nuevo. Aquí tienes un vistazo general de tu negocio hoy.</p>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <Clock size={14} color="#64748B" /> <span style={{ textTransform: 'capitalize' }}>{today}</span>
                </div>
              </div>
              
              {/* KPIs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', borderRadius: '12px', padding: '1.5rem', color: '#FFF', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.1 }}>
                    <TrendingUp size={100} />
                  </div>
                  <TrendingUp size={24} style={{ color: '#BFDBFE', marginBottom: '1rem' }} />
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#DBEAFE', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ingresos Totales</span>
                  <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem' }}>{formatCurrency(totalIngresos)}</span>
                </div>

                <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#F0FDF4', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <ShoppingBag size={20} style={{ color: '#16A34A' }} />
                  </div>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pedidos Activos</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '1.8rem', color: '#0F172A', fontWeight: 800 }}>{pedidosActivos}</span>
                    <span style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 600 }}>en curso</span>
                  </div>
                </div>

                <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: stockCriticoCount > 0 ? '#FEF2F2' : '#F8FAFC', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <ShieldAlert size={20} style={{ color: stockCriticoCount > 0 ? '#DC2626' : '#94A3B8' }} />
                  </div>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stock Crítico</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '1.8rem', color: stockCriticoCount > 0 ? '#DC2626' : '#0F172A', fontWeight: 800 }}>{stockCriticoCount}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>referencias</span>
                  </div>
                </div>

                <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#FFFBEB', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <LifeBuoy size={20} style={{ color: '#D97706' }} />
                  </div>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tickets Abiertos</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '1.8rem', color: '#0F172A', fontWeight: 800 }}>{soporteAbiertoCount}</span>
                    <span style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>por resolver</span>
                  </div>
                </div>
              </div>

              {/* Sub grid for critical alerts & actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                
                {/* Latest Orders Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
                      <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                        <ShoppingBag size={18} style={{ color: '#2563EB' }} /> Últimos Pedidos
                      </h4>
                      <button onClick={() => setActiveTab('ventas')} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Ver todos</button>
                    </div>
                    <div style={{ padding: '0.5rem 1.25rem' }}>
                      {(!orders || orders.length === 0) ? (
                        <p style={{ fontSize: '0.9rem', color: '#64748B', textAlign: 'center', padding: '2rem 0' }}>No hay pedidos registrados.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {orders.slice(0, 5).map(o => (
                            <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #F1F5F9' }}>
                              <div>
                                <span style={{ display: 'block', fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>#{o._id.slice(-6).toUpperCase()}</span>
                                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{o.user?.name || 'Cliente invitado'}</span>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'block', fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{formatCurrency(o.total)}</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: o.status === 'paid' ? '#16A34A' : o.status === 'pending' ? '#D97706' : '#2563EB', background: o.status === 'paid' ? '#DCFCE7' : o.status === 'pending' ? '#FEF3C7' : '#DBEAFE', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '2px' }}>
                                  {o.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Secondary Column: Stock & Users */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
                      <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                        <Package size={18} style={{ color: '#DC2626' }} /> Alertas de Stock
                      </h4>
                      <button onClick={() => setActiveTab('productos')} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Inventario</button>
                    </div>
                    <div style={{ padding: '0.5rem 1.25rem' }}>
                      {stockCriticoCount === 0 ? (
                        <p style={{ fontSize: '0.9rem', color: '#16A34A', textAlign: 'center', padding: '2rem 0', fontWeight: 500 }}>
                          <CheckCircle size={32} style={{ margin: '0 auto 0.5rem auto', display: 'block', opacity: 0.5 }} />
                          Todo el catálogo cuenta con niveles saludables.
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {products.filter(p => p.stock <= 5 && !p.isDeleted).slice(0, 4).map(p => (
                            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #F1F5F9' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#F1F5F9', overflow: 'hidden' }}>
                                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                                </div>
                                <span style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.85rem', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                              </div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DC2626', background: '#FEF2F2', padding: '2px 8px', borderRadius: '12px', border: '1px solid #FECACA' }}>
                                {p.stock} uds
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
                      <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>
                        <Users size={16} style={{ color: '#059669' }} /> Últimos Registros
                      </h4>
                    </div>
                    <div style={{ padding: '0.5rem 1.25rem' }}>
                      {nuevosUsuarios.length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: '#64748B', textAlign: 'center', padding: '1rem 0' }}>No hay usuarios.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {nuevosUsuarios.map(u => (
                            <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #F1F5F9' }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}>{u.name}</span>
                                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{u.email}</span>
                              </div>
                              <span style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: u.role === 'admin' ? '#FEF08A' : '#F1F5F9', color: u.role === 'admin' ? '#A16207' : '#64748B', padding: '2px 8px', borderRadius: '12px' }}>
                                {u.role === 'admin' ? 'Admin' : 'Cliente'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT & INVENTORY */}
          {activeTab === 'productos' && (
            <AdminProducts 
              categories={categories} 
              products={products} 
              loadingProducts={loadingProducts} 
              loadCatalogData={loadCatalogData} 
              addToast={addToast} 
            />
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === 'categorias' && (
            <AdminCategories 
              categories={categories} 
              setCategories={setCategories}
              addToast={addToast}
              loadCatalogData={loadCatalogData}
            />
          )}

          {/* TAB 4: ORDERS & DISPATCH LOGISTICS */}
          {activeTab === 'ventas' && (
            <AdminOrders 
              orders={orders} 
              loadingOrders={loadingOrders} 
              addToast={addToast} 
              products={products}
              categories={categories}
              users={users}
              refetchOrders={refetchOrders}
              loadCatalogData={loadCatalogData}
            />
          )}

          {/* TAB 5: SUPPORT TICKETS MANAGER */}
          {activeTab === 'tickets' && (
            <AdminTickets 
              tickets={tickets} 
              loadingTickets={loadingTickets} 
              addToast={addToast} 
              refetchTickets={refetchTickets}
            />
          )}

          {/* TAB 6: REGISTERED USERS MANAGEMENT */}
          {activeTab === 'usuarios' && (
            <AdminUsers 
              users={users} 
              loadingUsers={loadingUsers} 
              fetchUsersList={fetchUsersList} 
              addToast={addToast} 
            />
          )}

          {/* TAB 7: BANK ACCOUNTS MANAGEMENT */}
          {activeTab === 'bancos' && (
            <AdminBankAccounts addToast={addToast} />
          )}

          {/* TAB 8: REVIEWS MODERATION */}
          {activeTab === 'resenas' && (
            <AdminReviews />
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
