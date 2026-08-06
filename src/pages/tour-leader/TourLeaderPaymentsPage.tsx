import { useMemo, useState } from 'react';
import { Card, Table, Button } from 'antd';
import { DollarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useTourLeaderStore, IPaymentRecord, PaymentStatus } from '@/store/tourLeaderStore';
import { PaymentStatusTag } from './components/Badges';
import { formatCurrency } from '@/utils/formatter';

type PaymentFilter = 'ALL' | PaymentStatus;

const FILTERS: { key: PaymentFilter; label: string }[] = [
  { key: 'ALL', label: 'Semua' },
  { key: 'SUCCESS', label: 'SUCCESS' },
  { key: 'PENDING', label: 'PENDING' },
  { key: 'FAILED', label: 'FAILED' },
];

const PaymentsPage = () => {
  const { payments } = useTourLeaderStore();
  const [filter, setFilter] = useState<PaymentFilter>('ALL');

  const filteredPayments = useMemo(
    () => payments.filter((payment) => filter === 'ALL' || payment.status === filter),
    [payments, filter]
  );

  const totalSuccess = payments.filter((p) => p.status === 'SUCCESS').length;
  const totalPending = payments.filter((p) => p.status === 'PENDING').length;
  const totalFailed = payments.filter((p) => p.status === 'FAILED').length;
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  const columns: ColumnsType<IPaymentRecord> = [
    {
      title: 'NAMA JAMAAH',
      dataIndex: 'jemaahName',
      key: 'jemaahName',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'PAKET',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'NOMINAL (Rp)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span className="font-bold text-gray-800">{formatCurrency(amount)}</span>,
    },
    {
      title: 'WAKTU',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: PaymentStatus) => <PaymentStatusTag status={status} />,
    },
  ];

  return (
    <div className="p-8">
      {/* Header Card Navy */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] text-white p-6">
        <h1 className="text-2xl font-bold mb-1">Payments Overview</h1>
        <p className="text-gray-300 text-sm">Pantau status pembayaran jamaah secara real-time.</p>
      </div>

      {/* Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
              <CheckCircleOutlined />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Berhasil (SUCCESS)</p>
              <p className="text-2xl font-bold text-gray-800">{totalSuccess}</p>
            </div>
          </div>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
              <ClockCircleOutlined />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Menunggu (PENDING)</p>
              <p className="text-2xl font-bold text-gray-800">{totalPending}</p>
            </div>
          </div>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-2xl">
              <CloseCircleOutlined />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Gagal (FAILED)</p>
              <p className="text-2xl font-bold text-gray-800">{totalFailed}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Chips */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <DollarOutlined className="text-gray-400 text-lg mr-1" />
        {FILTERS.map((item) => (
          <Button
            key={item.key}
            className={filter === item.key ? '!bg-[#0c2340] !text-white' : ''}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card
        title={<span className="font-bold">Riwayat Pembayaran Jamaah</span>}
        extra={
          <span className="text-sm text-gray-500">
            Total tampil: <span className="font-bold text-gray-800">{formatCurrency(totalAmount)}</span>
          </span>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredPayments}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} transaksi`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default PaymentsPage;
