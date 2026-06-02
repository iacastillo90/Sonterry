import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../queries/useProducts';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import ProductGallery from './components/ProductGallery';
import RelatedProducts from './components/RelatedProducts';
import ProductReviews from './components/ProductReviews';
import './Products.css';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Star, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading: isProductLoading } = useProductDetail(slug);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useUiStore((state) => state.addToast);
  const user = useAuthStore((state) => state.user);

  // States
  const [quantity, setQuantity] = useState(1);
  const [customizationType, setCustomizationType] = useState('none');
  const [customizationDetails, setCustomizationDetails] = useState('');

  useEffect(() => {
    if (product) {
      // Reset quantity
      setQuantity(1);
      setCustomizationType('none');
      setCustomizationDetails('');
    }
  }, [product]);

  if (isProductLoading) return <LoadingSpinner />;
  if (!product) return <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>Producto no encontrado.</div>;

  const handleAddToCart = () => {
    const cust = customizationType !== 'none' ? {
      type: customizationType,
      details: customizationDetails || 'Sin detalles extra'
    } : null;

    addToCart(product, quantity, cust);
    addToast(`¡${product.name} añadido al carrito!`, 'success');
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Top Main Section: Gallery + Purchase info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3.5rem',
        marginBottom: '4rem'
      }}>
        {/* Left Column: MercadoLibre Style Gallery */}
        <ProductGallery images={product.images} />

        {/* Right Column: Title, Price, Customization, Add to Bolsa */}
        <div>
          <span style={{
            color: 'var(--color-accent)',
            fontWeight: '600',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.5rem'
          }}>{product.category?.name || 'Artesanía'}</span>
          
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>{product.name}</h1>
          
          {/* Average Rating Stars display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', color: '#F5C60D' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  fill={s <= Math.round(product.ratings || 0) ? '#F5C60D' : 'none'}
                  stroke={s <= Math.round(product.ratings || 0) ? '#F5C60D' : '#D0D0D0'}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '600' }}>
              {product.ratings > 0 ? `${product.ratings.toFixed(1)} / 5` : 'Sin calificaciones'}
            </span>
          </div>

          <div style={{ fontSize: '1.85rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            {formatCurrency(product.price)}
          </div>
          
          {/* Stock state info */}
          <div style={{ marginBottom: '2rem' }}>
            {product.stock > 0 ? (
              <span style={{
                fontSize: '0.85rem',
                backgroundColor: '#E8F5E9',
                color: 'var(--color-success)',
                padding: '0.3rem 0.75rem',
                borderRadius: '50px',
                fontWeight: '600'
              }}>
                En Stock ({product.stock} disponibles)
              </span>
            ) : (
              <span style={{
                fontSize: '0.85rem',
                backgroundColor: '#FFEBEE',
                color: 'var(--color-danger)',
                padding: '0.3rem 0.75rem',
                borderRadius: '50px',
                fontWeight: '600'
              }}>
                Agotado Temporalmente
              </span>
            )}
          </div>

          {/* Customization Options Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Personaliza tu Prenda</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
              Elige una técnica textil artesanal si deseas estampar tu logo o diseño.
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>Selecciona Técnica:</label>
              <select
                value={customizationType}
                onChange={(e) => setCustomizationType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="none">Sin Estampado (Prenda lisa)</option>
                <option value="serigrafia">Serigrafía Artesanal (Larga duración)</option>
                <option value="dtf">Digital DTF Transfer (Full color)</option>
              </select>
            </div>

            {customizationType !== 'none' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.35rem' }}>
                  Detalles del diseño (Ej: Ubicación, colores):
                </label>
                <textarea
                  value={customizationDetails}
                  onChange={(e) => setCustomizationDetails(e.target.value)}
                  placeholder="Detalla tu estampado o mensaje aquí..."
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '0.65rem',
                    borderRadius: '4px',
                    border: '1px solid var(--color-border)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                disabled={product.stock === 0}
              >-</button>
              <span style={{ padding: '0.5rem 1rem', fontWeight: '600', display: 'inline-block', width: '40px', textAlign: 'center' }}>
                {product.stock === 0 ? 0 : quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                disabled={product.stock === 0}
              >+</button>
            </div>

            <Button
              variant="accent"
              onClick={handleAddToCart}
              style={{ flexGrow: 1 }}
              disabled={product.stock === 0}
            >
              <ShoppingBag size={18} /> Añadir a mi Bolsa
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Part 1: Detailed Product Description */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: '3rem',
        marginBottom: '4rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontFamily: 'Playfair Display, serif' }}>
          Descripción Detallada
        </h3>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
          lineHeight: '1.8',
          color: 'var(--color-text)'
        }}>
          {product.description.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Bottom Part 2: Beautiful Promotional Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-primary) 100%)',
        padding: '3rem 2rem',
        borderRadius: 'var(--border-radius-md)',
        color: '#FFFFFF',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '4rem'
      }}>
        <h3 style={{ fontSize: '1.85rem', marginBottom: '0.75rem', fontFamily: 'Playfair Display, serif', color: '#FFFFFF' }}>
          Confección & Alma Local
        </h3>
        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.6' }}>
          Cada pieza en SonTerry es cuidadosamente elaborada a mano por tejedores y artesanos locales.
          Promovemos prácticas de producción sostenible, materiales nobles y apoyo al comercio justo en nuestra comunidad.
        </p>
      </div>

      {/* Bottom Part 3: Related Products (Suggestions) */}
      <RelatedProducts categoryId={product.category?._id} currentProductId={product._id} />

      {/* Bottom Part 4: Experience / Review System */}
      <ProductReviews productId={product._id} />
    </div>
  );
};

export default ProductDetail;
