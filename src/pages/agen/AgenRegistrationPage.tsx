import { Card, Input, Select, Button, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  LeftOutlined,
  UserOutlined,
  PhoneOutlined,
  BookOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { agenRegistrationSchema, AgenRegistrationFormData } from '@/utils/validation';
import { useAgenStore } from '@/store/agenStore';

const AgenRegistrationPage = () => {
  const navigate = useNavigate();
  const { packages, addJemaah } = useAgenStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AgenRegistrationFormData>({
    resolver: zodResolver(agenRegistrationSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      initialStatus: '',
      packageId: '',
    },
  });

  const onSubmit = async (data: AgenRegistrationFormData) => {
    const selectedPackage = packages.find((pkg) => pkg.id === data.packageId);
    addJemaah({
      name: data.fullName,
      phone: data.phone,
      packageName: selectedPackage?.name || 'Paket Lainnya',
    });
    message.success('Jamaah berhasil didaftarkan!');
    reset();
    navigate('/agen/jemaah');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/agen/jemaah" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
          <LeftOutlined /> Kembali ke Daftar Jamaah
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Pendaftaran Jamaah Baru</h1>
        <p className="text-gray-600 mt-1">Isi data jamaah untuk mendaftarkan paket perjalanan</p>
      </div>

      <div className="max-w-2xl">
        <Card title={<span className="font-bold">Form Pendaftaran</span>}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap Sesuai KTP/Paspor
              </label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Nama lengkap jamaah"
                    status={errors.fullName ? 'error' : ''}
                  />
                )}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon/WA Aktif
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="+62 812 3456 7890"
                    status={errors.phone ? 'error' : ''}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Awal</label>
              <Controller
                name="initialStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Pilih status awal"
                    className="w-full"
                    status={errors.initialStatus ? 'error' : ''}
                    options={[
                      { value: 'Baru Mendaftar (Belum DP)', label: 'Baru Mendaftar (Belum DP)' },
                      { value: 'Sudah DP Sebagian', label: 'Sudah DP Sebagian' },
                      { value: 'Langsung Lunas', label: 'Langsung Lunas' },
                    ]}
                  />
                )}
              />
              {errors.initialStatus && (
                <p className="text-red-500 text-sm mt-1">{errors.initialStatus.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilihan Paket Perjalanan
              </label>
              <Controller
                name="packageId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    placeholder="Pilih paket perjalanan"
                    className="w-full"
                    prefix={<BookOutlined className="text-gray-400" />}
                    status={errors.packageId ? 'error' : ''}
                    options={packages
                      .filter((pkg) => pkg.active)
                      .map((pkg) => ({
                        value: pkg.id,
                        label: `${pkg.name} - ${pkg.duration}`,
                      }))}
                  />
                )}
              />
              {errors.packageId && (
                <p className="text-red-500 text-sm mt-1">{errors.packageId.message}</p>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<UserAddOutlined />}
              loading={isSubmitting}
              className="!bg-[#0c2340] w-full md:w-auto"
            >
              Daftarkan Jamaah
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AgenRegistrationPage;