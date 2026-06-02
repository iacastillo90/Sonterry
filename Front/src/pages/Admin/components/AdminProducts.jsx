import React, { useState } from 'react';
import { PlusCircle, Search, Trash2, Edit } from 'lucide-react';
import api from '../../../services/api';
import * as productsService from '../../../services/products.service';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';

const AdminProducts = ({ categories, products, loadingProducts, loadCatalogData, addToast }) => {
  // Product CRUD Form states
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodCatId, setProdCatId] = useState(categories.length > 0 ? categories[0]._id : '');
  const [prodType, setProdType] = useState('prenda');
  const [prodImages, setProdImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loadingSubmitProduct, setLoadingSubmitProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  
  // Detail Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productOrders, setProductOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setProductOrders([]);
    setLoadingOrders(true);
    try {
      const res = await api.get(`/orders/product/${product._id}`);
      setProductOrders(res.data.data?.data || res.data.data || []);
    } catch (err) {
      addToast('Error al cargar historial de ventas', 'error');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(product.price.toString());
    setProdStock(product.stock.toString());
    setProdCatId(product.category?._id || product.category || (categories.length > 0 ? categories[0]._id : ''));
    setProdType(product.type || 'prenda');
    setImagePreviews(product.images || []);
    setProdImages([]); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdStock('');
    setProdImages([]);
    setImagePreviews([]);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.description.toLowerCase().includes(productSearch.toLowerCase())
  );

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
      cancelEdit();
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar producto', 'error');
    } finally {
      setLoadingSubmitProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas desactivar este producto?')) return;
    try {
      await productsService.deleteProduct(id);
      addToast('Producto desactivado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al desactivar', 'error');
    }
  };

  const handleRestoreProduct = async (id) => {
    try {
      await productsService.restoreProduct(id);
      addToast('Producto restaurado exitosamente', 'success');
      loadCatalogData();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al restaurar', 'error');
    }
  };

  const handleStockQuickEdit = async (productId, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      await api.put(`/products/${productId}`, { stock: newStock });
      addToast('Inventario actualizado', 'success');
      loadCatalogData();
    } catch (err) {
      addToast('Error al actualizar el stock', 'error');
    }
  };

  const renderProductDetailsModal = () => {
    if (!selectedProduct) return null;
    const totalSold = productOrders.reduce((sum, order) => {
      const item = order.items.find(i => i.product.toString() === selectedProduct._id.toString());
      return sum + (item ? item.quantity : 0);
    }, 0);

    const returns = productOrders.filter(order => order.status === 'cancelled').length;

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
        backdropFilter: 'blur(3px)'
      }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}>
        <div style={{
          background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img src={selectedProduct.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100'} alt={selectedProduct.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--green-deep)' }}>{selectedProduct.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedProduct.category?.name || 'Sin categoría'} • {selectedProduct.type}</span>
              </div>
            </div>
            <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.75rem', lineHeight: 1, color: '#64748b' }}>&times;</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', margin: '1.5rem 0', padding: '1rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Stock Actual</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: selectedProduct.stock > 0 ? 'var(--green-brand)' : '#D9534F' }}>{selectedProduct.stock} uds</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Vendidos</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>{totalSold} uds</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Devoluciones</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: returns > 0 ? '#ef4444' : '#64748b' }}>{returns} pedidos</p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Precio Unitario</p>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{formatCurrency(selectedProduct.price)}</p>
            </div>
          </div>

          <h4 style={{ fontSize: '1.05rem', margin: '0 0 1rem 0', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Historial de Ventas</h4>
          {loadingOrders ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}><LoadingSpinner /></div>
          ) : productOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', background: '#F8F9FA', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Aún no se han registrado ventas de este artículo.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {productOrders.map(order => {
                const item = order.items.find(i => i.product.toString() === selectedProduct._id.toString());
                if (!item) return null;
                return (
                  <div key={order._id} style={{ border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--green-deep)', fontSize: '0.95rem' }}>{order.user?.name || 'Cliente anónimo'}</strong>
                      <span style={{ 
                        background: order.status === 'delivered' ? '#dcfce7' : order.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                        color: order.status === 'delivered' ? '#166534' : order.status === 'cancelled' ? '#991b1b' : '#92400e',
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase'
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Cantidad: <strong>{item.quantity}</strong></span>
                      <span>{new Date(order.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {item.customization?.details && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#F1F5F9', borderRadius: '4px', fontSize: '0.8rem' }}>
                        <strong style={{ color: '#64748b' }}>Detalle de pers.:</strong> {item.customization.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Gestión de Inventario & Artículos</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Form to insert new items */}
        <div className="admin-form-container">
          <h4 className="admin-form-title">
            <PlusCircle size={18} style={{ color: 'var(--color-primary)' }} /> {editProductId ? 'Editar Producto' : 'Añadir Producto'}
          </h4>

          <form onSubmit={handleSubmitProduct} className="admin-form">
            <div>
              <label className="admin-form-label">Nombre del Artículo *</label>
              <input
                type="text"
                placeholder="Ej: Mug Personalizado Mamá"
                value={prodName}
                onChange={(e) => setProdName(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label className="admin-form-label">Descripción del Artículo *</label>
              <textarea
                placeholder="Ingresa los materiales, dimensiones y especificaciones..."
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                className="admin-form-textarea"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="admin-form-label">Precio (COP) *</label>
                <input
                  type="number"
                  placeholder="45000"
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="admin-form-input"
                  required
                />
              </div>
              <div>
                <label className="admin-form-label">Stock Inicial *</label>
                <input
                  type="number"
                  placeholder="25"
                  value={prodStock}
                  onChange={(e) => setProdStock(e.target.value)}
                  className="admin-form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="admin-form-label">Categoría *</label>
              <select
                value={prodCatId}
                onChange={(e) => setProdCatId(e.target.value)}
                className="admin-form-select"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              <div>
                <label className="admin-form-label">Técnica/Tipo</label>
                <select
                  value={prodType}
                  onChange={(e) => setProdType(e.target.value)}
                  className="admin-form-select"
                >
                  <option value="prenda">Artículo Base</option>
                  <option value="serigrafia">Serigrafía</option>
                  <option value="dtf">DTF</option>
                  <option value="estampado">Estampados</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="admin-form-label">Imágenes (Max 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ fontSize: '0.8rem' }}
              />
              {imagePreviews.length > 0 && (
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {imagePreviews.map((src, i) => (
                    <img key={i} src={src} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CCC' }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="submit"
                disabled={loadingSubmitProduct}
                className="admin-submit-btn"
                style={{ flex: 1 }}
              >
                {loadingSubmitProduct ? 'Guardando...' : (editProductId ? 'Actualizar Producto' : 'Crear Producto')}
              </button>
              {editProductId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="admin-submit-btn"
                  style={{ flex: 1, backgroundColor: '#888' }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products List and Stock Warning Levels */}
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <div className="admin-search-wrap">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Buscar en el inventario..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="admin-search-input"
              />
            </div>
          </div>

          <div className="admin-list-container">
            {loadingProducts ? (
              <LoadingSpinner />
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>No se encontraron referencias.</p>
            ) : (
              filteredProducts.map((p) => {
                let stockColor = '#528F58'; // healthy green
                if (p.stock <= 5) stockColor = '#D9534F'; // critical red
                else if (p.stock <= 20) stockColor = '#F0AD4E'; // warning orange

                return (
                  <div
                    key={p._id}
                    className="admin-list-item"
                    style={{ opacity: p.isDeleted ? 0.6 : 1, cursor: 'pointer', transition: 'background-color 0.2s', ':hover': { backgroundColor: '#F8F9FA' } }}
                    onClick={(e) => {
                      if (e.target.closest('button')) return;
                      handleProductClick(p);
                    }}
                  >
                    <img src={p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100'} alt={p.name} className="admin-list-item-img" />
                    <div className="admin-list-item-content">
                      <h5 className="admin-list-item-title">{p.name}</h5>
                      <span className="admin-list-item-sub">{formatCurrency(p.price)}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>Stock:</span>
                        <button type="button" onClick={() => handleStockQuickEdit(p._id, p.stock, -1)} style={{ padding: '0 4px', border: '1px solid #CCC', background: '#EEE', borderRadius: '2px', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: stockColor }}>{p.stock} uds</span>
                        <button type="button" onClick={() => handleStockQuickEdit(p._id, p.stock, 1)} style={{ padding: '0 4px', border: '1px solid #CCC', background: '#EEE', borderRadius: '2px', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      {p.isDeleted ? (
                        <button
                          onClick={() => handleRestoreProduct(p._id)}
                          style={{
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            background: 'transparent',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Restaurar
                        </button>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button
                            onClick={() => handleEditClick(p)}
                            style={{ border: 'none', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', padding: '0.25rem' }}
                            title="Editar producto"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            style={{ border: 'none', background: 'transparent', color: '#D9534F', cursor: 'pointer', padding: '0.25rem' }}
                            title="Desactivar producto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
      {renderProductDetailsModal()}
    </div>
  );
};

export default AdminProducts;
