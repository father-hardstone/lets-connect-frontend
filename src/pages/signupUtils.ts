export interface PasswordRequirement {
  title: string;
  validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
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

export const validatePassword = (_: any, value: string) => {
  if (!value) {
    return Promise.reject('Please enter your password');
  }
  if (value.length < 8) {
    return Promise.reject('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(value)) {
    return Promise.reject('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(value)) {
    return Promise.reject('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return Promise.reject('Password must contain at least one special character');
  }
  return Promise.resolve();
}; 