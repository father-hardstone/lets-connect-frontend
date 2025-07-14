import React from 'react';
import { Typography } from 'antd';
import TimeSlotTile from './TimeSlotTile';

const { Title } = Typography;

interface TimeSlotsPanelProps {
  selectedDate: Date;
  appointments: Array<{
    id: number;
    name: string;
    time: string;
    meetLink?: string;
    location?: string;
  }>;
  onTimeSlotClick: (time: string) => void;
  onClose: () => void;
}

const TimeSlotsPanel: React.FC<TimeSlotsPanelProps> = ({ 
  selectedDate, 
  appointments, 
  onTimeSlotClick,
  onClose 
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Add two slots per hour (30-minute intervals)
      slots.push(
        {
          time: `${hour}:00`,
          formattedTime: `${hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
        },
        {
          time: `${hour}:30`,
          formattedTime: `${hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`
        }
      );
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getAppointmentForTimeSlot = (timeSlot: string) => {
    const [slotHours, slotMinutes] = timeSlot.split(':').map(Number);
    const slotTimeInMinutes = slotHours * 60 + slotMinutes;

    return appointments.find(appointment => {
      const appointmentTime = new Date(appointment.time);
      
      // Check if the appointment is on the selected date
      const isSameDate = 
        appointmentTime.getDate() === selectedDate.getDate() &&
        appointmentTime.getMonth() === selectedDate.getMonth() &&
        appointmentTime.getFullYear() === selectedDate.getFullYear();

      if (!isSameDate) return false;

      // Calculate appointment time in minutes
      const appointmentHours = appointmentTime.getHours();
      const appointmentMinutes = appointmentTime.getMinutes();
      const appointmentTimeInMinutes = appointmentHours * 60 + appointmentMinutes;

      // Check if the appointment time falls within this slot
      // For 00 slot, check if time is between 00-30
      // For 30 slot, check if time is between 30-60
      const isExactMatch = slotMinutes === 0 
        ? appointmentMinutes < 30
        : appointmentMinutes >= 30;

      // If it's not an exact match, find the closest slot
      if (!isExactMatch) {
        const timeDiff = Math.abs(appointmentTimeInMinutes - slotTimeInMinutes);
        return timeDiff <= 15; // Consider it a match if within 15 minutes
      }

      return true;
    });
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        background: 'white',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
        zIndex: 1001,
        animation: 'slideIn 0.3s ease-out',
        overflowY: 'auto'
      }}>
        <div style={{ 
          padding: '24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Title level={4} style={{ margin: 0, color: '#1a237e' }}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Title>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#666',
              padding: '4px 8px'
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {timeSlots.map((slot) => (
            <TimeSlotTile
              key={slot.time}
              time={slot.time}
              formattedTime={slot.formattedTime}
              appointment={getAppointmentForTimeSlot(slot.time)}
              onClick={onTimeSlotClick}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default TimeSlotsPanel; 