import React, { useState } from 'react';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useUiStore } from '../../../store/uiStore';
import './ProfileWallet.css';

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
    <div className="wallet-container">
      <div className="wallet-header">
        <h3 className="wallet-title">Mi Billetera Digital</h3>
        <p className="wallet-subtitle">
          Visualiza los medios de pago asociados de forma segura a tu cuenta.
        </p>
      </div>

      {/* Compliance Security Box */}
      <div className="wallet-compliance-box">
        <ShieldCheck size={32} />
        <div>
          <h4>Cumplimiento de Seguridad de Datos (PCI-DSS)</h4>
          <p>
            Por regulaciones internacionales de seguridad bancaria, <strong>no almacenamos los datos reales de tu tarjeta en nuestros servidores</strong>. 
            Los métodos listados abajo son referencias autorizadas vinculadas directamente en las pasarelas de pago asociadas (Stripe y PayPal).
          </p>
        </div>
      </div>

      {/* Header with action button */}
      <div className="wallet-actions-header">
        <h4 className="wallet-actions-title">Métodos Vinculados</h4>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          className={`wallet-btn ${showAddCard ? 'cancel' : ''}`}
        >
          {showAddCard ? 'Cancelar' : 'Vincular Tarjeta'}
        </button>
      </div>

      {/* Add Card Form */}
      {showAddCard && (
        <form onSubmit={handleAddCard} className="wallet-form-card">
          <h4 className="wallet-form-title">Nueva Tarjeta de Crédito (Pasarela Segura Simulación)</h4>
          
          <div className="wallet-form-row">
            <div className="wallet-field">
              <label>Franquicia</label>
              <select
                value={newCardBrand}
                onChange={(e) => setNewCardBrand(e.target.value)}
                className="wallet-select"
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
              </select>
            </div>

            <div className="wallet-field">
              <label>Número de Tarjeta</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value)}
                className="wallet-input"
              />
            </div>
          </div>

          <div className="wallet-form-row">
            <div className="wallet-field">
              <label>Expiración (MM/AA)</label>
              <input
                type="text"
                placeholder="12/28"
                value={newCardExp}
                onChange={(e) => setNewCardExp(e.target.value)}
                className="wallet-input"
              />
            </div>

            <div className="wallet-field">
              <label>Titular</label>
              <input
                type="text"
                value={newCardHolder}
                onChange={(e) => setNewCardHolder(e.target.value)}
                placeholder="Nombre completo"
                className="wallet-input"
              />
            </div>
          </div>

          <button type="submit" className="wallet-btn" style={{ alignSelf: 'flex-start' }}>
            Vincular Tarjeta
          </button>
        </form>
      )}

      {/* Cards Grid */}
      <div className="wallet-cards-grid">
        {walletCards.map((card) => (
          <div key={card.id} className={`payment-card ${card.type === 'Stripe' ? 'stripe' : 'paypal'}`}>
            <button
              onClick={() => handleRemoveCard(card.id)}
              className="payment-card-delete"
              title="Eliminar método de pago"
            >
              <Trash2 size={16} />
            </button>

            <div className="payment-card-gloss" />

            <div className="payment-card-header">
              <span className="payment-card-type">{card.type}</span>
              <span className="payment-card-brand">{card.brand}</span>
            </div>

            <div className="payment-card-number">
              {card.brand === 'PayPal Balance' ? card.last4 : `••••  ••••  ••••  ${card.last4}`}
            </div>

            <div className="payment-card-footer">
              <div>
                <span className="payment-card-label">Titular</span>
                <span className="payment-card-value">{card.holder || user?.name}</span>
              </div>
              {card.exp !== 'N/A' && (
                <div style={{ textAlign: 'right' }}>
                  <span className="payment-card-label">Expira</span>
                  <span className="payment-card-value">{card.exp}</span>
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
