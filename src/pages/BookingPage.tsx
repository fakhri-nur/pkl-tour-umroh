import { Table, Button, Space, Tag, Select, Card, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useBookings, useDeleteBooking } from '@/hooks/useBookings';
import { IBooking } from '@/types/booking.type';
import { formatCurrency, formatDate } from '@/utils/formatter';
import BookingModal from '@/components/BookingModal';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

const BookingPage = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>();
  const { data, isLoading } = useBookings({ page, limit: 10, status });
  const { mutate: deleteBooking } = useDeleteBooking();

  const handleEdit = (record: IBooking) => {
    setSelectedBooking(record);
    setModalOpen(true);
  };

  const handleDelete = (record: IBooking) => {
    Modal.confirm({
      title: 'Hapus Booking',
      icon: <ExclamationCircleOutlined />,
      content: `Apakah Anda yakin ingin menghapus booking #${record.id.slice(0, 8)}?`,
      okText: 'Hapus',
      cancelText: 'Batal',
      okButtonProps: { danger: true },
      onOk: () => deleteBooking(record.id),
    });
  };

  const handleAdd = () => {
    setSelectedBooking(undefined);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBooking(undefined);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'orange',
      confirmed: 'blue',
      paid: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'default';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      unpaid: 'red',
      partial: 'orange',
      paid: 'green',
    };
    return colors[status] || 'default';
  };

  const columns: ColumnsType<IBooking> = [
    {
      title: 'ID Booking',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `#${id.slice(0, 8)}`,
    },
    {
      title: 'Tanggal Booking',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Total Harga',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Dibayar',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Sisa',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Status Booking',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status Pembayaran',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => (
        <Tag color={getPaymentStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (record: IBooking) => (
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
          <h1 className="text-2xl font-bold">Data Booking</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Tambah Booking
          </Button>
        </div>

        <div className="mb-4">
          <Select
            placeholder="Filter Status"
            allowClear
            value={status}
            onChange={setStatus}
            className="w-48"
          >
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="paid">Paid</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
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

      <BookingModal
        open={modalOpen}
        onCancel={handleModalClose}
        bookingData={selectedBooking}
      />
    </div>
  );
};

export default BookingPage;
