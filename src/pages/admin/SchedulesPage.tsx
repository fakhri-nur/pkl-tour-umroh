import { useState } from 'react';
import { Card, Button, Table, Tag, Progress, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface ScheduleData {
  key: string;
  category: string;
  packageName: string;
  packageCode: string;
  departureDate: string;
  airline: string;
  seatsUsed: number;
  seatsTotal: number;
  status: 'closed' | 'almost-full' | 'open';
}

const SchedulesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'umrah', label: 'Umrah' },
    { key: 'haji', label: 'Haji' },
    { key: 'tour', label: 'Tour' },
  ];

  const columns: ColumnsType<ScheduleData> = [
    {
      title: 'PAKET & KODE',
      dataIndex: 'packageName',
      key: 'packageName',
      width: '30%',
      render: (text: string, record: ScheduleData) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-xs text-gray-500 font-mono">{record.packageCode}</p>
        </div>
      ),
    },
    {
      title: 'JADWAL & MASKAPAI',
      dataIndex: 'departureDate',
      key: 'departureDate',
      width: '20%',
      render: (text: string, record: ScheduleData) => (
        <div>
          <p className="text-sm font-medium text-gray-800">{text}</p>
          <p className="text-xs text-gray-500">{record.airline}</p>
        </div>
      ),
    },
    {
      title: 'STATUS KURSI',
      key: 'seats',
      width: '25%',
      render: (_, record: ScheduleData) => {
        const percentage = Math.round((record.seatsUsed / record.seatsTotal) * 100);
        return (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">
                {record.seatsUsed} Terisi / {record.seatsTotal} Total
              </span>
              <span className="text-xs text-gray-500">{percentage}%</span>
            </div>
            <Progress
              percent={percentage}
              showInfo={false}
              strokeColor={percentage >= 90 ? '#ff4d4f' : percentage >= 70 ? '#faad14' : '#52c41a'}
            />
          </div>
        );
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          closed: { color: 'error', text: 'CLOSED' },
          'almost-full': { color: 'warning', text: 'ALMOST FULL' },
          open: { color: 'success', text: 'OPEN' },
        };
        const config = statusConfig[status] || statusConfig.open;
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
      width: '10%',
      render: () => (
        <Space size="small">
          <Tooltip title="Lihat Detail">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Edit Paket">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const schedulesData: ScheduleData[] = [
    {
      key: '1',
      category: 'umrah',
      packageName: 'Umrah Ramadan Premium 12 Hari',
      packageCode: 'UMR-2026-001',
      departureDate: '15 Maret 2026',
      airline: 'Garuda Indonesia',
      seatsUsed: 45,
      seatsTotal: 45,
      status: 'closed',
    },
    {
      key: '2',
      category: 'umrah',
      packageName: 'Umrah Reguler 9 Hari',
      packageCode: 'UMR-2026-002',
      departureDate: '22 April 2026',
      airline: 'Saudia Airlines',
      seatsUsed: 38,
      seatsTotal: 42,
      status: 'almost-full',
    },
    {
      key: '3',
      category: 'haji',
      packageName: 'Haji Plus 2026',
      packageCode: 'HAJ-2026-001',
      departureDate: '10 Juni 2026',
      airline: 'Emirates',
      seatsUsed: 28,
      seatsTotal: 50,
      status: 'open',
    },
    {
      key: '4',
      category: 'umrah',
      packageName: 'Umrah VIP 10 Hari',
      packageCode: 'UMR-2026-003',
      departureDate: '05 Mei 2026',
      airline: 'Qatar Airways',
      seatsUsed: 20,
      seatsTotal: 25,
      status: 'open',
    },
    {
      key: '5',
      category: 'umrah',
      packageName: 'Umrah Keluarga 14 Hari',
      packageCode: 'UMR-2026-004',
      departureDate: '18 Juni 2026',
      airline: 'Etihad Airways',
      seatsUsed: 32,
      seatsTotal: 40,
      status: 'open',
    },
    {
      key: '6',
      category: 'tour',
      packageName: 'Wisata Halal Turki 8 Hari',
      packageCode: 'TOUR-2026-001',
      departureDate: '12 Juli 2026',
      airline: 'Turkish Airlines',
      seatsUsed: 29,
      seatsTotal: 30,
      status: 'almost-full',
    },
    {
      key: '7',
      category: 'umrah',
      packageName: 'Umrah Express 7 Hari',
      packageCode: 'UMR-2026-005',
      departureDate: '25 Agustus 2026',
      airline: 'Lion Air',
      seatsUsed: 15,
      seatsTotal: 35,
      status: 'open',
    },
    {
      key: '8',
      category: 'haji',
      packageName: 'Haji Reguler 2026',
      packageCode: 'HAJ-2026-002',
      departureDate: '15 Juni 2026',
      airline: 'Garuda Indonesia',
      seatsUsed: 42,
      seatsTotal: 45,
      status: 'almost-full',
    },
  ];

  const filteredData =
    selectedCategory === 'all'
      ? schedulesData
      : schedulesData.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manajemen Paket Keberangkatan</h1>
            <p className="text-gray-600 mt-1">Kelola jadwal keberangkatan & ketersediaan kursi</p>
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
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} paket keberangkatan`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default SchedulesPage;
