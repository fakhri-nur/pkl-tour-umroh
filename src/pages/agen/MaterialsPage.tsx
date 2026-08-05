import { useState } from 'react';
import { Card, Button, Tag, message } from 'antd';
import {
  DownloadOutlined,
  FileImageOutlined,
  PictureOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useAgenStore, IAgenMaterial } from '@/store/agenStore';

type MaterialFilter = 'all' | 'FLYER' | 'BANNER IG' | 'PRICELIST';

const filterChips: { key: MaterialFilter; label: string }[] = [
  { key: 'all', label: 'Semua Materi' },
  { key: 'FLYER', label: 'Flyer / Brosur' },
  { key: 'BANNER IG', label: 'Banner Media Sosial' },
  { key: 'PRICELIST', label: 'Pricelist (Harga)' },
];

const materialTypeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  FLYER: { color: 'blue', icon: <FileImageOutlined className="text-5xl" /> },
  'BANNER IG': { color: 'purple', icon: <PictureOutlined className="text-5xl" /> },
  PRICELIST: { color: 'green', icon: <FileTextOutlined className="text-5xl" /> },
};

const initialMaterials: IAgenMaterial[] = [
  { id: 'MAT-1', type: 'FLYER', title: 'Brosur Umrah Reguler 9 Hari' },
  { id: 'MAT-2', type: 'BANNER IG', title: 'Promo Ramadhan Feed/Story' },
  { id: 'MAT-3', type: 'PRICELIST', title: 'Pricelist Paket 2026' },
  { id: 'MAT-4', type: 'FLYER', title: 'Brosur Haji Plus 2026' },
  { id: 'MAT-5', type: 'BANNER IG', title: 'Banner Wisata Halal Turki' },
  { id: 'MAT-6', type: 'PRICELIST', title: 'Pricelist Visa & Dokumen' },
];

const MaterialsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<MaterialFilter>('all');
  const { packages } = useAgenStore();

  const materials = initialMaterials;

  const filteredMaterials =
    selectedFilter === 'all'
      ? materials
      : materials.filter((m) => m.type === selectedFilter);

  const handleDownload = (material: IAgenMaterial) => {
    message.success(`Mengunduh "${material.title}" resolusi tinggi...`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Materi Pemasaran</h1>
            <p className="text-gray-600 mt-1">
              Unduh materi promosi untuk memasarkan paket Anda
            </p>
          </div>
          <div className="hidden md:block">
            <Tag color="cyan">{packages.filter((p) => p.active).length} Paket Aktif</Tag>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setSelectedFilter(chip.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === chip.key
                  ? 'bg-[#0c2340] text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0c2340] hover:text-[#0c2340]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const config = materialTypeConfig[material.type] || materialTypeConfig.FLYER;
          return (
            <Card
              key={material.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 flex items-center justify-center mb-4">
                <span style={{ color: '#0c2340', opacity: 0.5 }}>{config.icon}</span>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">{material.title}</h3>
              <div className="flex items-center justify-between">
                <Tag color={config.color} className="font-semibold">
                  {material.type}
                </Tag>
                <Button
                  type="primary"
                  size="small"
                  icon={<DownloadOutlined />}
                  className="!bg-[#0c2340]"
                  onClick={() => handleDownload(material)}
                >
                  Unduh Resolusi Tinggi
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialsPage;