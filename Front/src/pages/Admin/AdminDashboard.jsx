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
  Landmark
} from 'lucide-react';
import './Admin.css';
import AdminProducts from './components/AdminProducts';
import AdminCategories from './components/AdminCategories';
import AdminOrders from './components/AdminOrders';
import AdminTickets from './components/AdminTickets';
import AdminUsers from './components/AdminUsers';
import AdminBankAccounts from './components/AdminBankAccounts';

const AdminDashboard = () => {
  const location = useLocation();
  const addToast = useUiStore((state) => state.addToast);

  // Active View Tab state
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes('/despacho')) return 'ventas';
    if (location.pathname.includes('/productos')) return 'productos';
    return 'dashboard';
  });

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

  const pedidosActivos = (orders || []).filter(o => ['paid', 'shipped'].includes(o.status)).length;
  const stockCriticoCount = products.filter(p => p.stock <= 5 && !p.isDeleted).length;
  const soporteAbiertoCount = (tickets || []).filter(t => ['pending', 'open'].includes(t.status)).length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title-wrap">
          <h2>
            <Sparkles style={{ color: 'var(--color-primary)' }} /> Panel del Dueño
          </h2>
          <span>
            Administración centralizada de inventario, ventas, clientes y tickets de soporte.
          </span>
        </div>
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
      </div>

      <div className="admin-layout">
        
        {/* Left Admin Sidebar */}
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h4>SonTerry Admin</h4>
            <span>Modo Administrador</span>
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
            <div className="animate-fade-in">
              <h3 className="admin-tab-title">Resumen de Operación</h3>
              
              {/* KPIs Grid */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <TrendingUp size={24} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Ingresos Totales</span>
                  <span className="admin-kpi-value">{formatCurrency(totalIngresos)}</span>
                </div>

                <div className="admin-kpi-card">
                  <ShoppingBag size={24} style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Ventas Activas</span>
                  <span className="admin-kpi-value">{pedidosActivos}</span>
                </div>

                <div className="admin-kpi-card">
                  <ShieldAlert size={24} style={{ color: '#D9534F', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Stock Crítico</span>
                  <span className="admin-kpi-value" style={{ color: '#D9534F' }}>{stockCriticoCount} refs</span>
                </div>

                <div className="admin-kpi-card">
                  <LifeBuoy size={24} style={{ color: '#F0AD4E', marginBottom: '0.5rem' }} />
                  <span className="admin-kpi-label">Soporte Abierto</span>
                  <span className="admin-kpi-value" style={{ color: '#F0AD4E' }}>{soporteAbiertoCount} tks</span>
                </div>
              </div>

              {/* Sub grid for critical alerts & actions */}
              <div className="admin-alerts-grid">
                {/* Critical Inventory */}
                <div className="admin-alert-box">
                  <h4 className="admin-alert-title">
                    <Package size={18} style={{ color: '#D9534F' }} /> Stock en Alerta (5 o menos)
                  </h4>
                  {stockCriticoCount === 0 ? (
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', margin: 0 }}>Todo el catálogo cuenta con niveles de stock saludables.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {products
                        .filter(p => p.stock <= 5 && !p.isDeleted)
                        .slice(0, 5)
                        .map(p => (
                          <div key={p._id} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F0F0F0' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>{p.name}</span>
                            <span style={{ fontSize: '0.85rem', color: 'red', fontWeight: '700' }}>{p.stock} uds</span>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* Latest Orders */}
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>
                    <Clock size={18} style={{ color: 'var(--color-primary)' }} /> Últimas Órdenes Registradas
                  </h4>
                  {(!orders || orders.length === 0) ? (
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', margin: 0 }}>No hay pedidos registrados en la base de datos.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {orders.slice(0, 5).map(o => (
                        <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F0F0F0', fontSize: '0.85rem' }}>
                          <div>
                            <span style={{ fontWeight: '600' }}>#{o._id.slice(-6)}</span>
                            <span style={{ color: 'var(--color-text-light)', marginLeft: '0.5rem' }}>{o.user?.name || 'Cliente'}</span>
                          </div>
                          <span style={{ fontWeight: '700' }}>{formatCurrency(o.total)}</span>
                        </div>
                      ))}
                    </div>
                  )}
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

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
