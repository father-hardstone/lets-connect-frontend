import React from 'react';

interface TimeSlotTileProps {
  time: string;
  formattedTime: string;
  appointment?: {
    id: number;
    name: string;
    time: string;
    meetLink?: string;
    location?: string;
  };
  onClick: (time: string) => void;
}

const TimeSlotTile: React.FC<TimeSlotTileProps> = ({ time, formattedTime, appointment, onClick }) => {
  // Convert time to range format (e.g., "10:00 AM - 10:30 AM")
  const getTimeRange = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const displayHour = hours % 12 || 12;
    const nextMinutes = minutes === 30 ? '00' : '30';
    const nextHour = minutes === 30 ? (hours + 1) % 24 : hours;
    const nextDisplayHour = nextHour % 12 || 12;
    const nextIsPM = nextHour >= 12;

    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'} - ${nextDisplayHour}:${nextMinutes} ${nextIsPM ? 'PM' : 'AM'}`;
  };

  return (
    <div
      onClick={() => onClick(time)}
      style={{
        padding: '8px 12px',
        background: appointment ? '#1a237e' : '#f5f5f5',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: appointment ? 'white' : '#333',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 500,
        boxShadow: appointment ? '0 2px 8px rgba(26,35,126,0.2)' : 'none'
      }}
      className="time-slot"
    >
      {getTimeRange(time)}
      <style>
        {`
          .time-slot:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        `}
      </style>
    </div>
  );
};

export default TimeSlotTile; 