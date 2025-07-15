import React from 'react';
import { CloseOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CustomTooltip from './CustomTooltip';

interface AppointmentDetailsProps {
  appointment: {
    id: number;
    name: string;
    meetLink?: string;
    location?: string;
    time: string;
    category?: string;
  };
  onClose: () => void;
  isOpen: boolean;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment, onClose, isOpen }) => {
  const [contentVisible, setContentVisible] = React.useState(false);
  
  React.useEffect(() => {
    if (isOpen) {
      // Delay content fade-in until panel is mostly open
      const timer = setTimeout(() => setContentVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isOpen]);

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'medical':
        return '#ff6b6b';
      case 'work':
        return '#4ecdc4';
      case 'personal':
        return '#45b7d1';
      case 'meeting':
        return '#96ceb4';
      case 'consultation':
        return '#feca57';
      default:
        return '#95a5a6';
    }
  };

  const getCategoryName = (category?: string) => {
    return category || 'General';
  };

  const date = new Date(appointment.time);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '520px',
          height: '100vh',
          background: '#fff',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>Appointment Details</h2>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={onClose}
            style={{ fontSize: '1.4rem' }}
          />
        </div>

        <div style={{ 
          padding: '2rem', 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}>
          <div style={{ 
            width: '100%',
            marginBottom: '1rem' 
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '0.7rem 1.5rem',
              background: '#fafafa',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 700,
                color: '#1a237e',
                textAlign: 'left',
                margin: 0,
                flex: 1,
                paddingRight: '1rem'
              }}>
                {appointment.name}
              </h3>
              <CustomTooltip content={getCategoryName(appointment.category)}>
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '12px',
                    height: '100%',
                    background: getCategoryColor(appointment.category),
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = getCategoryColor(appointment.category) + 'dd'; // Add transparency for darker effect
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = getCategoryColor(appointment.category);
                  }}
                />
              </CustomTooltip>
            </div>
          </div>

          {/* Time, Date, and Location Section */}
          <div style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '1rem',
            width: '100%',
            background: '#fafafa'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.2rem',
              color: '#666',
              justifyContent: 'flex-start'
            }}>
              <ClockCircleOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span style={{ fontSize: '1.1rem' }}>GMT {formattedTime}</span>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.2rem',
              color: '#666',
              justifyContent: 'flex-start'
            }}>
              <CalendarOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span style={{ fontSize: '1.1rem' }}>{formattedDate}</span>
            </div>

            {appointment.meetLink ? (
              <div style={{ 
                marginBottom: '0',
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <a 
                  href={appointment.meetLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#1a237e',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.8rem 1.5rem',
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#eee'}
                  onMouseOut={e => e.currentTarget.style.background = '#f5f5f5'}
                >
                  Join Google Meet
                </a>
              </div>
            ) : appointment.location ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#666',
                justifyContent: 'flex-start',
                fontSize: '1.1rem',
                marginBottom: '0'
              }}>
                <EnvironmentOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appointment.location)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#1a237e',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.color = '#0d47a1'}
                  onMouseOut={e => e.currentTarget.style.color = '#1a237e'}
                >
                  {appointment.location}
                </a>
              </div>
            ) : null}
          </div>

          {/* Participants Section */}
          <div style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '1rem',
            width: '100%',
            background: '#fafafa'
          }}>
            <h4 style={{ 
              marginBottom: '1rem', 
              color: '#1a237e',
              fontSize: '1.2rem'
            }}>Participants</h4>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '0.8rem',
              color: '#666',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1a237e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginRight: '0.8rem'
              }}>
                AI
              </div>
              <span style={{ fontSize: '1.1rem' }}>Ahmed Ibrahim (You)</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '0',
              color: '#666',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#4caf50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginRight: '0.8rem'
              }}>
                JS
              </div>
              <span style={{ fontSize: '1.1rem' }}>John Smith</span>
            </div>
          </div>

          {/* Notes Section */}
          <div style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '1rem',
            width: '100%',
            background: '#fafafa'
          }}>
            <h4 style={{ 
              marginBottom: '0.8rem', 
              color: '#1a237e',
              fontSize: '1.2rem'
            }}>Notes</h4>
            <p style={{ 
              color: '#666', 
              margin: 0,
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>
              No additional notes for this appointment.
            </p>
          </div>

          {/* Action Buttons Section */}
          <div style={{ 
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1rem',
            width: '100%'
          }}>
            <Button 
              type="primary"
              style={{ 
                background: '#1a237e',
                flex: 1,
                height: '48px',
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            >
              Edit Appointment
            </Button>
            <Button 
              danger
              style={{ 
                flex: 1,
                height: '48px',
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails; 