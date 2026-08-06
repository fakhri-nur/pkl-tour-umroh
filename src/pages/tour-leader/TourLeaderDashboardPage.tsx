import { useState } from 'react';
import { Card, Button, Tag, Tabs, Progress, Input, Avatar, message, Modal, Alert } from 'antd';
import {
  EnvironmentOutlined,
  AlertOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  SafetyOutlined,
  ManOutlined,
  CompassOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useTourLeaderStore, IAgendaDay, AgendaCategory } from '@/store/tourLeaderStore';
import StatCard from './components/StatCard';

const CATEGORY_COLORS: Record<AgendaCategory, string> = {
  Ibadah: 'green',
  Transportasi: 'blue',
  Makan: 'orange',
  Kegiatan: 'purple',
  Umum: 'default',
};

const CATEGORY_FILTERS: { key: 'ALL' | AgendaCategory; label: string }[] = [
  { key: 'ALL', label: 'Semua' },
  { key: 'Ibadah', label: 'Ibadah' },
  { key: 'Transportasi', label: 'Transportasi' },
  { key: 'Makan', label: 'Makan' },
  { key: 'Kegiatan', label: 'Kegiatan' },
  { key: 'Umum', label: 'Umum' },
];

interface JemaahMiniCardProps {
  initials: string;
  name: string;
  seat: string;
  age: number;
  isLansia: boolean;
  isWheelchair: boolean;
  checkedIn: boolean;
}

const JemaahMiniCard: React.FC<JemaahMiniCardProps> = ({
  initials,
  name,
  seat,
  age,
  isLansia,
  isWheelchair,
  checkedIn,
}) => (
  <div className="p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-blue-300 transition-colors">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Avatar size={32} className="!bg-[#0c2340] !text-amber-400 font-bold text-xs">
          {initials}
        </Avatar>
        <span className="font-semibold text-gray-800 text-sm truncate max-w-[110px]">{name}</span>
      </div>
      {checkedIn ? (
        <CheckCircleOutlined className="text-green-600 text-lg" />
      ) : (
        <ClockCircleOutlined className="text-red-500 text-lg" />
      )}
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500 font-medium">Kursi {seat} • {age} th</span>
      {(isLansia || isWheelchair) && (
        <Tag color={isLansia ? 'orange' : 'purple'} className="text-[10px] font-semibold uppercase m-0">
          {isLansia ? 'Lansia' : 'Kursi Roda'}
        </Tag>
      )}
    </div>
  </div>
);

