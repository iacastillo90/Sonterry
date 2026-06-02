import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useProducts } from '../../queries/useProducts';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import './Products.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Sparkles, PackageSearch } from 'lucide-react';

const ProductList = () => {
  const heroRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter   = searchParams.get('category') || 'all';
  const searchVal = searchParams.get('search')  || '';
  const minPrice  = searchParams.get('minPrice') || '';
  const maxPrice  = searchParams.get('maxPrice') || '';

  const params = {};
  if (filter !== 'all')  params.category  = filter;
  if (searchVal)         params.search    = searchVal;
  if (minPrice)          params.minPrice  = minPrice;
  if (maxPrice)          params.maxPrice  = maxPrice;

  const { data: products, isLoading } = useProducts(params);

  const setFilter = (val) => {
    const p = new URLSearchParams(searchParams);
    val === 'all' ? p.delete('category') : p.set('category', val);
    setSearchParams(p);
  };

  const handleApplyPrice = (min, max) => {
    const p = new URLSearchParams(searchParams);
    min ? p.set('minPrice', min) : p.delete('minPrice');
    max ? p.set('maxPrice', max) : p.delete('maxPrice');
    setSearchParams(p);
  };

  const handleClearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('search');
    setSearchParams(p);
  };

  /* GSAP hero entrance */
  useGSAP(() => {
    gsap.fromTo(
      heroRef.current?.querySelectorAll('.pl-hero-anim'),
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
    );
    gsap.from(heroRef.current?.querySelectorAll('.counter-val'), {
      textContent: 0,
      duration: 1.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 0.1,
    });
  }, { scope: heroRef });

  return (
    <>
      

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="pl-hero">
        <div className="pl-hero-inner">
          <div>
            <div className="pl-hero-eyebrow pl-hero-anim">
              <Sparkles size={11} /> Colección SonTerry
            </div>
            <h1 className="pl-hero-title pl-hero-anim">
              Cada pieza, <span>única</span><br />como tu marca
            </h1>
            <p className="pl-hero-sub pl-hero-anim">
              Gorras, mugs y prendas personalizadas con serigrafía artesanal y DTF premium. Desde 1 unidad hasta producción mayorista.
            </p>
          </div>

          <div className="pl-hero-stat pl-hero-anim">
            {[
              { num: '50+', label: 'Productos' },
              { num: '1+',  label: 'Unidad mínima' },
            ].map(({ num, label }) => {
              const val = num.replace(/\D/g, '');
              const prefix = num.startsWith('+') ? '+' : '';
              const suffix = num.endsWith('+') ? '+' : '';
              return (
                <div key={label} className="pl-hero-stat-box">
                  <div className="pl-hero-stat-num">
                    {prefix}<span className="counter-val">{val}</span>{suffix}
                  </div>
                  <div className="pl-hero-stat-label">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BODY ════════════════════════════════════════════════════ */}
      <div className="pl-body">

        {/* Search result pill */}
        {searchVal && (
          <div className="pl-search-pill">
            <span style={{ fontSize: '0.9rem', color: 'var(--green-deep)', fontFamily: 'var(--font-body)' }}>
              Resultados para: <strong>"{searchVal}"</strong>
            </span>
            <button
              onClick={handleClearSearch}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: '0.82rem',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Limpiar
            </button>
          </div>
        )}

        {/* Filters */}
        <ProductFilters
          activeFilter={filter}
          setActiveFilter={setFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApplyPrice={handleApplyPrice}
        />

        {/* Grid / states */}
        {isLoading ? (
          <LoadingSpinner />
        ) : products?.length === 0 ? (
          <div className="pl-empty">
            <div className="pl-empty-icon">
              <PackageSearch size={32} strokeWidth={1.5} />
            </div>
            <h3>Sin resultados</h3>
            <p style={{ fontSize: '0.9rem', maxWidth: 360 }}>
              No encontramos productos con esos filtros. Prueba con otra categoría o rango de precio.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="pl-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: 0 }}>
                {products?.length} producto{products?.length !== 1 ? 's' : ''} encontrado{products?.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="pl-grid">
              {products?.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
