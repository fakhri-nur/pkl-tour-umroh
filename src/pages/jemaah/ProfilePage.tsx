import { Card, Avatar, Tag, Button, Alert, Divider, message } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const ProfilePage = () => {
  const { user } = useAuthStore();

  const handleContactCS = () => {
    message.info('Menghubungkan Anda dengan Customer Service...');
  };

  const personalData = [
    { label: 'Nama KTP/Paspor', value: 'Ahmad Suryadi' },
    { label: 'NIK', value: '3171042508850001' },
    { label: 'Tempat/Tgl Lahir', value: 'Jakarta, 25 Agustus 1985' },
    { label: 'Jenis Kelamin', value: 'Laki-laki' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
        <p className="text-gray-600 mt-1">Informasi pribadi dan kebutuhan khusus Anda</p>
      </div>

      {/* Header Profile Card */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff', fontSize: '32px' }}
          >
            BA
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name || 'Bapak Ahmad'}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Tag color="gold" className="font-semibold">JAMAAH REGULER</Tag>
              <Tag color="blue" className="font-mono font-semibold">PNR: INT-2026-X8Y9</Tag>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Data Pribadi */}
          <Card title={<span className="font-bold">Data Pribadi</span>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalData.map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Informasi Medis & Kebutuhan Khusus */}
          <Card title={<span className="font-bold">Informasi Medis & Kebutuhan Khusus</span>}>
            <Alert
              type="info"
              icon={<SafetyCertificateOutlined />}
              message="Kebutuhan Kursi Roda"
              description="Permintaan kursi roda telah dikonfirmasi oleh tim operasional."
              showIcon
              className="mb-5"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <HeartOutlined className="text-red-500" />
                  <p className="text-xs text-gray-500">Golongan Darah</p>
                </div>
                <p className="font-semibold text-gray-800">A+</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Riwayat Penyakit</p>
                <p className="font-semibold text-gray-800">Hipertensi (Terkontrol)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Card - Kontak Darurat */}
        <div className="space-y-6">
          <Card title={<span className="font-bold">Kontak Darurat Keluarga</span>}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar size={40} style={{ backgroundColor: '#722ed1' }}>
                  {user?.name?.charAt(0) || 'A'}
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-800">Ibu Rina Suryadi</p>
                  <p className="text-xs text-gray-500">Istri / Pasangan</p>
                </div>
              </div>
              <Divider className="my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <PhoneOutlined className="text-green-600" />
                  <span>+62 811-2222-3333</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <EnvironmentOutlined className="text-blue-600" />
                  <span>Jakarta Selatan</span>
                </div>
              </div>
              <Divider className="my-3" />
              <Button
                type="primary"
                size="large"
                block
                icon={<CustomerServiceOutlined />}
                className="!bg-[#0c2340]"
                onClick={handleContactCS}
              >
                Hubungi CS <ArrowRightOutlined className="text-xs ml-1" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;