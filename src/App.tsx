import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
