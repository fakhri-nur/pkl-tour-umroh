import { Button } from 'antd';
import {
  SafetyOutlined,
  UserOutlined,
  StarOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const AboutCompany = () => {
  const features = [
    {
      icon: <SafetyOutlined className="text-3xl text-green-600" />,
      title: 'Aman & Terpercaya',
      description: 'Terdaftar resmi di Kemenag dengan izin lengkap',
    },
    {
      icon: <UserOutlined className="text-3xl text-green-600" />,
      title: 'Pembimbing Ahli',
      description: 'Tim pembimbing berpengalaman dan bersertifikat',
    },
    {
      icon: <StarOutlined className="text-3xl text-green-600" />,
      title: 'Fasilitas Terbaik',
      description: 'Hotel bintang 5, transportasi nyaman, dan catering halal',
    },
    {
      icon: <DollarOutlined className="text-3xl text-green-600" />,
      title: 'Harga Transparan',
      description: 'Tidak ada biaya tersembunyi, semua tertera jelas',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-green-600 font-semibold text-sm tracking-wider uppercase">
                ABOUT COMPANY
              </span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Mitra Terpercaya Perjalanan Ibadah Anda
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Dengan pengalaman lebih dari 20 tahun dalam melayani jamaah umroh dan haji, kami
              berkomitmen memberikan pelayanan terbaik untuk perjalanan spiritual Anda. Ribuan
              jamaah telah mempercayakan ibadah mereka bersama kami dengan kepuasan penuh.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button
              type="primary"
              size="large"
              className="!bg-green-700 hover:!bg-green-800 !rounded-lg px-8 mt-4"
            >
              Pelajari Selengkapnya
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop"
              alt="Jemaah di Masjidil Haram"
              className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />

            <div className="absolute top-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">15K+</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">Jamaah Terpuaskan</div>
                  <div className="text-sm text-gray-600">Sejak tahun 2004</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -right-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-6 max-w-xs text-white">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm">Tingkat Kepuasan Jamaah</div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarOutlined key={star} className="text-yellow-300" />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-8 py-4 shadow-xl">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">A+</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="w-px h-10 bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">20+</div>
                  <div className="text-xs text-gray-600">Tahun</div>
                </div>
                <div className="w-px h-10 bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-xs text-gray-600">Paket</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
