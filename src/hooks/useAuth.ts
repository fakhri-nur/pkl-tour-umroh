import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import { IAuthLoginDto, IAuthRegisterDto } from '@/types/auth.type';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: IAuthLoginDto) => authApi.login(data),
    onSuccess: (response) => {
      if (response.data) {
        setAuth(response.data.user, response.data.token);
        message.success('Login berhasil');
        navigate('/');
      }
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useRegister = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: IAuthRegisterDto) => authApi.register(data),
    onSuccess: (response) => {
      if (response.data) {
        setAuth(response.data.user, response.data.token);
        message.success('Registrasi berhasil');
        navigate('/');
      }
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      message.success('Logout berhasil');
      navigate('/login');
    },
    onError: (error: Error) => {
      message.error(error.message);
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authApi.getProfile(),
  });
};
