import { Card, Button, Table, Tag, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface NewsData {
  key: string;
  no: number;
  title: string;
  slug: string;
  category: string;
  status: 'published' | 'draft';
  lastModified: string;
}

const NewsPage = () => {
  const categoryConfig: Record<string, string> = {
    'Promo': 'red',
    'Kegiatan': 'blue',
    'Info': 'green',
    'Pengumuman': 'orange',
  };

  const columns: ColumnsType<NewsData> = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      width: '5%',
      render: (text: number) => <span className="font-semibold text-gray-600">{text}</span>,
    },
    {
      title: 'JUDUL ARTIKEL & SLUG',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
      render: (text: string, record: NewsData) => (
        <div>
          <p className="font-semibold text-gray-800 mb-1">{text}</p>
          <p className="text-xs text-gray-500 font-mono">{record.slug}</p>
        </div>
      ),
    },
    {
      title: 'KATEGORI',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (text: string) => (
        <Tag color={categoryConfig[text] || 'default'} className="font-semibold">
          {text}
        </Tag>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const config = status === 'published' 
          ? { color: 'success', text: 'Published' }
          : { color: 'warning', text: 'Draft' };
        return (
          <Tag color={config.color} className="font-semibold">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'TERAKHIR DIUBAH',
      dataIndex: 'lastModified',
      key: 'lastModified',
      width: '15%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'AKSI',
      key: 'action',
      width: '10%',
      render: () => (
        <Space size="small">
          <Tooltip title="Edit Artikel">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Hapus Artikel">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const newsData: NewsData[] = [
    {
      key: '1',
      no: 1,
      title: 'Promo Umrah Ramadan 2026 - Diskon Hingga 15%',
      slug: 'promo-umrah-ramadan-2026-diskon-15-persen',
      category: 'Promo',
      status: 'published',
      lastModified: '2026-08-05 10:30',
    },
    {
      key: '2',
      no: 2,
      title: 'Keberangkatan Umrah Batch 3 Maret 2026',
      slug: 'keberangkatan-umrah-batch-3-maret-2026',
      category: 'Kegiatan',
      status: 'published',
      lastModified: '2026-08-04 14:20',
    },
    {
      key: '3',
      no: 3,
      title: 'Panduan Lengkap Persiapan Dokumen Umrah',
      slug: 'panduan-lengkap-persiapan-dokumen-umrah',
      category: 'Info',
      status: 'published',
      lastModified: '2026-08-03 09:15',
    },
    {
      key: '4',
      no: 4,
      title: 'Pengumuman Jadwal Manasik Haji 2026',
      slug: 'pengumuman-jadwal-manasik-haji-2026',
      category: 'Pengumuman',
      status: 'published',
      lastModified: '2026-08-02 16:45',
    },
    {
      key: '5',
      no: 5,
      title: 'Tips Menjaga Kesehatan Selama Umrah',
      slug: 'tips-menjaga-kesehatan-selama-umrah',
      category: 'Info',
      status: 'draft',
      lastModified: '2026-08-01 11:30',
    },
    {
      key: '6',
      no: 6,
      title: 'Testimoni Jamaah Umrah Januari 2026',
      slug: 'testimoni-jamaah-umrah-januari-2026',
      category: 'Kegiatan',
      status: 'published',
      lastModified: '2026-07-30 08:20',
    },
    {
      key: '7',
      no: 7,
      title: 'Paket Wisata Halal Turki - Early Bird 20%',
      slug: 'paket-wisata-halal-turki-early-bird-20-persen',
      category: 'Promo',
      status: 'draft',
      lastModified: '2026-07-28 15:10',
    },
    {
      key: '8',
      no: 8,
      title: 'Perubahan Jadwal Layanan Customer Service',
      slug: 'perubahan-jadwal-layanan-customer-service',
      category: 'Pengumuman',
      status: 'published',
      lastModified: '2026-07-25 13:00',
    },
  ];

  const publishedCount = newsData.filter((n) => n.status === 'published').length;
  const draftCount = newsData.filter((n) => n.status === 'draft').length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelola Berita</h1>
            <p className="text-gray-600 mt-1">Publikasikan artikel, promo, dan pengumuman</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large" className="!bg-[#0c2340]">
            Tulis Berita
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-500 text-sm mb-1">Total Artikel</p>
            <p className="text-2xl font-bold text-gray-800">{newsData.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <p className="text-green-700 text-sm mb-1">Published</p>
            <p className="text-2xl font-bold text-green-700">{publishedCount}</p>
          </div>
          <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
            <p className="text-orange-700 text-sm mb-1">Draft</p>
            <p className="text-2xl font-bold text-orange-700">{draftCount}</p>
          </div>
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-blue-700 text-sm mb-1">Total Views</p>
            <p className="text-2xl font-bold text-blue-700">12.4K</p>
          </div>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={newsData}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} artikel`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default NewsPage;
