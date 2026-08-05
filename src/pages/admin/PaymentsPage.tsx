import { Card, Table, Tag } from 'antd';
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </Card>
);

interface PaymentData {
  key: string;
  transactionId: string;
  jemaahName: string;
  package: string;
  amount: string;
  date: string;
  status: 'lunas' | 'menunggu-konfirmasi' | 'gagal';
}

const PaymentsPage = () => {
  const columns: ColumnsType<PaymentData> = [
    {
      title: 'ID TRANSAKSI',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (text: string) => <span className="font-mono text-sm font-semibold text-blue-600">{text}</span>,
    },
    {
      title: 'NAMA JAMAAH',
      dataIndex: 'jemaahName',
      key: 'jemaahName',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'PAKET',
      dataIndex: 'package',
      key: 'package',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'JUMLAH (IDR)',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <span className="font-bold text-gray-800">{text}</span>,
    },
    {
      title: 'TANGGAL',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          'lunas': { color: 'success', text: 'Lunas' },
          'menunggu-konfirmasi': { color: 'warning', text: 'Menunggu Konfirmasi' },
          'gagal': { color: 'error', text: 'Gagal' },
        };
        const config = statusConfig[status] || statusConfig['menunggu-konfirmasi'];
        return (
          <Tag color={config.color} className="font-semibold">
            {config.text}
          </Tag>
        );
      },
    },
  ];

  const paymentData: PaymentData[] = [
    {
      key: '1',
      transactionId: 'TRX-2026-001234',
      jemaahName: 'Siti Nurhaliza',
      package: 'Umrah Ramadan Premium 12 Hari',
      amount: 'Rp 32.500.000',
      date: '2026-08-05',
      status: 'lunas',
    },
    {
      key: '2',
      transactionId: 'TRX-2026-001235',
      jemaahName: 'Ahmad Yusuf',
      package: 'Haji Plus 2026',
      amount: 'Rp 85.000.000',
      date: '2026-08-04',
      status: 'menunggu-konfirmasi',
    },
    {
      key: '3',
      transactionId: 'TRX-2026-001236',
      jemaahName: 'Fatimah Azzahra',
      package: 'Umrah Reguler 9 Hari',
      amount: 'Rp 28.000.000',
      date: '2026-08-04',
      status: 'lunas',
    },
    {
      key: '4',
      transactionId: 'TRX-2026-001237',
      jemaahName: 'Muhammad Rizki',
      package: 'Umrah VIP 10 Hari',
      amount: 'Rp 45.000.000',
      date: '2026-08-03',
      status: 'gagal',
    },
    {
      key: '5',
      transactionId: 'TRX-2026-001238',
      jemaahName: 'Dewi Lestari',
      package: 'Umrah Keluarga 14 Hari',
      amount: 'Rp 120.000.000',
      date: '2026-08-03',
      status: 'lunas',
    },
    {
      key: '6',
      transactionId: 'TRX-2026-001239',
      jemaahName: 'Hendra Gunawan',
      package: 'Umrah Reguler 9 Hari',
      amount: 'Rp 27.500.000',
      date: '2026-08-02',
      status: 'lunas',
    },
    {
      key: '7',
      transactionId: 'TRX-2026-001240',
      jemaahName: 'Rina Susanti',
      package: 'Haji Plus 2026',
      amount: 'Rp 80.000.000',
      date: '2026-08-02',
      status: 'menunggu-konfirmasi',
    },
    {
      key: '8',
      transactionId: 'TRX-2026-001241',
      jemaahName: 'Bambang Setiawan',
      package: 'Umrah Ramadan Premium 12 Hari',
      amount: 'Rp 33.000.000',
      date: '2026-08-01',
      status: 'lunas',
    },
  ];

  const totalTransactions = paymentData.length;
  const successTransactions = paymentData.filter((p) => p.status === 'lunas').length;
  const pendingTransactions = paymentData.filter((p) => p.status === 'menunggu-konfirmasi').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pemantauan Tagihan Jamaah</h1>
        <p className="text-gray-600 mt-1">Monitor transaksi pembayaran dan status tagihan</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="TOTAL TRANSAKSI"
          value={totalTransactions.toString()}
          icon={<DollarOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <SummaryCard
          title="BERHASIL / LUNAS"
          value={successTransactions.toString()}
          icon={<CheckCircleOutlined />}
          color="bg-green-100 text-green-600"
        />
        <SummaryCard
          title="MENUNGGU KONFIRMASI"
          value={pendingTransactions.toString()}
          icon={<ClockCircleOutlined />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Payment Table */}
      <Card title={<span className="font-bold">Daftar Transaksi Pembayaran</span>}>
        <Table
          columns={columns}
          dataSource={paymentData}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} transaksi`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default PaymentsPage;
