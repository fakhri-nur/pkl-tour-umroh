import { useState } from 'react';
import { Card, Input, Button, Switch, Select, Form, message } from 'antd';
import {
  SaveOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DollarOutlined,
  ToolOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const GlobalSettingsPage = () => {
  const [form] = Form.useForm();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveCompanyProfile = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success('Profil perusahaan berhasil disimpan!');
    setLoading(false);
  };

  const handleMaintenanceModeToggle = (checked: boolean) => {
    setMaintenanceMode(checked);
    if (checked) {
      message.warning('Mode Maintenance diaktifkan. Pengguna tidak dapat mengakses sistem.');
    } else {
      message.success('Mode Maintenance dinonaktifkan. Sistem kembali normal.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pengaturan Global</h1>
        <p className="text-gray-600 mt-1">Konfigurasi sistem & pengaturan global</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <GlobalOutlined className="text-blue-600" />
                <span className="font-bold">Profil Perusahaan</span>
              </div>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveCompanyProfile}
              initialValues={{
                companyName: 'PT Intan Travel Internasional',
                email: 'info@intantravel.com',
                phone: '+62 21 1234 5678',
                whatsapp: '+62 812 3456 7890',
                address:
                  'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220, Indonesia',
              }}
            >
              <Form.Item
                label="Nama Perusahaan"
                name="companyName"
                rules={[{ required: true, message: 'Nama perusahaan wajib diisi' }]}
              >
                <Input size="large" placeholder="PT Intan Travel Internasional" />
              </Form.Item>

              <Form.Item
                label="Email Resmi"
                name="email"
                rules={[
                  { required: true, message: 'Email wajib diisi' },
                  { type: 'email', message: 'Format email tidak valid' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="info@intantravel.com"
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Nomor Telepon"
                  name="phone"
                  rules={[{ required: true, message: 'Nomor telepon wajib diisi' }]}
                >
                  <Input
                    size="large"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="+62 21 1234 5678"
                  />
                </Form.Item>

                <Form.Item
                  label="Nomor WhatsApp"
                  name="whatsapp"
                  rules={[{ required: true, message: 'Nomor WhatsApp wajib diisi' }]}
                >
                  <Input
                    size="large"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="+62 812 3456 7890"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Alamat Lengkap"
                name="address"
                rules={[{ required: true, message: 'Alamat wajib diisi' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Jl. Sudirman No. 123, Jakarta Pusat..."
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  size="large"
                  loading={loading}
                  className="!bg-[#0c2340] w-full md:w-auto"
                >
                  Simpan Perubahan
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <ToolOutlined className="text-orange-600" />
                <span className="font-bold">Status Sistem</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Maintenance Mode</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Aktifkan mode maintenance untuk memblokir akses pengguna sementara saat melakukan
                    pemeliharaan sistem.
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onChange={handleMaintenanceModeToggle}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                />
              </div>

              {maintenanceMode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-xs font-medium">
                    ⚠️ Mode Maintenance aktif. Hanya Super Admin yang dapat mengakses sistem.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Status Server</span>
                  <span className="text-sm font-semibold text-green-600">● Operational</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm font-semibold text-green-600">● Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-semibold text-gray-800">45d 12h 34m</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <DollarOutlined className="text-green-600" />
                <span className="font-bold">Lokalisasi</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zona Waktu</label>
                <Select
                  size="large"
                  defaultValue="WIB"
                  className="w-full"
                  options={[
                    { value: 'WIB', label: 'WIB (UTC+7) - Jakarta, Medan' },
                    { value: 'WITA', label: 'WITA (UTC+8) - Makassar, Bali' },
                    { value: 'WIT', label: 'WIT (UTC+9) - Jayapura, Maluku' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Uang Utama</label>
                <Select
                  size="large"
                  defaultValue="IDR"
                  className="w-full"
                  options={[
                    { value: 'IDR', label: 'IDR - Rupiah Indonesia' },
                    { value: 'USD', label: 'USD - US Dollar' },
                    { value: 'SAR', label: 'SAR - Saudi Riyal' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format Tanggal</label>
                <Select
                  size="large"
                  defaultValue="DD/MM/YYYY"
                  className="w-full"
                  options={[
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (05/08/2026)' },
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (08/05/2026)' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2026-08-05)' },
                  ]}
                />
              </div>

              <Button
                type="primary"
                icon={<SaveOutlined />}
                size="large"
                className="!bg-green-600 hover:!bg-green-700 w-full"
              >
                Simpan Lokalisasi
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsPage;
