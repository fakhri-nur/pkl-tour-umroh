import { Card, Table, Button, Tag, message } from 'antd';
import {
  DownloadOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  AuditOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  useMarketingStore,
  IPaymentVerification,
  VerificationUrgency,
  IFinanceTransaction,
  TransactionType,
} from '@/store/marketingStore';
import StatCard from './components/StatCard';
import { UrgencyTag } from './components/Badges';
import { formatCurrency } from '@/utils/formatter';

const FinancePage = () => {
  const { verifications, refundRequests, transactions, financeSummary, reviewVerification, reviewRefund } =
    useMarketingStore();

  const pendingVerifications = verifications.filter((item) => item.status === 'PENDING');
  const highPriorityAlert = refundRequests.find((item) => item.priority === 'High');

  const handleReviewVerification = (record: IPaymentVerification) => {
    reviewVerification(record.id);
    message.success(`Verifikasi ${record.invoiceNumber} (${record.jemaahName}) telah direview.`);
  };

  const handleReviewRefund = () => {
    if (!highPriorityAlert) return;
    reviewRefund(highPriorityAlert.id);
    message.success('Permintaan Refund telah masuk antrian review.');
  };

  const verificationColumns: ColumnsType<IPaymentVerification> = [
    {
      title: 'NAMA JEMAAH',
      dataIndex: 'jemaahName',
      key: 'jemaahName',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'NO. INVOICE',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text: string) => (
        <span className="font-mono text-sm font-semibold text-blue-600">{text}</span>
      ),
    },
    {
      title: 'NOMINAL',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span className="font-bold text-gray-800">{formatCurrency(amount)}</span>,
    },
    {
      title: 'JATUH TEMPO',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'URGENSI',
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency: VerificationUrgency) => <UrgencyTag urgency={urgency} />,
    },
    {
      title: 'AKSI',
      key: 'action',
      width: 110,
      render: (_, record: IPaymentVerification) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          disabled={record.status !== 'PENDING'}
          onClick={() => handleReviewVerification(record)}
        >
          Review
        </Button>
      ),
    },
  ];

  const transactionColumns: ColumnsType<IFinanceTransaction> = [
    {
      title: 'TANGGAL',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'DESKRIPSI',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span className="font-medium text-gray-800">{text}</span>,
    },
    {
      title: 'KATEGORI',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <Tag className="text-xs">{text}</Tag>,
    },
    {
      title: 'PEMASUKAN (+)',
      key: 'in',
      width: 180,
      render: (_, record: IFinanceTransaction) =>
        record.type === 'IN' ? (
          <span className="font-bold text-green-600 flex items-center gap-1">
            <CaretUpOutlined /> {formatCurrency(record.amount)}
          </span>
        ) : (
          <span className="text-gray-300">-</span>
        ),
    },
    {
      title: 'PENGELUARAN (-)',
      key: 'out',
      width: 180,
      render: (_, record: IFinanceTransaction) =>
        record.type === 'OUT' ? (
          <span className="font-bold text-red-600 flex items-center gap-1">
            <CaretDownOutlined /> {formatCurrency(record.amount)}
          </span>
        ) : (
          <span className="text-gray-300">-</span>
        ),
    },
  ];

  const transactionTypeTag = (type: TransactionType): string =>
    type === 'IN' ? 'success' : 'error';

  const documentStatusItems = [
    {
      label: 'Pending Invoices',
      value: financeSummary.pendingPayments,
      icon: <FileTextOutlined className="text-amber-500" />,
    },
    {
      label: 'Receipts Generated',
      value: 28,
      icon: <FileDoneOutlined className="text-green-600" />,
    },
    {
      label: 'Antrian Verifikasi',
      value: pendingVerifications.length,
      icon: <AuditOutlined className="text-blue-600" />,
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Keuangan</h1>
          <p className="text-gray-600 mt-1">
            Verifikasi pembayaran jemaah dan monitor arus kas perusahaan
          </p>
        </div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="large"
          className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
          onClick={() => message.success('Report keuangan berhasil diekspor (simulasi).')}
        >
          Export Report
        </Button>
      </div>

      {/* Stat Cards Keuangan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="TOTAL INFLOW MTD"
          value={formatCurrency(financeSummary.totalInflowMtd)}
          badge="+12.5%"
          badgeColor="green"
          icon={<RiseOutlined />}
          color="bg-emerald-100 text-emerald-600"
          footer="Month to Date"
        />
        <StatCard
          title="PENDING PAYMENTS"
          value={`${financeSummary.pendingPayments} Invoices`}
          badge="Menunggu Verifikasi"
          badgeColor="orange"
          icon={<ClockCircleOutlined />}
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="OUTSTANDING RECEIVABLES"
          value={formatCurrency(financeSummary.outstandingReceivables)}
          badge="Action Required"
          badgeColor="red"
          icon={<AlertOutlined />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Kiri - Payment Verification Queue */}
        <div className="lg:col-span-2">
          <Card title={<span className="font-bold">Payment Verification Queue</span>}>
            <Table
              columns={verificationColumns}
              dataSource={verifications}
              rowKey="id"
              pagination={{ pageSize: 5, showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total}` }}
              scroll={{ x: 800 }}
            />
          </Card>
        </div>

        {/* Kanan - Status Dokumen + Alert */}
        <div className="space-y-6">
          <Card title={<span className="font-bold">Status Dokumen</span>}>
            <div className="space-y-4">
              {documentStatusItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {highPriorityAlert && (
            <Card className="!border-red-300">
              <div className="flex items-center gap-2 mb-3">
                <AlertOutlined className="text-red-500 text-xl" />
                <h4 className="font-bold text-red-600">Perlu Perhatian</h4>
                <Tag color="error" className="font-semibold uppercase">
                  {highPriorityAlert.priority} Priority
                </Tag>
              </div>
              <p className="text-sm text-gray-700 mb-1">{highPriorityAlert.description}</p>
              <p className="text-2xl font-bold text-red-600 mb-4">
                {formatCurrency(highPriorityAlert.amount)}
              </p>
              <Button
                type="primary"
                danger
                icon={<EyeOutlined />}
                className="w-full"
                disabled={highPriorityAlert.status !== 'PENDING'}
                onClick={handleReviewRefund}
              >
                Review
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom - Riwayat Transaksi */}
      <Card
        title={<span className="font-bold">Riwayat Transaksi</span>}
        extra={
          <Tag color={transactionTypeTag('IN')} className="font-semibold">
            (+ Pemasukan)
          </Tag>
        }
      >
        <Table
          columns={transactionColumns}
          dataSource={transactions}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} transaksi`,
          }}
          scroll={{ x: 900 }}
        />
      </Card>
    </div>
  );
};

export default FinancePage;
