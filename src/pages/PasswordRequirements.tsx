import React from 'react';
import { List } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { passwordRequirements } from './signupUtils';

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => (
  <div className="password-requirements">
    <List
      size="small"
      dataSource={passwordRequirements}
      renderItem={(requirement) => {
        const fulfilled = requirement.validator(password);
        return (
          <List.Item style={{ padding: '2px 0', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
            {fulfilled ? (
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            )}
            <span
              style={{
                marginLeft: 8,
                color: fulfilled ? '#52c41a' : '#ff4d4f',
                fontSize: '0.97em',
              }}
            >
              {requirement.title}
            </span>
          </List.Item>
        );
      }}
    />
  </div>
);

export default PasswordRequirements; 