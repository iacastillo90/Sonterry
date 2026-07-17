import React, { useState, useMemo } from 'react';
import { UserCheck, UserX, Search, Filter, Shield, Edit2, Trash2, Mail, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Button from '../../../components/common/Button';
import api from '../../../services/api';

const AdminUsers = ({ users, loadingUsers, fetchUsersList, addToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modals state
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats
  const totalUsers = users?.length || 0;
  const activeCount = users?.filter(u => u.isActive !== false).length || 0;
  const suspendedCount = users?.filter(u => u.isActive === false).length || 0;

  const filteredUsers = useMemo(() => {
    return (users || []).filter(u => {
      const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? u.isActive !== false : u.isActive === false;
      const matchRole = roleFilter === 'all' ? true : u.role === roleFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch = (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
      
      return matchStatus && matchRole && matchSearch;
    });
  }, [users, statusFilter, roleFilter, searchQuery]);

  const handleToggleUserStatus = async (userId, currentIsActive) => {
    try {
      await api.patch(`/users/${userId}/status`, { isActive: !currentIsActive });
      addToast(`Usuario ${!currentIsActive ? 'activado' : 'suspendido'} con éxito`, 'success');
      fetchUsersList();
    } catch (err) {
      addToast('Error al cambiar el estado del usuario', 'error');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put(`/users/${editingUser._id}`, { name: editingUser.name, email: editingUser.email });
      addToast('Datos del usuario actualizados correctamente', 'success');
      setEditingUser(null);
      fetchUsersList();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al actualizar usuario', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setIsSubmitting(true);
    try {
      await api.delete(`/users/${id}`);
      addToast('Usuario eliminado permanentemente', 'success');
      setDeleteConfirmId(null);
      fetchUsersList();
    } catch (err) {
      addToast(err.response?.data?.message || 'Error al eliminar usuario', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="admin-tab-title">Usuarios & Clientes Registrados</h3>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Administra los accesos, permisos y datos de los usuarios de la plataforma.</p>
        </div>
      </div>

      {/* Info Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#E2E8F0', padding: '0.75rem', borderRadius: '8px', color: '#475569' }}><UserCheck size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>TOTAL USUARIOS</span>
            <h4 style={{ margin: 0, color: '#0F172A', fontSize: '1.5rem' }}>{totalUsers}</h4>
          </div>
        </div>
        
        <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: '8px', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#DCFCE7', padding: '0.75rem', borderRadius: '8px', color: '#16A34A' }}><CheckCircle size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: 700 }}>ACTIVOS</span>
            <h4 style={{ margin: 0, color: '#166534', fontSize: '1.5rem' }}>{activeCount}</h4>
          </div>
        </div>

        <div style={{ background: '#FEF2F2', padding: '1rem', borderRadius: '8px', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#FEE2E2', padding: '0.75rem', borderRadius: '8px', color: '#DC2626' }}><XCircle size={24} /></div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: 700 }}>SUSPENDIDOS</span>
            <h4 style={{ margin: 0, color: '#991B1B', fontSize: '1.5rem' }}>{suspendedCount}</h4>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', flex: '1 1 auto' }}>
          <Filter size={18} color="#64748B" style={{ flexShrink: 0 }} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '130px' }}
          >
            <option value="all">Todos los roles</option>
            <option value="user">Clientes (user)</option>
            <option value="admin">Administradores</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', backgroundColor: '#FFF', fontSize: '0.9rem', minWidth: '130px' }}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Suspendidos</option>
          </select>
        </div>
      </div>

      {loadingUsers ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
          <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', color: '#94A3B8' }} />
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>No se encontraron usuarios.</p>
          <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); setRoleFilter('all'); }} style={{ marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#E2E8F0', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}>Limpiar filtros</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredUsers.map(u => {
            const isActive = u.isActive !== false;
            return (
              <div key={u._id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.5rem', backgroundColor: isActive ? '#FFFFFF' : '#F8FAFC', position: 'relative', opacity: isActive ? 1 : 0.75, transition: 'box-shadow 0.2s', display: 'flex', flexDirection: 'column', minWidth: 0 }} onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1)'} onMouseLeave={e => e.currentTarget.style.boxShadow='none'}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
                    <div style={{ background: u.role === 'admin' ? '#FEF9C3' : (isActive ? '#EFF6FF' : '#F1F5F9'), padding: '0.5rem', borderRadius: '8px', color: u.role === 'admin' ? '#CA8A04' : (isActive ? '#2563EB' : '#64748B'), flexShrink: 0 }}>
                      {u.role === 'admin' ? <Shield size={20} /> : <UserCheck size={20} />}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ margin: 0, fontWeight: 700, color: '#0F172A', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</h4>
                      <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '12px', backgroundColor: u.role === 'admin' ? '#FEF08A' : '#F1F5F9', color: u.role === 'admin' ? '#A16207' : '#64748B', display: 'inline-block', marginTop: '0.25rem' }}>
                        {u.role === 'admin' ? 'ADMINISTRADOR' : 'CLIENTE'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ fontSize: '0.9rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={14} color="#64748B" /> <strong>{u.email}</strong>
                  </p>
                  
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed #CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Estado: <strong style={{ color: isActive ? '#16A34A' : '#DC2626' }}>{isActive ? 'Activo (Acceso Permitido)' : 'Suspendido (Acceso Bloqueado)'}</strong>
                    </span>
                  </div>
                </div>

                {u.role !== 'admin' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                    <Button variant="outline" onClick={() => handleToggleUserStatus(u._id, isActive)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: isActive ? '#D97706' : '#10B981', borderColor: isActive ? '#FDE68A' : '#A7F3D0', backgroundColor: isActive ? '#FFFBEB' : '#ECFDF5' }}>
                      {isActive ? <><UserX size={14}/> Suspender</> : <><UserCheck size={14}/> Activar</>}
                    </Button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button variant="outline" onClick={() => setEditingUser(u)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2563EB', borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="outline" onClick={() => setDeleteConfirmId(u._id)} style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#DC2626', borderColor: '#FECACA', backgroundColor: '#FEF2F2' }} title="Eliminar definitivamente">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', width: '95%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: '#0F172A' }}>
                <Edit2 size={20} color="#2563EB" /> Editar Cliente
              </h4>
              <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}>&times;</button>
            </div>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Nombre Completo *</label>
                <input 
                  type="text" 
                  value={editingUser.name} 
                  onChange={e => setEditingUser({...editingUser, name: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outlineColor: '#3B82F6' }} 
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Correo Electrónico *</label>
                <input 
                  type="email" 
                  value={editingUser.email} 
                  onChange={e => setEditingUser({...editingUser, email: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outlineColor: '#3B82F6' }} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setEditingUser(null)} style={{ flex: 1, padding: '0.75rem' }}>Cancelar</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting} style={{ flex: 1, padding: '0.75rem' }}>
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
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
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#0F172A' }}>¿Eliminar Usuario?</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Esta acción es permanente e irreversible. Se borrarán los accesos y registros asociados a este cliente. ¿Estás seguro?
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="button" variant="outline" onClick={() => setDeleteConfirmId(null)} style={{ flex: 1, padding: '0.75rem' }}>
                Cancelar
              </Button>
              <Button type="button" variant="primary" disabled={isSubmitting} onClick={() => handleDeleteUser(deleteConfirmId)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#EF4444', borderColor: '#EF4444' }}>
                {isSubmitting ? 'Eliminando...' : 'Sí, Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;
