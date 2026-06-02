import React, { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';
import * as authService from '../../../services/auth.service';

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
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Detalles de Perfil</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Mantén actualizada tu información de entrega para un proceso de personalización de prendas impecable.
      </p>

      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="profile-form-row">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.8 }}>
              Nombre Completo
            </label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#F5F5F5',
                color: 'var(--color-text-light)',
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', opacity: 0.8 }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#F5F5F5',
                color: 'var(--color-text-light)',
                cursor: 'not-allowed'
              }}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFF8E1',
          border: '1px solid #FFE082',
          borderRadius: 'var(--border-radius-sm)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.82rem',
          color: '#B78103',
          fontWeight: '500'
        }}>
          <AlertTriangle size={18} />
          <span>Por seguridad, tu Nombre y Correo son de lectura. Si necesitas cambiarlos, abre un ticket en Soporte.</span>
        </div>

        <div className="profile-form-row" style={{ marginTop: '0.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Número Telefónico / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +57 300 123 4567"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Ciudad
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Bogotá"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div className="profile-form-row-2-1">
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Dirección de Envío
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, Carrera, Barrio y apto/casa..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Código Postal (Opcional)
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Ej: 110111"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSavingProfile}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.85rem 2rem',
            borderRadius: 'var(--border-radius-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            alignSelf: 'flex-start',
            marginTop: '1rem',
            transition: 'var(--transition-smooth)',
            opacity: isSavingProfile ? 0.7 : 1
          }}
        >
          <Save size={18} />
          <span>{isSavingProfile ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
