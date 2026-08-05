import { useState } from 'react';
import { Card, Button, Input, Select, Table, Tag, Space } from 'antd';
import {
  DownloadOutlined,
  SearchOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface AuditLogData {
  key: string;
  timestamp: string;
  user: string;
  role: string;
  ip: string;
  action: string;
  module: string;
  description: string;
}

const AuditLogsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');

  const actionConfig: Record<string, { color: string }> = {
    CREATE: { color: 'success' },
    UPDATE: { color: 'processing' },
    DELETE: { color: 'error' },
    LOGIN: { color: 'cyan' },
    LOGOUT: { color: 'default' },
    EXPORT: { color: 'purple' },
    VIEW: { color: 'blue' },
  };

  const columns: ColumnsType<AuditLogData> = [
    {
      title: 'WAKTU & TANGGAL',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '15%',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <ClockCircleOutlined className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: 'PENGGUNA',
      dataIndex: 'user',
      key: 'user',
      width: '20%',
      render: (text: string, record: AuditLogData) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{text}</span>
          <span className="text-xs text-gray-500">{record.role}</span>
          <span className="text-xs text-gray-400 font-mono">{record.ip}</span>
        </div>
      ),
    },
    {
      title: 'AKSI',
      dataIndex: 'action',
      key: 'action',
      width: '12%',
      render: (action: string) => {
        const config = actionConfig[action] || { color: 'default' };
        return (
          <Tag color={config.color} className="font-semibold">
            {action}
          </Tag>
        );
      },
    },
    {
      title: 'MODUL',
      dataIndex: 'module',
      key: 'module',
      width: '15%',
      render: (module: string) => {
        const moduleLabels: Record<string, string> = {
          Authentication: 'Autentikasi',
          'User Management': 'Manajemen Pengguna',
          'Global Settings': 'Pengaturan Global',
        };
        return (
          <span className="text-sm font-medium text-gray-700">
            {moduleLabels[module] || module}
          </span>
        );
      },
    },
    {
      title: 'DESKRIPSI AKTIVITAS',
      dataIndex: 'description',
      key: 'description',
      width: '38%',
      render: (text: string) => (
        <span className="text-sm text-gray-600">{text}</span>
      ),
    },
  ];

  const auditData: AuditLogData[] = [
    {
      key: '1',
      timestamp: '2026-08-05 09:15:23',
      user: 'Ahmad Fikri',
      role: 'Super Admin',
      ip: '192.168.1.100',
      action: 'LOGIN',
      module: 'Authentication',
      description: 'Berhasil login ke portal Super Admin',
    },
    {
      key: '2',
      timestamp: '2026-08-05 09:12:45',
      user: 'Budi Santoso',
      role: 'Administrator',
      ip: '192.168.1.105',
      action: 'UPDATE',
      module: 'User Management',
      description: 'Mengubah role pengguna "Siti Aminah" dari Marketing menjadi Marketing & Keuangan',
    },
    {
      key: '3',
      timestamp: '2026-08-05 09:10:12',
      user: 'Ahmad Fikri',
      role: 'Super Admin',
      ip: '192.168.1.100',
      action: 'CREATE',
      module: 'Paket Umrah',
      description: 'Menambahkan paket baru "Umrah Ramadan 2026 - 12 Hari"',
    },
    {
      key: '4',
      timestamp: '2026-08-05 08:55:30',
      user: 'Dewi Lestari',
      role: 'Tour Leader',
      ip: '192.168.1.120',
      action: 'VIEW',
      module: 'Manifest Jamaah',
      description: 'Melihat manifest jamaah keberangkatan tanggal 15 Agustus 2026',
    },
    {
      key: '5',
      timestamp: '2026-08-05 08:45:18',
      user: 'Siti Aminah',
      role: 'Marketing & Keuangan',
      ip: '192.168.1.110',
      action: 'EXPORT',
      module: 'Laporan Keuangan',
      description: 'Mengekspor laporan pembayaran bulan Juli 2026 ke format Excel',
    },
    {
      key: '6',
      timestamp: '2026-08-05 08:30:05',
      user: 'Rudi Hermawan',
      role: 'Agen Cabang',
      ip: '192.168.1.115',
      action: 'UPDATE',
      module: 'Transaksi',
      description: 'Memperbarui status pembayaran TRX-2026-001234 menjadi "Lunas"',
    },
    {
      key: '7',
      timestamp: '2026-08-05 08:15:40',
      user: 'Ahmad Fikri',
      role: 'Super Admin',
      ip: '192.168.1.100',
      action: 'DELETE',
      module: 'User Management',
      description: 'Menghapus akun pengguna "User Test 123" (inactive selama 6 bulan)',
    },
    {
      key: '8',
      timestamp: '2026-08-05 08:00:22',
      user: 'Fatimah Zahra',
      role: 'Administrator',
      ip: '192.168.1.108',
      action: 'LOGIN',
      module: 'Authentication',
      description: 'Berhasil login ke portal Admin',
    },
    {
      key: '9',
      timestamp: '2026-08-04 23:45:15',
      user: 'Budi Santoso',
      role: 'Administrator',
      ip: '192.168.1.105',
      action: 'LOGOUT',
      module: 'Authentication',
      description: 'Logout dari sistem',
    },
    {
      key: '10',
      timestamp: '2026-08-04 22:30:50',
      user: 'Ahmad Fikri',
      role: 'Super Admin',
      ip: '192.168.1.100',
      action: 'UPDATE',
      module: 'Global Settings',
      description: 'Mengubah zona waktu sistem dari WITA ke WIB',
    },
  ];

  const filteredData = auditData.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchText.toLowerCase()) ||
      log.description.toLowerCase().includes(searchText.toLowerCase()) ||
      log.ip.includes(searchText);
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesModule && matchesAction;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Log Audit Sistem</h1>
            <p className="text-gray-600 mt-1">Riwayat aktivitas & jejak audit sistem</p>
          </div>
          <Button type="primary" icon={<DownloadOutlined />} size="large" className="!bg-[#0c2340]">
            Ekspor CSV
          </Button>
        </div>

        <Card>
          <div className="mb-6">
            <Space direction="vertical" size="middle" className="w-full">
              <Input
                placeholder="Cari pengguna, deskripsi, atau IP address..."
                prefix={<SearchOutlined className="text-gray-400" />}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  size="large"
                  value={selectedModule}
                  onChange={setSelectedModule}
                  style={{ width: '100%', maxWidth: 300 }}
                  placeholder="Filter berdasarkan Modul"
                  options={[
                    { value: 'all', label: 'Semua Modul' },
                    { value: 'Authentication', label: 'Autentikasi' },
                    { value: 'User Management', label: 'Manajemen Pengguna' },
                    { value: 'Paket Umrah', label: 'Paket Umrah' },
                    { value: 'Transaksi', label: 'Transaksi' },
                    { value: 'Laporan Keuangan', label: 'Laporan Keuangan' },
                    { value: 'Global Settings', label: 'Pengaturan Global' },
                    { value: 'Manifest Jamaah', label: 'Manifest Jamaah' },
                  ]}
                />
                <Select
                  size="large"
                  value={selectedAction}
                  onChange={setSelectedAction}
                  style={{ width: '100%', maxWidth: 250 }}
                  placeholder="Filter berdasarkan Aksi"
                  options={[
                    { value: 'all', label: 'Semua Aksi' },
                    { value: 'CREATE', label: 'CREATE' },
                    { value: 'UPDATE', label: 'UPDATE' },
                    { value: 'DELETE', label: 'DELETE' },
                    { value: 'LOGIN', label: 'LOGIN' },
                    { value: 'LOGOUT', label: 'LOGOUT' },
                    { value: 'EXPORT', label: 'EXPORT' },
                    { value: 'VIEW', label: 'VIEW' },
                  ]}
                />
              </div>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} log aktivitas`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AuditLogsPage;
