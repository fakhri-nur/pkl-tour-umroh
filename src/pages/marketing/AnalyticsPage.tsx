import { Card, Table, Progress, Button, Tag, Statistic, Row, Col, message } from 'antd';
import {
  DownloadOutlined,
  TrophyOutlined,
  WalletOutlined,
  AimOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useMarketingStore, LeadSource } from '@/store/marketingStore';
import { formatCurrency } from '@/utils/formatter';

interface CampaignEffectivenessRow {
  key: string;
  campaign: string;
  platform: string;
  spent: number;
  conversions: number;
  cpa: number;
}

const SOURCE_ACQUISITION_COLORS: Record<LeadSource, string> = {
  'Facebook Ads': '#1877f2',
  'Google Search': '#ea4335',
  Instagram: '#e1306c',
  Referral: '#22c55e',
  WhatsApp: '#25d366',
  Website: '#06b6d4',
};

const AnalyticsPage = () => {
  const { campaigns, leads } = useMarketingStore();

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'Active');

  const totalAdSpend = activeCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalConversions = activeCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const averageCpa = totalConversions > 0 ? Math.round(totalAdSpend / totalConversions) : 0;

  const sourceDistribution = leads.reduce<Record<LeadSource, number>>(
    (acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    },
    {
      'Facebook Ads': 0,
      'Google Search': 0,
      Instagram: 0,
      Referral: 0,
      WhatsApp: 0,
      Website: 0,
    }
  );

  const sourceEntries = Object.entries(sourceDistribution)
    .map(([source, count]) => ({ source: source as LeadSource, count }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  const totalLeads = leads.length;

  const effectivenessData: CampaignEffectivenessRow[] = activeCampaigns.map((campaign) => ({
    key: campaign.id,
    campaign: campaign.name,
    platform: campaign.platform,
    spent: campaign.spent,
    conversions: campaign.conversions,
    cpa: campaign.conversions > 0 ? Math.round(campaign.spent / campaign.conversions) : 0,
  }));

  const effectivenessColumns: ColumnsType<CampaignEffectivenessRow> = [
    {
      title: 'KAMPANYE',
      dataIndex: 'campaign',
      key: 'campaign',
      render: (text: string, record: CampaignEffectivenessRow) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <Tag className="mt-1 text-xs">{record.platform}</Tag>
        </div>
      ),
    },
    {
      title: 'TOTAL AD SPEND',
      dataIndex: 'spent',
      key: 'spent',
      render: (spent: number) => <span className="font-medium text-gray-800">{formatCurrency(spent)}</span>,
    },
    {
      title: 'KONVERSI',
      dataIndex: 'conversions',
      key: 'conversions',
      render: (conversions: number) => <span className="font-bold text-blue-600">{conversions}</span>,
    },
    {
      title: 'CPA (PER AKUISISI)',
      dataIndex: 'cpa',
      key: 'cpa',
      render: (cpa: number) => <span className="font-bold text-gray-800">{formatCurrency(cpa)}</span>,
    },
    {
      title: 'EFISIENSI',
      key: 'efficiency',
      render: (_, record: CampaignEffectivenessRow) => {
        const average = averageCpa > 0 ? record.cpa / averageCpa : 1;
        const efficient = record.cpa <= average;
        return (
          <Tag color={efficient ? 'success' : 'warning'} className="font-semibold">
            {efficient ? 'EFISIEN' : 'DI ATAS RATA-RATA'}
          </Tag>
        );
      },
    },
  ];

  const handleExport = () => {
    message.success('Laporan analitik berhasil diekspor (simulasi).');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Analisis performa akuisisi dan efektivitas kampanye</p>
        </div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="large"
          className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
          onClick={() => {
            handleExport();
          }}
        >
          Export Laporan
        </Button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CPA Card */}
        <Card
          title={
            <span className="font-bold flex items-center gap-2">
              <TrophyOutlined className="text-amber-500" /> Cost per Acquisition (CPA)
            </span>
          }
        >
          <div className="mb-6">
            <Statistic
              title="Rata-rata Biaya per Akuisisi"
              value={averageCpa}
              prefix="Rp"
              precision={0}
              valueStyle={{ color: '#0c2340', fontWeight: 700 }}
            />
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <WalletOutlined className="text-blue-600" />
                  <span className="text-xs font-medium text-gray-500">Total Ad Spend</span>
                </div>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(totalAdSpend)}</p>
              </div>
            </Col>
            <Col span={12}>
              <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center gap-2 mb-1">
                  <AimOutlined className="text-green-600" />
                  <span className="text-xs font-medium text-gray-500">Total Konversi</span>
                </div>
                <p className="text-xl font-bold text-gray-800">{totalConversions}</p>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Platform Sumber Leads */}
        <Card
          title={
            <span className="font-bold flex items-center gap-2">
              <ThunderboltOutlined className="text-blue-600" /> Platform Sumber Leads (Acquisition)
            </span>
          }
        >
          <div className="space-y-4">
            {sourceEntries.map((entry) => {
              const percent = totalLeads > 0 ? Math.round((entry.count / totalLeads) * 100) : 0;
              return (
                <div key={entry.source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{entry.source}</span>
                    <span className="text-xs font-semibold text-gray-500">
                      {entry.count} leads • {percent}%
                    </span>
                  </div>
                  <Progress
                    percent={percent}
                    showInfo={false}
                    strokeColor={SOURCE_ACQUISITION_COLORS[entry.source]}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Bottom Section - Efektivitas Kampanye */}
      <Card title={<span className="font-bold">Efektivitas Kampanye (Biaya vs Konversi)</span>}>
        <Table
          columns={effectivenessColumns}
          dataSource={effectivenessData}
          rowKey="key"
          pagination={false}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default AnalyticsPage;
