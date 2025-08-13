import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppointmentFormData {
  // Step 1: Basic Details
  title: string;
  description: string;
  category: string;
  
  // Step 2: Date & Time
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  
  // Step 3: Location & Meeting
  location: string;
  meetLink: string;
  meetingType: 'in-person' | 'virtual' | 'hybrid';
  
  // Step 4: Participants & Settings
  participants: string[];
  isRecurring: boolean;
  recurrencePattern: string;
  reminderTime: string;
  paymentRequired: boolean;
  paymentAmount: string;
}

interface CreateAppointmentContextType {
  currentStep: number;
  formData: AppointmentFormData;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  isLastStep: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateFormData: (data: Partial<AppointmentFormData>) => void;
  resetForm: () => void;
}

const CreateAppointmentContext = createContext<CreateAppointmentContextType | undefined>(undefined);

const STORAGE_KEY = 'createAppointmentData';
const TOTAL_STEPS = 4;

const initialFormData: AppointmentFormData = {
  title: '',
  description: '',
  category: '',
  date: '',
  startTime: '',
  endTime: '',
  timezone: 'UTC',
  location: '',
  meetLink: '',
  meetingType: 'virtual',
  participants: [],
  isRecurring: false,
  recurrencePattern: '',
  reminderTime: '15',
  paymentRequired: false,
  paymentAmount: '',
};

export const CreateAppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<AppointmentFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isNextDisabled = () => {
    // For now, always allow navigation since we're using placeholder content
    return false;
  };

  const value: CreateAppointmentContextType = {
    currentStep,
    formData,
    isNextDisabled: isNextDisabled(),
    isPreviousDisabled: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    resetForm,
  };

  return (
    <CreateAppointmentContext.Provider value={value}>
      {children}
    </CreateAppointmentContext.Provider>
  );
};

export const useCreateAppointment = (): CreateAppointmentContextType => {
  const context = useContext(CreateAppointmentContext);
  if (context === undefined) {
    throw new Error('useCreateAppointment must be used within a CreateAppointmentProvider');
  }
  return context;
}; 