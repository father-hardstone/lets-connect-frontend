import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Text } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Hide navbar on all protected routes (dashboard, appointments, team, profile, settings)
  const protectedRoutes = ['/dashboard', '/appointments', '/team', '/profile', '/settings'];
  const hideNavbar = protectedRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="layout">
      {!hideNavbar && (
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">Let's Connect</Link>
          </div>
          <div className="nav-auth">
            {isLoggedIn ? (
              <Dropdown overlay={profileMenu} trigger={['click']} placement="bottomRight">
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ cursor: 'pointer', backgroundColor: '#1a237e' }}
                />
              </Dropdown>
            ) : (
              <Link to="/login" className="login-button">Login</Link>
            )}
          </div>
        </nav>
      )}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout; 