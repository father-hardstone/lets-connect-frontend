import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login with user data
      login({
        firstName: 'John', // In a real app, this would come from the API response
        lastName: 'Doe',   // In a real app, this would come from the API response
        email: values.email
      });
      
      message.success('Sign in successful!');
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Sign in failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Welcome Back
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Sign in to continue to Let's Connect
        </Text>

        <Form
          form={form}
          name="login"
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

          <Form.Item
            label={<span>Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
            validateFirst
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <div className="form-options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: '40px' }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="or-separator">
          <span className="or-line" />
          <span className="or-text">Or</span>
          <span className="or-line" />
        </div>

        <Button
          icon={<GoogleOutlined />}
          block
          style={{ height: '40px', marginBottom: '1.5rem' }}
        >
          Continue with Google
        </Button>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login; 