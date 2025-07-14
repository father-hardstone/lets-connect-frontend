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

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/create-new-password" element={<CreateNewPassword />} />
    {/* MainLayout for all app pages with sidebar */}
    <Route element={<DashboardShell />}>
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