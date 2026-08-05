import { Card, Row, Col, Badge } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop';

const PackageSection = () => {
  const packages = [
    {
      id: 1,
      name: 'Umroh Reguler 9 Hari',
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
      duration: '9 Hari',
      quota: '45 Jamaah',
      departure: '15 Sep 2026',
      hotel: 'Bintang 4',
      badge: 'Populer',
      features: ['Hotel dekat Masjidil Haram', 'Muthawif berpengalaman', 'Ziarah lengkap'],
    },
    {
      id: 2,
      name: 'Umroh Plus Turki 12 Hari',
      price: 35000000,
      image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
      duration: '12 Hari',
      quota: '40 Jamaah',
      departure: '20 Sep 2026',
      hotel: 'Bintang 5',
      badge: 'Best Seller',
      features: ['Umroh + Turki Tour', 'Hotel bintang 5', 'City tour Istanbul'],
    },
    {
      id: 3,
      name: 'Umroh Ramadhan Premium',
      price: 45000000,
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
      duration: '14 Hari',
      quota: '30 Jamaah',
      departure: '10 Mar 2027',
      hotel: 'Bintang 5',
      badge: 'Premium',
      features: ['Ramadhan special', 'Hotel premium', 'Buffet mewah'],
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm tracking-wider uppercase">
            PAKET KAMI
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
            Pilihan Paket Umroh & Haji
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai pilihan paket umroh dan haji dengan fasilitas terbaik dan harga yang kompetitif
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {packages.map((pkg) => (
            <Col xs={24} md={12} lg={8} key={pkg.id}>
              <Badge.Ribbon text={pkg.badge} color="green">
                <Card
                  hoverable
                  cover={
                    <div className="relative overflow-hidden h-64">
                      <img
                        alt={pkg.name}
                        src={pkg.image}
                        onError={handleImageError}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  }
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-green-600">{formatPrice(pkg.price)}</div>
                      <p className="text-sm text-gray-500">Per orang</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-4 border-y border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarOutlined className="text-green-600" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TeamOutlined className="text-green-600" />
                        {pkg.quota}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                        <EnvironmentOutlined className="text-green-600" />
                        {pkg.hotel} - Dekat Masjidil Haram
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircleOutlined className="text-green-600 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
                      Lihat Detail Paket
                    </button>
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-12">
          <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Lihat Semua Paket
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
