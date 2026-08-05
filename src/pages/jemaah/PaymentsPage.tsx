import { Card, Button, Tag, List, Divider, message } from 'antd';
import {
  BankOutlined,
  CheckCircleOutlined,
  WalletOutlined,
  ClockCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useJemaahStore, ITransactionRecord } from '@/store/jemaahStore';

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const PaymentsPage = () => {
  const { transactions } = useJemaahStore();

  const totalPrice = 35000000;
  const downPayment = 10000000;
  const remaining = totalPrice - downPayment;

  const handleVirtualAccount = () => {
    message.info('Virtual Account ditampilkan. Silakan transfer ke rekening yang ditunjuk.');
  };

  const handleManualConfirmation = () => {
    message.success('Konfirmasi pembayaran manual akan diproses oleh tim finance.');
  };

  const handleCopyVA = () => {
    message.success('Nomor Virtual Account disalin');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pembayaran & Riwayat</h1>
        <p className="text-gray-600 mt-1">Kelola tagihan dan pantau status pembayaran Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Header Card - Rincian Paket */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-5">Rincian Paket Perjalanan Anda</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Harga Paket</span>
              <span className="font-bold text-gray-800">{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uang Muka (DP)</span>
              <span className="font-semibold text-green-600">- {formatRupiah(downPayment)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="font-semibold text-gray-700">Total Sisa Tagihan</span>
              <span className="font-bold text-red-600">{formatRupiah(remaining)}</span>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="primary"
              size="large"
              icon={<BankOutlined />}
              className="!bg-[#0c2340] flex-1"
              onClick={handleVirtualAccount}
            >
              Transfer Bank (VA)
            </Button>
            <Button
              size="large"
              icon={<CheckCircleOutlined />}
              className="flex-1"
              onClick={handleManualConfirmation}
            >
              Konfirmasi Pembayaran Manual
            </Button>
          </div>
        </Card>

        {/* VA Info Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Virtual Account</h3>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Bank Muamalat - Virtual Account</p>
            <div className="flex items-center justify-between">
              <p className="font-mono font-bold text-gray-800 text-lg">9810 2026 0001</p>
              <Button
                type="text"
                icon={<CopyOutlined />}
                className="text-blue-600"
                onClick={handleCopyVA}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Berlaku hingga 30 Oktober 2026. Pembayaran otomatis terkonfirmasi.
            </p>
          </div>
        </Card>
      </div>

      {/* Riwayat Transaksi */}
      <Card
        title={<span className="font-bold">Riwayat Transaksi</span>}
        extra={<WalletOutlined className="text-gray-400" />}
      >
        <List
          dataSource={transactions}
          renderItem={(item: ITransactionRecord) => (
            <List.Item>
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-start gap-3">
                  {item.status === 'BERHASIL' ? (
                    <CheckCircleOutlined className="text-green-600 text-xl mt-1" />
                  ) : (
                    <ClockCircleOutlined className="text-yellow-600 text-xl mt-1" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{item.note}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-bold text-gray-800">{formatRupiah(item.amount)}</span>
                  <Tag
                    color={item.status === 'BERHASIL' ? 'success' : 'warning'}
                    className="font-semibold"
                  >
                    {item.status}
                  </Tag>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default PaymentsPage;