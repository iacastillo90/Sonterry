import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import api from '../../../services/api';

const AdminCategories = ({ categories, setCategories, addToast, loadCatalogData }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [loadingSubmitCategory, setLoadingSubmitCategory] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setLoadingSubmitCategory(true);
    try {
      const res = await api.post('/categories', { name: newCatName, description: newCatDesc });
      addToast(`Categoría "${res.data.data.name}" creada`, 'success');
      setCategories([...categories, res.data.data]);
      setNewCatName('');
      setNewCatDesc('');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al crear categoría', 'error');
    } finally {
      setLoadingSubmitCategory(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;
    try {
      await api.delete(`/categories/${id}`);
      addToast('Categoría eliminada', 'success');
      setCategories(categories.filter((c) => c._id !== id));
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al eliminar', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Gestión de Categorías del Catálogo</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form to insert categories */}
        <div className="admin-form-container">
          <h4 className="admin-form-title">
            <PlusCircle size={18} style={{ color: 'var(--color-primary)' }} /> Nueva Categoría
          </h4>

          <form onSubmit={handleCreateCategory} className="admin-form">
            <div>
              <label className="admin-form-label">Nombre de la Categoría *</label>
              <input
                type="text"
                placeholder="Ej: Mug Cerámica"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label className="admin-form-label">Descripción Corta</label>
              <input
                type="text"
                placeholder="Breve reseña sobre los artículos de esta sección"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="admin-form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSubmitCategory}
              className="admin-submit-btn"
            >
              {loadingSubmitCategory ? 'Guardando...' : 'Crear Categoría'}
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700' }}>Categorías Registradas</h4>
          
          <div className="admin-list-container">
            {categories.map((c) => (
              <div
                key={c._id}
                className="admin-list-item"
                style={{ backgroundColor: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div className="admin-list-item-content">
                  <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.92rem', fontWeight: '700' }}>{c.name}</h5>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {c.description || 'Sin descripción provista.'}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCategory(c._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E53E3E', padding: '0.5rem' }}
                  title="Eliminar categoría"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCategories;
