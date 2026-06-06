import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, AlertCircle, Loader } from 'lucide-react';
import { useWishlist, useToggleWishlist } from '../../queries/useWishlist';
import { formatCurrency } from '../../utils/formatCurrency';
import './Wishlist.css';

const Wishlist = () => {
  const { data: wishlist, isLoading, isError, refetch } = useWishlist();
  const toggleMutation = useToggleWishlist();

  const products = wishlist?.products || [];

  if (isLoading) {
    return (
      <div className="wishlist-state">
        <Loader size={32} className="spin" />
        <p>Cargando lista de deseos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wishlist-state">
        <AlertCircle size={48} strokeWidth={1.5} color="var(--color-danger)" />
        <h3>Error al cargar</h3>
        <p>No pudimos cargar tu lista de deseos.</p>
        <button className="wishlist-retry-btn" onClick={() => refetch()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="wishlist-empty">
        <Heart size={64} strokeWidth={1} color="var(--color-text-light)" />
        <h3>Tu lista de deseos está vacía</h3>
        <p>Guardá tus productos favoritos acá para encontrarlos fácil después.</p>
        <Link to="/productos" className="wishlist-cta-btn">
          <ShoppingBag size={18} /> Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h3>Mi Lista de Deseos</h3>
        <span className="wishlist-count">{products.length} {products.length === 1 ? 'producto' : 'productos'}</span>
      </div>

      <div className="wishlist-grid">
        {products.map((product) => (
          <div key={product._id} className={`wishlist-card ${!product.isActive ? 'inactive' : ''}`}>
            <Link to={`/productos/${product.slug}`} className="wishlist-card-img">
              <img
                src={product.images?.[0]?.url || '/placeholder.svg'}
                alt={product.name}
              />
            </Link>

            <div className="wishlist-card-body">
              <Link to={`/productos/${product.slug}`} className="wishlist-card-name">
                {product.name}
              </Link>
              <span className="wishlist-card-price">{formatCurrency(product.price)}</span>

              <div className="wishlist-card-actions">
                <Link to={`/productos/${product.slug}`} className="wishlist-view-btn">
                  Ver producto
                </Link>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => toggleMutation.mutate(product._id)}
                  disabled={toggleMutation.isPending}
                  title="Eliminar de lista de deseos"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {!product.isActive && (
              <span className="wishlist-badge">No disponible</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
