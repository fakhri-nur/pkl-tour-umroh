import { useEffect, useState } from 'react';
import { Card, Input, Button, Avatar, Switch, message, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  CameraOutlined,
  LockOutlined,
  BellOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { tourLeaderProfileSchema, TourLeaderProfileFormData } from '@/utils/validation';
import { useTourLeaderStore, INotificationPrefs } from '@/store/tourLeaderStore';

const NOTIFICATION_OPTIONS: { key: keyof INotificationPrefs; title: string; description: string }[] = [
  {
    key: 'email',
    title: 'Email Notifikasi',
    description: 'Terima laporan dan notifikasi penting melalui email.',
  },
  {
    key: 'whatsapp',
    title: 'Pesan WhatsApp',
    description: 'Konfirmasi check-in dan aktivitas lapangan via WhatsApp.',
  },
  {
    key: 'scheduleReminder',
    title: 'Pengingat Jadwal',
    description: 'Pengingat 1 jam sebelum setiap rundown aktivitas.',
  },
];

const TourLeaderSettingsPage = () => {
  const { profile, updateProfile, notificationPrefs, toggleNotification } = useTourLeaderStore();
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TourLeaderProfileFormData>({
    resolver: zodResolver(tourLeaderProfileSchema),
    defaultValues: {
      fullName: profile.name,
      email: profile.email,
      phone: profile.phone,
      certification: profile.certification,
    },
  });

  useEffect(() => {
    reset({
      fullName: profile.name,
      email: profile.email,
      phone: profile.phone,
      certification: profile.certification,
    });
  }, [profile, reset]);

  const onSave = async (values: TourLeaderProfileFormData) => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateProfile({
      name: values.fullName,
      role: profile.role,
      email: values.email,
      phone: values.phone,
      certification: values.certification,
    });
    setSaving(false);
    message.success('Perubahan profil berhasil disimpan!');
  };

  const handleReset = () => {
    reset({
      fullName: profile.name,
      email: profile.email,
      phone: profile.phone,
      certification: profile.certification,
    });
    message.info('Form dikembalikan ke data terakhir.');
  };

  const handleChangePhoto = () => {
    message.info('Fitur ubah foto profil dibuka (simulasi).');
  };

  const handleChangePassword = () => {
    Modal.confirm({
      title: 'Ganti Password',
      icon: <LockOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Anda akan diarahkan untuk membuat password baru. Lanjutkan?',
      okText: 'Lanjutkan',
      okButtonProps: { danger: true },
      cancelText: 'Batal',
      onOk: () => message.success('Permintaan ganti password terkirim ke email Anda.'),
    });
  };

  return (
    <div className="p-8">
      {/* Header Card Navy */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] text-white p-6">
        <h1 className="text-2xl font-bold mb-1">Settings & Preferences</h1>
        <p className="text-gray-300 text-sm">Kelola profil, keamanan, dan preferensi aplikasi Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri - Profil Ringkas */}
        <div className="space-y-6">
          <Card className="text-center" bodyStyle={{ padding: '28px 24px' }}>
            <Avatar size={96} icon={<UserOutlined />} className="!bg-[#0c2340] !text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Ustadz Reza Pahlevi</h3>
            <p className="text-amber-600 font-semibold text-sm mb-4">Senior Tour Leader</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-6">
              <SafetyCertificateOutlined className="text-green-600" />
              Muthawwif Profesional BNSP
            </div>
            <div className="space-y-3">
              <Button block icon={<CameraOutlined />} onClick={handleChangePhoto}>
                Ubah Foto Profil
              </Button>
              <Button block danger icon={<LockOutlined />} onClick={handleChangePassword}>
                Ganti Password
              </Button>
            </div>
          </Card>
        </div>

        {/* Kanan - Form & Preferensi */}
        <div className="lg:col-span-2 space-y-6">
          <Card title={<span className="font-bold">Informasi Pribadi</span>}>
            <form onSubmit={handleSubmit(onSave)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        prefix={<UserOutlined className="text-gray-400" />}
                        status={errors.fullName ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        prefix={<MailOutlined className="text-gray-400" />}
                        status={errors.email ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        status={errors.phone ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sertifikasi</label>
                  <Controller
                    name="certification"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        prefix={<SafetyCertificateOutlined className="text-gray-400" />}
                        status={errors.certification ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.certification && (
                    <p className="text-red-500 text-sm mt-1">{errors.certification.message}</p>
                  )}
                </div>
              </div>
            </form>
          </Card>

          <Card title={<span className="font-bold flex items-center gap-2"><BellOutlined className="text-amber-500" /> Preferensi Notifikasi</span>}>
            <div className="space-y-4">
              {NOTIFICATION_OPTIONS.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm mb-0.5">{option.title}</h4>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                  <Switch
                    checked={notificationPrefs[option.key]}
                    onChange={() => toggleNotification(option.key)}
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center gap-3">
            <Button size="large" onClick={handleReset}>
              Batal
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              loading={saving}
              className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
              onClick={() => handleSubmit(onSave)()}
            >
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourLeaderSettingsPage;
