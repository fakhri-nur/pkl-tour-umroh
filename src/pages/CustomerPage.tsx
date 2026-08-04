import { Table, Button, Space, Tag, Input, Card, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCustomers, useDeleteCustomer } from '@/hooks/useCustomers';
import { ICustomer } from '@/types/customer.type';
import { formatDate } from '@/utils/formatter';
import CustomerModal from '@/components/CustomerModal';
import type { ColumnsType } from 'antd/es/table';

const CustomerPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | undefined>();
  const { data, isLoading } = useCustomers({ page, limit: 10, search });
  const { mutate: deleteCustomer } = useDeleteCustomer();

  const handleEdit = (record: ICustomer) => {
    setSelectedCustomer(record);
    setModalOpen(true);
  };

  const handleDelete = (record: ICustomer) => {
    Modal.confirm({
      title: 'Hapus Pelanggan',
      icon: <ExclamationCircleOutlined />,
      content: `Apakah Anda yakin ingin menghapus pelanggan "${record.name}"?`,
      okText: 'Hapus',
      cancelText: 'Batal',
      okButtonProps: { danger: true },
      onOk: () => deleteCustomer(record.id),
    });
  };

  const handleAdd = () => {
    setSelectedCustomer(undefined);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCustomer(undefined);
  };

  const columns: ColumnsType<ICustomer> = [
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telepon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'NIK',
      dataIndex: 'identityNumber',
      key: 'identityNumber',
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Jenis Kelamin',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'L' ? 'blue' : 'pink'}>
          {gender === 'L' ? 'Laki-laki' : 'Perempuan'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (record: ICustomer) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Data Pelanggan</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Tambah Pelanggan
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Cari pelanggan..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Table
          columns={columns}
          dataSource={data?.data || []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.meta?.totalData || 0,
            onChange: (newPage) => setPage(newPage),
          }}
        />
      </Card>

      <CustomerModal
        open={modalOpen}
        onCancel={handleModalClose}
        customerData={selectedCustomer}
      />
    </div>
  );
};

export default CustomerPage;
