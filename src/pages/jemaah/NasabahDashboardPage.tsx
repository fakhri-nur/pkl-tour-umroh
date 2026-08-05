import { Card, Button, Tag, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CalendarOutlined,
  RocketOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  SafetyCertificateOutlined,
  MoneyCollectOutlined,
  BookOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  FilePdfOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useJemaahStore } from '@/store/jemaahStore';

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const NasabahDashboardPage = () => {
  const navigate = useNavigate();
  const { documents } = useJemaahStore();

  const passportDoc = documents.find((d) => d.id === 'DOC-PASPOR');

  const documentStatusItems: { label: string; status: string }[] = [
    {
      label: 'Paspor',
      status: passportDoc?.status || 'missing',
    },
    {
      label: 'Visa',
      status: 'valid',
    },
  ];

  const getDocumentStatusView = (status: string) => {
    if (status === 'valid' || status === 'validated') {
      return <Tag color="success" className="font-semibold">Valid</Tag>;
    }
    if (status === 'pending') {
      return <Tag color="warning" className="font-semibold">Review</Tag>;
    }
    return <Tag color="error" className="font-semibold">Unggah</Tag>;
  };

  return (
    <div className="p-8">
      {/* Greeting Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assalamu'alaikum, Bapak Ahmad</h1>
          <p className="text-gray-600 mt-1">Semoga ibadah Anda diberi kelancaran dan keberkahan</p>
        </div>
        <span className="inline-flex items-center gap-2 bg-[#0c2340] text-white px-5 py-3 rounded-xl font-semibold text-sm">
          <ClockCircleOutlined />
          MENUJU KEBERANGKATAN: 45 HARI LAGI
        </span>
      </div>

      {/* Grid Atas - Detail Paket & Pembayaran */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Kiri - Card Paket */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] rounded-xl p-6 text-white mb-5">
            <h3 className="text-xl font-bold">Umrah Reguler</h3>
            <p className="text-orange-400 font-semibold text-sm mt-1">
              Paket Sakinah 9 Hari
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarOutlined className="text-green-600 text-lg" />
              <div>
                <p className="text-xs text-gray-500">Tanggal Keberangkatan</p>
                <p className="font-semibold text-gray-800">15 November 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RocketOutlined className="text-green-600 text-lg" />
              <div>
                <p className="text-xs text-gray-500">Maskapai</p>
                <p className="font-semibold text-gray-800">Saudia Airlines</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GlobalOutlined className="text-green-600 text-lg" />
              <div>
                <p className="text-xs text-gray-500">Manasik Terdekat</p>
                <p className="font-semibold text-gray-800">Sabtu, 20 September 2026 (Kantor Pusat)</p>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              block
              className="!bg-[#0c2340]"
              onClick={() => navigate('/jemaah/itinerary')}
            >
              Lihat Itinerary
            </Button>
          </div>
        </Card>

        {/* Kanan - Ringkasan Pembayaran */}
        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-5">Ringkasan Pembayaran</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Biaya</span>
              <span className="font-bold text-gray-800">{formatRupiah(35000000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Telah Dibayar</span>
              <span className="font-bold text-green-600">{formatRupiah(10000000)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="text-gray-500">Sisa Tagihan</span>
              <span className="font-bold text-red-600">{formatRupiah(25000000)}</span>
            </div>
            <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <span className="text-sm text-gray-700">Jatuh Tempo</span>
              <Tag color="warning" className="font-semibold">30 Oktober 2026</Tag>
            </div>
            <Button
              type="primary"
              size="large"
              block
              className="!bg-amber-500 hover:!bg-amber-600 !text-[#0c2340] font-bold"
              onClick={() => navigate('/jemaah/payments')}
            >
              Bayar Sekarang
            </Button>
          </div>
        </Card>
      </div>

      {/* Section Middle - Progress Persiapan */}
      <Card className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Progress Persiapan Keberangkatan</h3>
        <Steps
          current={3}
          items={[
            { title: 'Pendaftaran', icon: <CheckCircleOutlined /> },
            { title: 'Bayar DP', icon: <CheckCircleOutlined /> },
            { title: 'Dokumen', icon: <FolderOpenOutlined /> },
            { title: 'Proses Visa', icon: <SafetyCertificateOutlined /> },
            { title: 'Pelunasan', icon: <MoneyCollectOutlined /> },
            { title: 'Manasik', icon: <BookOutlined /> },
            { title: 'Keberangkatan', icon: <RocketOutlined /> },
          ]}
        />
      </Card>

      {/* Grid Bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Dokumen Singkat */}
        <Card
          title={<span className="font-bold">Status Dokumen</span>}
          extra={
            <Button type="link" className="!p-0" onClick={() => navigate('/jemaah/documents')}>
              Lihat Semua <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <div className="space-y-3">
            {documentStatusItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.status === 'missing' ? 'Belum diunggah' : 'Dokumen terverifikasi'}
                  </p>
                </div>
                {getDocumentStatusView(item.status)}
              </div>
            ))}
          </div>
        </Card>

        {/* Pusat Panduan */}
        <Card
          title={<span className="font-bold">Pusat Panduan</span>}
          extra={
            <Button type="link" className="!p-0" onClick={() => navigate('/jemaah/guides')}>
              Buka Panduan <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
              <PlayCircleOutlined className="text-blue-600 text-3xl" />
              <div>
                <p className="font-semibold text-gray-800">Video Tata Cara Ihram</p>
                <p className="text-xs text-gray-500">Pria & Wanita - Panduan lengkap</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200 hover:border-red-400 transition-colors cursor-pointer">
              <FilePdfOutlined className="text-red-600 text-3xl" />
              <div>
                <p className="font-semibold text-gray-800">Buku Panduan PDF</p>
                <p className="text-xs text-gray-500">Checklist & tuntunan ibadah umrah</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NasabahDashboardPage;