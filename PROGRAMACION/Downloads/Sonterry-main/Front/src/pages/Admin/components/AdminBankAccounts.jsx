import React, { useState } from 'react';
import { AlertCircle, PlusCircle, Edit2, Trash2, Landmark, CheckCircle, XCircle, Search, Filter, Layers, CreditCard } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import { useBankAccountsAdmin, useCreateBankAccount, useUpdateBankAccount, useDeleteBankAccount } from '../../../queries/useBankAccounts';

const AdminBankAccounts = ({ addToast }) => {
  const { data: accounts, isLoading } = useBankAccountsAdmin();
  const createMutation = useCreateBankAccount();
  const updateMutation = useUpdateBankAccount();
  const deleteMutation = useDeleteBankAccount();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'Ahorros',
    ownerName: '',
    ownerDoc: '',
    phoneNumber: '',
    supportedMethods: 'ambas',
    isActive: true
  });

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      bankName: '', accountNumber: '', accountType: 'Ahorros', ownerName: '', ownerDoc: '', phoneNumber: '', supportedMethods: 'ambas', isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (account) => {
    setEditingId(account._id);
    setFormData({
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      ownerName: account.ownerName,
      ownerDoc: account.ownerDoc,
      phoneNumber: account.phoneNumber || '',
      supportedMethods: account.supportedMethods,
      isActive: account.isActive
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        addToast('Cuenta actualizada', 'success');
      } else {
        await createMutation.mutateAsync(formData);
        addToast('Cuenta agregada', 'success');
      }
      setShowModal(false);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al guardar la cuenta', 'error');
    }
  };

  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      addToast('Cuenta bancaria eliminada permanentemente', 'success');
      setDeleteConfirmId(null);
    } catch (err) {
      addToast('Error al eliminar', 'error');
    }
  };

  const handleToggleStatus = async (account) => {
    try {
      await updateMutation.mutateAsync({ id: account._id, isActive: !account.isActive });
      addToast(`Cuenta ${!account.isActive ? 'activada' : 'desactivada'}`, 'success');
    } catch (err) {
      addToast('Error al actualizar estado', 'error');
    }
  };

  const handleToggleWompi = async (existingWompi) => {
    try {
      if (existingWompi) {
        await updateMutation.mutateAsync({ id: existingWompi._id, isActive: !existingWompi.isActive });
        addToast(`Pasarela Wompi ${!existingWompi.isActive ? 'activada' : 'desactivada'}`, 'success');
      } else {
        await createMutation.mutateAsync({
          bankName: 'Wompi',
          accountType: 'Pasarela',
          accountNumber: 'Automático',
          ownerName: 'Integración Wompi',
          ownerDoc: 'N/A',
          supportedMethods: 'ambas',
          isActive: true
        });
        addToast('Pasarela Wompi activada', 'success');
      }
    } catch (err) {
      addToast('Error al actualizar Wompi', 'error');
    }
  };

  // Separar Wompi de las cuentas manuales
  const wompiAccount = accounts?.find(a => a.bankName.toLowerCase() === 'wompi');
  const manualAccounts = accounts?.filter(a => a.bankName.toLowerCase() !== 'wompi') || [];

  // Stats
  const total = manualAccounts.length;
  const activeCount = manualAccounts.filter(a => a.isActive).length;
  const inactiveCount = manualAccounts.filter(a => !a.isActive).length;

  // Filter Logic
  const filteredAccounts = manualAccounts.filter(a => {
    const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? a.isActive : !a.isActive;
    const q = searchQuery.toLowerCase();
    const matchSearch = (a.bankName || '').toLowerCase().includes(q) || 
                        (a.accountNumber || '').toLowerCase().includes(q) ||
                        (a.ownerName || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Cuentas Bancarias</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Administra las cuentas para depósitos y transferencias que ven los clientes.</p>
        </div>
        <Button variant="primary" onClick={openNewModal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={16} /> Nueva Cuenta
        </Button>
      </div>

      {/* Wompi Integration Card */}
      <div style={{ background: 'linear-gradient(135deg, #1E1E2F 0%, #2D2D44 100%)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: '#FFF', padding: '0.75rem 1.25rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://wompi.co/wp-content/uploads/2023/11/logo-wompi.svg" alt="Wompi" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <span style={{ display: 'none', fontWeight: 800, fontSize: '1.5rem', color: '#1E1E2F', letterSpacing: '-1px' }}>Wompi</span>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.35rem 0', color: '#FFF', fontSize: '1.25rem' }}>Pasarela de Pagos Oficial</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#CBD5E1', maxWidth: '600px', lineHeight: '1.5' }}>
              Permite a tus clientes pagar con <strong>Tarjetas de Crédito, Débito, PSE, Nequi</strong> y más. <br/>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>(Las credenciales de seguridad están protegidas a nivel de servidor).</span>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: wompiAccount?.isActive ? '#4ADE80' : '#94A3B8' }}>
            {wompiAccount?.isActive ? 'ACTIVADO' : 'DESACTIVADO'}
          </span>
          <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '30px' }}>
            <input 
              type="checkbox" 
              checked={wompiAccount?.isActive || false}
              onChange={() => handleToggleWompi(wompiAccount)}
              style={{ opacity: 0, width: 0, height: 0 }} 
            />
            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: wompiAccount?.isActive ? '#4ADE80' : '#475569', transition: '.4s', borderRadius: '34px' }}>
              <span style={{ position: 'absolute', content: '""', height: '22px', width: '22px', left: wompiAccount?.isActive ? '30px' : '4px', bottom: '4px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></span>
            </span>
          </label>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginBottom: '1rem' }}>Cuentas de Depósito / Transferencia Manual</h3>
      </div>

      {/* Info Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#E2E8F0', padding: '0.75rem', borderRadius: '8px', color: '#475569' }}><Landmark size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>TOTAL CUENTAS</span>
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
            <span style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: 700 }}>INACTIVAS</span>
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
            placeholder="Buscar por banco, número o titular..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#64748B" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '150px' }}
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="inactive">Inactivas</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : filteredAccounts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', color: '#94A3B8' }} />
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>No se encontraron cuentas bancarias.</p>
          <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={{ marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Limpiar filtros</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredAccounts.map(acc => (
            <div key={acc._id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.5rem', backgroundColor: acc.isActive ? '#FFFFFF' : '#F8FAFC', position: 'relative', opacity: acc.isActive ? 1 : 0.7, transition: 'box-shadow 0.2s', display: 'flex', flexDirection: 'column', minWidth: 0 }} onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: acc.isActive ? '#EFF6FF' : '#F1F5F9', padding: '0.5rem', borderRadius: '8px', color: acc.isActive ? '#2563EB' : '#64748B' }}>
                    <Landmark size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 700, color: '#0F172A', fontSize: '1.1rem' }}>{acc.bankName}</h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '12px', backgroundColor: acc.isActive ? '#DCFCE7' : '#F1F5F9', color: acc.isActive ? '#166534' : '#64748B', border: `1px solid ${acc.isActive ? '#BBF7D0' : '#E2E8F0'}`, display: 'inline-block', marginTop: '0.25rem' }}>
                      {acc.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Tipo:</span> <strong>{acc.accountType}</strong></p>
                <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Número:</span> <strong>{acc.accountNumber}</strong></p>
                <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Titular:</span> <strong>{acc.ownerName}</strong></p>
                <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Documento:</span> <strong>{acc.ownerDoc}</strong></p>
                {acc.phoneNumber && <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Teléfono:</span> <strong>{acc.phoneNumber}</strong></p>}
                
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={16} color="#64748B" />
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Soporta: <strong>{acc.supportedMethods === 'ambas' ? 'Transferencia y Depósito' : acc.supportedMethods === 'transferencia' ? 'Solo Transferencia' : 'Solo Depósito'}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <Button variant="outline" onClick={() => handleToggleStatus(acc)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: acc.isActive ? '#D97706' : '#10B981', borderColor: acc.isActive ? '#FDE68A' : '#A7F3D0', backgroundColor: acc.isActive ? '#FFFBEB' : '#ECFDF5' }}>
                  {acc.isActive ? <><XCircle size={14}/> Desactivar</> : <><CheckCircle size={14}/> Activar</>}
                </Button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" onClick={() => openEditModal(acc)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2563EB', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}>
                    <Edit2 size={14} /> Editar
                  </Button>
                  <Button variant="outline" onClick={() => confirmDelete(acc._id)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#DC2626', borderColor: '#FECACA', backgroundColor: '#FEF2F2' }} title="Eliminar definitivamente">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '95%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: '#0F172A' }}>
                {editingId ? <Edit2 size={20} color="#2563EB" /> : <PlusCircle size={20} color="#10B981" />}
                {editingId ? 'Editar Cuenta' : 'Nueva Cuenta Bancaria'}
              </h4>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Banco *</label>
                <input type="text" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} placeholder="Ej: Bancolombia, Davivienda, Nequi" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Tipo de Cuenta *</label>
                  <select value={formData.accountType} onChange={e => setFormData({...formData, accountType: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                    <option value="Ahorros">Ahorros</option>
                    <option value="Corriente">Corriente</option>
                    <option value="Billetera Digital">Billetera Digital (Nequi/Daviplata)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Número de Cuenta *</label>
                  <input type="text" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Nombre del Titular *</label>
                <input type="text" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Documento (CC/NIT) *</label>
                  <input type="text" value={formData.ownerDoc} onChange={e => setFormData({...formData, ownerDoc: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Teléfono (Opcional)</label>
                  <input type="text" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>Sirve para: *</label>
                <select value={formData.supportedMethods} onChange={e => setFormData({...formData, supportedMethods: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required>
                  <option value="ambas">Transferencia y Depósito (Ambas)</option>
                  <option value="transferencia">Solo Transferencia</option>
                  <option value="deposito">Solo Depósito (Ventanilla)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="isActiveBankCheck" 
                  checked={formData.isActive} 
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="isActiveBankCheck" style={{ fontSize: '0.9rem', color: '#334155', cursor: 'pointer', userSelect: 'none' }}>
                  Cuenta Activa (Visible para los clientes)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem' }}>Cancelar</Button>
                <Button type="submit" variant="primary" style={{ flex: 1, padding: '0.75rem' }}>{editingId ? 'Guardar Cambios' : 'Crear Cuenta'}</Button>
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
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#0F172A' }}>¿Eliminar Cuenta?</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Esta acción es permanente e irreversible. Los clientes ya no podrán ver esta cuenta para realizar pagos. ¿Estás seguro?
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="button" variant="outline" onClick={() => setDeleteConfirmId(null)} style={{ flex: 1, padding: '0.75rem' }}>
                Cancelar
              </Button>
              <Button type="button" variant="primary" onClick={() => executeDelete(deleteConfirmId)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#EF4444', borderColor: '#EF4444' }}>
                Sí, Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBankAccounts;
