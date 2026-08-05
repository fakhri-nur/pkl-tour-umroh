import { useState } from 'react';
import { Card, Button, Input, Table, Tag, Avatar, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAgenStore, IJemaahRecord } from '@/store/agenStore';

const MyJemaahPage = () => {
  const navigate = useNavigate();
  const { jemaah } = useAgenStore();
  const [searchText, setSearchText] = useState('');

  const statusConfig: Record<string, { color: string; text: string }> = {
    REGISTERED: { color: 'blue', text: 'REGISTERED' },
    'DOWN PAYMENT': { color: 'warning', text: 'DOWN PAYMENT' },
    'FULLY PAID': { color: 'success', text: 'FULLY PAID' },
  };

  const columns: ColumnsType<IJemaahRecord> = [
    {
      title: 'DATA JAMAAH',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text: string, record: IJemaahRecord) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800">{text}</p>
            <p className="text-xs text-gray-500">{record.phone}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'PILIHAN PAKET',
      dataIndex: 'packageName',
      key: 'packageName',
      width: '25%',
      render: (text: string) => (
        <Tag color="cyan" className="font-medium">{text}</Tag>
      ),
    },
    {
      title: 'TANGGAL DAFTAR',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      width: '15%',
      render: (text: string) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: 'STATUS KEUANGAN',
      dataIndex: 'financeStatus',
      key: 'financeStatus',
      width: '20%',
      render: (status: string) => {
        const config = statusConfig[status] || statusConfig.REGISTERED;
        return <Tag color={config.color} className="font-semibold">{config.text}</Tag>;
      },
    },
    {
      title: 'DETAIL',
      key: 'action',
      width: '10%',
      render: () => (
        <Tooltip title="Lihat Detail Jamaah">
          <Button
            type="link"
            icon={<ArrowRightOutlined />}
            className="text-blue-600"
          >
            Detail
          </Button>
        </Tooltip>
      ),
    },
  ];

  const filteredData = jemaah.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.packageName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Jamaah Saya</h1>
            <p className="text-gray-600 mt-1">Kelola jamaah yang Anda daftarkan</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="!bg-[#0c2340]"
            onClick={() => navigate('/agen/registrations')}
          >
            Daftarkan Jamaah Baru
          </Button>
        </div>

        <Card>
          <div className="mb-4">
            <Input
              size="large"
              placeholder="Cari nama jamaah atau paket..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} jamaah`,
            }}
            scroll={{ x: 900 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default MyJemaahPage;