const TourLeaderDashboardPage = () => {
  const { tripSummary, manifest, agendaDays, emergency, triggerEmergency, resolveEmergency, toggleActivityDone } =
    useTourLeaderStore();
  const [activeDayId, setActiveDayId] = useState<string>('DAY-4');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | AgendaCategory>('ALL');

  const activeDay: IAgendaDay | undefined = agendaDays.find((day) => day.id === activeDayId);
  const filteredActivities =
    activeDay?.activities.filter((activity) => categoryFilter === 'ALL' || activity.category === categoryFilter) ?? [];

  const handleEmergencySos = () => {
    if (emergency.active) return;
    Modal.confirm({
      title: 'Emergency SOS',
      icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
      content: (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">
            Aktifkan status darurat untuk kondisi lapangan? Semua pihak terkait akan diberitahu.
          </p>
          <Input placeholder="Deskripsi kondisi darurat (contoh: jamaah pusing, bus tertahan)" />
        </div>
      ),
      okText: 'Aktifkan SOS',
      okButtonProps: { danger: true },
      cancelText: 'Batal',
      onOk: () => {
        triggerEmergency('Situasi darurat dilaporkan dari lapangan. Tim koordinasi pusat segera ditangani.');
        message.error('Emergency SOS aktif. Tim pusat telah diberitahu!');
      },
    });
  };

  const handleCheckIn = () => {
    const next = manifest.find((jemaah) => !jemaah.checkedIn);
    if (next) {
      message.info(`Buka halaman Jemaah Records untuk check-in "${next.name}".`);
    } else {
      message.success('Semua jemaah sudah check-in.');
    }
  };

  const tabItems = agendaDays.map((day) => ({
    key: day.id,
    label: (
      <div className="text-center leading-tight">
        <p className="font-bold text-xs">{day.dayLabel}</p>
        <p className="text-[10px] text-gray-400">{day.dateLabel}</p>
      </div>
    ),
    children: null,
  }));

  return (
    <div className="p-8">
      {/* Emergency Banner */}
      {emergency.active && (
        <Alert
          type="error"
          className="mb-6"
          showIcon
          message="Emergency SOS Aktif"
          description={emergency.description}
          action={
            <Button danger onClick={() => { resolveEmergency(); message.success('Emergency telah diselesaikan.'); }}>
              Selesai Emergency
            </Button>
          }
        />
      )}

      {/* Header Bar Navy */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] text-white p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Tag color="green" className="font-semibold !text-xs">
              ● Perjalanan Aktif - Hari ke-3
            </Tag>
            <span className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
              <CompassOutlined /> Madinah, Saudi Arabia
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Umrah Akbar Oktober 2026</h1>
          <p className="flex items-center gap-1 text-gray-300 text-sm">
            <EnvironmentOutlined /> Makkah & Madinah • Swissôtel Makkah
          </p>
        </div>
        <Button
          danger
          type="primary"
          size="large"
          icon={<AlertOutlined />}
          disabled={emergency.active}
          onClick={handleEmergencySos}
          className="!font-bold"
        >
          Emergency SOS
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="TOTAL JAMAAH"
          value={tripSummary.totalJamaah.toString()}
          icon={<TeamOutlined />}
          color="bg-blue-100 text-blue-600"
          badge="Manifest"
          badgeColor="blue"
        />
        <StatCard
          title="CHECK-IN"
          value={`${tripSummary.checkedIn}/${tripSummary.totalJamaah}`}
          icon={<CheckCircleOutlined />}
          color="bg-green-100 text-green-600"
          badge="Progress"
          badgeColor="green"
        />
        <StatCard
          title="LANSIA 60+"
          value={tripSummary.lansia60plus.toString()}
          icon={<ManOutlined />}
          color="bg-orange-100 text-orange-600"
          badge="Prioritas"
          badgeColor="orange"
        />
        <StatCard
          title="KURSI RODA"
          value={tripSummary.wheelchair.toString()}
          icon={<SafetyOutlined />}
          color="bg-purple-100 text-purple-600"
          badge="Prioritas"
          badgeColor="purple"
        />
      </div>

      {/* Grid 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kiri - Agenda Perjalanan */}
        <Card
          title={<span className="font-bold">Agenda Perjalanan</span>}
          className="h-fit"
        >
          <Tabs
            activeKey={activeDayId}
            onChange={setActiveDayId}
            items={tabItems}
            tabBarGutter={4}
            className="agenda-tabs"
          />
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {CATEGORY_FILTERS.map((filter) => (
              <Button
                key={filter.key}
                size="small"
                className={categoryFilter === filter.key ? '!bg-[#0c2340] !text-white' : ''}
                onClick={() => setCategoryFilter(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => toggleActivityDone(activeDayId, activity.id)}
                className={`w-full text-left flex items-start gap-4 p-3 rounded-xl border transition-all ${
                  activity.done
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <span
                  className={`mt-0.5 flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold flex-shrink-0 ${
                    activity.done ? 'bg-green-600 text-white' : 'bg-[#0c2340] text-amber-400'
                  }`}
                >
                  {activity.done ? <CheckCircleOutlined /> : activity.time.slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="font-semibold text-gray-800 text-sm">{activity.title}</p>
                    <Tag color={CATEGORY_COLORS[activity.category]} className="text-[10px] font-semibold m-0">
                      {activity.category}
                    </Tag>
                  </div>
                  <p className="text-xs text-gray-500">
                    {activity.time} • {activity.location}
                  </p>
                </div>
              </button>
            ))}
            {filteredActivities.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6">Tidak ada aktivitas pada kategori ini.</p>
            )}
          </div>
        </Card>

        {/* Kanan - Manifest Jamaah & Progress Ibadah */}
        <Card
          title={<span className="font-bold">Manifest Jamaah & Progress Ibadah</span>}
          extra={
            <Button type="link" className="!p-0 !h-auto text-blue-600 font-medium" onClick={handleCheckIn}>
              Kelola Check-in
            </Button>
          }
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-500">
                Progress Check-in ({manifest.filter((j) => j.checkedIn).length}/{manifest.length})
              </span>
              <span className="text-xs font-semibold text-gray-600">
                {Math.round((manifest.filter((j) => j.checkedIn).length / manifest.length) * 100)}%
              </span>
            </div>
            <Progress
              percent={Math.round((manifest.filter((j) => j.checkedIn).length / manifest.length) * 100)}
              showInfo={false}
              strokeColor="#22c55e"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {manifest.map((jemaah) => (
              <JemaahMiniCard
                key={jemaah.id}
                initials={jemaah.initials}
                name={jemaah.name}
                seat={jemaah.seat}
                age={jemaah.age}
                isLansia={jemaah.isLansia}
                isWheelchair={jemaah.isWheelchair}
                checkedIn={jemaah.checkedIn}
              />
            ))}
          </div>
        </Card>
      </div>

      <style>{`
        .agenda-tabs .ant-tabs-nav {
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default TourLeaderDashboardPage;
