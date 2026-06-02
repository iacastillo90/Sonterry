import React from 'react';

const Input = ({ label, type = 'text', name, register, error, placeholder, className = '', ...props }) => {
  return (
    <div className={`snt-form-group ${className}`} style={{ marginBottom: '1.25rem' }}>
      {label && <label className="snt-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`snt-input ${error ? 'error' : ''}`}
        style={error ? { borderColor: 'var(--color-danger)' } : {}}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{error.message}</span>}
    </div>
  );
};

export default Input;
