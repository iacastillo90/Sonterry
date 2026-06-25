import React, { useState } from 'react';
import { AlertCircle, Truck, CheckCircle, PlusCircle, DollarSign, Edit, Trash2 } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUpdateOrderStatus } from '../../../queries/useOrders';
import api from '../../../services/api';

const AdminOrders = ({ orders, loadingOrders, addToast, products = [], categories = [], users = [], refetchOrders, loadCatalogData }) => {
  const [triggeringOrderId, setTriggeringOrderId] = useState(null);
  const updateOrderStatusMutation = useUpdateOrderStatus();

  // Modals state
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuickProductModal, setShowQuickProductModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Quick Product state
  const [quickProductForm, setQuickProductForm] = useState({
    name: '', price: '', stock: '99', category: categories.length > 0 ? categories[0]._id : '', type: 'prenda', description: '', collectionName: ''
  });
  const [quickProductImages, setQuickProductImages] = useState([]);

  // Edit order state
  const [editForm, setEditForm] = useState({
    productId: '', quantity: 1, price: 0, customization: '', paymentMethod: 'efectivo'
  });

  // Dispatch form state
  const [dispatchForm, setDispatchForm] = useState({
    company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: ''
  });

  // Manual order state
  const [manualForm, setManualForm] = useState({
    userId: '', paymentMethod: 'efectivo',
    address: '', city: '', postalCode: '', country: 'Colombia', phone: '',
    productId: '', quantity: 1, customization: ''
  });

  // Flow control metrics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyOrders = (orders || []).filter(o => {
    const d = new Date(o.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear && ['paid', 'shipped', 'delivered'].includes(o.status);
  });
  const cashFlow = { efectivo: 0, transferencia: 0, deposito: 0, tarjeta: 0, wompi: 0, total: 0 };
  monthlyOrders.forEach(o => {
    let pm = o.paymentMethod || 'tarjeta';
    if (pm.toLowerCase().includes('wompi') || pm.toLowerCase().includes('tarjeta')) pm = 'tarjeta';
    if (cashFlow[pm] !== undefined) cashFlow[pm] += o.total;
    cashFlow.total += o.total;
  });

  const stats = {
    manuales: (orders || []).filter(o => ['efectivo', 'transferencia', 'deposito'].includes(o.paymentMethod)).length,
    web: (orders || []).filter(o => !['efectivo', 'transferencia', 'deposito'].includes(o.paymentMethod)).length,
    pending: (orders || []).filter(o => o.status === 'pending').length,
    shipped: (orders || []).filter(o => o.status === 'shipped').length,
    delivered: (orders || []).filter(o => o.status === 'delivered').length,
  };

  const sortedOrders = [...(orders || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const currentOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenDispatch = (order) => {
    setSelectedOrder(order);
    if (order.shippingDetails) {
      setDispatchForm({
        company: order.shippingDetails.company || 'Servientrega',
        trackingNumber: order.shippingDetails.trackingNumber || '',
        dispatchDate: order.shippingDetails.dispatchDate ? new Date(order.shippingDetails.dispatchDate).toISOString().slice(0,16) : '',
        estimatedDeliveryDate: order.shippingDetails.estimatedDeliveryDate ? new Date(order.shippingDetails.estimatedDeliveryDate).toISOString().slice(0,10) : '',
        notes: order.shippingDetails.notes || ''
      });
    } else {
      setDispatchForm({ company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: '' });
    }
    setShowDispatchModal(true);
  };

  const submitDispatch = async (e) => {
    e.preventDefault();
    setTriggeringOrderId(selectedOrder._id);
    try {
      await api.patch(`/orders/${selectedOrder._id}/dispatch`, dispatchForm);
      addToast('Despacho actualizado y notificado', 'success');
      setShowDispatchModal(false);
      refetchOrders();
    } catch (err) {
      addToast('Error al actualizar despacho', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const submitManualOrder = async (e) => {
    e.preventDefault();
    if (!manualForm.userId || !manualForm.productId) {
      addToast('Debe seleccionar cliente y producto', 'warning');
      return;
    }
    setTriggeringOrderId('manual');
    try {
      const payload = {
        user: manualForm.userId,
        items: [{ product: manualForm.productId, quantity: manualForm.quantity, customization: { details: manualForm.customization } }],
        shippingAddress: {
          address: manualForm.address, city: manualForm.city, postalCode: manualForm.postalCode || '000000', country: manualForm.country, phone: manualForm.phone
        },
        paymentMethod: manualForm.paymentMethod,
        shippingDetails: dispatchForm.trackingNumber ? dispatchForm : undefined
      };
      await api.post('/orders/manual', payload);
      addToast('Orden manual registrada', 'success');
      setShowManualModal(false);
      refetchOrders();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al registrar orden', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const handleOpenEdit = (order) => {
    setSelectedOrder(order);
    if (order.items && order.items.length > 0) {
      setEditForm({
        productId: order.items[0].product._id || order.items[0].product,
        quantity: order.items[0].quantity,
        price: order.items[0].price,
        customization: order.items[0].customization?.details || '',
        paymentMethod: order.paymentMethod || 'efectivo'
      });
    }
    setShowEditModal(true);
  };

  const submitEditOrder = async (e) => {
    e.preventDefault();
    setTriggeringOrderId(selectedOrder._id);
    try {
      await api.put(`/orders/${selectedOrder._id}/items-admin`, {
        items: [{
          product: editForm.productId,
          quantity: editForm.quantity,
          price: editForm.price,
          customization: { details: editForm.customization }
        }],
        paymentMethod: editForm.paymentMethod
      });
      addToast('Pedido actualizado con éxito', 'success');
      setShowEditModal(false);
      refetchOrders();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al actualizar pedido', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const submitQuickProduct = async (e) => {
    e.preventDefault();
    if (!quickProductForm.name || !quickProductForm.price) return;
    setTriggeringOrderId('quick_product');
    try {
      const formData = new FormData();
      formData.append('name', quickProductForm.name);
      formData.append('description', quickProductForm.description);
      formData.append('price', parseFloat(quickProductForm.price));
      formData.append('stock', parseInt(quickProductForm.stock, 10));
      formData.append('category', quickProductForm.category || categories[0]?._id);
      formData.append('type', quickProductForm.type);
      if (quickProductForm.collectionName) formData.append('collectionName', quickProductForm.collectionName);

      for (let i = 0; i < quickProductImages.length; i++) {
        formData.append('images', quickProductImages[i]);
      }

      const res = await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      
      addToast('Producto creado exitosamente', 'success');
      setShowQuickProductModal(false);
      
      if (loadCatalogData) {
        await loadCatalogData();
      }
      
      // Auto-select the newly created product in the edit form
      if (res.data?.data) {
        setEditForm({
          ...editForm,
          productId: res.data.data._id,
          price: res.data.data.price
        });
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al crear producto', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
  };

  const executeDeleteOrder = async () => {
    if (!orderToDelete) return;
    setTriggeringOrderId(orderToDelete);
    try {
      await api.delete(`/orders/${orderToDelete}`);
      addToast('Orden eliminada con éxito', 'success');
      setOrderToDelete(null);
      refetchOrders();
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al eliminar orden', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    setTriggeringOrderId(orderId);
    try {
      await updateOrderStatusMutation.mutateAsync({ id: orderId, status: 'delivered' });
      addToast('Pedido marcado como Entregado', 'success');
      refetchOrders();
    } catch (error) {
      addToast('Error al entregar pedido', 'error');
    } finally {
      setTriggeringOrderId(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Despachos & Logística de Ventas</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Gestión de envíos y registro de órdenes manuales.</p>
        </div>
        <Button variant="primary" onClick={() => {
          setDispatchForm({ company: 'Servientrega', trackingNumber: '', dispatchDate: '', estimatedDeliveryDate: '', notes: '' });
          setShowManualModal(true);
        }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={16} /> Venta Manual
        </Button>
      </div>

      {/* Enhanced Metrics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#E6F4EA', padding: '1rem', borderRadius: '8px', border: '1px solid #CEEAD6', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#137333', fontWeight: 700 }}>FLUJO MES ACTUAL</span>
          <h4 style={{ margin: '0.5rem 0 0 0', color: '#137333', fontSize: '1.5rem' }}>{formatCurrency(cashFlow.total)}</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem', fontSize: '0.75rem', color: '#137333' }}>
            <span>Efe: {formatCurrency(cashFlow.efectivo)}</span> | 
            <span>Tra: {formatCurrency(cashFlow.transferencia)}</span> | 
            <span>Tar: {formatCurrency(cashFlow.tarjeta)}</span>
          </div>
        </div>
        
        <div style={{ background: '#FFF3E0', padding: '1rem', borderRadius: '8px', border: '1px solid #FFE0B2' }}>
          <span style={{ fontSize: '0.8rem', color: '#E65100', fontWeight: 700 }}>PEDIDOS ACTIVOS</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem' }}>
            <h4 style={{ margin: '0', color: '#E65100', fontSize: '1.5rem' }}>{stats.pending + stats.shipped}</h4>
            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#E65100' }}>
              <div>Pendientes: <strong>{stats.pending}</strong></div>
              <div>En Tránsito: <strong>{stats.shipped}</strong></div>
            </div>
          </div>
        </div>

        <div style={{ background: '#E3F2FD', padding: '1rem', borderRadius: '8px', border: '1px solid #BBDEFB' }}>
          <span style={{ fontSize: '0.8rem', color: '#0D47A1', fontWeight: 700 }}>ORIGEN DE VENTAS</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem' }}>
            <h4 style={{ margin: '0', color: '#0D47A1', fontSize: '1.5rem' }}>{orders?.length || 0}</h4>
            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#0D47A1' }}>
              <div>Manuales: <strong>{stats.manuales}</strong></div>
              <div>Vía Web: <strong>{stats.web}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {loadingOrders ? (
        <LoadingSpinner />
      ) : (!orders || orders.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-warning)' }} />
          <p>No se encontraron pedidos registrados.</p>
        </div>
      ) : (
        <div className="admin-list-container" style={{ gap: '1.5rem', maxHeight: 'none' }}>
          {currentOrders.map((order) => {
            let statusBg = '#CCC';
            if (order.status === 'paid') statusBg = 'var(--color-primary)';
            else if (order.status === 'shipped') statusBg = 'var(--color-accent)';
            else if (order.status === 'delivered') statusBg = '#2D5333';

            return (
              <div key={order._id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '1.05rem' }}>Orden #{order._id.slice(-6)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginLeft: '1rem' }}>
                      {formatDate(order.createdAt)} • {order.paymentMethod ? order.paymentMethod.toUpperCase() : 'TARJETA'}
                    </span>
                  </div>
                  <span style={{ backgroundColor: statusBg, color: '#FFFFFF', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                    {order.status === 'paid' ? 'Pagado (Prep.)' : order.status === 'shipped' ? 'En Tránsito' : order.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', fontSize: '0.88rem' }}>
                  <div>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '700' }}>Información de Envío</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <li>Cliente: <strong>{order.user?.name || 'Cliente'}</strong> ({order.user?.email})</li>
                      <li>Teléfono / WhatsApp: <strong>{order.shippingAddress?.phone}</strong></li>
                      <li>Dirección: <strong>{order.shippingAddress?.address}, {order.shippingAddress?.city}</strong></li>
                    </ul>
                    {order.shippingDetails?.trackingNumber && (
                      <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#F8F9FA', borderRadius: '6px', border: '1px dashed #CCC' }}>
                        <p style={{ margin: '0 0 0.25rem 0' }}><strong>Empresa:</strong> {order.shippingDetails.company} - <strong>Guía:</strong> {order.shippingDetails.trackingNumber}</p>
                        {order.shippingDetails.estimatedDeliveryDate && <p style={{ margin: '0' }}><strong>Entrega Est.:</strong> {new Date(order.shippingDetails.estimatedDeliveryDate).toLocaleDateString()}</p>}
                      </div>
                    )}
                  </div>

                  <div style={{ borderLeft: '1px solid #F0F0F0', paddingLeft: '1.5rem' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '700' }}>Artículos</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span>{item.product?.name || item.name} (x{item.quantity})</span>
                          <span>{formatCurrency((item.price || 0) * item.quantity)}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid #EFEFEF', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                        <span>Total Pedido:</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #F0F0F0', paddingTop: '0.75rem' }}>
                  {['pending', 'paid', 'shipped'].includes(order.status) && (
                    <Button variant="outline" onClick={() => handleOpenDispatch(order)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                      <Edit size={14} /> {order.status === 'pending' ? 'Despachar (Aprobar y Enviar)' : 'Editar Despacho'}
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button variant="primary" onClick={() => handleDeliverOrder(order._id)} disabled={triggeringOrderId === order._id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
                      <CheckCircle size={14} /> Entregado
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => handleOpenEdit(order)} disabled={triggeringOrderId === order._id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem', color: '#10B981', borderColor: '#10B981' }}>
                    <Edit size={14} /> Editar
                  </Button>
                  <Button variant="outline" onClick={() => confirmDeleteOrder(order._id)} disabled={triggeringOrderId === order._id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem', color: '#D9534F', borderColor: '#F5C6CB' }}>
                    <Trash2 size={14} /> Eliminar
                  </Button>
                </div>
              </div>
            );
          })}

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1rem', padding: '1rem', background: '#F8F9FA', borderRadius: '8px' }}>
              <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Anterior</Button>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Página {currentPage} de {totalPages}</span>
              <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Siguiente</Button>
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {showDispatchModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Información de Despacho (Orden #{selectedOrder?._id.slice(-6)})</h4>
            <form onSubmit={submitDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Empresa Transportadora</label>
                <select value={dispatchForm.company} onChange={e => setDispatchForm({...dispatchForm, company: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}>
                  <option value="Servientrega">Servientrega</option>
                  <option value="Inter Rapidísimo">Inter Rapidísimo</option>
                  <option value="Coordinadora">Coordinadora</option>
                  <option value="Envía">Envía</option>
                  <option value="TCC">TCC</option>
                  <option value="Mensajería Local">Mensajería Local</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Planilla / Guía de Envío</label>
                <input type="text" value={dispatchForm.trackingNumber} onChange={e => setDispatchForm({...dispatchForm, trackingNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Fecha/Hora de Despacho</label>
                  <input type="datetime-local" value={dispatchForm.dispatchDate} onChange={e => setDispatchForm({...dispatchForm, dispatchDate: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Día Est. Entrega</label>
                  <input type="date" value={dispatchForm.estimatedDeliveryDate} onChange={e => setDispatchForm({...dispatchForm, estimatedDeliveryDate: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId ? 'Guardando...' : 'Guardar y Despachar'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowDispatchModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showManualModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Registrar Venta Manual / Llamada</h4>
            <form onSubmit={submitManualOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cliente (Usuario)*</label>
                  <select value={manualForm.userId} onChange={e => setManualForm({...manualForm, userId: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="">Seleccionar cliente...</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Método de Pago*</label>
                  <select value={manualForm.paymentMethod} onChange={e => setManualForm({...manualForm, paymentMethod: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="deposito">Depósito Bancario</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Producto*</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', width: '100%' }}>
                    <select value={manualForm.productId} onChange={e => setManualForm({...manualForm, productId: e.target.value})} style={{ flex: '1 1 0%', minWidth: '0', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', textOverflow: 'ellipsis' }} required>
                      <option value="">Seleccionar producto...</option>
                      {products.filter(p => !p.isDeleted).map(p => <option key={p._id} value={p._id}>{p.name} - {formatCurrency(p.price)}</option>)}
                    </select>
                    <Button type="button" variant="outline" onClick={() => setShowQuickProductModal(true)} style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} title="Crear Producto Nuevo">
                      <PlusCircle size={16} />
                    </Button>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cantidad*</label>
                  <input type="number" min="1" value={manualForm.quantity} onChange={e => setManualForm({...manualForm, quantity: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Dirección de Envío*</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="text" placeholder="Dirección" value={manualForm.address} onChange={e => setManualForm({...manualForm, address: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                  <input type="text" placeholder="Ciudad" value={manualForm.city} onChange={e => setManualForm({...manualForm, city: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                  <input type="text" placeholder="Teléfono" value={manualForm.phone} onChange={e => setManualForm({...manualForm, phone: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #EEE', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <h5 style={{ margin: '0 0 0.5rem 0' }}>Datos de Despacho (Opcional)</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <select value={dispatchForm.company} onChange={e => setDispatchForm({...dispatchForm, company: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }}>
                    <option value="Servientrega">Servientrega</option>
                    <option value="Inter Rapidísimo">Inter Rapidísimo</option>
                    <option value="Coordinadora">Coordinadora</option>
                    <option value="Envía">Envía</option>
                    <option value="TCC">TCC</option>
                    <option value="Mensajería Local">Mensajería Local</option>
                  </select>
                  <input type="text" placeholder="Nro de Guía" value={dispatchForm.trackingNumber} onChange={e => setDispatchForm({...dispatchForm, trackingNumber: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId === 'manual' ? 'Guardando...' : 'Crear Venta'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowManualModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Editar Pedido (Cambiar Producto/Precio)</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Al guardar, se recalculará el stock y el precio total de la orden. (Solo modifica el primer producto).
            </p>
            <form onSubmit={submitEditOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Producto*</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', width: '100%' }}>
                  <select value={editForm.productId} onChange={e => {
                    const prod = products.find(p => p._id === e.target.value);
                    setEditForm({...editForm, productId: e.target.value, price: prod ? prod.price : editForm.price});
                  }} style={{ flex: '1 1 0%', minWidth: '0', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', textOverflow: 'ellipsis' }} required>
                    <option value="">Seleccionar producto...</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name} - {formatCurrency(p.price)}</option>)}
                  </select>
                  <Button type="button" variant="outline" onClick={() => setShowQuickProductModal(true)} style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} title="Crear Producto Nuevo">
                    <PlusCircle size={16} />
                  </Button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Cantidad*</label>
                  <input type="number" min="1" value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Precio Unitario*</label>
                  <input type="number" min="0" value={editForm.price} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Método Pago*</label>
                  <select value={editForm.paymentMethod} onChange={e => setEditForm({...editForm, paymentMethod: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="deposito">Depósito Bancario</option>
                    <option value="tarjeta">Tarjeta (Web)</option>
                    <option value="wompi">Wompi (Web)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Detalles Custom (Opcional)</label>
                <textarea rows="2" value={editForm.customization} onChange={e => setEditForm({...editForm, customization: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', resize: 'none' }} placeholder="Detalles de diseño..." />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId ? 'Guardando...' : 'Guardar Cambios'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showQuickProductModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Crear Producto Rápido</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>Crea un producto rápidamente para asignarlo a esta orden.</p>
            <form onSubmit={submitQuickProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Nombre del Producto*</label>
                  <input type="text" value={quickProductForm.name} onChange={e => setQuickProductForm({...quickProductForm, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Precio Base*</label>
                  <input type="number" min="0" value={quickProductForm.price} onChange={e => setQuickProductForm({...quickProductForm, price: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Descripción*</label>
                <textarea rows="2" value={quickProductForm.description} onChange={e => setQuickProductForm({...quickProductForm, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC', resize: 'none' }} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Categoría*</label>
                  <select value={quickProductForm.category} onChange={e => setQuickProductForm({...quickProductForm, category: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Técnica*</label>
                  <select value={quickProductForm.type} onChange={e => setQuickProductForm({...quickProductForm, type: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="prenda">Prenda</option>
                    <option value="dtf">DTF</option>
                    <option value="sublimacion">Sublimación</option>
                    <option value="plotter">Plotter</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Colección</label>
                  <input type="text" value={quickProductForm.collectionName} onChange={e => setQuickProductForm({...quickProductForm, collectionName: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600 }}>Imágenes (Opcional)</label>
                <input type="file" multiple accept="image/*" onChange={e => setQuickProductImages(Array.from(e.target.files))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>Puedes seleccionar varias imágenes (Máx 5).</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{triggeringOrderId === 'quick_product' ? 'Creando...' : 'Crear Producto'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowQuickProductModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {orderToDelete && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 12000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            <AlertCircle size={48} color="#D9534F" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ margin: '0 0 0.5rem 0' }}>¿Eliminar Orden?</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Esta acción es permanente e irreversible. Si esta orden ya había descontado productos, el inventario será restaurado. ¿Estás seguro?
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="button" variant="primary" onClick={executeDeleteOrder} style={{ flex: 1, backgroundColor: '#D9534F' }}>
                {triggeringOrderId === orderToDelete ? 'Eliminando...' : 'Aceptar'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOrderToDelete(null)} style={{ flex: 1 }}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
