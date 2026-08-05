import { Card, Button, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  WalletOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAgenStore, IJemaahRecord, ICommissionRecord } from '@/store/agenStore';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  valueClassName?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color,
  valueClassName = 'text-gray-800',
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className={`text-2xl font-bold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  </Card>
);

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const AgenDashboardPage = () => {
  const navigate = useNavigate();
  const { jemaah, commissions } = useAgenStore();

  const jemaahColumns: ColumnsType<IJemaahRecord> = [
    {
      title: 'NAMA JAMAAH',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IJemaahRecord) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-xs text-gray-500">{record.phone}</p>
        </div>
      ),
    },
    {
      title: 'PAKET',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'financeStatus',
      key: 'financeStatus',
      render: (status: string) => {
        const config: Record<string, { color: string; text: string }> = {
          REGISTERED: { color: 'blue', text: 'REGISTERED' },
          'DOWN PAYMENT': { color: 'warning', text: 'DOWN PAYMENT' },
          'FULLY PAID': { color: 'success', text: 'FULLY PAID' },
        };
        const item = config[status] || config.REGISTERED;
        return <Tag color={item.color} className="font-semibold">{item.text}</Tag>;
      },
    },
  ];

  const commissionStatusConfig: Record<string, { color: string; text: string }> = {
    PENDING: { color: 'warning', text: 'PENDING' },
    PAID: { color: 'success', text: 'PAID' },
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Agen</h1>
          <p className="text-gray-600 mt-1">Ringkasan jamaah, komisi, dan katalog Anda</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="!bg-[#0c2340]"
          onClick={() => navigate('/agen/registrations')}
        >
          Daftarkan Jamaah
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="TOTAL JAMAAH ANDA"
          value={jemaah.length.toString()}
          icon={<TeamOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <SummaryCard
          title="KOMISI PENDING"
          value={formatRupiah(
            commissions
              .filter((c) => c.status === 'PENDING')
              .reduce((sum, c) => sum + c.amount, 0)
          )}
          icon={<ClockCircleOutlined />}
          color="bg-yellow-100 text-yellow-600"
          valueClassName="text-yellow-600"
        />
        <SummaryCard
          title="TOTAL KOMISI DICAIRKAN"
          value={formatRupiah(
            commissions
              .filter((c) => c.status === 'PAID')
              .reduce((sum, c) => sum + c.amount, 0)
          )}
          icon={<WalletOutlined />}
          color="bg-[#0c2340] text-white"
          valueClassName="text-white"
        />
      </div>

      {/* Grid 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiri - Pendaftaran Terbaru */}
        <Card
          title={<span className="font-bold">Pendaftaran Jamaah Terbaru</span>}
          extra={
            <Button
              type="link"
              className="!p-0"
              onClick={() => navigate('/agen/jemaah')}
            >
              Lihat Semua <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <Table
            columns={jemaahColumns}
            dataSource={jemaah.slice(0, 3)}
            pagination={false}
            scroll={{ x: 500 }}
          />
        </Card>

        {/* Kanan - Status Komisi Terbaru */}
        <Card
          title={<span className="font-bold">Status Komisi Terbaru</span>}
          extra={
            <Button
              type="link"
              className="!p-0"
              onClick={() => navigate('/agen/commissions')}
            >
              Lihat Riwayat <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <div className="space-y-3">
            {commissions.slice(0, 3).map((item: ICommissionRecord) => {
              const config = commissionStatusConfig[item.status];
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="font-bold text-gray-800 text-sm">{formatRupiah(item.amount)}</span>
                    <Tag color={config.color} className="font-semibold">{config.text}</Tag>
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

export default AgenDashboardPage;