import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import './Settings.css';

const Settings = () => {
  const { user } = useAuthStore();
  const addToast = useUiStore((s) => s.addToast);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    setSending(true);
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      setSuccess('Contraseña cambiada con éxito');
      addToast('Contraseña actualizada', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al cambiar la contraseña';
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h3 className="settings-title">Configuración</h3>
        <p className="settings-subtitle">Administra tu información personal y la seguridad de tu cuenta.</p>
      </div>

      <div className="settings-grid">
        {/* Account info Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-wrap">
              <Lock size={20} />
            </div>
            <h4 className="settings-section-title">Información de la cuenta</h4>
          </div>
          
          <div className="settings-info-list">
            <div className="settings-info-item">
              <span className="settings-info-label">Nombre</span>
              <p className="settings-info-value">{user?.name}</p>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-label">Correo electrónico</span>
              <p className="settings-info-value">{user?.email}</p>
            </div>
            <div className="settings-info-item">
              <span className="settings-info-label">Nivel de acceso</span>
              <div>
                <span className={`role-badge ${user?.role === 'admin' ? 'admin' : ''}`}>
                  {user?.role === 'admin' ? 'Administrador' : 'Cliente SonTerry'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Change password Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon-wrap">
              <Lock size={20} />
            </div>
            <h4 className="settings-section-title">Cambiar contraseña</h4>
          </div>

          <form onSubmit={handleSubmit} className="settings-password-form">
            {error && (
              <div className="settings-alert error">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="settings-alert success">
                <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{success}</span>
              </div>
            )}

            <div className="settings-password-field">
              <label>Contraseña actual</label>
              <div className="settings-input-wrapper">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button type="button" className="settings-toggle-pw" onClick={() => setShowCurrent(!showCurrent)}>
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="settings-password-field">
              <label>Nueva contraseña</label>
              <div className="settings-input-wrapper">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                />
                <button type="button" className="settings-toggle-pw" onClick={() => setShowNew(!showNew)}>
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="settings-password-field">
              <label>Confirmar nueva contraseña</label>
              <div className="settings-input-wrapper">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                />
                <button type="button" className="settings-toggle-pw" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="settings-submit-btn" disabled={sending}>
              {sending ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
