import { useState } from 'react';
import { Card, Button, Input, Select, Table, Avatar, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  StopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface UserData {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

const UserRolesPage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const roleConfig: Record<string, { color: string; bgColor: string }> = {
    'Super Admin': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
    'Administrator': { color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
    'Marketing & Keuangan': { color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200' },
    'Agen Cabang': { color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-200' },
    'Tour Leader & Pembimbing': { color: 'text-cyan-700', bgColor: 'bg-cyan-50 border-cyan-200' },
    'Nasabah': { color: 'text-slate-700', bgColor: 'bg-slate-50 border-slate-200' },
  };

  const columns: ColumnsType<UserData> = [
    {
      title: 'PENGGUNA',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text: string, record: UserData) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{text}</span>
            <span className="text-gray-500 text-sm">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'ROLE (PERAN)',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      render: (role: string) => {
        const config = roleConfig[role] || { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200' };
        return (
          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase border ${config.bgColor} ${config.color}`}>
            {role}
          </span>
        );
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className={`text-sm font-medium ${status === 'active' ? 'text-green-700' : 'text-gray-500'}`}>
            {status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
    },
    {
      title: 'TERAKHIR LOGIN',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: '20%',
      render: (text: string) => <span className="text-gray-600 text-sm">{text}</span>,
    },
    {
      title: 'AKSI',
      key: 'action',
      width: '15%',
      render: (_, record: UserData) => (
        <Space size="small">
          <Tooltip title="Edit Pengguna">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? 'Blokir Pengguna' : 'Aktifkan Pengguna'}>
            <Button
              type="text"
              icon={<StopOutlined />}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const userData: UserData[] = [
    {
      key: '1',
      id: 'USR-001',
      name: 'Ahmad Fikri',
      email: 'superadmin@intantravel.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2026-08-05 09:15:23',
    },
    {
      key: '2',
      id: 'USR-002',
      name: 'Budi Santoso',
      email: 'admin@intantravel.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2026-08-04 16:42:10',
    },
    {
      key: '3',
      id: 'USR-003',
      name: 'Siti Aminah',
      email: 'marketing-keuangan@intantravel.com',
      role: 'Marketing & Keuangan',
      status: 'active',
      lastLogin: '2026-08-04 14:30:45',
    },
    {
      key: '4',
      id: 'USR-004',
      name: 'Rudi Hermawan',
      email: 'agen@intantravel.com',
      role: 'Agen Cabang',
      status: 'active',
      lastLogin: '2026-08-03 11:20:15',
    },
    {
      key: '5',
      id: 'USR-005',
      name: 'Dewi Lestari',
      email: 'tourleader-pembimbing@intantravel.com',
      role: 'Tour Leader & Pembimbing',
      status: 'active',
      lastLogin: '2026-08-02 08:45:30',
    },
    {
      key: '6',
      id: 'USR-006',
      name: 'Muhammad Rizki',
      email: 'nasabah@intantravel.com',
      role: 'Nasabah',
      status: 'inactive',
      lastLogin: '2026-07-28 13:10:00',
    },
    {
      key: '7',
      id: 'USR-007',
      name: 'Fatimah Zahra',
      email: 'admin2@intantravel.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2026-08-05 07:30:12',
    },
    {
      key: '8',
      id: 'USR-008',
      name: 'Hendra Gunawan',
      email: 'agen2@intantravel.com',
      role: 'Agen Cabang',
      status: 'active',
      lastLogin: '2026-08-04 18:55:40',
    },
  ];

  const filteredData = userData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manajemen Pengguna (User Roles)</h1>
            <p className="text-gray-600 mt-1">Kelola akses & peran pengguna sistem</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} size="large" className="!bg-[#0c2340]">
            Tambah Pengguna
          </Button>
        </div>

        <Card>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Cari nama atau email pengguna..."
              prefix={<SearchOutlined className="text-gray-400" />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1"
            />
            <Select
              size="large"
              value={selectedRole}
              onChange={setSelectedRole}
              style={{ width: 250 }}
              options={[
                { value: 'all', label: 'Semua Role' },
                { value: 'Super Admin', label: 'Super Admin' },
                { value: 'Administrator', label: 'Administrator' },
                { value: 'Marketing & Keuangan', label: 'Marketing & Keuangan' },
                { value: 'Agen Cabang', label: 'Agen Cabang' },
                { value: 'Tour Leader & Pembimbing', label: 'Tour Leader & Pembimbing' },
                { value: 'Nasabah', label: 'Nasabah' },
              ]}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} pengguna`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default UserRolesPage;
