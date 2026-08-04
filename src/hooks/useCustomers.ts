import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi } from '@/api/customerApi';
import { ICreateCustomerDto, IUpdateCustomerDto } from '@/types/customer.type';
import { message } from 'antd';

export const useCustomers = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerApi.getAll(params),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCustomerDto) => customerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      message.success('Pelanggan berhasil ditambahkan');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateCustomerDto }) =>
      customerApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      message.success('Pelanggan berhasil diperbarui');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      message.success('Pelanggan berhasil dihapus');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};
