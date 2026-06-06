import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useUiStore } from '../../../store/uiStore';

const EditItemsModal = ({ order, onClose }) => {
  const queryClient = useQueryClient();
  const addToast = useUiStore(s => s.addToast);
  const [items, setItems] = useState(() =>
    order.items.map(item => ({ ...item, _key: item._id || item.product }))
  );
  const [saving, setSaving] = useState(false);

  const handleQuantityChange = (index, delta) => {
    setItems(prev => {
      const updated = [...prev];
      const newQty = (updated[index].quantity || 0) + delta;
      if (newQty < 1) return prev;
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleQuantityInput = (index, raw) => {
    const qty = parseInt(raw, 10);
    if (isNaN(qty) || qty < 1) return;
    setItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: qty };
      return updated;
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasChanges = items.some((item, i) => item.quantity !== order.items[i]?.quantity);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        items: items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          ...(item.customization?.type ? {
            customization: {
              type: item.customization.type,
              details: item.customization.details || '',
            },
          } : {}),
        })),
      };

      await api.put(`/orders/${order._id}/items`, payload);
      addToast('Items actualizados exitosamente', 'success');
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al actualizar los items';
      addToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

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
          maxWidth: '520px', width: '90%', maxHeight: '85vh', overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.25rem' }}>
          Editar items del pedido
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, index) => (
            <div
              key={item._key}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem', border: '1px solid var(--color-border)',
                borderRadius: '8px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  {formatCurrency(item.price)} c/u
                  {item.customization?.type && (
                    <span> · {item.customization.type === 'serigrafia' ? 'Serigrafía' : 'DTF'}</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  disabled={item.quantity <= 1}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    border: '1px solid var(--color-border)', backgroundColor: '#FFF',
                    cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                    fontWeight: 700, fontSize: '1rem', opacity: item.quantity <= 1 ? 0.4 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >−</button>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityInput(index, e.target.value)}
                  style={{
                    width: '48px', textAlign: 'center', padding: '0.3rem',
                    border: '1px solid var(--color-border)', borderRadius: '6px',
                    fontSize: '0.9rem', fontWeight: 600,
                  }}
                />

                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    border: '1px solid var(--color-border)', backgroundColor: '#FFF',
                    cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '1.25rem', padding: '0.75rem', backgroundColor: '#F9FAFB',
          borderRadius: '8px', textAlign: 'right', fontWeight: 700, fontSize: '1.05rem',
        }}>
          Total: {formatCurrency(total)}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
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

export default EditItemsModal;
