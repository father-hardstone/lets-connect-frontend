import React, { useState } from 'react';
import { Calendar, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import { Appointment } from '../types/appointment';
import AppointmentDetails from './AppointmentDetails';
import TimeSlotsPanel from './TimeSlotsPanel';

interface CalendarAppointmentsProps {
  appointments: Appointment[];
  filteredAppointments: Appointment[];
}

const CalendarAppointments: React.FC<CalendarAppointmentsProps> = ({ filteredAppointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const hasAppointmentsOnDate = (date: Dayjs) => {
    return filteredAppointments.some(appointment => {
      const appointmentDate = new Date(appointment.time);
      return (
        appointmentDate.getDate() === date.date() &&
        appointmentDate.getMonth() === date.month() &&
        appointmentDate.getFullYear() === date.year()
      );
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const dateAppointments = filteredAppointments.filter(appointment => {
      const appointmentDate = new Date(appointment.time);
      return (
        appointmentDate.getDate() === value.date() &&
        appointmentDate.getMonth() === value.month() &&
        appointmentDate.getFullYear() === value.year()
      );
    });

    return (
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '4px',
        padding: '2px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '24px',
        position: 'relative'
      }}>
        {dateAppointments.length > 0 && (
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#1a237e',
              position: 'absolute',
              bottom: '2px'
            }}
          />
        )}
      </div>
    );
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
    window.history.pushState({}, '', '/appointments');
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date.toDate());
  };

  const handleTimeSlotClick = (time: string) => {
    // Here you can handle the time slot click
    // For example, open a modal to create a new appointment
    console.log('Time slot clicked:', time);
  };

  const handleCloseTimeSlots = () => {
    setSelectedDate(null);
  };

  return (
    <div style={{ 
      padding: '20px 20px 20px 0',
      height: 'calc(100vh - 15rem)',
      overflow: 'auto'
    }}>
      <div style={{ 
        maxWidth: '800px',
        width: '100%',
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Calendar
          cellRender={(current, info) => {
            if (info.type === 'date') return dateCellRender(current);
            return info.originNode;
          }}
          onSelect={handleDateSelect}
          style={{
            fontSize: '14px'
          }}
        />
      </div>

      {selectedDate && (
        <TimeSlotsPanel
          selectedDate={selectedDate}
          appointments={filteredAppointments}
          onTimeSlotClick={handleTimeSlotClick}
          onClose={handleCloseTimeSlots}
        />
      )}

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={handleCloseDetails}
          isOpen={!!selectedAppointment}
        />
      )}

      <style>
        {`
          .appointment-dot:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
};

export default CalendarAppointments; 