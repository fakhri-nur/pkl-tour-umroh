import { Table, Button, Space, Tag, Input, Card, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { usePackages, useDeletePackage } from '@/hooks/usePackages';
import { IPackage } from '@/types/package.type';
import { formatCurrency, formatDate } from '@/utils/formatter';
import PackageModal from '@/components/PackageModal';
import type { ColumnsType } from 'antd/es/table';

const PackagePage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IPackage | undefined>();
  const { data, isLoading } = usePackages({ page, limit: 10 });
  const { mutate: deletePackage } = useDeletePackage();

  const handleEdit = (record: IPackage) => {
    setSelectedPackage(record);
    setModalOpen(true);
  };

  const handleDelete = (record: IPackage) => {
    Modal.confirm({
      title: 'Hapus Paket',
      icon: <ExclamationCircleOutlined />,
      content: `Apakah Anda yakin ingin menghapus paket "${record.name}"?`,
      okText: 'Hapus',
      cancelText: 'Batal',
      okButtonProps: { danger: true },
      onOk: () => deletePackage(record.id),
    });
  };

  const handleAdd = () => {
    setSelectedPackage(undefined);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPackage(undefined);
  };

  const columns: ColumnsType<IPackage> = [
    {
      title: 'Nama Paket',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tipe',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'umroh' ? 'blue' : 'green'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Durasi',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} hari`,
    },
    {
      title: 'Keberangkatan',
      dataIndex: 'departureDate',
      key: 'departureDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Kuota',
      key: 'quota',
      render: (record: IPackage) => `${record.availableSeats}/${record.quota}`,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Aktif' : 'Nonaktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (record: IPackage) => (
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
          <h1 className="text-2xl font-bold">Paket Umroh & Haji</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Tambah Paket
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Cari paket..."
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

      <PackageModal
        open={modalOpen}
        onCancel={handleModalClose}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default PackagePage;
