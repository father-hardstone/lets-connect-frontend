import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  // Props are now handled by context
}

const LARGE_SCREEN_WIDTH = 1200;
const THEME_BLUE = '#1a237e';

const Sidebar: React.FC<SidebarProps> = () => {
  const { collapsed, setCollapsed, setEffectiveCollapsed } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= LARGE_SCREEN_WIDTH : true
  );
  const navigate = useNavigate();
  const location = useLocation();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= LARGE_SCREEN_WIDTH;
      setIsLargeScreen(isLarge);
      if (!isLarge) {
        setIsHovered(false);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isLargeScreen) return;
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a timeout to actually trigger the hover after a short delay
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 150); // 150ms delay
  };

  const handleMouseLeave = () => {
    if (!isLargeScreen) return;
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Immediately set hover to false when leaving
    setIsHovered(false);
  };

  const effectiveCollapsed = isLargeScreen ? !isHovered : collapsed;

  // Update the context's effective collapsed state whenever it changes
  useEffect(() => {
    setEffectiveCollapsed(effectiveCollapsed);
  }, [effectiveCollapsed, setEffectiveCollapsed]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Map routes to menu keys
  const routeToKey: Record<string, string> = {
    '/dashboard': '1',
    '/appointments': '2',
    '/team': '3',
    '/profile': '4',
    '/settings': '5',
  };
  // Find the key for the current path
  const selectedKey = routeToKey[location.pathname] || '1';

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={effectiveCollapsed}
      width={280}
      collapsedWidth={100}
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, #1a237e, #0d47a1)',
        borderRight: '1px solid #0d47a1',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        paddingTop: 0,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{
        height: effectiveCollapsed ? 0 : 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
        padding: effectiveCollapsed ? 0 : '0 16px',
        borderBottom: 'none',
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        marginBottom: effectiveCollapsed ? 0 : '12px',
      }}>
        {!isLargeScreen && !effectiveCollapsed && (
          <span
            style={{
              fontSize: 20,
              cursor: 'pointer',
              marginRight: 16,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuFoldOutlined />
          </span>
        )}
        <span style={{
          display: effectiveCollapsed ? 'none' : 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          justifyContent: 'flex-start',
          position: 'relative',
        }}>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#fff',
              position: 'absolute',
              left: 48,
            }}
          >
            Let's Connect
          </span>
        </span>
      </div>
      <div style={{
        width: '90%',
        height: 1,
        background: 'rgba(255,255,255,0.18)',
        margin: effectiveCollapsed ? '0 auto' : '0 auto 8px auto',
        borderRadius: 2,
        display: effectiveCollapsed ? 'none' : 'block',
      }} />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ 
          borderRight: 0, 
          background: 'transparent', 
          color: '#fff', 
          flex: 1, 
          marginTop: 0,
          padding: effectiveCollapsed ? '0.5rem 0.4rem' : '0.5rem 0.8rem',
        }}
        theme="dark"
        items={[
          {
            key: '1',
            icon: <DashboardOutlined style={{ 
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }} />,
            label: <span className="sidebar-label" style={{ 
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>Dashboard</span>,
            onClick: () => navigate('/dashboard'),
          },
          {
            key: '2',
            icon: <CalendarOutlined style={{ 
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }} />,
            label: <span className="sidebar-label" style={{ 
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>Appointments</span>,
            onClick: () => navigate('/appointments'),
          },
          {
            key: '3',
            icon: <TeamOutlined style={{ 
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }} />,
            label: <span className="sidebar-label" style={{ 
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>Team</span>,
            onClick: () => navigate('/team'),
          },
          {
            key: '4',
            icon: <UserOutlined style={{ 
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }} />,
            label: <span className="sidebar-label" style={{ 
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>Profile</span>,
            onClick: () => navigate('/profile'),
          },
          {
            key: '5',
            icon: <SettingOutlined style={{ 
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }} />,
            label: <span className="sidebar-label" style={{ 
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>Settings</span>,
            onClick: () => navigate('/settings'),
          },
        ]}
      />
      <div style={{
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
      }}>
        <div style={{
          width: '90%',
          height: 1,
          background: 'rgba(255,255,255,0.18)',
          margin: '8px auto',
          borderRadius: 2,
        }} />
        <div
          className="sidebar-logout"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
            padding: effectiveCollapsed ? 0 : '0 18px',
            minHeight: 48,
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            marginBottom: 16,
            transition: 'background 0.2s',
          }}
          onClick={() => {/* TODO: Hook up logout logic */}}
        >
          <LogoutOutlined style={{ fontSize: 20, marginRight: effectiveCollapsed ? 0 : 16 }} />
          <span
            className="sidebar-label"
            style={{
              display: effectiveCollapsed ? 'none' : 'block',
              transition: 'opacity 0.2s',
            }}
          >Logout</span>
        </div>
      </div>
      <style>
        {`
          .ant-menu-dark .ant-menu-item {
            margin: 4px 0 !important;
            padding: 0 14px !important;
            border-radius: 8px !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            width: 100% !important;
            box-sizing: border-box !important;
            transition: all 0.2s;
            height: 42px !important;
          }
          .ant-menu-dark .ant-menu-item .anticon {
            display: flex;
            align-items: center;
            margin-right: 16px;
            font-size: 1.2rem;
            transition: all 0.2s;
          }
          .ant-menu-dark .ant-menu-item .sidebar-label {
            text-align: left;
            display: block;
            font-size: 1rem;
            font-weight: bold;
            transition: all 0.2s;
          }
          .ant-layout-sider-collapsed .ant-menu-dark .ant-menu-item {
            justify-content: center !important;
            padding: 0 !important;
            margin: 4px 0 !important;
          }
          .ant-layout-sider-collapsed .ant-menu-dark .ant-menu-item .anticon {
            margin-right: 0 !important;
            justify-content: center;
          }
          .ant-layout-sider-collapsed .ant-menu-dark .ant-menu-item .sidebar-label {
            display: none !important;
          }
          .sidebar-logout:hover {
            background: rgba(255,255,255,0.12);
            color: #fff;
          }
          .ant-menu-dark .ant-menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
          }
          .ant-menu-dark .ant-menu-item:hover .anticon,
          .ant-menu-dark .ant-menu-item:hover .sidebar-label {
            color: #fff !important;
          }
          .ant-menu-dark .ant-menu-item-selected {
            background-color: #fff !important;
          }
          .ant-menu-dark .ant-menu-item-selected .anticon,
          .ant-menu-dark .ant-menu-item-selected .sidebar-label {
            color: ${THEME_BLUE} !important;
          }
        `}
      </style>
    </Sider>
  );
};

export default Sidebar; 