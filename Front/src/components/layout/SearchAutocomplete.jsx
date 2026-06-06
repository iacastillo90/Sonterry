import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader, X } from 'lucide-react';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import './SearchAutocomplete.css';

const SearchAutocomplete = ({ variant = 'desktop', onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const closeSuggestions = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  const fetchSuggestions = useCallback(async (term) => {
    if (term.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get('/search/suggest', { params: { q: term.trim() } });
      const data = res.data.data;
      const results = data?.suggestions || [];
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } catch {
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeSuggestions();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  const goToProduct = (slug) => {
    closeSuggestions();
    setQuery('');
    navigate(`/productos/${slug}`);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      closeSuggestions();
      navigate(`/productos?search=${encodeURIComponent(query.trim())}`);
      if (onSearchSubmit) onSearchSubmit();
    } else {
      navigate('/productos');
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') handleSubmit(e);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          goToProduct(suggestions[activeIndex].slug);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        closeSuggestions();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`search-autocomplete search-${variant}`} ref={containerRef}>
      <form onSubmit={handleSubmit} className="search-autocomplete-form" role="search">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
          className="search-autocomplete-input"
          autoComplete="off"
          aria-label="Buscar productos"
          aria-expanded={isOpen}
          aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
          role="combobox"
        />
        <div className="search-autocomplete-actions">
          {query && (
            <button type="button" className="search-clear-btn" onClick={handleClear} tabIndex={-1}>
              <X size={14} />
            </button>
          )}
          {loading && <Loader size={16} className="search-spinner" />}
          <button type="submit" className="search-submit-btn" aria-label="Buscar">
            <Search size={16} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="search-dropdown" role="listbox">
          {suggestions.map((product, index) => (
            <button
              key={product._id}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`search-suggestion ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToProduct(product.slug)}
              onMouseEnter={() => setActiveIndex(index)}
              type="button"
            >
              <div className="suggestion-img">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="suggestion-img-placeholder">
                    <Search size={16} />
                  </div>
                )}
              </div>
              <div className="suggestion-info">
                <span className="suggestion-name">{product.name}</span>
                <span className="suggestion-price">{formatCurrency(product.price)}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && !loading && suggestions.length === 0 && (
        <div className="search-dropdown search-dropdown-empty">
          <span>No encontramos productos para &quot;{query}&quot;</span>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
