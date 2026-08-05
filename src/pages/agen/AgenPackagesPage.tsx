import { useState } from 'react';
import { Card, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAgenStore, IAgenPackage } from '@/store/agenStore';

type CategoryKey = 'all' | 'haji-umrah' | 'visa-dokumen' | 'tour-wisata' | 'corporate-transport';

const categoryFilters: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'haji-umrah', label: 'Haji & Umrah' },
  { key: 'visa-dokumen', label: 'Visa & Dokumen' },
  { key: 'tour-wisata', label: 'Tour & Wisata' },
  { key: 'corporate-transport', label: 'Corporate & Transport' },
];

const categoryColors: Record<string, string> = {
  'haji-umrah': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  'visa-dokumen': 'bg-blue-50 border-blue-200 text-blue-700',
  'tour-wisata': 'bg-purple-50 border-purple-200 text-purple-700',
  'corporate-transport': 'bg-orange-50 border-orange-200 text-orange-700',
};

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const AgenPackagesPage = () => {
  const navigate = useNavigate();
  const { packages, togglePackageActive } = useAgenStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

  const filteredPackages =
    selectedCategory === 'all'
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  const handleToggle = (pkg: IAgenPackage) => {
    togglePackageActive(pkg.id);
    if (pkg.active) {
      message.info(`Paket "${pkg.name}" dihapus dari katalog`);
    } else {
      message.success(`Paket "${pkg.name}" ditambahkan ke katalog`);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Katalog Paket Agen</h1>
            <p className="text-gray-600 mt-1">Atur paket yang aktif untuk Anda jual</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="!bg-[#0c2340]"
            onClick={() => navigate('/agen/registrations')}
          >
            Daftarkan Jamaah
          </Button>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[#0c2340] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0c2340] hover:text-[#0c2340]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards Katalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => {
          const color = categoryColors[pkg.category] || 'bg-gray-50 border-gray-200 text-gray-700';
          return (
            <Card
              key={pkg.id}
              className="hover:shadow-lg transition-shadow"
              title={
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${color}`}>
                  {categoryFilters.find((c) => c.key === pkg.category)?.label || pkg.category}
                </span>
              }
              extra={
                pkg.active ? (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs">
                    <CheckCircleOutlined /> AKTIF DI KATALOG
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-400 font-semibold text-xs">
                    <ClockCircleOutlined /> TIDAK AKTIF
                  </span>
                )
              }
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3">{pkg.name}</h3>
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Harga Pusat</span>
                  <span className="font-bold text-gray-800">{formatRupiah(pkg.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durasi</span>
                  <span className="font-semibold text-gray-800">{pkg.duration}</span>
                </div>
              </div>

              {pkg.active ? (
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  size="large"
                  block
                  onClick={() => handleToggle(pkg)}
                >
                  Hapus dari Katalog
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  block
                  className="!bg-[#0c2340]"
                  onClick={() => handleToggle(pkg)}
                >
                  Tambahkan ke Katalog
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AgenPackagesPage;