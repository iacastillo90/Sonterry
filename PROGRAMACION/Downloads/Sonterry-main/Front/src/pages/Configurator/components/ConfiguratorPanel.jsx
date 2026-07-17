import { useRef } from 'react';
import { useConfiguratorStore } from '../../../store/useConfiguratorStore';

const ColorSwatch = ({ hex, name, active, onClick }) => (
  <button
    onClick={onClick}
    title={name}
    className={`config-swatch ${active ? 'active' : 'inactive'}`}
    style={{ backgroundColor: hex }}
  />
);

const PrintButton = ({ id, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`config-print-btn ${active ? 'active' : 'inactive'}`}
  >
    {label}
  </button>
);

const ConfiguratorPanel = () => {
  const fileInputRef = useRef(null);
  const {
    currentColor, colors, printArea, printAreas,
    setColor, setTexture, setPrintArea, resetConfig,
  } = useConfiguratorStore();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTexture(url);
  };

  return (
    <div className="config-panel-container">
      <div className="config-panel-card">
        <div className="config-panel-flex">
          {/* Colors Selection */}
          <div className="config-group">
            <span className="config-label">Color:</span>
            <div className="config-options">
              {colors.map((c) => (
                <ColorSwatch
                  key={c.hex}
                  hex={c.hex}
                  name={c.name}
                  active={currentColor === c.hex}
                  onClick={() => setColor(c.hex)}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="config-separator" />

          {/* Print Options */}
          <div className="config-group">
            <span className="config-label">Estampado:</span>
            <div className="config-options">
              {printAreas.map((p) => (
                <PrintButton
                  key={p.id}
                  id={p.id}
                  label={p.label}
                  active={printArea === p.id}
                  onClick={() => setPrintArea(p.id)}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="config-separator" />

          {/* Upload and Reset buttons */}
          <div className="config-group">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="config-upload-btn"
            >
              + Imagen
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <button
              onClick={resetConfig}
              className="config-reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorPanel;
