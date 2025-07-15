import React, { useEffect, useState, useMemo } from 'react';
import { Radio, Input, Space } from 'antd';
import { useParams } from 'react-router-dom';
import ListAppointments from '../components/ListAppointments';
import CalendarAppointments from '../components/CalendarAppointments';
import { Appointment } from '../types/appointment';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const ConfirmedAppointments: React.FC = React.memo(() => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const { appointmentId } = useParams();

  useEffect(() => {
    import('../data/appointments.json').then((data) => {
      setAppointments((data.default || data) as Appointment[]);
    });
  }, []);

  const filteredAppointments = useMemo(() => 
    appointments.filter(appointment => 
      appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (appointment.location?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (appointment.meetLink?.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [appointments, searchQuery]);

  return (
    <div style={{ 
      width: 'calc(100% - 48px)', 
      height: 'calc(100vh - 200px)',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      background: '#fafafa',
      padding: '24px 24px 32px 24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Space size={24}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Radio.Button value="list" style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
              List View
            </Radio.Button>
            <Radio.Button value="calendar" style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
              Calendar View
            </Radio.Button>
          </Radio.Group>

          <Input
            placeholder="Search appointments..."
            prefix={<SearchOutlined style={{ color: '#1a237e' }} />}
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: 300,
              height: '36px',
              borderRadius: '6px'
            }}
          />
        </Space>
      </div>

      {viewMode === 'list' ? (
        <ListAppointments
          appointments={appointments}
          filteredAppointments={filteredAppointments}
        />
      ) : (
        <CalendarAppointments
          appointments={appointments}
          filteredAppointments={filteredAppointments}
        />
      )}
    </div>
  );
});

ConfirmedAppointments.displayName = 'ConfirmedAppointments';

export default ConfirmedAppointments; 