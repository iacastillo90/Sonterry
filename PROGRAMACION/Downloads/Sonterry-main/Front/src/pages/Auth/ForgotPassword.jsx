import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-recovery-container">
        <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
        <h2 className="auth-recovery-title">Revisa tu correo</h2>
        <p className="auth-recovery-text">Si la cuenta existe, recibirás un enlace para restablecer tu contraseña.</p>
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
      <h2 className="auth-recovery-title">Recuperar contraseña</h2>
      <p className="auth-recovery-text">Te enviaremos un enlace para restablecerla.</p>
      {error && <p className="auth-error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </Button>
        </div>
      </form>
      <p className="auth-footer-text">
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
