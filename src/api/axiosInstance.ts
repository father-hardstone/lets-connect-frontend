import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com/api', // TODO: Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If you want to send cookies
});

// You can add interceptors here if needed
// axiosInstance.interceptors.request.use(...)
// axiosInstance.interceptors.response.use(...)

export default axiosInstance; 