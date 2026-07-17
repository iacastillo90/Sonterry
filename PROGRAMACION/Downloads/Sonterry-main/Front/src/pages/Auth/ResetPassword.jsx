import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-recovery-container">
        <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
        <h2 className="auth-recovery-title">Contraseña actualizada</h2>
        <p className="auth-recovery-text">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <div>
      <img src={logo} alt="SonTerry" className="auth-recovery-logo" />
      <h2 className="auth-recovery-title">Nueva contraseña</h2>
      <p className="auth-recovery-text">Ingresa tu nueva contraseña.</p>
      {error && <p className="auth-error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="Nueva contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" required />
        <Input label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite la contraseña" required />
        <div style={{ marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Guardando...' : 'Restablecer contraseña'}
          </Button>
        </div>
      </form>
      <p className="auth-footer-text">
        <Link to="/login" className="auth-back-link">Volver a inicio de sesión</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
