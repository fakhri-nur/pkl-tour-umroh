import { Card, Tag, Button, message } from 'antd';
import {
  PlayCircleOutlined,
  FilePdfOutlined,
  ReadOutlined,
} from '@ant-design/icons';

type MaterialKind = 'VIDEO' | 'PDF';

interface GuideMaterial {
  id: string;
  title: string;
  description: string;
  kind: MaterialKind;
}

interface GuideGroup {
  category: string;
  materials: GuideMaterial[];
}

const guideGroups: GuideGroup[] = [
  {
    category: 'Persiapan',
    materials: [
      {
        id: 'G-1',
        title: 'Tata Cara Ihram Pria & Wanita',
        description: 'Video panduan niat dan pakaian ihram',
        kind: 'VIDEO',
      },
      {
        id: 'G-2',
        title: 'Ceklist Barang Bawaan',
        description: 'Daftar barang yang wajib dibawa',
        kind: 'PDF',
      },
    ],
  },
  {
    category: 'Ibadah Inti',
    materials: [
      {
        id: 'G-3',
        title: 'Praktik Tawaf & Sa\'i',
        description: 'Video simulasi tawaf dan sai',
        kind: 'VIDEO',
      },
      {
        id: 'G-4',
        title: 'Kumpulan Doa Umrah',
        description: 'Doa-doa lengkap selama ibadah',
        kind: 'PDF',
      },
      {
        id: 'G-5',
        title: 'Tahallul & Adab',
        description: 'Panduan tahallul dan adab di tanah suci',
        kind: 'VIDEO',
      },
    ],
  },
  {
    category: 'Umum & Kesehatan',
    materials: [
      {
        id: 'G-6',
        title: 'Tips Menjaga Kebugaran',
        description: 'Panduan kesehatan selama perjalanan',
        kind: 'PDF',
      },
      {
        id: 'G-7',
        title: 'Penggunaan Kereta Cepat Haramain',
        description: 'Cara menggunakan kereta cepat antara kota suci',
        kind: 'VIDEO',
      },
    ],
  },
];

const GuidesPage = () => {
  const handleOpen = (material: GuideMaterial) => {
    message.success(`Membuka materi "${material.title}"...`);
  };

  return (
    <div className="p-8">
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] rounded-xl p-8 text-white">
        <div className="flex items-center gap-4">
          <ReadOutlined className="text-4xl text-orange-400" />
          <div>
            <h1 className="text-3xl font-bold mb-1">Pusat Panduan - E-Learning</h1>
            <p className="text-blue-200">Materi pembelajaran untuk persiapan ibadah Anda</p>
          </div>
        </div>
      </div>

      {/* Category Groups */}
      <div className="space-y-8">
        {guideGroups.map((group) => (
          <Card key={group.category}>
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block px-3 py-1 rounded-lg bg-[#0c2340] text-white text-sm font-bold">
                {group.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.materials.map((material) => (
                <div
                  key={material.id}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleOpen(material)}
                >
                  <div className="flex items-center justify-between mb-3">
                    {material.kind === 'VIDEO' ? (
                      <PlayCircleOutlined className="text-red-500 text-3xl" />
                    ) : (
                      <FilePdfOutlined className="text-red-600 text-3xl" />
                    )}
                    <Tag
                      color={material.kind === 'VIDEO' ? 'red' : 'geekblue'}
                      className="font-semibold"
                    >
                      {material.kind}
                    </Tag>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{material.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{material.description}</p>
                  <Button type="link" className="!p-0 text-blue-600 font-medium">
                    {material.kind === 'VIDEO' ? 'Tonton Video' : 'Unduh PDF'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuidesPage;