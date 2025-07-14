import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateAppointmentModal from '../components/CreateAppointmentModal';

const THEME_BLUE = '#1a237e';

const Dashboard: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [userName, setUserName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const displayName = userName || 'Ahmed Ibrahim';

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      fontSize: '2rem',
      color: THEME_BLUE,
      fontWeight: 700,
      marginLeft: '4.5rem',
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
      {isCreateModalOpen && (
        <CreateAppointmentModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard; 