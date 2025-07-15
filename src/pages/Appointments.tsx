import React, { useEffect, useState, useMemo } from 'react';
import { Tabs } from 'antd';
import ConfirmedAppointments from './ConfirmedAppointments';
import PendingAppointments from './PendingAppointments';
import { useSidebar } from '../context/SidebarContext';

const THEME_BLUE = '#1a237e';

const Appointments: React.FC = React.memo(() => {
  const [showTabs, setShowTabs] = useState(false);
  const { getContentPadding } = useSidebar();

  const contentPadding = useMemo(() => getContentPadding(), [getContentPadding]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTabs(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      fontWeight: 700,
      color: THEME_BLUE,
      paddingLeft: contentPadding,
      paddingTop: '3.5rem',
      boxSizing: 'border-box',
    }}>
      <div
        style={{
          opacity: showTabs ? 1 : 0,
          transition: 'opacity 1s',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{
            fontWeight: 700,
            fontSize: '1.3rem',
            color: THEME_BLUE,
            marginLeft: 0,
            marginTop: 0,
            paddingBottom: '1.5rem',
          }}
          items={[
            {
              key: '1',
              label: <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>Confirmed Appointments</span>,
              children: <ConfirmedAppointments />,
            },
            {
              key: '2',
              label: <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>Pending Appointments</span>,
              children: <PendingAppointments />,
            },
          ]}
        />
      </div>
    </div>
  );
});

Appointments.displayName = 'Appointments';

export default Appointments; 