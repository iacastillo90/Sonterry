import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layout wrappers
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Routes guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Lazy loading pages
const Home = lazy(() => import('../pages/Home/Home'));
const ProductList = lazy(() => import('../pages/Products/ProductList'));
const ProductDetail = lazy(() => import('../pages/Products/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/Auth/ResetPassword'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const ConfiguratorPage = lazy(() => import('../pages/Configurator/ConfiguratorPage'));
const ContactPage      = lazy(() => import('../pages/Contact/ContactPage'));
const AboutPage        = lazy(() => import('../pages/About/AboutPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>
  },
  {
    path: '/configurador',
    element: <ConfiguratorPage />
  },
  {
    path: '/contacto',
    element: <MainLayout><ContactPage /></MainLayout>
  },
  {
    path: '/nosotros',
    element: <MainLayout><AboutPage /></MainLayout>
  },
  {
    path: '/productos',
    element: <MainLayout><ProductList /></MainLayout>
  },
  {
    path: '/productos/:slug',
    element: <MainLayout><ProductDetail /></MainLayout>
  },
  {
    path: '/cart',
    element: <MainLayout><Cart /></MainLayout>
  },
  {
    path: '/checkout',
    element: <ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>
  },
  {
    path: '/login',
    element: <AuthLayout><Login /></AuthLayout>
  },
  {
    path: '/register',
    element: <AuthLayout><Register /></AuthLayout>
  },
  {
    path: '/forgot-password',
    element: <AuthLayout><ForgotPassword /></AuthLayout>
  },
  {
    path: '/reset-password/:token',
    element: <AuthLayout><ResetPassword /></AuthLayout>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>
  },
  {
    path: '/admin',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '/admin/despacho',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '/admin/productos',
    element: <AdminRoute><MainLayout><AdminDashboard /></MainLayout></AdminRoute>
  },
  {
    path: '*',
    element: <MainLayout><NotFound /></MainLayout>
  }
]);
