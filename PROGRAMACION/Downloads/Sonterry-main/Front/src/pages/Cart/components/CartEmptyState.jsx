import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Button from '../../../components/common/Button';

const CartEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="cart-empty">
      <ShoppingBag size={48} className="cart-empty-icon" />
      <h3 className="cart-empty-title">Tu bolsa está vacía</h3>
      <p className="cart-empty-text">
        Aún no has agregado ningún Mug o Gorra base para personalizar. ¡Explora nuestro catálogo y empieza tu diseño!
      </p>
      <Button variant="primary" onClick={() => navigate('/productos')}>
        Explorar catálogo
      </Button>
    </div>
  );
};

export default CartEmptyState;
