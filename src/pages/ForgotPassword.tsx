import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      // TODO: Send OTP to email (values.email)
      await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate async
      message.success('OTP sent to your email!');
      setLoading(false);
      console.log('Forgot Password payload:', { email: values.email });
      navigate('/verify-otp', { state: { email: values.email } });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Forgot Password
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Enter your email to receive a one-time password (OTP)
        </Text>

        <Form
          form={form}
          name="forgot-password"
          layout="vertical"
          requiredMark={true}
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          noValidate
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<span>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
              { max: 25, message: 'Email cannot exceed 25 characters' }
            ]}
            validateFirst
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              maxLength={25}
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
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword; 