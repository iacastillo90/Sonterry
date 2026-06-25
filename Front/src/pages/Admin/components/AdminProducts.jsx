import React, { useState, useMemo } from 'react';
import { PlusCircle, Search, Trash2, Edit, Power, PowerOff, Filter } from 'lucide-react';
import api from '../../../services/api';
import * as productsService from '../../../services/products.service';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';
import Modal from '../../../components/common/Modal';

const AdminProducts = ({ categories, products, loadingProducts, loadCatalogData, addToast }) => {
  // Filters states
  const [productSearch, setProductSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCollection, setFilterCollection] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // 'active', 'inactive', ''
  const [filterStock, setFilterStock] = useState(''); // 'low', ''

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodCatId, setProdCatId] = useState('');
  const [prodType, setProdType] = useState('prenda');
  const [prodCollection, setProdCollection] = useState('');
  const [prodImages, setProdImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loadingSubmitProduct, setLoadingSubmitProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Derived filters
  const uniqueCollections = useMemo(() => {
    return [...new Set(products.map(p => p.collectionName).filter(Boolean))];
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products;
    if (productSearch) {
      const q = productSearch.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filterCategory) {
      result = result.filter(p => (p.category?._id || p.category) === filterCategory);
    }
    if (filterCollection) {
      result = result.filter(p => p.collectionName === filterCollection);
    }
    if (filterStatus) {
      if (filterStatus === 'active') result = result.filter(p => p.isActive);
      if (filterStatus === 'inactive') result = result.filter(p => !p.isActive);
    }
    if (filterStock === 'low') {
      result = result.filter(p => p.stock <= 5);
    }
    return result;
  }, [products, productSearch, filterCategory, filterCollection, filterStatus, filterStock]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openFormModal = (product = null) => {
    if (product) {
      setEditProductId(product._id);
      setProdName(product.name);
      setProdDesc(product.description);
      setProdPrice(product.price.toString());
      setProdStock(product.stock.toString());
      setProdCatId(product.category?._id || product.category || (categories.length > 0 ? categories[0]._id : ''));
      setProdType(product.type || 'prenda');
      setProdCollection(product.collectionName || '');
      setImagePreviews(product.images || []);
      setProdImages([]);
    } else {
      setEditProductId(null);
      setProdName('');
      setProdDesc('');
      setProdPrice('');
      setProdStock('');
      setProdCatId(categories.length > 0 ? categories[0]._id : '');
      setProdCollection('');
      setProdImages([]);
      setImagePreviews([]);
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      addToast('Máximo 5 imágenes permitidas', 'error');
      return;
    }
    setProdImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!prodName || !prodDesc || !prodPrice || !prodStock || (!prodCatId && categories.length > 0)) {
      addToast('Por favor completa todos los campos requeridos', 'warning');
      return;
    }

    setLoadingSubmitProduct(true);
    const formData = new FormData();
    formData.append('name', prodName);
    formData.append('description', prodDesc);
    formData.append('price', parseFloat(prodPrice));
    formData.append('stock', parseInt(prodStock, 10));
    formData.append('category', prodCatId || categories[0]?._id);
    formData.append('type', prodType);
    if (prodCollection) formData.append('collectionName', prodCollection);

    for (let i = 0; i < prodImages.length; i++) {
      formData.append('images', prodImages[i]);
    }

    try {
      if (editProductId) {
        await api.put(`/products/${editProductId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('¡Producto actualizado exitosamente!', 'success');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('¡Producto creado exitosamente!', 'success');
      }
      setIsModalOpen(false);
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar producto', 'error');
    } finally {
      setLoadingSubmitProduct(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await api.patch(`/products/${id}/toggle-active`);
      addToast(res.data.message || 'Estado actualizado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast('Error al cambiar el estado del producto', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar (borrado lógico) este producto?')) return;
    try {
      await productsService.deleteProduct(id);
      addToast('Producto eliminado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al eliminar', 'error');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="admin-tab-title" style={{ margin: 0 }}>Gestión de Inventario (CMS)</h3>
        <button 
          onClick={() => openFormModal()}
          className="admin-submit-btn" 
          style={{ width: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <PlusCircle size={16} /> Añadir Producto
        </button>
      </div>

      {/* FILTERS SECTION */}
      <div style={{ 
        display: 'flex', gap: '1rem', flexWrap: 'wrap', 
        background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            value={productSearch}
            onChange={(e) => { setProductSearch(e.target.value); setCurrentPage(1); }}
            className="snt-input"
            style={{ width: '100%' }}
          />
        </div>
        
        <select className="snt-input" style={{ flex: 1, minWidth: '130px' }} value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}>
          <option value="">Todas las Categorías</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <select className="snt-input" style={{ flex: 1, minWidth: '130px' }} value={filterCollection} onChange={(e) => { setFilterCollection(e.target.value); setCurrentPage(1); }}>
          <option value="">Todas las Colecciones</option>
          {uniqueCollections.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className="snt-input" style={{ flex: 1, minWidth: '130px' }} value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
          <option value="">Todos los Estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos / Dados de baja</option>
        </select>

        <select className="snt-input" style={{ flex: 1, minWidth: '130px' }} value={filterStock} onChange={(e) => { setFilterStock(e.target.value); setCurrentPage(1); }}>
          <option value="">Todo el Stock</option>
          <option value="low">Bajo Stock (≤5)</option>
        </select>
      </div>

      {/* TABLE SECTION */}
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '1rem', width: '60px' }}>Imagen</th>
              <th style={{ padding: '1rem' }}>Producto</th>
              <th style={{ padding: '1rem' }}>Colección / Cat</th>
              <th style={{ padding: '1rem' }}>Precio</th>
              <th style={{ padding: '1rem' }}>Stock</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loadingProducts ? (
              <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}><LoadingSpinner /></td></tr>
            ) : currentProducts.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No se encontraron productos.</td></tr>
            ) : (
              currentProducts.map((p) => {
                const catName = categories.find(c => c._id === (p.category?._id || p.category))?.name || 'N/A';
                return (
                  <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9', opacity: p.isDeleted ? 0.5 : 1 }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <img src={p.images?.[0] || 'https://via.placeholder.com/50'} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{p.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.type}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ color: '#0f172a' }}>{p.collectionName || '-'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{catName}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>
                      {formatCurrency(p.price)}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: p.stock > 5 ? '#dcfce7' : '#fee2e2',
                        color: p.stock > 5 ? '#166534' : '#991b1b'
                      }}>
                        {p.stock} uds
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                        background: p.isActive ? '#e0f2fe' : '#fef3c7',
                        color: p.isActive ? '#0369a1' : '#b45309'
                      }}>
                        {p.isActive ? 'Activo' : 'De baja'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => openFormModal(p)} title="Editar" style={{ background: '#eff6ff', color: '#3b82f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleToggleActive(p._id)} title={p.isActive ? 'Dar de baja' : 'Activar'} style={{ background: '#fefce8', color: '#eab308', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          {p.isActive ? <PowerOff size={16} /> : <Power size={16} />}
                        </button>
                        <button onClick={() => handleDeleteProduct(p._id)} title="Eliminar (papelera)" style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Mostrando página {currentPage} de {totalPages}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Anterior
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ padding: '6px 12px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editProductId ? 'Editar Producto' : 'Añadir Producto'}>
        <form onSubmit={handleSubmitProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="admin-form-label">Nombre del Artículo *</label>
            <input type="text" placeholder="Ej: Mug Personalizado Mamá" value={prodName} onChange={(e) => setProdName(e.target.value)} className="admin-form-input" required />
          </div>

          <div>
            <label className="admin-form-label">Descripción del Artículo *</label>
            <textarea placeholder="Ingresa los materiales, dimensiones y especificaciones..." value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} className="admin-form-textarea" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="admin-form-label">Precio (COP) *</label>
              <input type="number" placeholder="45000" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} className="admin-form-input" required />
            </div>
            <div>
              <label className="admin-form-label">Stock *</label>
              <input type="number" placeholder="25" value={prodStock} onChange={(e) => setProdStock(e.target.value)} className="admin-form-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="admin-form-label">Categoría *</label>
              <select value={prodCatId} onChange={(e) => setProdCatId(e.target.value)} className="admin-form-select" required>
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-form-label">Técnica/Tipo</label>
              <select value={prodType} onChange={(e) => setProdType(e.target.value)} className="admin-form-select">
                <option value="prenda">Artículo Base</option>
                <option value="serigrafia">Serigrafía</option>
                <option value="dtf">DTF</option>
                <option value="estampado">Estampados</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="admin-form-label">Colección (Ej: Junio)</label>
            <input type="text" placeholder="Ej: Colección Junio" value={prodCollection} onChange={(e) => setProdCollection(e.target.value)} className="admin-form-input" />
          </div>

          <div>
            <label className="admin-form-label">Imágenes (Max 5)</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ fontSize: '0.8rem', width: '100%' }} />
            {imagePreviews.length > 0 && (
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {imagePreviews.map((src, i) => (
                  <img key={i} src={src} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CCC' }} />
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="admin-submit-btn" style={{ flex: 1, backgroundColor: '#cbd5e1', color: '#334155' }}>Cancelar</button>
            <button type="submit" disabled={loadingSubmitProduct} className="admin-submit-btn" style={{ flex: 1 }}>
              {loadingSubmitProduct ? 'Guardando...' : (editProductId ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminProducts;
