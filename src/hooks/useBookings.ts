import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '@/api/bookingApi';
import { ICreateBookingDto, IUpdateBookingDto } from '@/types/booking.type';
import { message } from 'antd';

export const useBookings = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => bookingApi.getAll(params),
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => bookingApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateBookingDto) => bookingApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      message.success('Booking berhasil dibuat');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateBookingDto }) =>
      bookingApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      message.success('Booking berhasil diperbarui');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      message.success('Booking berhasil dihapus');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};
