import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, message } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SafetyOutlined,
  SettingOutlined,
  SoundOutlined,
  ShopOutlined,
  DollarOutlined,
  FlagOutlined,
  BookOutlined,
  UserOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { loginFormSchema, LoginFormData } from '@/utils/validation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data.email, data.password);

    if (result.success) {
      message.success(result.message);
      navigate('/dashboard');
    } else {
      message.error(result.message);
    }
  };

  const roleSimulators = [
    {
      name: 'Super Admin',
      email: 'superadmin@intantravel.com',
      password: 'password123',
      icon: <CrownOutlined />,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300',
    },
    {
      name: 'Administrator',
      email: 'admin@intantravel.com',
      password: 'password123',
      icon: <SettingOutlined />,
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-300',
    },
    {
      name: 'Marketing',
      email: 'marketing@intantravel.com',
      password: 'password123',
      icon: <SoundOutlined />,
      color: 'bg-sky-100 hover:bg-sky-200 text-sky-700 border-sky-300',
    },
    {
      name: 'Agen Cabang',
      email: 'agen@intantravel.com',
      password: 'password123',
      icon: <ShopOutlined />,
      color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-300',
    },
    {
      name: 'Keuangan',
      email: 'keuangan@intantravel.com',
      password: 'password123',
      icon: <DollarOutlined />,
      color: 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300',
    },
    {
      name: 'Tour Leader',
      email: 'tourleader@intantravel.com',
      password: 'password123',
      icon: <FlagOutlined />,
      color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border-cyan-300',
    },
    {
      name: 'Pembimbing',
      email: 'pembimbing@intantravel.com',
      password: 'password123',
      icon: <BookOutlined />,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300',
    },
    {
      name: 'Nasabah',
      email: 'nasabah@intantravel.com',
      password: 'password123',
      icon: <UserOutlined />,
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300',
    },
  ];

  const handleRoleSelect = (role: { name: string; email: string; password: string }) => {
    setValue('email', role.email);
    setValue('password', role.password);
    message.info(`Role ${role.name} dipilih`);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0c2340] to-[#1a3a5c] text-white flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0c2340] font-bold text-xl">IT</span>
            </div>
            <span className="text-xl font-bold">Intan Travel</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="text-white">Integrated</span>
              <br />
              <span className="text-orange-400">Travel Management</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              Sistem informasi manajemen terpadu kelas enterprise untuk operasional Haji Khusus,
              Umrah, dan Wisata Halal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <SafetyOutlined className="text-2xl" />
          <span className="text-sm">Secure Enterprise Portal • v2.0.4</span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-[#0c2340]">Portal </span>
              <span className="text-orange-500">Sistem</span>
            </h2>
            <p className="text-gray-600">
              Masuk dengan kredensial Anda untuk mengakses dashboard manajemen terpadu.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="admin@intantravel.com"
                    size="large"
                    status={errors.email ? 'error' : ''}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Lupa Sandi?
                </a>
              </div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="••••••••"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    visibilityToggle={{
                      visible: showPassword,
                      onVisibleChange: setShowPassword,
                    }}
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              className="w-full !bg-[#0c2340] hover:!bg-[#1a3a5c] !rounded-lg"
            >
              Masuk Sistem →
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500 font-medium">
                MODE DEVELOPER (SIMULATOR ROLE)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {roleSimulators.map((role, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`${role.color} border-2 rounded-lg p-3 flex flex-col items-center gap-2 transition-all hover:scale-105`}
              >
                <span className="text-2xl">{role.icon}</span>
                <span className="text-xs font-semibold text-center leading-tight">
                  {role.name}
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500">
            © 2026 Intan Travel Internasional. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
