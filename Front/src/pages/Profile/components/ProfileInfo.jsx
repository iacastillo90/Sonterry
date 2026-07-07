import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';
import * as authService from '../../../services/auth.service';
import './ProfileInfo.css';

const ProfileInfo = () => {
  const { user, updateUser } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);

  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.shippingAddress?.address || '');
  const [city, setCity] = useState(user?.shippingAddress?.city || '');
  const [zipCode, setZipCode] = useState(user?.shippingAddress?.zipCode || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const updated = await authService.updateProfile({
        phone,
        shippingAddress: { address, city, zipCode }
      });
      updateUser(updated);
      addToast('Información de perfil guardada con éxito', 'success');
    } catch (error) {
      addToast('Error al guardar la información del perfil', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="profile-info-container">
      <div className="profile-info-header">
        <h3 className="profile-info-title">Detalles de Perfil</h3>
        <p className="profile-info-subtitle">
          Mantén actualizada tu información de entrega para un proceso de personalización de prendas impecable.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="profile-info-form">
        <div className="profile-info-row">
          <div className="profile-field">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="profile-input"
            />
          </div>
        </div>

        <div className="profile-alert-box">
          <AlertTriangle size={18} />
          <span>Por seguridad, tu Nombre y Correo son de lectura. Si necesitas cambiarlos, abre un ticket en Soporte.</span>
        </div>

        <div className="profile-info-row">
          <div className="profile-field">
            <label>Número Telefónico / WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +57 300 123 4567"
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>Ciudad</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Medellín"
              className="profile-input"
            />
          </div>
        </div>

        <div className="profile-info-row profile-info-row-2-1">
          <div className="profile-field">
            <label>Dirección de Envío</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, Carrera, Barrio y apto/casa..."
              className="profile-input"
            />
          </div>

          <div className="profile-field">
            <label>Código Postal (Opcional)</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Ej: 110111"
              className="profile-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSavingProfile}
          className="profile-submit-btn"
        >
          <Save size={18} />
          <span>{isSavingProfile ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
