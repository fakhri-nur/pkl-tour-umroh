import { useState } from 'react';
import { Tabs } from 'antd';
import PackageCard from '@/components/PackageCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { IPackageCard } from '@/types/package.type';
import './PackagesPage.css';

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const packagesData: IPackageCard[] = [
    {
      id: '1',
      code: 'PKG-UMR-001',
      title: 'Umrah Plus Turki 12 Hari',
      description:
        'Paket umrah plus wisata Turki dengan fasilitas lengkap dan pembimbing berpengalaman',
      category: 'umrah',
      status: 'Open',
      date: '15 Sep 2026',
      hotel: 'Bintang 5',
      airline: 'Garuda Indonesia',
      remainingSeats: 25,
      imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      code: 'PKG-UMR-002',
      title: 'Umrah Reguler 9 Hari',
      description:
        'Paket umrah hemat dengan hotel dekat Masjidil Haram dan fasilitas nyaman',
      category: 'umrah',
      status: 'Almost Full',
      date: '20 Sep 2026',
      hotel: 'Bintang 4',
      airline: 'Saudi Airlines',
      remainingSeats: 8,
      imageUrl: 'https://images.unsplash.com/photo-1565552070098-0073a126829c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '3',
      code: 'PKG-HAJ-001',
      title: 'Haji Furoda VIP',
      description:
        'Paket haji dengan pelayanan VIP, hotel bintang 5 dekat Masjidil Haram',
      category: 'haji',
      status: 'Open',
      date: '10 Apr 2027',
      hotel: 'Bintang 5',
      airline: 'Emirates',
      remainingSeats: 35,
      imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '4',
      code: 'PKG-HTR-001',
      title: 'Halal Tour Jejak Rasul',
      description:
        'Wisata religi menelusuri jejak Nabi Muhammad SAW di Arab Saudi dan Turki',
      category: 'halal-tour',
      status: 'Open',
      date: '5 Okt 2026',
      hotel: 'Bintang 4',
      airline: 'Turkish Airlines',
      remainingSeats: 30,
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '5',
      code: 'PKG-UMR-003',
      title: 'Umrah Ramadhan Premium',
      description:
        'Paket umrah spesial Ramadhan dengan fasilitas premium dan mewah',
      category: 'umrah',
      status: 'Almost Full',
      date: '10 Mar 2027',
      hotel: 'Bintang 5',
      airline: 'Qatar Airways',
      remainingSeats: 12,
      imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '6',
      code: 'PKG-HAJ-002',
      title: 'Haji Reguler 40 Hari',
      description:
        'Paket haji reguler dengan waktu ibadah yang cukup dan nyaman',
      category: 'haji',
      status: 'Open',
      date: '20 Mei 2027',
      hotel: 'Bintang 4',
      airline: 'Garuda Indonesia',
      remainingSeats: 45,
      imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '7',
      code: 'PKG-HTR-002',
      title: 'Halal Tour Andalusia',
      description:
        'Wisata sejarah Islam di Spanyol menelusuri kejayaan peradaban Islam',
      category: 'halal-tour',
      status: 'Open',
      date: '15 Nov 2026',
      hotel: 'Bintang 4',
      airline: 'Iberia',
      remainingSeats: 28,
      imageUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '8',
      code: 'PKG-UMR-004',
      title: 'Umrah Plus Dubai',
      description:
        'Paket umrah dengan tambahan wisata Dubai yang modern dan menarik',
      category: 'umrah',
      status: 'Closed',
      date: '1 Sep 2026',
      hotel: 'Bintang 5',
      airline: 'Emirates',
      remainingSeats: 0,
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '9',
      code: 'PKG-HAJ-003',
      title: 'Haji Khusus Plus',
      description:
        'Paket haji khusus dengan layanan eksklusif dan akomodasi terbaik',
      category: 'haji',
      status: 'Almost Full',
      date: '15 Jun 2027',
      hotel: 'Bintang 5',
      airline: 'Saudi Airlines',
      remainingSeats: 10,
      imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '10',
      code: 'PKG-HTR-003',
      title: 'Halal Tour Mesir',
      description:
        'Wisata religi dan sejarah ke Mesir mengunjungi Masjid Al-Azhar dan piramida',
      category: 'halal-tour',
      status: 'Open',
      date: '25 Des 2026',
      hotel: 'Bintang 4',
      airline: 'Egypt Air',
      remainingSeats: 32,
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '11',
      code: 'PKG-UMR-005',
      title: 'Umrah Keluarga Hemat',
      description:
        'Paket umrah khusus keluarga dengan harga terjangkau dan fasilitas nyaman',
      category: 'umrah',
      status: 'Open',
      date: '5 Okt 2026',
      hotel: 'Bintang 3',
      airline: 'Lion Air',
      remainingSeats: 40,
      imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '12',
      code: 'PKG-HTR-004',
      title: 'Halal Tour Aqsa',
      description:
        'Wisata religi ke Palestina mengunjungi Masjidil Aqsa dan tempat bersejarah',
      category: 'halal-tour',
      status: 'Open',
      date: '18 Nov 2026',
      hotel: 'Bintang 4',
      airline: 'Royal Jordanian',
      remainingSeats: 22,
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const filteredPackages =
    activeCategory === 'all'
      ? packagesData
      : packagesData.filter((pkg) => pkg.category === activeCategory);

  const handleDetail = (id: string) => {
    window.location.href = `/#/package-detail/${id}`;
  };

  const tabItems = [
    {
      key: 'all',
      label: 'Semua Paket',
    },
    {
      key: 'umrah',
      label: 'Umrah',
    },
    {
      key: 'haji',
      label: 'Haji',
    },
    {
      key: 'halal-tour',
      label: 'Halal Tour',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Pilihan Paket Terbaik</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan paket umrah, haji, dan wisata halal terbaik dengan fasilitas lengkap dan
              harga kompetitif. Dipandu oleh pembimbing berpengalaman dan terpercaya.
            </p>
          </div>

          <div className="mb-8">
            <Tabs
              activeKey={activeCategory}
              onChange={setActiveCategory}
              items={tabItems}
              centered
              size="large"
              className="package-tabs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} onDetail={handleDetail} />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Tidak ada paket tersedia untuk kategori ini</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagesPage;
