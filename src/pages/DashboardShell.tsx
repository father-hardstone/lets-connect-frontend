import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

const { Content } = Layout;

const DashboardShell: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: 1920,
        minHeight: 1080,
        maxWidth: 1920,
        maxHeight: 1080,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Layout style={{ width: 1920, height: 1080, background: 'none', overflow: 'hidden' }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{
          minHeight: 1080,
          height: 1080,
          padding: 0,
          background: 'none',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          marginLeft: collapsed ? 100 : 280,
          transition: 'margin-left 0.3s ease',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </div>
  );
};

export default DashboardShell; 