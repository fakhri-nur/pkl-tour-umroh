import { Card, Input, Badge, Button, Table, Progress, Tag } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface StatCardProps {
  title: string;
  value: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  color: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, badge, badgeColor, icon, color, action }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}>{icon}</div>
      <Tag color={badgeColor} className="text-xs font-semibold">
        {badge}
      </Tag>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mb-3">{value}</p>
    {action && (
      <Button type="link" className="!p-0 !h-auto text-blue-600 font-medium" onClick={action.onClick}>
        {action.text} <ArrowRightOutlined className="text-xs ml-1" />
      </Button>
    )}
  </Card>
);

interface PackageData {
  key: string;
  name: string;
  code: string;
  departure: string;
  airline: string;
  seatsUsed: number;
  seatsTotal: number;
  status: 'closed' | 'almost-full' | 'open';
}

interface VerificationData {
  key: string;
  name: string;
  package: string;
  registrationDate: string;
  issues: string[];
}

const AdminDashboardPage = () => {
  const packageColumns: ColumnsType<PackageData> = [
    {
      title: 'NAMA PAKET & KODE',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: PackageData) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-xs text-gray-500">{record.code}</p>
        </div>
      ),
    },
    {
      title: 'KEBERANGKATAN',
      dataIndex: 'departure',
      key: 'departure',
      render: (text: string, record: PackageData) => (
        <div>
          <p className="text-sm text-gray-800">{text}</p>
          <p className="text-xs text-gray-500">{record.airline}</p>
        </div>
      ),
    },
    {
      title: 'KURSI / KUOTA',
      key: 'seats',
      render: (_, record: PackageData) => {
        const percentage = Math.round((record.seatsUsed / record.seatsTotal) * 100);
        return (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">
                {record.seatsUsed} / {record.seatsTotal}
              </span>
              <span className="text-xs text-gray-500">{percentage}%</span>
            </div>
            <Progress
              percent={percentage}
              showInfo={false}
              strokeColor={percentage >= 90 ? '#ff4d4f' : percentage >= 70 ? '#faad14' : '#52c41a'}
            />
          </div>
        );
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          closed: { color: 'error', text: 'CLOSED' },
          'almost-full': { color: 'warning', text: 'ALMOST FULL' },
          open: { color: 'success', text: 'OPEN' },
        };
        const config = statusConfig[status] || statusConfig.open;
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  const packageData: PackageData[] = [
    {
      key: '1',
      name: 'Umrah Ramadan Premium 12 Hari',
      code: 'UMR-2026-001',
      departure: '15 Maret 2026',
      airline: 'Garuda Indonesia',
      seatsUsed: 45,
      seatsTotal: 45,
      status: 'closed',
    },
    {
      key: '2',
      name: 'Umrah Reguler 9 Hari',
      code: 'UMR-2026-002',
      departure: '22 April 2026',
      airline: 'Saudia Airlines',
      seatsUsed: 38,
      seatsTotal: 42,
      status: 'almost-full',
    },
    {
      key: '3',
      name: 'Haji Plus 2026',
      code: 'HAJ-2026-001',
      departure: '10 Juni 2026',
      airline: 'Emirates',
      seatsUsed: 28,
      seatsTotal: 50,
      status: 'open',
    },
  ];

  const verificationData: VerificationData[] = [
    {
      key: '1',
      name: 'Siti Nurhaliza',
      package: 'Umrah Ramadan Premium',
      registrationDate: '2026-08-01',
      issues: ['PASSPORT', 'VISA REQ'],
    },
    {
      key: '2',
      name: 'Ahmad Yusuf',
      package: 'Haji Plus 2026',
      registrationDate: '2026-08-02',
      issues: ['PAYMENT'],
    },
    {
      key: '3',
      name: 'Fatimah Azzahra',
      package: 'Umrah Reguler 9 Hari',
      registrationDate: '2026-08-03',
      issues: ['PASSPORT', 'PAYMENT'],
    },
  ];

  return (
    <div className="p-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <Input
            size="large"
            placeholder="Cari Jamaah, Paket, atau PNR..."
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
          />
        </div>
        <div className="flex items-center gap-3">
          <Badge count={5} offset={[-5, 5]}>
            <Button icon={<BellOutlined />} size="large" shape="circle" />
          </Badge>
          <Button type="primary" icon={<PlusOutlined />} size="large" className="!bg-[#0c2340]">
            Booking Baru
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="TOTAL JEMAAH"
          value="2,450"
          badge="Aktif & Riwayat"
          badgeColor="blue"
          icon={<TeamOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="ANTREAN VERIFIKASI"
          value="84"
          badge="Butuh Tindakan"
          badgeColor="red"
          icon={<ClockCircleOutlined />}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          title="SISA KURSI"
          value="312"
          badge="Semua Keberangkatan"
          badgeColor="green"
          icon={<CheckCircleOutlined />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="PAKET AKTIF"
          value="24"
          badge="Kelola"
          badgeColor="cyan"
          icon={<CalendarOutlined />}
          color="bg-cyan-100 text-cyan-600"
          action={{
            text: 'Kelola Keberangkatan',
            onClick: () => {},
          }}
        />
      </div>

      {/* Grid 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiri - Ikhtisar Produk */}
        <Card title={<span className="font-bold">Ikhtisar Produk Landing Page</span>}>
          <Table
            columns={packageColumns}
            dataSource={packageData}
            pagination={false}
            scroll={{ x: 600 }}
          />
        </Card>

        {/* Kanan - Antrean Verifikasi */}
        <Card
          title={<span className="font-bold">Antrean Verifikasi</span>}
          extra={
            <Button type="link" icon={<FileTextOutlined />}>
              Buka Pusat Dokumen
            </Button>
          }
        >
          <div className="space-y-4">
            {verificationData.map((item) => (
              <div
                key={item.key}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.package}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {item.issues.map((issue, index) => (
                      <Tag key={index} color="orange" className="text-xs font-semibold">
                        {issue}
                      </Tag>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Terdaftar: {item.registrationDate}</p>
                </div>
                <Button type="primary" size="small" className="!bg-blue-600">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
