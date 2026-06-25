import React, { useState, useMemo } from 'react';
import { PlusCircle, Trash2, Edit2, Search, Filter, Layers, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import api from '../../../services/api';
import Button from '../../../components/common/Button';

const AdminCategories = ({ categories, setCategories, addToast, loadCatalogData }) => {
  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals & Forms
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', description: '', isActive: true });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Stats
  const total = categories.length;
  const activeCount = categories.filter(c => c.isActive !== false).length;
  const inactiveCount = categories.filter(c => c.isActive === false).length;

  const filteredCategories = useMemo(() => {
    return categories.filter(c => {
      const isAct = c.isActive !== false;
      const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? isAct : !isAct;
      const q = searchQuery.toLowerCase();
      const matchSearch = (c.name || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [categories, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setCatForm({ name: '', description: '', isActive: true });
    setShowFormModal(true);
  };

  const openEditModal = (cat) => {
    setIsEditing(true);
    setEditingId(cat._id);
    setCatForm({ name: cat.name, description: cat.description || '', isActive: cat.isActive !== false });
    setShowFormModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) {
      return addToast('El nombre de la categoría es requerido', 'warning');
    }

    setLoadingSubmit(true);
    try {
      if (isEditing) {
        const res = await api.put(`/categories/${editingId}`, catForm);
        addToast('Categoría actualizada con éxito', 'success');
        setCategories(categories.map(c => c._id === editingId ? res.data.data : c));
      } else {
        const res = await api.post('/categories', catForm);
        addToast(`Categoría "${res.data.data.name}" creada`, 'success');
        setCategories([...categories, res.data.data]);
      }
      setShowFormModal(false);
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || `Error al ${isEditing ? 'actualizar' : 'crear'} categoría`, 'error');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleToggleStatus = async (cat) => {
    try {
      const newStatus = cat.isActive === false ? true : false;
      const res = await api.put(`/categories/${cat._id}`, { isActive: newStatus });
      addToast(`Categoría ${newStatus ? 'activada' : 'dada de baja'} con éxito`, 'success');
      setCategories(categories.map(c => c._id === cat._id ? res.data.data : c));
      loadCatalogData();
    } catch (err) {
      addToast('Error al cambiar el estado de la categoría', 'error');
    }
  };

  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = async (id) => {
    setLoadingSubmit(true);
    try {
      await api.delete(`/categories/${id}`);
      addToast('Categoría eliminada permanentemente', 'success');
      setCategories(categories.filter((c) => c._id !== id));
      setDeleteConfirmId(null);
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al eliminar', 'error');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Gestión de Categorías del Catálogo</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Administra las colecciones y agrupaciones de tus productos.</p>
        </div>
        <Button variant="primary" onClick={openCreateModal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={16} /> Nueva Categoría
        </Button>
      </div>

      {/* Info Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#E2E8F0', padding: '0.75rem', borderRadius: '8px', color: '#475569' }}><Layers size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>TOTAL CATEGORÍAS</span>
            <h4 style={{ margin: 0, color: '#0F172A', fontSize: '1.5rem' }}>{total}</h4>
          </div>
        </div>
        
        <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: '8px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#DCFCE7', padding: '0.75rem', borderRadius: '8px', color: '#16A34A' }}><CheckCircle size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700 }}>ACTIVAS</span>
            <h4 style={{ margin: 0, color: '#166534', fontSize: '1.5rem' }}>{activeCount}</h4>
          </div>
        </div>

        <div style={{ background: '#FEF2F2', padding: '1rem', borderRadius: '8px', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#FEE2E2', padding: '0.75rem', borderRadius: '8px', color: '#DC2626' }}><XCircle size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: 700 }}>DADAS DE BAJA</span>
            <h4 style={{ margin: 0, color: '#991B1B', fontSize: '1.5rem' }}>{inactiveCount}</h4>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#64748B" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '150px' }}
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="inactive">Dadas de baja</option>
          </select>
        </div>
      </div>

      {/* Categories List */}
      {filteredCategories.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', color: '#94A3B8' }} />
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>No se encontraron categorías.</p>
          <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={{ marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Limpiar filtros</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {paginatedCategories.map((c) => {
            const isAct = c.isActive !== false;
            return (
              <div key={c._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '1.25rem', backgroundColor: isAct ? '#FFFFFF' : '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'box-shadow 0.2s', opacity: isAct ? 1 : 0.7 }} onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h5 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>{c.name}</h5>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '12px', backgroundColor: isAct ? '#DCFCE7' : '#F1F5F9', color: isAct ? '#166534' : '#64748B', border: `1px solid ${isAct ? '#BBF7D0' : '#E2E8F0'}` }}>
                      {isAct ? 'Activa' : 'De Baja'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B', lineHeight: '1.5' }}>
                    {c.description || 'Sin descripción provista.'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Button variant="outline" onClick={() => handleToggleStatus(c)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: isAct ? '#D97706' : '#10B981', borderColor: isAct ? '#FDE68A' : '#A7F3D0', backgroundColor: isAct ? '#FFFBEB' : '#ECFDF5' }}>
                    {isAct ? <><XCircle size={14} /> Dar de Baja</> : <><Check size={14} /> Activar</>}
                  </Button>
                  <Button variant="outline" onClick={() => openEditModal(c)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2563EB', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}>
                    <Edit2 size={14} /> Editar
                  </Button>
                  <Button variant="outline" onClick={() => confirmDelete(c._id)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#DC2626', borderColor: '#FECACA', backgroundColor: '#FEF2F2' }} title="Eliminar definitivamente">
                    <Trash2 size={14} />
                  </Button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '500' }}>
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredCategories.length)} de {filteredCategories.length} categorías
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: currentPage === 1 ? '#F1F5F9' : '#FFF', color: currentPage === 1 ? '#94A3B8' : '#334155', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: currentPage === totalPages ? '#F1F5F9' : '#FFF', color: currentPage === totalPages ? '#94A3B8' : '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
            >
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showFormModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '95%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: '#0F172A' }}>
                {isEditing ? <Edit2 size={20} color="#2563EB" /> : <PlusCircle size={20} color="#10B981" />}
                {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
              </h4>
              <button onClick={() => setShowFormModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600, color: '#1E293B' }}>Nombre de la Categoría *</label>
                <input
                  type="text"
                  placeholder="Ej: Mug Cerámica"
                  value={catForm.name}
                  onChange={(e) => setCatForm({...catForm, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.95rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600, color: '#1E293B' }}>Descripción Corta (Opcional)</label>
                <textarea
                  placeholder="Breve reseña sobre los artículos de esta sección..."
                  value={catForm.description}
                  onChange={(e) => setCatForm({...catForm, description: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="isActiveCheck" 
                  checked={catForm.isActive} 
                  onChange={(e) => setCatForm({...catForm, isActive: e.target.checked})} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="isActiveCheck" style={{ fontSize: '0.9rem', color: '#334155', cursor: 'pointer', userSelect: 'none' }}>
                  Categoría Activa (Visible)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowFormModal(false)} style={{ flex: 1, padding: '0.75rem' }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={loadingSubmit} style={{ flex: 1, padding: '0.75rem' }}>
                  {loadingSubmit ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Categoría')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 12000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <AlertCircle size={48} color="#EF4444" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#0F172A' }}>¿Eliminar Categoría?</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Esta acción es permanente e irreversible. Se recomienda <strong>"Dar de Baja"</strong> si la categoría tiene productos asociados. ¿Estás seguro?
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="button" variant="outline" onClick={() => setDeleteConfirmId(null)} style={{ flex: 1, padding: '0.75rem' }}>
                Cancelar
              </Button>
              <Button type="button" variant="primary" disabled={loadingSubmit} onClick={() => executeDelete(deleteConfirmId)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#EF4444', borderColor: '#EF4444' }}>
                {loadingSubmit ? 'Eliminando...' : 'Sí, Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCategories;
