import { Card, Tag, Button, Select } from 'antd';
import {
  RiseOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  badgeColor,
  icon,
  color,
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      {badge && (
        <Tag color={badgeColor} className="font-semibold">
          {badge}
        </Tag>
      )}
    </div>
    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
    <h2 className="text-2xl font-bold text-gray-800 mb-1">{value}</h2>
    {subtitle && <p className="text-gray-600 text-xs">{subtitle}</p>}
  </Card>
);

const formatRupiahDot = (value: number): string => {
  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

const DashboardPage = () => {
  const transactionData = [
    {
      key: '1',
      id: 'TRX-2026-001234',
      name: 'Siti Nurhaliza',
      package: 'Umrah Reguler 12 Hari',
      amount: formatRupiahDot(32500000),
      status: 'SUCCESS',
      date: '2026-08-04',
    },
    {
      key: '2',
      id: 'TRX-2026-001235',
      name: 'Ahmad Yusuf',
      package: 'Haji Plus 2026',
      amount: formatRupiahDot(85000000),
      status: 'PENDING',
      date: '2026-08-04',
    },
    {
      key: '3',
      id: 'TRX-2026-001236',
      name: 'Fatimah Azzahra',
      package: 'Umrah VIP 9 Hari',
      amount: formatRupiahDot(45000000),
      status: 'SUCCESS',
      date: '2026-08-03',
    },
    {
      key: '4',
      id: 'TRX-2026-001237',
      name: 'Muhammad Rizki',
      package: 'Umrah Keluarga',
      amount: formatRupiahDot(120000000),
      status: 'FAILED',
      date: '2026-08-03',
    },
    {
      key: '5',
      id: 'TRX-2026-001238',
      name: 'Dewi Lestari',
      package: 'Umrah Reguler 12 Hari',
      amount: formatRupiahDot(32500000),
      status: 'PENDING',
      date: '2026-08-02',
    },
  ];

  const statusConfig: Record<string, { color: string; text: string }> = {
    SUCCESS: { color: 'success', text: 'SUCCESS' },
    PENDING: { color: 'warning', text: 'PENDING' },
    FAILED: { color: 'error', text: 'FAILED' },
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Super Admin</h1>
          <p className="text-gray-600 mt-1">Ringkasan sistem & statistik operasional</p>
        </div>
        <Button type="primary" icon={<DownloadOutlined />} size="large" className="!bg-[#0c2340]">
          Export Laporan
        </Button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pendapatan"
          value={formatRupiahDot(14500000000)}
          subtitle="Akumulasi seluruh transaksi"
          badge="+12.5%"
          badgeColor="green"
          icon={<RiseOutlined />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Jamaah Aktif"
          value="1.250"
          subtitle="Orang terdaftar"
          icon={<TeamOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Keberangkatan Mendatang"
          value="8"
          subtitle="Jadwal aktif"
          icon={<CalendarOutlined />}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Menunggu Pembayaran"
          value="45"
          subtitle="Tagihan"
          badge="Butuh Review"
          badgeColor="orange"
          icon={<ClockCircleOutlined />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Grid Utama 2 Kolom: Grafik (2/3) + Transaksi Terbaru (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri - Grafik Pendapatan */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Grafik Pendapatan</h3>
              <p className="text-gray-500 text-sm">Performa bulanan</p>
            </div>
            <Select
              defaultValue="Tahun Ini"
              style={{ width: 140 }}
              options={[
                { value: 'Tahun Ini', label: 'Tahun Ini' },
                { value: '2026', label: '2026' },
                { value: '2025', label: '2025' },
                { value: '2024', label: '2024' },
              ]}
            />
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 flex items-center justify-center min-h-[320px] border-2 border-dashed border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Area Integrasi Chart.js / Recharts
              </h4>
              <p className="text-gray-500 text-sm">Placeholder untuk visualisasi data grafik</p>
            </div>
          </div>
        </Card>

        {/* Kolom Kanan - Transaksi Terbaru */}
        <Card
          title={
            <div className="flex items-center justify-between">
              <span className="font-bold">Transaksi Terbaru</span>
              <Tag color="warning" className="font-semibold">
                Butuh Review
              </Tag>
            </div>
          }
        >
          <div className="space-y-3">
            {transactionData.map((item) => {
              const config = statusConfig[item.status] || statusConfig.PENDING;
              return (
                <div
                  key={item.key}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{item.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-800 text-sm">{item.amount}</p>
                      <Tag color={config.color} className="font-semibold mt-1">
                        {config.text}
                      </Tag>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;