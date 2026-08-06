import { useNavigate } from 'react-router-dom';
import { Card, Table, Progress, Button, Tag } from 'antd';
import {
  PlusOutlined,
  TeamOutlined,
  UserAddOutlined,
  PercentageOutlined,
  RocketOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useMarketingStore, IMarketingLead, IMarketingCampaign } from '@/store/marketingStore';
import StatCard from './components/StatCard';
import LeadSourceBadge, { LeadStatusTag } from './components/Badges';
import { formatCurrency } from '@/utils/formatter';

const timeAgo = (dateIso: string): string => {
  const diffMs = Date.now() - new Date(dateIso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
};

const MarketingDashboardPage = () => {
  const navigate = useNavigate();
  const { campaigns, leads, financeSummary } = useMarketingStore();

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === 'New').length;
  const convertedLeads = leads.filter((lead) => lead.status === 'Converted').length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'Active');

  const leadColumns: ColumnsType<IMarketingLead> = [
    {
      title: 'NAMA',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-semibold text-gray-800">{text}</span>,
    },
    {
      title: 'SUMBER',
      dataIndex: 'source',
      key: 'source',
      render: (source: IMarketingLead['source']) => <LeadSourceBadge source={source} />,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: IMarketingLead['status']) => <LeadStatusTag status={status} />,
    },
    {
      title: 'WAKTU',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => <span className="text-xs text-gray-500">{timeAgo(createdAt)}</span>,
    },
  ];

  return (
    <div className="p-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Marketing & Keuangan</h1>
          <p className="text-gray-600 mt-1">
            Pantau performa kampanye, prospek, dan ringkasan keuangan perusahaan
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
          onClick={() => navigate('/marketing/campaigns')}
        >
          Buat Kampanye
        </Button>
      </div>

      {/* Section 1 - Performa Marketing */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">Performa Marketing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="TOTAL LEADS"
          value={totalLeads.toString()}
          badge="Semua Sumber"
          badgeColor="blue"
          icon={<TeamOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="NEW LEADS"
          value={newLeads.toString()}
          badge="Action Needed"
          badgeColor="red"
          icon={<UserAddOutlined />}
          color="bg-cyan-100 text-cyan-600"
        />
        <StatCard
          title="CONVERSION RATE"
          value={`${conversionRate.toFixed(1)}%`}
          badge="All Leads"
          badgeColor="green"
          icon={<PercentageOutlined />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="ACTIVE CAMPAIGNS"
          value={activeCampaigns.length.toString()}
          badge="Berjalan"
          badgeColor="orange"
          icon={<RocketOutlined />}
          color="bg-orange-100 text-orange-600"
          action={{
            text: 'Lihat Kampanye',
            onClick: () => navigate('/marketing/campaigns'),
          }}
        />
      </div>

      {/* Section 2 - Ringkasan Keuangan */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">Ringkasan Keuangan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="TOTAL INFLOW MTD"
          value={formatCurrency(financeSummary.totalInflowMtd)}
          badge="+12.5%"
          badgeColor="green"
          icon={<RiseOutlined />}
          color="bg-emerald-100 text-emerald-600"
          footer="Month to Date • Naik dibanding bulan lalu"
        />
        <StatCard
          title="PENDING PAYMENTS"
          value={`${financeSummary.pendingPayments} Invoices`}
          badge="Menunggu Verifikasi"
          badgeColor="orange"
          icon={<ClockCircleOutlined />}
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="OUTSTANDING RECEIVABLES"
          value={formatCurrency(financeSummary.outstandingReceivables)}
          badge="Action Required"
          badgeColor="red"
          icon={<AlertOutlined />}
          color="bg-red-100 text-red-600"
          action={{
            text: 'Kelola Piutang',
            onClick: () => navigate('/marketing/finance'),
          }}
        />
      </div>

      {/* Grid Bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiri - Campaign Performance */}
        <Card
          title={<span className="font-bold">Campaign Performance</span>}
          extra={
            <Button type="link" className="!p-0 !h-auto text-blue-600 font-medium" onClick={() => navigate('/marketing/campaigns')}>
              Lihat Semua <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <div className="space-y-5">
            {activeCampaigns.map((campaign: IMarketingCampaign) => {
              const usedPercent = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;
              return (
                <div key={campaign.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{campaign.name}</span>
                      <Tag className="ml-2 text-xs">{campaign.platform}</Tag>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{usedPercent}%</span>
                  </div>
                  <Progress
                    percent={usedPercent}
                    showInfo={false}
                    strokeColor={usedPercent >= 80 ? '#ff4d4f' : '#f59e0b'}
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>
                      Spent <span className="font-semibold text-gray-700">{formatCurrency(campaign.spent)}</span>
                    </span>
                    <span>
                      Revenue <span className="font-semibold text-green-600">{formatCurrency(campaign.revenue)}</span>
                    </span>
                    <span>
                      Konversi{' '}
                      <span className="font-semibold text-blue-600">{campaign.conversions}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Kanan - Latest Leads */}
        <Card
          title={<span className="font-bold">Latest Leads</span>}
          extra={
            <Button type="link" className="!p-0 !h-auto text-blue-600 font-medium" onClick={() => navigate('/marketing/leads')}>
              Lihat Semua <ArrowRightOutlined className="text-xs ml-1" />
            </Button>
          }
        >
          <Table
            columns={leadColumns}
            dataSource={[...leads]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)}
            pagination={false}
            scroll={{ x: 480 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default MarketingDashboardPage;
