import { Card, Progress, Tag, Alert } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: string;
  uptime: string;
}

interface SystemAlert {
  id: string;
  timestamp: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

const SystemHealthPage = () => {
  const services: ServiceStatus[] = [
    {
      name: 'Authentication API',
      status: 'operational',
      latency: '120ms',
      uptime: '99.98%',
    },
    {
      name: 'Main Database',
      status: 'operational',
      latency: '45ms',
      uptime: '99.99%',
    },
    {
      name: 'Payment Gateway Integration',
      status: 'degraded',
      latency: '450ms',
      uptime: '98.50%',
    },
    {
      name: 'Storage & CDN',
      status: 'operational',
      latency: '85ms',
      uptime: '99.95%',
    },
    {
      name: 'Email Service',
      status: 'operational',
      latency: '210ms',
      uptime: '99.92%',
    },
    {
      name: 'SMS Gateway',
      status: 'operational',
      latency: '180ms',
      uptime: '99.88%',
    },
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      timestamp: '2026-08-05 09:15:00',
      severity: 'warning',
      message: 'Payment Gateway response time meningkat di atas threshold (450ms)',
    },
    {
      id: '2',
      timestamp: '2026-08-05 08:30:00',
      severity: 'info',
      message: 'Backup database harian berhasil diselesaikan (Duration: 45 menit)',
    },
    {
      id: '3',
      timestamp: '2026-08-05 07:45:00',
      severity: 'warning',
      message: 'Penggunaan CPU server mencapai 78% pada pukul 07:40',
    },
    {
      id: '4',
      timestamp: '2026-08-04 22:15:00',
      severity: 'error',
      message: 'Failed authentication attempts dari IP 103.xxx.xxx.xxx (5 kali)',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleOutlined className="text-green-500 text-lg" />;
      case 'degraded':
        return <ExclamationCircleOutlined className="text-yellow-500 text-lg" />;
      case 'down':
        return <CloseCircleOutlined className="text-red-500 text-lg" />;
      default:
        return <CheckCircleOutlined className="text-gray-500 text-lg" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'border-green-200 bg-green-50';
      case 'degraded':
        return 'border-yellow-200 bg-yellow-50';
      case 'down':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return <Tag color="success">Operational</Tag>;
      case 'degraded':
        return <Tag color="warning">Degraded</Tag>;
      case 'down':
        return <Tag color="error">Down</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const uptimeHistory = [
    { day: '75d ago', status: 'operational' },
    { day: '70d ago', status: 'operational' },
    { day: '65d ago', status: 'operational' },
    { day: '60d ago', status: 'operational' },
    { day: '55d ago', status: 'degraded' },
    { day: '50d ago', status: 'operational' },
    { day: '45d ago', status: 'operational' },
    { day: '40d ago', status: 'operational' },
    { day: '35d ago', status: 'operational' },
    { day: '30d ago', status: 'operational' },
    { day: '25d ago', status: 'operational' },
    { day: '20d ago', status: 'degraded' },
    { day: '15d ago', status: 'operational' },
    { day: '10d ago', status: 'operational' },
    { day: '5d ago', status: 'operational' },
    { day: 'Today', status: 'operational' },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pemantau Kesehatan Sistem</h1>
        <p className="text-gray-600 mt-1">Status & ketersediaan layanan sistem</p>
      </div>

      <Alert
        message="Penurunan Kinerja Sebagian Sistem"
        description="Payment Gateway mengalami peningkatan latency. Tim teknis sedang menginvestigasi."
        type="warning"
        icon={<WarningOutlined />}
        showIcon
        className="mb-6"
        closable
      />

      <div className="mb-6">
        <Card title={<span className="font-bold">Ketersediaan Layanan Inti</span>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 transition-all hover:shadow-md ${getStatusColor(
                  service.status
                )}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{service.name}</h4>
                    {getStatusText(service.status)}
                  </div>
                  {getStatusIcon(service.status)}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Latency</span>
                    <span className="font-semibold text-gray-800">{service.latency}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Uptime (30d)</span>
                    <span className="font-semibold text-gray-800">{service.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Ketersediaan (30 Hari Terakhir)</h3>
          <div className="flex items-center gap-1 mb-4">
            {uptimeHistory.map((item, index) => {
              let barColor = 'bg-green-500';
              if (item.status === 'degraded') barColor = 'bg-yellow-500';
              if (item.status === 'down') barColor = 'bg-red-500';

              return (
                <div
                  key={index}
                  className={`flex-1 h-12 ${barColor} rounded hover:opacity-80 transition-opacity cursor-pointer`}
                  title={`${item.day}: ${item.status}`}
                ></div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>30 hari yang lalu</span>
            <span>Hari ini</span>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600">Degraded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Down</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Metrik Server</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                <span className="text-sm font-bold text-gray-800">24%</span>
              </div>
              <Progress percent={24} strokeColor="#52c41a" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                <span className="text-sm font-bold text-gray-800">4.2 GB / 16 GB</span>
              </div>
              <Progress percent={26} strokeColor="#1890ff" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Disk Usage</span>
                <span className="text-sm font-bold text-gray-800">156 GB / 500 GB</span>
              </div>
              <Progress percent={31} strokeColor="#722ed1" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Network I/O</span>
                <span className="text-sm font-bold text-gray-800">45 Mbps</span>
              </div>
              <Progress percent={18} strokeColor="#faad14" />
            </div>
          </div>
        </Card>
      </div>

      <Card title={<span className="font-bold">Peringatan Sistem (Alerts)</span>}>
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                alert.severity === 'error'
                  ? 'bg-red-50 border-red-200'
                  : alert.severity === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {alert.severity === 'error' && <CloseCircleOutlined className="text-red-600 text-lg" />}
                {alert.severity === 'warning' && <ExclamationCircleOutlined className="text-yellow-600 text-lg" />}
                {alert.severity === 'info' && <ClockCircleOutlined className="text-blue-600 text-lg" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Tag
                    color={
                      alert.severity === 'error'
                        ? 'error'
                        : alert.severity === 'warning'
                        ? 'warning'
                        : 'processing'
                    }
                    className="uppercase text-xs font-bold"
                  >
                    {alert.severity}
                  </Tag>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-800">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SystemHealthPage;
