import React from 'react';
import { Input, Radio, Typography, Space } from 'antd';
import { useCreateAppointment } from '../../context/CreateAppointmentContext';
import { VideoCameraOutlined, EnvironmentOutlined, ApiOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Step3Location: React.FC = () => {
  const { formData, updateFormData } = useCreateAppointment();

  const meetingTypes = [
    {
      value: 'virtual',
      label: 'Virtual Meeting',
      icon: <VideoCameraOutlined />,
      description: 'Online video call or conference'
    },
    {
      value: 'in-person',
      label: 'In-Person Meeting',
      icon: <EnvironmentOutlined />,
      description: 'Physical location meeting'
    },
    {
      value: 'hybrid',
      label: 'Hybrid Meeting',
      icon: <ApiOutlined />,
      description: 'Combination of virtual and in-person'
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: '#1a237e', marginBottom: '0.5rem' }}>
          Location & Meeting Type
        </Title>
        <Text type="secondary">
          Choose how and where your appointment will take place
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <Text strong style={{ display: 'block', marginBottom: '1rem' }}>
            Meeting Type *
          </Text>
          <Radio.Group
            value={formData.meetingType}
            onChange={(e) => updateFormData({ meetingType: e.target.value })}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {meetingTypes.map((type) => (
                <Radio.Button
                  key={type.value}
                  value={type.value}
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: '8px',
                    border: '1px solid #d9d9d9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem', color: '#1a237e' }}>
                      {type.icon}
                    </span>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {type.label}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        {type.description}
                      </div>
                    </div>
                  </div>
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </div>

        {formData.meetingType === 'in-person' && (
          <div>
            <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
              Location *
            </Text>
            <Input
              size="large"
              placeholder="Enter meeting location (e.g., Room 201, HQ)"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              style={{ borderRadius: '8px' }}
            />
          </div>
        )}

        {formData.meetingType === 'virtual' && (
          <div>
            <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
              Meeting Link *
            </Text>
            <Input
              size="large"
              placeholder="Enter meeting link (e.g., Google Meet, Zoom, Teams)"
              value={formData.meetLink}
              onChange={(e) => updateFormData({ meetLink: e.target.value })}
              style={{ borderRadius: '8px' }}
            />
          </div>
        )}

        {formData.meetingType === 'hybrid' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                Physical Location
              </Text>
              <Input
                size="large"
                placeholder="Enter meeting location (e.g., Room 201, HQ)"
                value={formData.location}
                onChange={(e) => updateFormData({ location: e.target.value })}
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div>
              <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                Virtual Meeting Link
              </Text>
              <Input
                size="large"
                placeholder="Enter meeting link for virtual participants"
                value={formData.meetLink}
                onChange={(e) => updateFormData({ meetLink: e.target.value })}
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3Location; 