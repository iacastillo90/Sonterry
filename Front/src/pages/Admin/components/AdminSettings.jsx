import React, { useState } from 'react';
import { useAuthStore } from '../../../store/authStore';
import api from '../../../services/api';
import Button from '../../../components/common/Button';
import { UserCog, KeyRound, UserPlus, Save, AlertCircle } from 'lucide-react';

const AdminSettings = ({ addToast }) => {
  const { user, updateUser } = useAuthStore();
  
  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileLoading, setProfileLoading] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // New admin state
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminLoading, setNewAdminLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await api.patch('/auth/profile', { name, email });
      updateUser({ ...user, name: res.data.data.user.name, email: res.data.data.user.email });
      addToast('Perfil actualizado con éxito', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al actualizar perfil', 'error');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return addToast('Las contraseñas nuevas no coinciden', 'error');
    }
    setPasswordLoading(true);
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      addToast('Contraseña actualizada con éxito', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al actualizar contraseña', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setNewAdminLoading(true);
    try {
      await api.post('/users/admin', { name: newAdminName, email: newAdminEmail, password: newAdminPassword });
      addToast('Nuevo administrador creado con éxito', 'success');
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (error) {
      addToast(error.response?.data?.message || 'Error al crear administrador', 'error');
    } finally {
      setNewAdminLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 className="admin-tab-title">Configuración de Administrador</h3>
        <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem' }}>Actualiza tus datos, cambia tu contraseña o crea nuevos accesos de administrador.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Profile Settings */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#0F172A', marginTop: 0, marginBottom: '1.5rem' }}>
            <UserCog size={20} color="#2563EB" /> Mis Datos
          </h4>
          <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Nombre Completo</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Correo Electrónico</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <Button type="submit" variant="primary" disabled={profileLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Save size={16} /> {profileLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#0F172A', marginTop: 0, marginBottom: '1.5rem' }}>
            <KeyRound size={20} color="#D97706" /> Cambiar Contraseña
          </h4>
          <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Contraseña Actual</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Nueva Contraseña</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Confirmar Nueva Contraseña</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <Button type="submit" variant="primary" disabled={passwordLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', backgroundColor: '#D97706', borderColor: '#D97706' }}>
              <KeyRound size={16} /> {passwordLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        </div>

        {/* Create Admin */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: '#0F172A', marginTop: 0, marginBottom: '1.5rem' }}>
            <UserPlus size={20} color="#16A34A" /> Crear Nuevo Admin
          </h4>
          <div style={{ padding: '0.75rem', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px dashed #BBF7D0', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#166534', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>Los usuarios creados aquí tendrán acceso total al panel de administración. Usa esta función con precaución.</span>
          </div>
          <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Nombre Completo</label>
              <input 
                type="text" 
                value={newAdminName} 
                onChange={(e) => setNewAdminName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Correo Electrónico</label>
              <input 
                type="email" 
                value={newAdminEmail} 
                onChange={(e) => setNewAdminEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem', color: '#1E293B' }}>Contraseña</label>
              <input 
                type="password" 
                value={newAdminPassword} 
                onChange={(e) => setNewAdminPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.95rem' }} 
                required 
              />
            </div>
            <Button type="submit" variant="primary" disabled={newAdminLoading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', backgroundColor: '#16A34A', borderColor: '#16A34A' }}>
              <UserPlus size={16} /> {newAdminLoading ? 'Creando...' : 'Crear Administrador'}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
