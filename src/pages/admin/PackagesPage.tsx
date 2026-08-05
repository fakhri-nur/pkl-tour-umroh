import { useState } from 'react';
import { Card, Button, Table, Tag, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface PackageData {
  key: string;
  category: string;
  name: string;
  duration: string;
  price: string;
}

const PackagesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'haji-umrah', label: 'Haji & Umrah' },
    { key: 'visa-dokumen', label: 'Visa & Dokumen' },
    { key: 'tour-wisata', label: 'Tour & Wisata' },
    { key: 'corporate-transport', label: 'Corporate & Transport' },
  ];

  const categoryColors: Record<string, string> = {
    'haji-umrah': 'green',
    'visa-dokumen': 'blue',
    'tour-wisata': 'purple',
    'corporate-transport': 'orange',
  };

  const columns: ColumnsType<PackageData> = [
    {
      title: 'KATEGORI',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (category: string) => (
        <Tag color={categoryColors[category] || 'default'} className="font-semibold text-xs">
          {categories.find((c) => c.key === category)?.label || category}
        </Tag>
      ),
    },
    {
      title: 'NAMA LAYANAN / PAKET',
      dataIndex: 'name',
      key: 'name',
      width: '45%',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'DURASI',
      dataIndex: 'duration',
      key: 'duration',
      width: '15%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'HARGA (IDR)',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (text: string) => <span className="font-bold text-gray-800">{text}</span>,
    },
    {
      title: 'AKSI',
      key: 'action',
      width: '10%',
      render: () => (
        <Space size="small">
          <Tooltip title="Edit Paket">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Hapus Paket">
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

  const packagesData: PackageData[] = [
    {
      key: '1',
      category: 'haji-umrah',
      name: 'Umrah Ramadan Premium 12 Hari',
      duration: '12 Hari',
      price: 'Rp 32.500.000',
    },
    {
      key: '2',
      category: 'haji-umrah',
      name: 'Umrah Reguler 9 Hari',
      duration: '9 Hari',
      price: 'Rp 28.000.000',
    },
    {
      key: '3',
      category: 'haji-umrah',
      name: 'Haji Plus 2026',
      duration: '40 Hari',
      price: 'Rp 85.000.000',
    },
    {
      key: '4',
      category: 'haji-umrah',
      name: 'Umrah VIP 10 Hari',
      duration: '10 Hari',
      price: 'Rp 45.000.000',
    },
    {
      key: '5',
      category: 'visa-dokumen',
      name: 'Pengurusan Visa Umrah',
      duration: '7-14 Hari',
      price: 'Rp 2.500.000',
    },
    {
      key: '6',
      category: 'visa-dokumen',
      name: 'Pengurusan Paspor Reguler',
      duration: '14 Hari',
      price: 'Rp 1.200.000',
    },
    {
      key: '7',
      category: 'tour-wisata',
      name: 'Wisata Halal Turki 8 Hari',
      duration: '8 Hari',
      price: 'Rp 22.000.000',
    },
    {
      key: '8',
      category: 'tour-wisata',
      name: 'Tour Eropa Muslim Friendly 14 Hari',
      duration: '14 Hari',
      price: 'Rp 45.000.000',
    },
    {
      key: '9',
      category: 'corporate-transport',
      name: 'Sewa Bus Pariwisata (Full Day)',
      duration: '1 Hari',
      price: 'Rp 3.500.000',
    },
    {
      key: '10',
      category: 'corporate-transport',
      name: 'Paket Meeting Corporate (50 Pax)',
      duration: 'Custom',
      price: 'Rp 25.000.000',
    },
  ];

  const filteredData =
    selectedCategory === 'all'
      ? packagesData
      : packagesData.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Master Paket Perjalanan</h1>
            <p className="text-gray-600 mt-1">Kelola katalog paket layanan & produk</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large" className="!bg-[#0c2340]">
            Tambah Paket
          </Button>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[#0c2340] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0c2340] hover:text-[#0c2340]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} paket`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default PackagesPage;
