import React from 'react';
import { Input, Typography } from 'antd';
import { useCreateAppointment } from '../../context/CreateAppointmentContext';

const { TextArea } = Input;
const { Title, Text } = Typography;

const Step1BasicDetails: React.FC = () => {
  const { formData, updateFormData } = useCreateAppointment();

  console.log('Current formData:', formData);

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: '#1a237e', marginBottom: '0.5rem' }}>
          Basic Details
        </Title>
        <Text type="secondary">
          Let's start with the essential information about your appointment
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Appointment Title *
          </Text>
          <Input
            size="large"
            placeholder="Enter appointment title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            style={{ borderRadius: '8px' }}
          />
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Description
          </Text>
          <TextArea
            rows={4}
            placeholder="Describe the purpose and agenda of this appointment"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            style={{ borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1BasicDetails; 