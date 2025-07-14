import React from 'react';
import { CloseOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface AppointmentDetailsProps {
  appointment: {
    id: number;
    name: string;
    meetLink?: string;
    location?: string;
    time: string;
  };
  onClose: () => void;
  isOpen: boolean;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment, onClose, isOpen }) => {
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
          right: isOpen ? 0 : '-520px',
          width: '520px',
          height: '100vh',
          background: '#fff',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          padding: '2rem',
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
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '100%',
            maxWidth: '600px',
            marginBottom: '2rem' 
          }}>
            <h3 style={{ 
              fontSize: '2.2rem', 
              fontWeight: 700, 
              marginBottom: '1.5rem',
              color: '#1a237e',
              textAlign: 'center'
            }}>
              {appointment.name}
            </h3>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.2rem',
              color: '#666',
              justifyContent: 'center'
            }}>
              <ClockCircleOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span style={{ fontSize: '1.1rem' }}>{formattedTime}</span>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.2rem',
              color: '#666',
              justifyContent: 'center'
            }}>
              <CalendarOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span style={{ fontSize: '1.1rem' }}>{formattedDate}</span>
            </div>

            {appointment.meetLink ? (
              <div style={{ 
                marginBottom: '1.2rem',
                display: 'flex',
                justifyContent: 'center'
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
                justifyContent: 'center',
                fontSize: '1.1rem'
              }}>
                <EnvironmentOutlined style={{ marginRight: '0.8rem', fontSize: '1.2rem' }} />
                <span>{appointment.location}</span>
              </div>
            ) : null}
          </div>

          <div style={{ 
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            width: '100%',
            maxWidth: '600px'
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

          <div style={{ 
            display: 'flex',
            gap: '1.5rem',
            marginTop: '2rem',
            width: '100%',
            maxWidth: '600px'
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