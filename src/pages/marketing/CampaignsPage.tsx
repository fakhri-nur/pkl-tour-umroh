import { useState } from 'react';
import { Card, Table, Progress, Button, Modal, Descriptions, Tag } from 'antd';
import {
  PlusOutlined,
  WalletOutlined,
  FireOutlined,
  AimOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useMarketingStore, IMarketingCampaign } from '@/store/marketingStore';
import StatCard from './components/StatCard';
import { CampaignStatusTag } from './components/Badges';
import CampaignModal from './components/CampaignModal';
import { formatCurrency } from '@/utils/formatter';

const CampaignsPage = () => {
  const { campaigns } = useMarketingStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<IMarketingCampaign | undefined>(undefined);
  const [detailCampaign, setDetailCampaign] = useState<IMarketingCampaign | undefined>(undefined);

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

  const handleCreate = () => {
    setEditingCampaign(undefined);
    setModalOpen(true);
  };

  const handleEdit = (campaign: IMarketingCampaign) => {
    setEditingCampaign(campaign);
    setModalOpen(true);
  };

  const columns: ColumnsType<IMarketingCampaign> = [
    {
      title: 'NAMA KAMPANYE',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IMarketingCampaign) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <Tag className="mt-1 text-xs">{record.platform}</Tag>
        </div>
      ),
    },
    {
      title: 'PERIODE',
      key: 'period',
      render: (_, record: IMarketingCampaign) => (
        <span className="text-sm text-gray-600">
          {record.startDate} <span className="text-gray-400">s/d</span> {record.endDate}
        </span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: IMarketingCampaign['status']) => <CampaignStatusTag status={status} />,
    },
    {
      title: 'ANGGARAN vs TERPAKAI',
      key: 'budget',
      width: 260,
      render: (_, record: IMarketingCampaign) => {
        const percent = record.budget > 0 ? Math.round((record.spent / record.budget) * 100) : 0;
        return (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">
                {formatCurrency(record.spent)} / {formatCurrency(record.budget)}
              </span>
              <span className="text-xs font-semibold text-gray-600">{percent}%</span>
            </div>
            <Progress
              percent={percent}
              showInfo={false}
              strokeColor={percent >= 80 ? '#ff4d4f' : percent >= 50 ? '#f59e0b' : '#22c55e'}
            />
          </div>
        );
      },
    },
    {
      title: 'KONVERSI',
      dataIndex: 'conversions',
      key: 'conversions',
      render: (conversions: number) => (
        <span className="font-bold text-blue-600">{conversions}</span>
      ),
    },
    {
      title: 'AKSI',
      key: 'action',
      width: 180,
      render: (_, record: IMarketingCampaign) => (
        <div className="flex items-center gap-2">
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailCampaign(record)}>
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kampanye Iklan (Ads)</h1>
          <p className="text-gray-600 mt-1">Kelola dan pantau performa kampanye iklan digital</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
          onClick={handleCreate}
        >
          Buat Kampanye
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="TOTAL ANGGARAN"
          value={formatCurrency(totalBudget)}
          badge="Semua Kampanye"
          badgeColor="blue"
          icon={<WalletOutlined />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="TOTAL TERPAKAI (SPENT)"
          value={formatCurrency(totalSpent)}
          badge="Real-time"
          badgeColor="orange"
          icon={<FireOutlined />}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="TOTAL KONVERSI"
          value={totalConversions.toString()}
          badge="Leads Masuk"
          badgeColor="green"
          icon={<AimOutlined />}
          color="bg-green-100 text-green-600"
        />
      </div>

      {/* Table */}
      <Card title={<span className="font-bold">Daftar Kampanye</span>}>
        <Table
          columns={columns}
          dataSource={campaigns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} kampanye`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <CampaignModal open={modalOpen} onCancel={() => setModalOpen(false)} campaignData={editingCampaign} />

      <Modal
        title="Detail Kampanye"
        open={Boolean(detailCampaign)}
        onCancel={() => setDetailCampaign(undefined)}
        footer={<Button onClick={() => setDetailCampaign(undefined)}>Tutup</Button>}
      >
        {detailCampaign && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Nama Kampanye">
              <span className="font-semibold">{detailCampaign.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Platform">
              <Tag>{detailCampaign.platform}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <CampaignStatusTag status={detailCampaign.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Periode">
              {detailCampaign.startDate} s/d {detailCampaign.endDate}
            </Descriptions.Item>
            <Descriptions.Item label="Anggaran">
              {formatCurrency(detailCampaign.budget)}
            </Descriptions.Item>
            <Descriptions.Item label="Terpakai (Spent)">
              {formatCurrency(detailCampaign.spent)}
            </Descriptions.Item>
            <Descriptions.Item label="Revenue">
              {formatCurrency(detailCampaign.revenue)}
            </Descriptions.Item>
            <Descriptions.Item label="Konversi">{detailCampaign.conversions}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default CampaignsPage;
