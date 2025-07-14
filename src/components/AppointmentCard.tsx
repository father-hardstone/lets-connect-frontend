import React from 'react';
import { EllipsisOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const THEME_BLUE = '#1a237e';

interface AppointmentCardProps {
  name: string;
  meetLink?: string;
  location?: string;
  time: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ name, meetLink, location, time, onEdit, onDelete }) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={onEdit}>Edit</Menu.Item>
      <Menu.Item key="delete" onClick={onDelete}>Delete</Menu.Item>
    </Menu>
  );

  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div
      tabIndex={0}
      style={{
        background: '#fff',
        color: THEME_BLUE,
        border: `1px solid ${THEME_BLUE}`,
        borderRadius: '12px',
        minWidth: 680,
        maxWidth: 900,
        width: '100%',
        margin: '0.4rem 0',
        padding: '0.8rem 1.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 16px rgba(26,35,126,0.10)',
        cursor: 'pointer',
        transition: 'transform 0.18s, box-shadow 0.18s',
        outline: 'none',
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.02)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(26,35,126,0.18)';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(26,35,126,0.10)';
      }}
    >
      <div style={{ flex: 1, paddingRight: '1.5rem' }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 4, color: THEME_BLUE }}>{name}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {meetLink ? (
            <a href={meetLink} target="_blank" rel="noopener noreferrer" style={{ color: THEME_BLUE, textDecoration: 'underline', fontWeight: 500, fontSize: '0.9rem' }}>
              Google Meet Link
            </a>
          ) : location ? (
            <span style={{ display: 'flex', alignItems: 'center', color: THEME_BLUE, fontWeight: 500, fontSize: '0.9rem' }}>
              <EnvironmentOutlined style={{ marginRight: 6, fontSize: 14, color: THEME_BLUE }} />
              {location}
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ 
        width: '1px', 
        height: '40px', 
        background: THEME_BLUE + '22', // subtle blue divider
        margin: '0 1.5rem' 
      }} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        minWidth: '140px',
        color: THEME_BLUE
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'baseline',
          marginBottom: '2px'
        }}>
          <div style={{ 
            fontSize: '1.8rem', 
            fontWeight: 700, 
            lineHeight: 1,
            color: THEME_BLUE
          }}>
            {formattedHours}:{formattedMinutes}
          </div>
          <div style={{ 
            fontSize: '1rem', 
            fontWeight: 500,
            marginLeft: '4px',
            opacity: 0.9,
            color: THEME_BLUE
          }}>
            {ampm}
          </div>
        </div>
        <div style={{ 
          fontSize: '0.9rem', 
          fontWeight: 600,
          marginBottom: '1px',
          color: THEME_BLUE
        }}>
          {day}
        </div>
        <div style={{ 
          fontSize: '0.8rem', 
          fontWeight: 500,
          opacity: 0.9,
          color: THEME_BLUE
        }}>
          {formattedDate}
        </div>
      </div>

      <Dropdown 
        overlay={menu} 
        trigger={['click']} 
        placement="bottomRight" 
        overlayStyle={{ 
          zIndex: 9999,
          position: 'fixed'
        }}
        getPopupContainer={(trigger) => document.body}
      >
        <EllipsisOutlined style={{ 
          fontSize: 24, 
          color: THEME_BLUE, 
          cursor: 'pointer', 
          marginLeft: 16, 
          zIndex: 9999, 
          position: 'relative',
          transform: 'rotate(90deg)'
        }} onClick={e => e.stopPropagation()} />
      </Dropdown>
    </div>
  );
};

export default AppointmentCard; 