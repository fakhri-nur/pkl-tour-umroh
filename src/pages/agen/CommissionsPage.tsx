import { Card, Button, Table, Tag, Modal, message } from 'antd';
import {
  WalletOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAgenStore, ICommissionRecord } from '@/store/agenStore';

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const CommissionsPage = () => {
  const { commissions, markCommissionPaid } = useAgenStore();

  const pendingTotal = commissions
    .filter((c) => c.status === 'PENDING')
    .reduce((sum, c) => sum + c.amount, 0);
  const paidTotal = commissions
    .filter((c) => c.status === 'PAID')
    .reduce((sum, c) => sum + c.amount, 0);

  const columns: ColumnsType<ICommissionRecord> = [
    {
      title: 'KETERANGAN',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: 'TANGGAL',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'NOMINAL (Rp)',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%',
      render: (amount: number) => (
        <span className="font-bold text-gray-800">{formatRupiah(amount)}</span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (status: string) => {
        const config = status === 'PENDING' 
          ? { color: 'warning', text: 'PENDING' }
          : { color: 'success', text: 'PAID' };
        return <Tag color={config.color} className="font-semibold">{config.text}</Tag>;
      },
    },
  ];

  const handleWithdraw = () => {
    Modal.confirm({
      title: 'Tarik Dana (Withdraw)',
      icon: <BankOutlined />,
      content: `Apakah Anda yakin ingin menarik dana komisi sebesar ${formatRupiah(pendingTotal)}?`,
      okText: 'Tarik Dana',
      cancelText: 'Batal',
      okButtonProps: { className: '!bg-[#0c2340]' },
      onOk: () => {
        commissions
          .filter((c) => c.status === 'PENDING')
          .forEach((c) => markCommissionPaid(c.id));
        message.success(`Dana komisi ${formatRupiah(pendingTotal)} berhasil ditarik!`);
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Komisi Penjualan</h1>
            <p className="text-gray-600 mt-1">Pantau komisi dari setiap pendaftaran jamaah</p>
          </div>
          <Button
            type="primary"
            icon={<BankOutlined />}
            size="large"
            className="!bg-[#0c2340]"
            disabled={pendingTotal === 0}
            onClick={handleWithdraw}
          >
            Tarik Dana (Withdraw)
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
              <ClockCircleOutlined />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Belum Dicairkan (Pending)</p>
              <p className="text-2xl font-bold text-yellow-600">{formatRupiah(pendingTotal)}</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0c2340] text-white flex items-center justify-center text-2xl">
              <CheckCircleOutlined />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Sudah Dicairkan</p>
              <p className="text-2xl font-bold text-gray-800">{formatRupiah(paidTotal)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Riwayat Komisi */}
      <Card
        title={<span className="font-bold">Riwayat Komisi</span>}
        extra={<WalletOutlined className="text-gray-400" />}
      >
        <Table
          columns={columns}
          dataSource={commissions}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} transaksi komisi`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default CommissionsPage;