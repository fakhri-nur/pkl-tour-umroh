import apiClient from './client';
import { IResponseEntity } from '@/types/api.type';
import { IPackage, ICreatePackageDto, IUpdatePackageDto } from '@/types/package.type';

export const packageApi = {
  getAll: async (params?: { page?: number; limit?: number; type?: string }) => {
    const response = await apiClient.get<IResponseEntity<IPackage[]>>('/packages', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<IResponseEntity<IPackage>>(`/packages/${id}`);
    return response.data;
  },

  create: async (data: ICreatePackageDto) => {
    const response = await apiClient.post<IResponseEntity<IPackage>>('/packages', data);
    return response.data;
  },

  update: async (id: string, data: IUpdatePackageDto) => {
    const response = await apiClient.put<IResponseEntity<IPackage>>(`/packages/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<IResponseEntity>(`/packages/${id}`);
    return response.data;
  },
};
