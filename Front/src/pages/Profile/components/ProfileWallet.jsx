import React, { useState } from 'react';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';

const ProfileWallet = () => {
  const { user } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);

  const [walletCards, setWalletCards] = useState(() => {
    const saved = localStorage.getItem('st_wallet_cards');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'Stripe', brand: 'Visa', last4: '4242', exp: '12/28' },
      { id: 2, type: 'PayPal', brand: 'PayPal Balance', last4: 'sonterry@paypal.com', exp: 'N/A' }
    ];
  });

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardBrand, setNewCardBrand] = useState('Visa');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExp, setNewCardExp] = useState('');
  const [newCardHolder, setNewCardHolder] = useState(user?.name || '');

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardNumber || newCardNumber.length < 12) {
      return addToast('Número de tarjeta inválido', 'warning');
    }
    if (!newCardExp || !newCardExp.includes('/')) {
      return addToast('Formato de expiración inválido (MM/AA)', 'warning');
    }
    if (!newCardHolder.trim()) {
      return addToast('Nombre del titular requerido', 'warning');
    }

    const newCard = {
      id: Date.now(),
      type: 'Stripe',
      brand: newCardBrand,
      last4: newCardNumber.replace(/\s+/g, '').slice(-4),
      exp: newCardExp,
      holder: newCardHolder.trim()
    };

    const updated = [...walletCards, newCard];
    setWalletCards(updated);
    localStorage.setItem('st_wallet_cards', JSON.stringify(updated));
    addToast('Tarjeta vinculada con éxito en pasarela segura', 'success');

    setNewCardNumber('');
    setNewCardExp('');
    setNewCardHolder(user?.name || '');
    setShowAddCard(false);
  };

  const handleRemoveCard = (cardId) => {
    const updated = walletCards.filter(c => c.id !== cardId);
    setWalletCards(updated);
    localStorage.setItem('st_wallet_cards', JSON.stringify(updated));
    addToast('Método de pago eliminado con éxito', 'success');
  };

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Mi Billetera Digital</h3>
      <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Visualiza los medios de pago asociados de forma segura a tu cuenta.
      </p>

      {/* Compliance Security Box */}
      <div style={{
        backgroundColor: 'rgba(82, 143, 88, 0.08)',
        border: '1px solid rgba(82, 143, 88, 0.2)',
        borderRadius: 'var(--border-radius-sm)',
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        <ShieldCheck size={32} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-primary)' }}>Cumplimiento de Seguridad de Datos (PCI-DSS)</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', lineHeight: '1.4' }}>
            Por regulaciones internacionales de seguridad bancaria, <strong>no almacenamos los datos reales de tu tarjeta en nuestros servidores</strong>. 
            Los métodos listados abajo son referencias autorizadas vinculadas directamente en las pasarelas de pago asociadas (Stripe y PayPal).
          </p>
        </div>
      </div>

      {/* Header with action button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Métodos Vinculados</h4>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: showAddCard ? 'var(--color-danger)' : 'var(--color-primary)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--border-radius-sm)',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
        >
          {showAddCard ? 'Cancelar' : 'Vincular Tarjeta'}
        </button>
      </div>

      {/* Add Card Form */}
      {showAddCard && (
        <form onSubmit={handleAddCard} style={{
          backgroundColor: '#FDFCFB',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-sm)',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'fadeIn 0.3s'
        }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>Nueva Tarjeta de Crédito (Pasarela Segura Simulación)</h4>
          
          <div className="profile-form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Franquicia</label>
              <select
                value={newCardBrand}
                onChange={(e) => setNewCardBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Número de Tarjeta</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div className="profile-form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Expiración (MM/AA)</label>
              <input
                type="text"
                placeholder="12/28"
                value={newCardExp}
                onChange={(e) => setNewCardExp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>Titular</label>
              <input
                type="text"
                value={newCardHolder}
                onChange={(e) => setNewCardHolder(e.target.value)}
                placeholder="Nombre completo"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'var(--transition-smooth)'
            }}
          >
            Vincular Tarjeta
          </button>
        </form>
      )}

      {/* Cards Grid */}
      <div className="profile-wallet-grid">
        {walletCards.map((card) => (
          <div
            key={card.id}
            style={{
              background: card.type === 'Stripe' 
                ? 'linear-gradient(135deg, #4F46E5, #3B82F6)' 
                : 'linear-gradient(135deg, #003087, #0079C1)',
              color: '#FFFFFF',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius-md)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '180px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Trash icon for deletion */}
            <button
              onClick={() => handleRemoveCard(card.id)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                zIndex: 5,
                transition: 'var(--transition-smooth)'
              }}
              title="Eliminar método de pago"
            >
              <Trash2 size={14} />
            </button>

            {/* Gloss circle effects */}
            <div style={{
              position: 'absolute',
              right: '-30px',
              top: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.85 }}>{card.type}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', fontStyle: 'italic' }}>{card.brand}</span>
            </div>

            <div className="wallet-card-number">
              {card.brand === 'PayPal Balance' ? card.last4 : `••••  ••••  ••••  ${card.last4}`}
            </div>

            <div className="wallet-card-footer">
              <div>
                <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Titular</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '500', wordBreak: 'break-word' }}>{card.holder || user?.name}</span>
              </div>
              {card.exp !== 'N/A' && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>Expira</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{card.exp}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileWallet;
