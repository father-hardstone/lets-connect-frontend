import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Divider, List, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, GoogleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { validatePassword } from './signupUtils';
import PasswordRequirements from './PasswordRequirements';
import { signup as signupApi } from '../api/axiosAuth';

const { Title, Text } = Typography;

interface PasswordRequirement {
  title: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    title: 'At least 8 characters',
    validator: (password) => password.length >= 8,
  },
  {
    title: 'At least one uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    title: 'At least one number',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    title: 'At least one special character',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { confirmPassword, ...signupPayload } = values;
      // Call signup API
      const response = await signupApi(signupPayload);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async
      // Save name and email to localStorage
      localStorage.setItem('authUser', JSON.stringify({
        name: signupPayload.fullName,
        email: signupPayload.email
      }));
      message.success('Signup successful!');
      setLoading(false);
      console.log('Signup API response:', response);
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Create Account
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Join Let's Connect and start collaborating
        </Text>

        <Form
          form={form}
          name="signup"
          layout="vertical"
          requiredMark={true}
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          noValidate
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<span>Full Name</span>}
            name="fullName"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { max: 25, message: 'Name cannot exceed 25 characters' }
            ]}
            validateFirst
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your full name"
              maxLength={25}
            />
          </Form.Item>

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
              { required: true, message: 'Please create a password' },
              { validator: validatePassword }
            ]}
            validateFirst
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Create a password"
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => setShowPasswordRequirements(false)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {showPasswordRequirements && (
            <PasswordRequirements password={password} />
          )}

          <Form.Item
            label={<span>Confirm Password</span>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
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
              placeholder="Confirm your password"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            >
              I agree to the{' '}
              <Link to="/terms" className="terms-link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="terms-link">
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={!agreeToTerms || loading}
              loading={loading}
              style={{ height: '40px' }}
            >
              Create Account
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
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Signup; 