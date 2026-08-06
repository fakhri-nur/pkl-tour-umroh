import { useMemo, useState } from 'react';
import { Card, Table, Button, Select, Input, Tag, Dropdown, Modal, message } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  MessageOutlined,
  MailOutlined,
  MoreOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useMarketingStore, IMarketingLead, LeadStatus, LeadSource } from '@/store/marketingStore';
import StatCard from './components/StatCard';
import LeadSourceBadge, { LeadStatusTag } from './components/Badges';
import { LEAD_STATUS_TEXT } from './components/constants';
import LeadModal from './components/LeadModal';

type StatusFilter = 'ALL' | LeadStatus;

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'New', label: 'NEW LEADS' },
  { key: 'Contacted', label: 'CONTACTED' },
  { key: 'Converted', label: 'CONVERTED' },
  { key: 'Lost', label: 'LOST / CANCELLED' },
];

const LeadsPipelinePage = () => {
  const { leads, updateLeadStatus, removeLead } = useMarketingStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchText, setSearchText] = useState('');

  const filteredLeads = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      const matchKeyword =
        keyword === '' ||
        lead.name.toLowerCase().includes(keyword) ||
        lead.phone.includes(keyword) ||
        lead.email.toLowerCase().includes(keyword) ||
        lead.packageInterest.toLowerCase().includes(keyword);
      return matchStatus && matchKeyword;
    });
  }, [leads, statusFilter, searchText]);

  const countByStatus = (status: LeadStatus): number =>
    leads.filter((lead) => lead.status === status).length;

  const buildActionMenu = (record: IMarketingLead): MenuProps => ({
    items: [
      { key: 'contacted', label: 'Tandai Contacted' },
      { key: 'converted', label: 'Tandai Converted' },
      { key: 'lost', label: 'Tandai Lost' },
      { type: 'divider' },
      { key: 'delete', label: <span className="text-red-500">Hapus Leads</span>, danger: true },
    ],
    onClick: ({ key }) => {
      if (key === 'delete') {
        Modal.confirm({
          title: 'Hapus Leads',
          content: `Hapus leads "${record.name}" dari pipeline?`,
          okText: 'Hapus',
          okButtonProps: { danger: true },
          cancelText: 'Batal',
          onOk: () => {
            removeLead(record.id);
            message.success(`Leads "${record.name}" dihapus.`);
          },
        });
        return;
      }
      const newStatus = key as LeadStatus;
      updateLeadStatus(record.id, newStatus);
      message.success(`Status "${record.name}" diubah menjadi ${LEAD_STATUS_TEXT[newStatus]}.`);
    },
  });

  const columns: ColumnsType<IMarketingLead> = [
    {
      title: 'NAMA & KONTAK',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IMarketingLead) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="text-xs text-gray-500">{record.phone}</p>
          <p className="text-xs text-gray-400">{record.email}</p>
        </div>
      ),
    },
    {
      title: 'PAKET DIMINATI',
      dataIndex: 'packageInterest',
      key: 'packageInterest',
      render: (text: string) => <Tag className="text-xs">{text}</Tag>,
    },
    {
      title: 'WAKTU MASUK',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span className="text-sm text-gray-600">{new Date(createdAt).toLocaleString('id-ID')}</span>
      ),
    },
    {
      title: 'SUMBER',
      dataIndex: 'source',
      key: 'source',
      render: (source: LeadSource) => <LeadSourceBadge source={source} />,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: LeadStatus) => <LeadStatusTag status={status} />,
    },
    {
      title: 'TINDAKAN',
      key: 'action',
      width: 190,
      render: (_, record: IMarketingLead) => (
        <div className="flex items-center gap-1">
          <Button
            size="small"
            type="text"
            icon={<MessageOutlined />}
            href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            title="Chat WhatsApp"
          />
          <Button
            size="small"
            type="text"
            icon={<MailOutlined />}
            href={`mailto:${record.email}`}
            title="Kirim Email"
          />
          <Dropdown menu={buildActionMenu(record)} trigger={['click']}>
            <Button size="small" type="text" icon={<MoreOutlined />} title="Menu Aksi" />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leads Pipeline</h1>
          <p className="text-gray-600 mt-1">Kelola dan lacak setiap prospek dari semua sumber</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="!bg-amber-500 hover:!bg-amber-600 !border-amber-500 text-[#0c2340] font-semibold"
          onClick={() => setModalOpen(true)}
        >
          Tambah Leads
        </Button>
      </div>

      {/* Summary Counter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="NEW LEADS"
          value={countByStatus('New').toString()}
          badge="Butuh Tindakan"
          badgeColor="cyan"
          icon={<ClockCircleOutlined />}
          color="bg-cyan-100 text-cyan-600"
        />
        <StatCard
          title="CONTACTED"
          value={countByStatus('Contacted').toString()}
          badge="Proses"
          badgeColor="orange"
          icon={<MessageOutlined />}
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="CONVERTED"
          value={countByStatus('Converted').toString()}
          badge="Berhasil"
          badgeColor="green"
          icon={<MailOutlined />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="LOST / CANCELLED"
          value={countByStatus('Lost').toString()}
          badge="Perlu Review"
          badgeColor="red"
          icon={<ClockCircleOutlined />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="small"
            className={statusFilter === 'ALL' ? '!bg-[#0c2340] !text-white' : ''}
            onClick={() => setStatusFilter('ALL')}
          >
            Semua
          </Button>
          {STATUS_FILTERS.map((filter) => (
            <Button
              key={filter.key}
              size="small"
              className={statusFilter === filter.key ? '!bg-[#0c2340] !text-white' : ''}
              onClick={() => setStatusFilter(filter.key)}
            >
              {filter.label.split(' / ')[0]}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            className="w-full sm:w-48"
            value={statusFilter}
            onChange={(value: StatusFilter) => setStatusFilter(value)}
            options={[
              { value: 'ALL', label: 'Semua Status' },
              { value: 'New', label: 'New' },
              { value: 'Contacted', label: 'Contacted' },
              { value: 'Converted', label: 'Converted' },
              { value: 'Lost', label: 'Lost' },
            ]}
          />
          <Input
            className="w-full sm:w-64"
            size="middle"
            placeholder="Cari nama, telepon, email..."
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card title={<span className="font-bold">Daftar Prospek Terbaru</span>}>
        <Table
          columns={columns}
          dataSource={filteredLeads}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} leads`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <LeadModal open={modalOpen} onCancel={() => setModalOpen(false)} />
    </div>
  );
};

export default LeadsPipelinePage;
