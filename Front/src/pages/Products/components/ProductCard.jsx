import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useCartStore } from '../../../store/cartStore';
import { useUiStore } from '../../../store/uiStore';
import { Heart, ShoppingBag } from 'lucide-react';
import '../Products.css'; // Importamos los estilos para que la card no se rompa fuera de ProductList

/* ── Color mapping per technique ──────────────────────────────────── */
const TYPE_MAP = {
  dtf: {
    imageBg:   '#E8F5EA',
    badgeBg:   '#C8E6CB',
    badgeText: '#1E4A28',
    label:     'DTF',
  },
  serigrafia: {
    imageBg:   '#EAF4EC',
    badgeBg:   '#C5E0C8',
    badgeText: '#1E4A28',
    label:     'Serigrafía',
  },
  sublimacion: {
    imageBg:   '#FDF0EC',
    badgeBg:   '#F5D0C3',
    badgeText: '#7A3520',
    label:     'Sublimación',
  },
  bordado: {
    imageBg:   '#F4EFF9',
    badgeBg:   '#DDD0F0',
    badgeText: '#4A2880',
    label:     'Bordado',
  },
  prenda: {
    imageBg:   '#EAF4EC',
    badgeBg:   '#C5E0C8',
    badgeText: '#1E4A28',
    label:     'Prenda',
  },
};

const DEFAULT_TYPE = {
  imageBg:   '#F0F7F1',
  badgeBg:   '#D4E9D7',
  badgeText: '#1E4A28',
  label:     null,
};

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const addToast  = useUiStore((s) => s.addToast);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  const typeKey   = product.type?.toLowerCase().replace(/\s+/g, '') ?? '';
  const typeStyle = TYPE_MAP[typeKey] ?? DEFAULT_TYPE;
  const typeLabel = typeStyle.label ?? product.type;

  /* Subcategory label (categoria field if present, else type) */
  const subLabel = (product.category?.name ?? product.type ?? '').toUpperCase();

  return (
    <>
      

      <div className="snt-card" style={{ borderTop: `3px solid ${typeStyle.badgeText}` }}>
        {/* ── Image zone ── */}
        <div
          className="snt-card__img-zone"
          style={{ backgroundColor: typeStyle.imageBg }}
        >
          {/* Badge */}
          {typeLabel && (
            <span
              className="snt-card__badge"
              style={{
                backgroundColor: typeStyle.badgeBg,
                color: typeStyle.badgeText,
              }}
            >
              <span style={{ fontSize: '0.9em' }}>•</span> {typeLabel}
            </span>
          )}

          {/* Wishlist */}
          <button
            className={`snt-card__wish ${wishlisted ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }}
            aria-label="Agregar a favoritos"
          >
            <Heart
              size={15}
              strokeWidth={2}
              fill={wishlisted ? '#C97D5C' : 'none'}
              color={wishlisted ? '#C97D5C' : '#888'}
            />
          </button>

          {/* Product image */}
          <Link to={`/productos/${product.slug}`} style={{ display: 'contents' }}>
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop'}
              alt={product.name}
              className="snt-card__img"
            />
            <div className="snt-card__hover-overlay">
              <span className="snt-btn snt-btn-primary rounded-full" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Ver detalle →</span>
            </div>
          </Link>
        </div>

        <div className="snt-card__divider" />

        {/* ── Body ── */}
        <div className="snt-card__body">
          {subLabel && <p className="snt-card__sublabel">{subLabel}</p>}

          <Link to={`/productos/${product.slug}`} className="snt-card__name">
            {product.name}
          </Link>
          
          {product.collectionName && (
            <div style={{ fontSize: '0.75rem', color: 'var(--green-brand)', marginBottom: '4px', fontWeight: '600' }}>
              {product.collectionName}
            </div>
          )}

          <p className="snt-card__desc">{product.description}</p>

          <div className="snt-card__footer">
            <div className="snt-card__prices">
              <div className="snt-card__price-chip">
                <span className="snt-card__price">{formatCurrency(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="snt-card__original" style={{ marginLeft: '6px' }}>
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <button className="snt-card__add-btn" onClick={handleAdd}>
              <ShoppingBag size={13} /> Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
