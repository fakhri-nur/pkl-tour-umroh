import { useState } from 'react';
import { Card, Tag, Button, Progress, message } from 'antd';
import { ArrowRightOutlined, ClockCircleOutlined, TeamOutlined, TagsOutlined } from '@ant-design/icons';
import { useTourLeaderStore, ITourLeaderPackage, PackageCategory } from '@/store/tourLeaderStore';
import { formatCurrency } from '@/utils/formatter';

const CATEGORY_META: Record<PackageCategory, { label: string; color: string; badge: string }> = {
  'corporate-transport': { label: 'Corporate & Transport', color: 'bg-blue-100 text-blue-600', badge: 'blue' },
  'haji-umrah': { label: 'Haji & Umrah', color: 'bg-emerald-100 text-emerald-600', badge: 'green' },
  'tour-wisata': { label: 'Tour & Wisata', color: 'bg-orange-100 text-orange-600', badge: 'orange' },
  'visa-dokumen': { label: 'Visa & Dokumen', color: 'bg-purple-100 text-purple-600', badge: 'purple' },
};

const CATEGORY_ORDER: PackageCategory[] = [
  'corporate-transport',
  'haji-umrah',
  'tour-wisata',
  'visa-dokumen',
];

const TourLeaderPackagesPage = () => {
  const { packages } = useTourLeaderStore();
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('corporate-transport');

  const groupedPackages = CATEGORY_ORDER.reduce<Record<PackageCategory, ITourLeaderPackage[]>>(
    (acc, category) => {
      acc[category] = packages.filter((pkg) => pkg.category === category);
      return acc;
    },
    {
      'corporate-transport': [],
      'haji-umrah': [],
      'tour-wisata': [],
      'visa-dokumen': [],
    }
  );

  const handleDetail = (pkg: ITourLeaderPackage) => {
    message.info(`Detail paket "${pkg.name}" dibuka (simulasi).`);
  };

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] text-white p-6">
        <h1 className="text-2xl font-bold mb-1">Paket Tersedia</h1>
        <p className="text-gray-300 text-sm">
          Katalog informasi lengkap mengenai seluruh paket layanan ibadah dan tour.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <TagsOutlined className="text-gray-400 text-lg mr-1" />
        {CATEGORY_ORDER.map((category) => (
          <Button
            key={category}
            className={activeCategory === category ? '!bg-[#0c2340] !text-white' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {CATEGORY_META[category].label}
          </Button>
        ))}
      </div>

      {/* Grid Cards Paket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {groupedPackages[activeCategory].map((pkg) => {
          const quotaPercent = pkg.quotaTotal > 0 ? Math.round((pkg.quotaLeft / pkg.quotaTotal) * 100) : 0;
          return (
            <Card
              key={pkg.id}
              className="hover:shadow-lg transition-shadow"
              bodyStyle={{ padding: '20px' }}
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{pkg.name}</h3>
                  <Tag color={CATEGORY_META[pkg.category].badge} className="font-semibold uppercase text-xs m-0">
                    {CATEGORY_META[pkg.category].label.split(' ')[0]}
                  </Tag>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed min-h-[36px]">{pkg.description}</p>

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <ClockCircleOutlined className="text-gray-400" /> Durasi: {pkg.duration}
                  </p>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TeamOutlined className="text-gray-400" />
                      <span className="text-gray-600">Sisa Kuota: {pkg.quotaLeft}</span>
                    </div>
                    <Progress
                      percent={quotaPercent}
                      showInfo={false}
                      strokeColor={quotaPercent <= 30 ? '#ff4d4f' : '#f59e0b'}
                    />
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium">Harga</p>
                    <p className="font-bold text-[#0c2340]">{formatCurrency(pkg.price)}</p>
                  </div>
                  <Button
                    type="text"
                    icon={<ArrowRightOutlined />}
                    className="!text-amber-600 font-semibold"
                    onClick={() => handleDetail(pkg)}
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TourLeaderPackagesPage;
