import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import CreateNewPassword from './pages/CreateNewPassword';
import Dashboard from './pages/Dashboard';
import DashboardShell from './pages/DashboardShell';
import Appointments from './pages/Appointments';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import PublicLayout from './components/PublicLayout';
import Layout from './components/Layout';

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes - Redirect to dashboard if authenticated */}
    <Route path="/" element={
      <PublicRoute>
        <PublicLayout>
          <Landing />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/home" element={
      <PublicRoute>
        <PublicLayout>
          <Home />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/login" element={
      <PublicRoute>
        <PublicLayout>
          <Login />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/signup" element={
      <PublicRoute>
        <PublicLayout>
          <Signup />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/forgot-password" element={
      <PublicRoute>
        <PublicLayout>
          <ForgotPassword />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/verify-otp" element={
      <PublicRoute>
        <PublicLayout>
          <VerifyOtp />
        </PublicLayout>
      </PublicRoute>
    } />
    <Route path="/create-new-password" element={
      <PublicRoute>
        <PublicLayout>
          <CreateNewPassword />
        </PublicLayout>
      </PublicRoute>
    } />
    
    {/* Protected Routes - Redirect to landing if not authenticated */}
    <Route element={
      <ProtectedRoute>
        <Layout>
          <DashboardShell />
        </Layout>
      </ProtectedRoute>
    }>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/appointments/:appointmentId" element={<Appointments />} />
      <Route path="/team" element={<Team />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      {/* Add more app pages here */}
    </Route>
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes; 