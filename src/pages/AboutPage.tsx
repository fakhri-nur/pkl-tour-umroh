import { Row, Col, Card } from 'antd';
import {
  SafetyOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const missionItems = [
    {
      number: '01',
      text: 'Berpegang teguh pada prinsip ajaran Islam dalam setiap aspek operasional perusahaan',
    },
    {
      number: '02',
      text: 'Memiliki SDM yang bertaqwa, profesional, dan berintegritas tinggi dalam melayani jamaah',
    },
    {
      number: '03',
      text: 'Inovatif, progresif, dan bekerja keras untuk memberikan pelayanan terbaik kepada jamaah',
    },
    {
      number: '04',
      text: 'Senantiasa memberikan manfaat yang sebesar-besarnya bagi jamaah, mitra, dan masyarakat',
    },
    {
      number: '05',
      text: 'Menjadi perusahaan tour & travel dengan pelayanan terbaik dan terpercaya di Indonesia',
    },
  ];

  const partners = [
    'CV. Karya Indo Tehnik',
    'PT. Nur Amanah Wisata',
    'PT. Alam Bidadari Semesta',
    'PT. LSKK Indonesia',
    'Rawaeh Al Mesk',
    'PT. KAI Tours',
    'CV. Barokah Travel',
    'PT. Nusa Wisata',
  ];

  const legalDocuments = [
    {
      icon: <SafetyOutlined className="text-3xl text-green-600" />,
      title: 'Izin Penyelenggara Perjalanan Ibadah Umroh (PPIU)',
      number: 'No. 123 Tahun 2020',
      issuer: 'Kementerian Agama RI',
    },
    {
      icon: <TrophyOutlined className="text-3xl text-green-600" />,
      title: 'Izin Penyelenggara Ibadah Haji Khusus (PIHK)',
      number: 'No. 456 Tahun 2021',
      issuer: 'Kementerian Agama RI',
    },
    {
      icon: <TeamOutlined className="text-3xl text-green-600" />,
      title: 'Anggota Himpunan Penyelenggara Umroh dan Haji (HIMPUH)',
      number: 'NPA: 789/HIMPUH/2021',
      issuer: 'HIMPUH Indonesia',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Tentang Kami</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Mengenal lebih dekat Intan Travel Internasional, biro perjalanan ibadah terpercaya
            Anda
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop"
                  alt="Intan Travel"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white rounded-2xl p-8 shadow-xl max-w-xs">
                  <div className="text-4xl font-bold mb-2">Terpercaya</div>
                  <div className="text-lg">Sejak 2010</div>
                </div>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div className="space-y-6">
                <div>
                  <span className="text-green-600 font-semibold text-sm tracking-wider uppercase">
                    ABOUT COMPANY
                  </span>
                  <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                    Intan Travel Internasional
                  </h2>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  Intan Travel Internasional adalah biro perjalanan ibadah umroh dan haji yang telah
                  melayani ribuan jamaah sejak tahun 2010. Kami berkomitmen memberikan pelayanan
                  terbaik dengan mengutamakan kenyamanan, keamanan, dan kepuasan jamaah dalam setiap
                  perjalanan ibadah.
                </p>

                <p className="text-gray-600 leading-relaxed text-lg">
                  Dengan tim profesional yang berpengalaman, pembimbing ibadah yang kompeten, serta
                  fasilitas lengkap, kami siap mengantarkan Anda menuju tanah suci dengan penuh
                  kekhusyukan. Kepercayaan jamaah adalah amanah bagi kami untuk terus memberikan
                  yang terbaik.
                </p>

                <Row gutter={16} className="pt-4">
                  <Col span={12}>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-700 mb-2">15.000+</div>
                        <div className="text-gray-700 font-medium">Jamaah Berangkat</div>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-700 mb-2">14+</div>
                        <div className="text-gray-700 font-medium">Tahun Pengalaman</div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-12 shadow-2xl">
            <div className="mb-12">
              <span className="text-green-300 font-semibold text-sm tracking-wider uppercase">
                OUR VISION
              </span>
              <blockquote className="text-3xl md:text-4xl font-bold text-white mt-4 leading-relaxed">
                "Menjadi perusahaan penyelenggara perjalanan ibadah umroh dan haji yang terpercaya,
                profesional, dan selalu mengutamakan kepuasan serta kekhusyukan ibadah jamaah."
              </blockquote>
            </div>

            <div className="mt-16">
              <span className="text-green-300 font-semibold text-sm tracking-wider uppercase mb-6 block">
                OUR MISSION
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missionItems.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-transparent border-2 border-green-400 hover:bg-green-800 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="text-3xl font-bold text-yellow-400">{item.number}</div>
                      <p className="text-white leading-relaxed">{item.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm tracking-wider uppercase">
              OUR PARTNER
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
              Mitra Kolaborasi Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bekerja sama dengan berbagai perusahaan terpercaya untuk memberikan layanan terbaik
              kepada jamaah
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleOutlined className="text-3xl text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-800">{partner}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Legalitas & Perizinan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Terdaftar resmi dan berizin lengkap dari Kementerian Agama Republik Indonesia serta
              tergabung dalam organisasi penyelenggara umroh dan haji
            </p>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <Row gutter={[32, 32]}>
              {legalDocuments.map((doc, index) => (
                <Col xs={24} md={8} key={index}>
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      {doc.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{doc.title}</h3>
                    <div className="space-y-1">
                      <p className="text-green-600 font-semibold text-xl">{doc.number}</p>
                      <p className="text-sm text-gray-600">{doc.issuer}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
