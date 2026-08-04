import apiClient from './client';
import { IResponseEntity } from '@/types/api.type';
import { ICustomer, ICreateCustomerDto, IUpdateCustomerDto } from '@/types/customer.type';

export const customerApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await apiClient.get<IResponseEntity<ICustomer[]>>('/customers', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<IResponseEntity<ICustomer>>(`/customers/${id}`);
    return response.data;
  },

  create: async (data: ICreateCustomerDto) => {
    const response = await apiClient.post<IResponseEntity<ICustomer>>('/customers', data);
    return response.data;
  },

  update: async (id: string, data: IUpdateCustomerDto) => {
    const response = await apiClient.put<IResponseEntity<ICustomer>>(`/customers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<IResponseEntity>(`/customers/${id}`);
    return response.data;
  },
};
