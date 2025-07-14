import React, { useEffect, useState, useRef } from 'react';
import AppointmentCard from './AppointmentCard';
import AppointmentDetails from './AppointmentDetails';
import { Appointment } from '../types/appointment';

interface ListAppointmentsProps {
  appointments: Appointment[];
  filteredAppointments: Appointment[];
}

const PITCH_ANGLE = 25; // degrees

const ListAppointments: React.FC<ListAppointmentsProps> = ({ appointments, filteredAppointments }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [pitching, setPitching] = useState(false);
  const [pitchDirection, setPitchDirection] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPitches, setCardPitches] = useState<number[]>([]);

  useEffect(() => {
    setVisibleCards([]); // Reset visible cards
    if (filteredAppointments.length > 0) {
      filteredAppointments.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, idx]);
        }, idx * 120);
      });
    }
  }, [filteredAppointments]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const st = containerRef.current.scrollTop;
      const direction = st > lastScrollTop.current ? -1 : 1;
      setPitchDirection(direction);
      setPitching(true);
      lastScrollTop.current = st;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setPitching(false), 350);
    };
    const ref = containerRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (pitching && pitchDirection !== 0) {
      setCardPitches(Array(appointments.length).fill(pitchDirection * PITCH_ANGLE));
      setTimeout(() => {
        setCardPitches(Array(appointments.length).fill(0));
      }, 300);
    }
  }, [pitching, pitchDirection, appointments.length]);

  const handleCardClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    window.history.pushState({}, '', `/appointments/${appointment.id}`);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
    window.history.pushState({}, '', '/appointments');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflowY: 'auto',
          height: 'calc(100vh - 12rem)', // Adjusted height since we removed pagination
          minHeight: 0,
          position: 'relative',
          scrollbarWidth: 'none',
        }}
        className="hide-scrollbar"
      >
        {filteredAppointments.map((appt, idx) => (
          <div
            key={appt.id}
            style={{
              width: '100%',
              margin: '0.2rem 0',
              perspective: '800px',
              transformStyle: 'preserve-3d',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                opacity: visibleCards.includes(idx) ? 1 : 0,
                transform: `${visibleCards.includes(idx) ? '' : 'translateY(-24px)'} rotateX(${cardPitches[idx] || 0}deg)`,
                transition: 'opacity 0.6s, transform 0.6s',
                width: '100%',
                willChange: 'transform',
              }}
              onClick={() => handleCardClick(appt)}
            >
              <AppointmentCard
                name={appt.name}
                meetLink={appt.meetLink}
                location={appt.location}
                time={appt.time}
              />
            </div>
          </div>
        ))}
        <div style={{
          position: 'sticky',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '5.5rem',
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 40%, #fff 100%)',
          zIndex: 100,
        }} />
      </div>

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={handleCloseDetails}
          isOpen={!!selectedAppointment}
        />
      )}
    </div>
  );
};

export default ListAppointments; 