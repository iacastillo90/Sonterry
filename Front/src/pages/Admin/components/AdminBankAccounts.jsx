import React, { useState } from 'react';
import { AlertCircle, PlusCircle, Edit, Trash2, Landmark, CheckCircle, XCircle } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'Ahorros',
    ownerName: '',
    ownerDocument: '',
    phoneNumber: '',
    supportedMethods: 'ambas',
    isActive: true
  });

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      bankName: '', accountNumber: '', accountType: 'Ahorros', ownerName: '', ownerDocument: '', phoneNumber: '', supportedMethods: 'ambas', isActive: true
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
      ownerDocument: account.ownerDocument,
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cuenta bancaria?')) {
      try {
        await deleteMutation.mutateAsync(id);
        addToast('Cuenta eliminada', 'success');
      } catch (err) {
        addToast('Error al eliminar', 'error');
      }
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

      {isLoading ? (
        <LoadingSpinner />
      ) : (!accounts || accounts.length === 0) ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
          <AlertCircle size={40} style={{ marginBottom: '1rem', color: 'var(--color-warning)' }} />
          <p>No tienes cuentas bancarias registradas.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {accounts.map(acc => (
            <div key={acc._id} style={{ border: `1px solid ${acc.isActive ? 'var(--color-primary)' : '#CCC'}`, borderRadius: '8px', padding: '1.5rem', backgroundColor: '#FFF', position: 'relative', opacity: acc.isActive ? 1 : 0.65 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Landmark size={20} color={acc.isActive ? 'var(--color-primary)' : '#999'} />
                <h4 style={{ margin: 0, fontWeight: 700 }}>{acc.bankName}</h4>
              </div>
              
              <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <p style={{ margin: 0 }}><strong>Tipo:</strong> {acc.accountType}</p>
                <p style={{ margin: 0 }}><strong>Nro:</strong> {acc.accountNumber}</p>
                <p style={{ margin: 0 }}><strong>Titular:</strong> {acc.ownerName}</p>
                <p style={{ margin: 0 }}><strong>Documento:</strong> {acc.ownerDocument}</p>
                {acc.phoneNumber && <p style={{ margin: 0 }}><strong>Teléfono:</strong> {acc.phoneNumber}</p>}
                
                <p style={{ margin: '0.5rem 0 0 0', padding: '4px 8px', background: '#F1F5F9', borderRadius: '4px', display: 'inline-block', width: 'fit-content' }}>
                  <strong>Sirve para:</strong> <span style={{ textTransform: 'capitalize' }}>{acc.supportedMethods}</span>
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <button onClick={() => handleToggleStatus(acc)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: acc.isActive ? '#D9534F' : '#166534', fontWeight: 600 }}>
                  {acc.isActive ? <><XCircle size={14}/> Desactivar</> : <><CheckCircle size={14}/> Activar</>}
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => openEditModal(acc)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><Edit size={16} /></button>
                  <button onClick={() => handleDelete(acc._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D9534F' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 1.5rem 0' }}>{editingId ? 'Editar Cuenta' : 'Nueva Cuenta Bancaria'}</h4>
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
                  <input type="text" value={formData.ownerDocument} onChange={e => setFormData({...formData, ownerDocument: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #CCC' }} required />
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

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }}>{editingId ? 'Guardar Cambios' : 'Crear Cuenta'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBankAccounts;
