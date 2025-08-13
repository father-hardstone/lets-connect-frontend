import React, { useState } from 'react';
import { Input, Select, Switch, Typography, Space, Tag, Button } from 'antd';
import { useCreateAppointment } from '../../context/CreateAppointmentContext';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Step4Participants: React.FC = () => {
  const { formData, updateFormData } = useCreateAppointment();
  const [newParticipant, setNewParticipant] = useState('');

  const reminderOptions = [
    { value: '5', label: '5 minutes before' },
    { value: '10', label: '10 minutes before' },
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '1440', label: '1 day before' },
  ];

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const addParticipant = () => {
    if (newParticipant.trim() && !formData.participants.includes(newParticipant.trim())) {
      updateFormData({
        participants: [...formData.participants, newParticipant.trim()]
      });
      setNewParticipant('');
    }
  };

  const removeParticipant = (participant: string) => {
    updateFormData({
      participants: formData.participants.filter(p => p !== participant)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addParticipant();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: '#1a237e', marginBottom: '0.5rem' }}>
          Participants & Settings
        </Title>
        <Text type="secondary">
          Add participants and configure additional settings
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Participants *
          </Text>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Input
              size="large"
              placeholder="Enter participant email or name"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ flex: 1, borderRadius: '8px' }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addParticipant}
              size="large"
              style={{ borderRadius: '8px' }}
            >
              Add
            </Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {formData.participants.map((participant, index) => (
              <Tag
                key={index}
                closable
                onClose={() => removeParticipant(participant)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                }}
              >
                {participant}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Text strong>Recurring Appointment</Text>
            <Switch
              checked={formData.isRecurring}
              onChange={(checked) => updateFormData({ isRecurring: checked })}
            />
          </div>
          {formData.isRecurring && (
            <Select
              size="large"
              placeholder="Select recurrence pattern"
              value={formData.recurrencePattern || undefined}
              onChange={(value) => updateFormData({ recurrencePattern: value })}
              options={recurrenceOptions}
              style={{ width: '100%', borderRadius: '8px' }}
              dropdownStyle={{ zIndex: 2000 }}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            />
          )}
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Reminder
          </Text>
          <Select
            size="large"
            placeholder="Select reminder time"
            value={formData.reminderTime}
            onChange={(value) => updateFormData({ reminderTime: value })}
            options={reminderOptions}
            style={{ width: '100%', borderRadius: '8px' }}
            dropdownStyle={{ zIndex: 2000 }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Text strong>Payment Required</Text>
            <Switch
              checked={formData.paymentRequired}
              onChange={(checked) => updateFormData({ paymentRequired: checked })}
            />
          </div>
          {formData.paymentRequired && (
            <Input
              size="large"
              placeholder="Enter payment amount"
              value={formData.paymentAmount}
              onChange={(e) => updateFormData({ paymentAmount: e.target.value })}
              style={{ borderRadius: '8px' }}
              prefix="$"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step4Participants; 