import apiClient from './client';
import { IResponseEntity } from '@/types/api.type';
import { IAuthLoginDto, IAuthRegisterDto, IAuthResponse } from '@/types/auth.type';

export const authApi = {
  login: async (data: IAuthLoginDto) => {
    const response = await apiClient.post<IResponseEntity<IAuthResponse>>('/auth/login', data);
    return response.data;
  },

  register: async (data: IAuthRegisterDto) => {
    const response = await apiClient.post<IResponseEntity<IAuthResponse>>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post<IResponseEntity>('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get<IResponseEntity<IAuthResponse['user']>>('/auth/profile');
    return response.data;
  },
};
