import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Página no encontrada. Los gatos de SonTerry están buscando tu diseño...</p>
      <Link to="/"><Button variant="primary">Volver al Taller</Button></Link>
    </div>
  );
};

export default NotFound;
