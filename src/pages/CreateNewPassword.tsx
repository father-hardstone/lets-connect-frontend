import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CreateNewPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      // TODO: Send new password to backend
      await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate async
      setLoading(false);
      message.success('Password reset successful!');
      console.log('Create New Password payload:', { email, newPassword: values.newPassword });
      navigate('/login');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Create New Password
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Enter your new password below
        </Text>
        <Form
          form={form}
          name="create-new-password"
          layout="vertical"
          requiredMark={true}
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          noValidate
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<span>New Password</span>}
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
            validateFirst
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>
          <Form.Item
            label={<span>Confirm New Password</span>}
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
            validateFirst
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: '40px' }}
            >
              Set New Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewPassword; 