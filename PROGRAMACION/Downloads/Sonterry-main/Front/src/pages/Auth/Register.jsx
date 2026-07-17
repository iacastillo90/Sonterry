import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/authSchema';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/img/logo.jpg';
import './Auth.css';

const Register = () => {
  const { register: signup, loading } = useAuthStore();
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      addToast('¡Registro completado!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="auth-header">
        <img src={logo} alt="SonTerry" className="auth-logo" />
        <h3 className="auth-title">Crear Cuenta</h3>
        <p className="auth-subtitle">Únete para mandar tus estampados</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nombre y Apellido" name="name" register={register} error={errors.name} />
        <Input label="Correo Electrónico" name="email" type="email" register={register} error={errors.email} />
        <Input label="Contraseña (Mín. 8 caracteres)" name="password" type="password" register={register} error={errors.password} />
        
        <Button type="submit" variant="accent" className="auth-submit-btn" disabled={loading} data-cy="submit-register">
          {loading ? 'Creando...' : 'Crear Cuenta'}
        </Button>
      </form>

      <p className="auth-footer-text">
        ¿Ya tienes cuenta? <Link to="/login" className="auth-footer-link">Inicia Sesión</Link>
      </p>
    </div>
  );
};

export default Register;
