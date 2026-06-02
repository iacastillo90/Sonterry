import React, { useState, useEffect } from 'react';

const ProductGallery = ({ images = [] }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500';
  const [activeImage, setActiveImage] = useState(images[0] || defaultImage);

  // Sync state if images array changes (e.g. after async fetch completes)
  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  const galleryImages = images && images.length > 0 ? images : [defaultImage];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '1.25rem',
      width: '100%'
    }} className="product-gallery-container">
      {/* MercadoLibre thumbnails column (hidden or horizontal on small mobile) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minWidth: '70px',
        maxHeight: '450px',
        overflowY: 'auto'
      }} className="hide-scrollbar">
        {galleryImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            onMouseEnter={() => setActiveImage(img)} // MercadoLibre style: changes image on hover/mouseEnter!
            onClick={() => setActiveImage(img)}
            style={{
              width: '65px',
              height: '65px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: activeImage === img ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          />
        ))}
      </div>

      {/* Main Active Image Display */}
      <div style={{
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '450px'
      }}>
        <img
          src={activeImage}
          alt="Product Display"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Contained styling for details
            backgroundColor: '#FFFFFF'
          }}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
