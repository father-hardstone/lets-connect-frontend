import React from 'react';
import { DatePicker, TimePicker, Select, Typography } from 'antd';
import { useCreateAppointment } from '../../context/CreateAppointmentContext';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Step2DateTime: React.FC = () => {
  const { formData, updateFormData } = useCreateAppointment();

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'CST', label: 'CST (Central Standard Time)' },
    { value: 'MST', label: 'MST (Mountain Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
    { value: 'IST', label: 'IST (Indian Standard Time)' },
  ];

  const handleDateChange = (date: any) => {
    updateFormData({ date: date ? date.format('YYYY-MM-DD') : '' });
  };

  const handleStartTimeChange = (time: any) => {
    updateFormData({ startTime: time ? time.format('HH:mm') : '' });
  };

  const handleEndTimeChange = (time: any) => {
    updateFormData({ endTime: time ? time.format('HH:mm') : '' });
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: '#1a237e', marginBottom: '0.5rem' }}>
          Date & Time
        </Title>
        <Text type="secondary">
          Choose when your appointment will take place
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Date *
          </Text>
          <div style={{ position: 'relative', zIndex: 2000 }}>
            <DatePicker
              size="large"
              placeholder="Select date"
              value={formData.date ? dayjs(formData.date) : null}
              onChange={handleDateChange}
              style={{ width: '100%', borderRadius: '8px' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              getPopupContainer={() => document.body}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
              Start Time *
            </Text>
            <div style={{ position: 'relative', zIndex: 2000 }}>
              <TimePicker
                size="large"
                placeholder="Start time"
                value={formData.startTime ? dayjs(`2000-01-01 ${formData.startTime}`) : null}
                onChange={handleStartTimeChange}
                format="HH:mm"
                style={{ width: '100%', borderRadius: '8px' }}
                getPopupContainer={() => document.body}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
              End Time *
            </Text>
            <div style={{ position: 'relative', zIndex: 2000 }}>
              <TimePicker
                size="large"
                placeholder="End time"
                value={formData.endTime ? dayjs(`2000-01-01 ${formData.endTime}`) : null}
                onChange={handleEndTimeChange}
                format="HH:mm"
                style={{ width: '100%', borderRadius: '8px' }}
                getPopupContainer={() => document.body}
              />
            </div>
          </div>
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
            Timezone
          </Text>
          <Select
            size="large"
            placeholder="Select timezone"
            value={formData.timezone}
            onChange={(value) => updateFormData({ timezone: value })}
            options={timezones}
            style={{ width: '100%', borderRadius: '8px' }}
            dropdownStyle={{ zIndex: 2000 }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2DateTime; 