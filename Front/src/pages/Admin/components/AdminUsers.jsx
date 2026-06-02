import React from 'react';
import { UserCheck, UserX } from 'lucide-react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import api from '../../../services/api';

const AdminUsers = ({ users, loadingUsers, fetchUsersList, addToast }) => {
  const handleToggleUserStatus = async (userId, currentIsActive) => {
    try {
      await api.patch(`/users/${userId}/status`, { isActive: !currentIsActive });
      addToast('Estado del usuario actualizado con éxito', 'success');
      fetchUsersList();
    } catch (err) {
      addToast('Error al cambiar el estado del usuario', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="admin-tab-title">Usuarios & Clientes Registrados</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Visualiza el listado de clientes registrados en el portal y gestiona su estado activo de acceso.
      </p>

      {loadingUsers ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>No se encontraron usuarios registrados.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-light)', fontWeight: '700' }}>
                <th style={{ padding: '0.75rem' }}>Nombre</th>
                <th style={{ padding: '0.75rem' }}>Correo Electrónico</th>
                <th style={{ padding: '0.75rem' }}>Rol</th>
                <th style={{ padding: '0.75rem' }}>Estado</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Acción de Acceso</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '500' }}>{u.name}</td>
                  <td style={{ padding: '0.75rem' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      backgroundColor: u.role === 'admin' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.05)',
                      color: u.role === 'admin' ? 'var(--color-accent)' : 'var(--color-text)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>{u.role}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      color: u.isActive !== false ? 'var(--color-primary)' : 'var(--color-danger)',
                      fontWeight: '600'
                    }}>{u.isActive !== false ? 'Activo' : 'Suspendido'}</span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleUserStatus(u._id, u.isActive !== false)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: u.isActive !== false ? 'var(--color-danger)' : 'var(--color-primary)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        {u.isActive !== false ? (
                          <>
                            <UserX size={14} /> Suspender
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} /> Activar
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
