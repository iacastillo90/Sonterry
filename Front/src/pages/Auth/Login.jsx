import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchema';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const Login = () => {
  const { login, loading } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      addToast('¡Bienvenido de vuelta!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="auth-header">
        <img src={logo} alt="SonTerry" className="auth-logo" />
        <h3 className="auth-title">Iniciar Sesión</h3>
        <p className="auth-subtitle">Accede a tu cuenta y sigue tus pedidos</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Correo Electrónico" name="email" type="email" register={register} error={errors.email} />
        <Input label="Contraseña" name="password" type="password" register={register} error={errors.password} />

        <div className="auth-forgot-password-container">
          <Link to="/forgot-password" className="auth-forgot-password-link">¿Olvidaste tu contraseña?</Link>
        </div>
        
        <Button type="submit" variant="primary" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <p className="auth-footer-text">
        ¿No tienes cuenta? <Link to="/register" className="auth-footer-link">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
