import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { SlidersHorizontal, DollarSign, X } from 'lucide-react';
import Button from '../../../components/common/Button';

const ProductFilters = ({ activeFilter, setActiveFilter, activeCollection, setActiveCollection, minPrice, maxPrice, onApplyPrice }) => {
  const [tempMin, setTempMin] = useState(minPrice || '');
  const [tempMax, setTempMax] = useState(maxPrice || '');
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, colRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products/collections')
        ]);
        setCategories(catRes.data.data || []);
        setCollections(colRes.data.data || []);
      } catch (err) {
        console.error('Error fetching filters:', err);
      }
    };
    fetchFilters();
  }, []);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onApplyPrice(tempMin, tempMax);
  };

  const handleClearPrice = () => {
    setTempMin('');
    setTempMax('');
    onApplyPrice('', '');
  };

  const hasPriceFilter = tempMin || tempMax || minPrice || maxPrice;

  return (
    <>
      

      <div className="pf-wrap">
        {/* ── Category chips ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="pf-label">
            <SlidersHorizontal size={13} /> Categoría
          </span>
          <button
            className={`pf-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todo el catálogo
          </button>
          {categories.map((opt) => (
            <button
              key={opt._id}
              className={`pf-chip ${activeFilter === opt._id ? 'active' : ''}`}
              onClick={() => setActiveFilter(opt._id)}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* ── Collection chips ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <span className="pf-label">
            <SlidersHorizontal size={13} /> Colección
          </span>
          <select
            className="snt-input"
            style={{ padding: '6px 12px', fontSize: '0.88rem', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #e2e8f0', minWidth: '150px' }}
            value={activeCollection || ''}
            onChange={(e) => setActiveCollection(e.target.value)}
          >
            <option value="">Todas</option>
            {collections.map((colName) => (
              <option key={colName} value={colName}>
                {colName}
              </option>
            ))}
          </select>
        </div>

        {/* ── Price filter ── */}
        <form onSubmit={handlePriceSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="pf-label">
            <DollarSign size={13} /> Precio
          </span>
          <input
            type="number"
            placeholder="Mín"
            value={tempMin}
            onChange={(e) => setTempMin(e.target.value)}
            className="snt-input"
            style={{ width: '90px', padding: '6px 10px', fontSize: '0.88rem' }}
          />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>—</span>
          <input
            type="number"
            placeholder="Máx"
            value={tempMax}
            onChange={(e) => setTempMax(e.target.value)}
            className="snt-input"
            style={{ width: '90px', padding: '6px 10px', fontSize: '0.88rem' }}
          />
          <Button type="submit" variant="primary" style={{ padding: '7px 18px', fontSize: '0.8rem' }}>Filtrar</Button>
          {hasPriceFilter && (
            <Button type="button" variant="outline" onClick={handleClearPrice} style={{ padding: '5px 12px', fontSize: '0.78rem' }}>
              <X size={12} /> Limpiar
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default ProductFilters;
