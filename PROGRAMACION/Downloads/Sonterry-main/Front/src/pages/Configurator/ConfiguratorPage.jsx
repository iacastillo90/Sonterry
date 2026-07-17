import React from 'react';
import HeroConfigurator from './components/HeroConfigurator';
import './Configurator.css';

/**
 * Página dedicada al configurador 3D interactivo.
 * Se monta SIN Navbar ni Footer para dar pantalla completa al canvas.
 */
const ConfiguratorPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0a1a0e' }}>
      <HeroConfigurator />
    </div>
  );
};

export default ConfiguratorPage;
