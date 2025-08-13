import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateAppointmentModal from '../components/CreateAppointmentModal';
import NotificationsList from '../components/NotificationsList';
import { useSidebar } from '../context/SidebarContext';

const THEME_BLUE = '#1a237e';

const Dashboard: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [userName, setUserName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isClosingNotifications, setIsClosingNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getContentPadding } = useSidebar();

  useEffect(() => {
    // Get user name from localStorage
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      try {
        const parsed = JSON.parse(authUser);
        setUserName(parsed.name || '');
      } catch {}
    }
    // Fade in animations
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 200);
    const nameTimer = setTimeout(() => setShowName(true), 500);
    const connectTimer = setTimeout(() => setShowConnect(true), 1500);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 2000);
    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(nameTimer);
      clearTimeout(connectTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  // Handle click outside notifications panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const notificationsPanel = document.querySelector('.notifications-panel');
      const notificationButton = document.querySelector('.notification-button');
      
      if (showNotifications && 
          notificationsPanel && 
          !notificationsPanel.contains(target) && 
          notificationButton && 
          !notificationButton.contains(target)) {
        handleCloseNotifications();
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleCloseNotifications = () => {
    setIsClosingNotifications(true);
    setTimeout(() => {
      setShowNotifications(false);
      setIsClosingNotifications(false);
    }, 300);
  };

  const displayName = userName || 'Ahmed Ibrahim';

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${getContentPadding()} 0 ${getContentPadding()}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blue gradient background with diagonal skew */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(to bottom, #1a237e, #0d47a1)',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
          zIndex: -1,
        }}
      />
      
      {/* Main Content - Left Side */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: '2rem',
        color: THEME_BLUE,
        fontWeight: 700,
        maxWidth: '60%',
        zIndex: 1,
      }}>
        <div
          style={{
            marginBottom: '1.2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: '2.5rem',
            fontWeight: 700,
          }}
        >
          <span style={{ color: '#222', marginRight: '0.7rem', opacity: showWelcome ? 1 : 0, transition: 'opacity 1s' }}>
            Welcome back,
          </span>
          <span style={{ color: THEME_BLUE, opacity: showName ? 1 : 0, transition: 'opacity 1s' }}>
            {displayName}
          </span>
        </div>
        <div
          style={{
            opacity: showConnect ? 1 : 0,
            transition: 'opacity 1s',
            fontWeight: 900,
            fontSize: '3rem',
            color: THEME_BLUE,
            letterSpacing: 1,
            marginBottom: '2.5rem',
          }}
        >
          Let's connect!
        </div>
        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          marginTop: '0.5rem',
          opacity: showButtons ? 1 : 0,
          transition: 'opacity 1s',
        }}>
          <button
            style={{
              background: THEME_BLUE,
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.9rem 2.2rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 2px 8px rgba(26,35,126,0.10)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,35,126,0.18)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,35,126,0.10)';
            }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create a new appointment
          </button>
          <button
            style={{
              background: '#fff',
              color: THEME_BLUE,
              border: `2px solid ${THEME_BLUE}`,
              borderRadius: '10px',
              padding: '0.9rem 2.2rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 2px 8px rgba(26,35,126,0.10)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,35,126,0.18)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(26,35,126,0.10)';
            }}
            onClick={() => navigate('/appointments')}
          >
            Review appointments
          </button>
        </div>
      </div>

      {/* Floating Notification Button */}
      <button
        className="notification-button"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: THEME_BLUE,
          color: '#fff',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(26,35,126,0.3)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          display: showNotifications ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showNotifications ? 0 : 1,
          transform: showNotifications ? 'scale(0.8)' : 'scale(1)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(26,35,126,0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,35,126,0.3)';
        }}
        onClick={() => setShowNotifications(true)}
      >
        🔔
      </button>

                           {/* Notifications Panel - Overlay */}
        {showNotifications && (
          <div
            className="notifications-panel"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              zIndex: 999,
              animation: isClosingNotifications ? 'fadeOut 0.3s ease' : 'fadeIn 0.3s ease',
            }}
            onClick={(e) => {
              // Close panel when clicking on the overlay background
              if (e.target === e.currentTarget) {
                handleCloseNotifications();
              }
            }}
          >
            <div style={{
              width: '400px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              animation: isClosingNotifications ? 'slideOutToBottom 0.3s ease' : 'slideIn 0.3s ease',
            }}>
              <NotificationsList />
            </div>
          </div>
        )}

      {isCreateModalOpen && (
        <CreateAppointmentModal onClose={() => setIsCreateModalOpen(false)} />
      )}

             {/* Add CSS animations */}
       <style>{`
         @keyframes fadeIn {
           from { opacity: 0; }
           to { opacity: 1; }
         }
         
         @keyframes fadeOut {
           from { opacity: 1; }
           to { opacity: 0; }
         }
         
         @keyframes slideIn {
           from { transform: translateX(100%); }
           to { transform: translateX(0); }
         }
         
         @keyframes slideOutToBottom {
           from { 
             transform: translateX(0) translateY(0);
             opacity: 1;
           }
           to { 
             transform: translateX(0) translateY(100%);
             opacity: 0;
           }
         }
       `}</style>
    </div>
  );
};

export default Dashboard; 