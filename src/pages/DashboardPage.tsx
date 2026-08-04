import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useCustomers } from '@/hooks/useCustomers';
import { usePackages } from '@/hooks/usePackages';
import { useBookings } from '@/hooks/useBookings';
import { formatCurrency } from '@/utils/formatter';
import type { ColumnsType } from 'antd/es/table';
import { IBooking } from '@/types/booking.type';

const DashboardPage = () => {
  const { data: customersData } = useCustomers({ limit: 5 });
  const { data: packagesData } = usePackages({ limit: 5 });
  const { data: bookingsData } = useBookings({ limit: 5 });

  const recentBookingColumns: ColumnsType<IBooking> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => `#${id.slice(0, 8)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          pending: 'orange',
          confirmed: 'blue',
          paid: 'green',
          cancelled: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => formatCurrency(price),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Pelanggan"
              value={customersData?.meta?.totalData || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Paket"
              value={packagesData?.meta?.totalData || 0}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Booking"
              value={bookingsData?.meta?.totalData || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Pendapatan"
              value={450000000}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <Card title="Booking Terbaru">
            <Table
              columns={recentBookingColumns}
              dataSource={bookingsData?.data || []}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
