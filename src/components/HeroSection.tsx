import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Biro Perjalanan Resmi Kemenag
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Perjalanan Ibadah yang{' '}
              <span className="text-green-400">Aman & Berkah</span>
            </h1>

            <p className="text-lg text-gray-200">
              Wujudkan impian perjalanan spiritual Anda bersama kami. Paket Umroh dan Haji dengan
              pelayanan terbaik, pembimbing berpengalaman, dan fasilitas lengkap.
            </p>

            <div className="bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-xl">
              <Input
                placeholder="Cari paket umroh atau haji..."
                prefix={<SearchOutlined className="text-gray-400" />}
                bordered={false}
                size="large"
                className="flex-1"
              />
              <Button
                type="primary"
                size="large"
                className="!bg-green-600 hover:!bg-green-700 !rounded-xl px-8"
              >
                Cari Paket
              </Button>
            </div>

            <div className="flex items-center gap-8 text-white pt-4">
              <div>
                <div className="text-3xl font-bold">15.000+</div>
                <div className="text-sm text-gray-300">Jamaah Terlayani</div>
              </div>
              <div>
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm text-gray-300">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Kepuasan</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 group transition-transform duration-300 ease-out hover:-translate-y-2">
              <div className="relative rounded-3xl overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop"
                  alt="Ka'bah Masjidil Haram"
                  className="w-full h-[500px] object-cover scale-105 transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:-translate-y-2"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Terdaftar Resmi</div>
                    <div className="text-sm text-gray-600">Kementerian Agama RI</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
