import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Typography, message } from 'antd';

const { Title, Text } = Typography;

const OTP_LENGTH = 6;

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted.split(''));
      setTimeout(() => inputRefs.current[OTP_LENGTH - 1]?.focus(), 0);
    }
  };

  const handleSubmit = async () => {
    if (otp.some((digit) => digit === '')) {
      message.error('Please enter the complete OTP.');
      return;
    }
    setLoading(true);
    // TODO: Verify OTP logic here
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate async
    setLoading(false);
    console.log('Verify OTP payload:', { email, otp: otp.join('') });
    message.success('OTP verified!');
    navigate('/create-new-password', { state: { email } });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Verify OTP
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '2rem' }}>
          Enter the 6-digit code sent to your email
        </Text>
        <Form name="verify-otp" layout="vertical" onFinish={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                style={{
                  width: 40,
                  height: 48,
                  fontSize: 24,
                  textAlign: 'center',
                  border: '1.5px solid #1a237e',
                  borderRadius: 6,
                  outline: 'none',
                  background: '#f8f9fa',
                  boxShadow: '0 1px 2px rgba(26,35,126,0.04)',
                  transition: 'border 0.2s',
                }}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: '40px' }}
            >
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp; 