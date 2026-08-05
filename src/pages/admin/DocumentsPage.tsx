import { Card, Button, Table, Tag, Space, Tooltip } from 'antd';
import {
  UploadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DocumentData {
  key: string;
  jemaahName: string;
  documentType: string;
  uploadDate: string;
  status: 'verified' | 'pending-review' | 'missing';
}

const DocumentsPage = () => {
  const documentTypeConfig: Record<string, string> = {
    'Passport': 'blue',
    'Visa': 'purple',
    'Buku Kuning': 'green',
    'KK': 'orange',
    'Akta Lahir': 'cyan',
    'Foto': 'magenta',
  };

  const statusConfig: Record<string, { color: string; text: string }> = {
    'verified': { color: 'success', text: 'Verified' },
    'pending-review': { color: 'warning', text: 'Pending Review' },
    'missing': { color: 'error', text: 'Missing' },
  };

  const columns: ColumnsType<DocumentData> = [
    {
      title: 'NAMA JAMAAH',
      dataIndex: 'jemaahName',
      key: 'jemaahName',
      width: '25%',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'JENIS DOKUMEN',
      dataIndex: 'documentType',
      key: 'documentType',
      width: '20%',
      render: (text: string) => (
        <Tag color={documentTypeConfig[text] || 'default'} className="font-semibold">
          {text}
        </Tag>
      ),
    },
    {
      title: 'TANGGAL UPLOAD',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      width: '20%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (status: string) => {
        const config = statusConfig[status] || statusConfig['pending-review'];
        return (
          <Tag color={config.color} className="font-semibold">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'AKSI',
      key: 'action',
      width: '15%',
      render: (_, record: DocumentData) => (
        <Space size="small">
          <Tooltip title="Review Dokumen">
            <Button
              type="primary"
              size="small"
              className={`${
                record.status === 'missing'
                  ? '!bg-gray-400 cursor-not-allowed'
                  : '!bg-blue-600'
              }`}
              disabled={record.status === 'missing'}
            >
              Review
            </Button>
          </Tooltip>
          {record.status !== 'missing' && (
            <Tooltip title="Lihat Dokumen">
              <Button
                type="text"
                icon={<EyeOutlined />}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const documentsData: DocumentData[] = [
    {
      key: '1',
      jemaahName: 'Siti Nurhaliza',
      documentType: 'Passport',
      uploadDate: '2026-08-01',
      status: 'pending-review',
    },
    {
      key: '2',
      jemaahName: 'Siti Nurhaliza',
      documentType: 'Visa',
      uploadDate: '2026-08-02',
      status: 'verified',
    },
    {
      key: '3',
      jemaahName: 'Ahmad Yusuf',
      documentType: 'Passport',
      uploadDate: '2026-08-03',
      status: 'verified',
    },
    {
      key: '4',
      jemaahName: 'Ahmad Yusuf',
      documentType: 'Buku Kuning',
      uploadDate: '-',
      status: 'missing',
    },
    {
      key: '5',
      jemaahName: 'Fatimah Azzahra',
      documentType: 'KK',
      uploadDate: '2026-08-04',
      status: 'verified',
    },
    {
      key: '6',
      jemaahName: 'Fatimah Azzahra',
      documentType: 'Foto',
      uploadDate: '2026-08-04',
      status: 'pending-review',
    },
    {
      key: '7',
      jemaahName: 'Muhammad Rizki',
      documentType: 'Passport',
      uploadDate: '2026-07-28',
      status: 'verified',
    },
    {
      key: '8',
      jemaahName: 'Muhammad Rizki',
      documentType: 'Visa',
      uploadDate: '2026-07-29',
      status: 'verified',
    },
    {
      key: '9',
      jemaahName: 'Dewi Lestari',
      documentType: 'Akta Lahir',
      uploadDate: '2026-07-30',
      status: 'pending-review',
    },
    {
      key: '10',
      jemaahName: 'Hendra Gunawan',
      documentType: 'Passport',
      uploadDate: '-',
      status: 'missing',
    },
  ];

  const totalDocuments = documentsData.length;
  const verifiedCount = documentsData.filter((d) => d.status === 'verified').length;
  const pendingCount = documentsData.filter((d) => d.status === 'pending-review').length;
  const missingCount = documentsData.filter((d) => d.status === 'missing').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pusat Dokumen</h1>
            <p className="text-gray-600 mt-1">Kelola & verifikasi dokumen jamaah</p>
          </div>
          <Button type="primary" icon={<UploadOutlined />} size="large" className="!bg-[#0c2340]">
            Upload Document
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-500 text-sm mb-1">Total Dokumen</p>
            <p className="text-2xl font-bold text-gray-800">{totalDocuments}</p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <p className="text-green-700 text-sm mb-1">Verified</p>
            <p className="text-2xl font-bold text-green-700">{verifiedCount}</p>
          </div>
          <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
            <p className="text-orange-700 text-sm mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-orange-700">{pendingCount}</p>
          </div>
          <div className="bg-red-50 rounded-lg border border-red-200 p-4">
            <p className="text-red-700 text-sm mb-1">Missing</p>
            <p className="text-2xl font-bold text-red-700">{missingCount}</p>
          </div>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={documentsData}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} dokumen`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default DocumentsPage;
