import axiosInstance from './axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', payload);
  return response.data;
};

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export const signup = async (payload: SignupPayload) => {
  const response = await axiosInstance.post('/auth/signup', payload);
  return response.data;
};

// Add more auth functions (forgotPassword, etc) as needed 