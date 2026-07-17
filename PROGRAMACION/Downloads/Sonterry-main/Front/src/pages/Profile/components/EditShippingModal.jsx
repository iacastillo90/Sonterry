import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api';
import { useUiStore } from '../../../store/uiStore';

const EditShippingModal = ({ order, onClose }) => {
  const queryClient = useQueryClient();
  const addToast = useUiStore(s => s.addToast);
  const [address, setAddress] = useState({ ...order.shippingAddress });
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const hasChanges = Object.keys(address).some(
    key => address[key] !== order.shippingAddress[key]
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/orders/${order._id}/shipping`, { shippingAddress: address });
      addToast('Dirección de envío actualizada', 'success');
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al actualizar la dirección';
      addToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: 'address', label: 'Dirección', placeholder: 'Calle 123 #45-67' },
    { key: 'city', label: 'Ciudad', placeholder: 'Medellín' },
    { key: 'postalCode', label: 'Código Postal', placeholder: '050001' },
    { key: 'country', label: 'País', placeholder: 'Colombia' },
    { key: 'phone', label: 'Teléfono', placeholder: '+573001234567' },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#FFF', borderRadius: '12px', padding: '2rem',
          maxWidth: '480px', width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.25rem' }}>
          Editar dirección de envío
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label
                style={{
                  display: 'block', fontSize: '0.85rem', fontWeight: 600,
                  marginBottom: '0.3rem', color: 'var(--color-text)',
                }}
              >
                {label}
              </label>
              <input
                type="text"
                value={address[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder}
                style={{
                  width: '100%', padding: '0.6rem 0.75rem', border: '1px solid var(--color-border)',
                  borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button
            onClick={onClose}
            disabled={saving}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px',
              border: '1px solid var(--color-border)', backgroundColor: '#FFF',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            style={{
              padding: '0.6rem 1.25rem', borderRadius: '8px', border: 'none',
              backgroundColor: 'var(--color-primary)', color: '#FFF',
              cursor: saving || !hasChanges ? 'not-allowed' : 'pointer',
              fontWeight: 600, fontSize: '0.9rem', opacity: saving || !hasChanges ? 0.7 : 1,
            }}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShippingModal;
