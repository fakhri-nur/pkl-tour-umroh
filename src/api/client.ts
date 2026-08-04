import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IResponseEntity } from '@/types/api.type';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<IResponseEntity>) => {
    return response;
  },
  (error: AxiosError<IResponseEntity>) => {
    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/#/login';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
