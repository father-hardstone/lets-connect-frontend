import React, { useEffect, useRef, useCallback } from 'react';

interface CreateAppointmentModalProps {
  onClose: () => void;
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Trap focus inside modal
  useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Close on click outside
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.25s cubic-bezier(0.4,0,0.2,1)'
      }}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          width: '1000px',
          maxWidth: '95vw',
          minHeight: '600px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          zIndex: 2001,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          animation: 'scaleIn 0.32s cubic-bezier(0.4,0,0.2,1)'
        }}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 22,
            background: 'none',
            border: 'none',
            fontSize: '1.7rem',
            color: '#888',
            cursor: 'pointer',
            zIndex: 2002,
            transition: 'color 0.15s',
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: '#1a237e',
          fontWeight: 700,
        }}>
          Create Appointment Modal (Placeholder)
          <div style={{
            fontSize: '1rem',
            color: '#666',
            marginTop: '1rem',
            textAlign: 'center',
          }}>
            This is where the appointment creation wizard will be implemented.<br />
            It will include steps for selecting date, time, and other details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentModal; 