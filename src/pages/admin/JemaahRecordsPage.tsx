import { useState } from 'react';
import { Card, Button, Input, Tabs, Table, Avatar, Tag } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface JemaahData {
  key: string;
  id: string;
  name: string;
  avatar?: string;
  package: string;
  pnr: string;
  registrationDate: string;
  phone: string;
  email: string;
  status: 'registered' | 'documents-pending' | 'ready-to-depart' | 'departed' | 'cancelled';
}

const JemaahRecordsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const statusConfig: Record<string, { color: string; text: string }> = {
    'registered': { color: 'blue', text: 'Registered' },
    'documents-pending': { color: 'orange', text: 'Documents Pending' },
    'ready-to-depart': { color: 'green', text: 'Ready to Depart' },
    'departed': { color: 'purple', text: 'Departed' },
    'cancelled': { color: 'red', text: 'Cancelled' },
  };

  const columns: ColumnsType<JemaahData> = [
    {
      title: 'JAMAAH',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text: string, record: JemaahData) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{text}</span>
            <span className="text-gray-500 text-xs">ID: {record.id}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'PAKET & PNR',
      dataIndex: 'package',
      key: 'package',
      width: '20%',
      render: (text: string, record: JemaahData) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">{text}</p>
          <p className="text-xs text-gray-500 font-mono">PNR: {record.pnr}</p>
        </div>
      ),
    },
    {
      title: 'TGL REGISTRASI',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      width: '15%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'KONTAK',
      key: 'contact',
      width: '20%',
      render: (_, record: JemaahData) => (
        <div>
          <p className="text-sm text-gray-800">{record.phone}</p>
          <p className="text-xs text-gray-500">{record.email}</p>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const config = statusConfig[status] || statusConfig.registered;
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
      width: '5%',
      render: () => (
        <Button type="link" icon={<ArrowRightOutlined />} className="text-blue-600">
          Detail
        </Button>
      ),
    },
  ];

  const jemaahData: JemaahData[] = [
    {
      key: '1',
      id: 'JMH-2026-001',
      name: 'Siti Nurhaliza',
      package: 'Umrah Ramadan Premium 12 Hari',
      pnr: 'ABC123',
      registrationDate: '2026-08-01',
      phone: '+62 812-3456-7890',
      email: 'siti.nurhaliza@email.com',
      status: 'documents-pending',
    },
    {
      key: '2',
      id: 'JMH-2026-002',
      name: 'Ahmad Yusuf',
      package: 'Haji Plus 2026',
      pnr: 'DEF456',
      registrationDate: '2026-08-02',
      phone: '+62 813-9876-5432',
      email: 'ahmad.yusuf@email.com',
      status: 'ready-to-depart',
    },
    {
      key: '3',
      id: 'JMH-2026-003',
      name: 'Fatimah Azzahra',
      package: 'Umrah Reguler 9 Hari',
      pnr: 'GHI789',
      registrationDate: '2026-08-03',
      phone: '+62 814-1111-2222',
      email: 'fatimah.azzahra@email.com',
      status: 'registered',
    },
    {
      key: '4',
      id: 'JMH-2026-004',
      name: 'Muhammad Rizki',
      package: 'Umrah VIP 10 Hari',
      pnr: 'JKL012',
      registrationDate: '2026-07-28',
      phone: '+62 815-3333-4444',
      email: 'muhammad.rizki@email.com',
      status: 'departed',
    },
    {
      key: '5',
      id: 'JMH-2026-005',
      name: 'Dewi Lestari',
      package: 'Umrah Keluarga 14 Hari',
      pnr: 'MNO345',
      registrationDate: '2026-07-25',
      phone: '+62 816-5555-6666',
      email: 'dewi.lestari@email.com',
      status: 'cancelled',
    },
    {
      key: '6',
      id: 'JMH-2026-006',
      name: 'Hendra Gunawan',
      package: 'Umrah Reguler 9 Hari',
      pnr: 'PQR678',
      registrationDate: '2026-08-04',
      phone: '+62 817-7777-8888',
      email: 'hendra.gunawan@email.com',
      status: 'documents-pending',
    },
    {
      key: '7',
      id: 'JMH-2026-007',
      name: 'Rina Susanti',
      package: 'Haji Plus 2026',
      pnr: 'STU901',
      registrationDate: '2026-08-05',
      phone: '+62 818-9999-0000',
      email: 'rina.susanti@email.com',
      status: 'ready-to-depart',
    },
    {
      key: '8',
      id: 'JMH-2026-008',
      name: 'Bambang Setiawan',
      package: 'Umrah Ramadan Premium 12 Hari',
      pnr: 'VWX234',
      registrationDate: '2026-07-30',
      phone: '+62 819-1234-5678',
      email: 'bambang.setiawan@email.com',
      status: 'registered',
    },
  ];

  const filteredData = jemaahData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase()) ||
      item.pnr.toLowerCase().includes(searchText.toLowerCase());
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabItems = [
    { key: 'all', label: `Semua (${jemaahData.length})` },
    { key: 'registered', label: 'Registered' },
    { key: 'documents-pending', label: 'Documents Pending' },
    { key: 'ready-to-depart', label: 'Ready to Depart' },
    { key: 'departed', label: 'Departed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="p-8">
      {/* Banner Header */}
      <div className="mb-6 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Data Jemaah</h1>
            <p className="text-blue-200">Kelola data jamaah, registrasi, dan status keberangkatan</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="!bg-white !text-[#0c2340] hover:!bg-gray-100 font-semibold"
          >
            Register Baru
          </Button>
        </div>
      </div>

      <Card>
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            size="large"
            placeholder="Cari nama, ID jamaah, atau PNR..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>

        {/* Tabs */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} jamaah`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default JemaahRecordsPage;
