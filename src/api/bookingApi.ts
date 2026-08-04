import apiClient from './client';
import { IResponseEntity } from '@/types/api.type';
import { IBooking, ICreateBookingDto, IUpdateBookingDto } from '@/types/booking.type';

export const bookingApi = {
  getAll: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await apiClient.get<IResponseEntity<IBooking[]>>('/bookings', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<IResponseEntity<IBooking>>(`/bookings/${id}`);
    return response.data;
  },

  create: async (data: ICreateBookingDto) => {
    const response = await apiClient.post<IResponseEntity<IBooking>>('/bookings', data);
    return response.data;
  },

  update: async (id: string, data: IUpdateBookingDto) => {
    const response = await apiClient.put<IResponseEntity<IBooking>>(`/bookings/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<IResponseEntity>(`/bookings/${id}`);
    return response.data;
  },
};
