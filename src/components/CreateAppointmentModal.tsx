import React, { useEffect, useRef, useCallback } from 'react';
import { Button } from 'antd';
import { CreateAppointmentProvider, useCreateAppointment } from '../context/CreateAppointmentContext';

interface CreateAppointmentModalProps {
  onClose: () => void;
}

const ModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    currentStep,
    isNextDisabled,
    isPreviousDisabled,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    resetForm,
  } = useCreateAppointment();

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

  const handleFinish = () => {
    console.log('Creating appointment...');
    resetForm();
    onClose();
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / 4) * 100;

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
        zIndex: 1000,
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
          minHeight: '700px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
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
            zIndex: 1002,
            transition: 'color 0.15s',
          }}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Heading */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ textAlign: 'center', color: '#1a237e', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
            Create New Appointment
          </h2>
        </div>

        {/* Progress Line */}
        <div style={{ 
          marginBottom: '2rem',
          padding: '0 1rem'
        }}>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#e0e0e0',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: '#1a237e',
              borderRadius: '2px',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
        </div>

        {/* Empty Content Area */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          {/* Content will be added here later */}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Button
            size="large"
            disabled={isPreviousDisabled}
            onClick={goToPreviousStep}
            style={{ borderRadius: '8px' }}
          >
            Previous
          </Button>

          <Button
            type="primary"
            size="large"
            disabled={isNextDisabled}
            onClick={isLastStep ? handleFinish : goToNextStep}
            style={{ borderRadius: '8px' }}
          >
            {isLastStep ? 'Create Appointment' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({ onClose }) => {
  return (
    <CreateAppointmentProvider>
      <ModalContent onClose={onClose} />
    </CreateAppointmentProvider>
  );
};

export default CreateAppointmentModal; 