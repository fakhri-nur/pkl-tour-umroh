import { useMemo, useState } from 'react';
import { Input, Button, message, Card } from 'antd';
import { SearchOutlined, TeamOutlined } from '@ant-design/icons';
import { useTourLeaderStore, ITourLeaderJemaah } from '@/store/tourLeaderStore';
import ManifestCard from './components/ManifestCard';

type ManifestFilter = 'ALL' | 'NOT_CHECKED' | 'PRIORITY';

const FILTERS: { key: ManifestFilter; label: string }[] = [
  { key: 'ALL', label: 'Semua' },
  { key: 'NOT_CHECKED', label: 'Belum Check-in' },
  { key: 'PRIORITY', label: 'Prioritas Lansia/Kursi Roda' },
];

const JemaahRecordsPage = () => {
  const { manifest, checkInJemaah } = useTourLeaderStore();
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<ManifestFilter>('ALL');

  const filteredManifest = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    return manifest.filter((jemaah) => {
      const matchSearch =
        keyword === '' ||
        jemaah.name.toLowerCase().includes(keyword) ||
        jemaah.seat.toLowerCase().includes(keyword);
      let matchFilter = true;
      if (filter === 'NOT_CHECKED') matchFilter = !jemaah.checkedIn;
      if (filter === 'PRIORITY') matchFilter = jemaah.isLansia || jemaah.isWheelchair;
      return matchSearch && matchFilter;
    });
  }, [manifest, searchText, filter]);

  const totalCheckedIn = manifest.filter((jemaah) => jemaah.checkedIn).length;

  const handleCheckIn = (jemaah: ITourLeaderJemaah) => {
    checkInJemaah(jemaah.id);
    message.success(`${jemaah.name} (Kursi ${jemaah.seat}) berhasil check-in!`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">MANIFEST JAMAAH - Umrah Akbar Oktober 2026</h1>
          <p className="text-gray-600 mt-1">Kelola status kehadiran jemaah selama perjalanan</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white border border-gray-200 px-5 py-3 flex items-center gap-3">
            <TeamOutlined className="text-blue-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 font-medium">TOTAL JEMAAH</p>
              <p className="text-2xl font-bold text-gray-800">{manifest.length}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 px-5 py-3 flex items-center gap-3">
            <TeamOutlined className="text-green-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 font-medium">TOTAL CHECK-IN</p>
              <p className="text-2xl font-bold text-green-600">{totalCheckedIn}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((item) => (
            <Button
              key={item.key}
              className={filter === item.key ? '!bg-[#0c2340] !text-white' : ''}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <Input
          className="w-full sm:w-72"
          size="large"
          placeholder="Cari nama / nomor kursi..."
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Grid Cards Manifest */}
      <Card className="!shadow-sm">
        {filteredManifest.length === 0 ? (
          <div className="py-16 text-center">
            <TeamOutlined className="text-4xl text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">Tidak ada jemaah yang cocok dengan filter ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredManifest.map((jemaah) => (
              <ManifestCard key={jemaah.id} jemaah={jemaah} onCheckIn={handleCheckIn} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default JemaahRecordsPage;
