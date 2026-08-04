import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packageApi } from '@/api/packageApi';
import { ICreatePackageDto, IUpdatePackageDto } from '@/types/package.type';
import { message } from 'antd';

export const usePackages = (params?: { page?: number; limit?: number; type?: string }) => {
  return useQuery({
    queryKey: ['packages', params],
    queryFn: () => packageApi.getAll(params),
  });
};

export const usePackage = (id: string) => {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => packageApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePackageDto) => packageApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      message.success('Paket berhasil ditambahkan');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePackageDto }) =>
      packageApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      message.success('Paket berhasil diperbarui');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => packageApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      message.success('Paket berhasil dihapus');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};
