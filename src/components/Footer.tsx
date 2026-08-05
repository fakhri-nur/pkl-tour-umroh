import { Row, Col } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-[#0c2340] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0c2340] font-bold text-xl">TT</span>
              </div>
              <span className="text-white font-bold text-xl">Tour Travel</span>
            </div>
            <p className="text-gray-300 mb-4">
              Mitra terpercaya perjalanan ibadah Anda sejak 2004. Terdaftar resmi di Kementerian
              Agama RI.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white">f</span>
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white">ig</span>
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white">wa</span>
              </a>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <h3 className="text-lg font-bold mb-4">Layanan Kami</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Umroh Reguler
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Umroh Plus Turki
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Haji Reguler
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Haji Khusus
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tour Muslim
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <h3 className="text-lg font-bold mb-4">Informasi</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <EnvironmentOutlined className="text-green-400 text-lg mt-1" />
                <span className="text-gray-300">
                  Jl. Raya Merdeka No. 123, Jakarta Selatan 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneOutlined className="text-green-400 text-lg" />
                <a href="tel:+622112345678" className="text-gray-300 hover:text-green-400">
                  (021) 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailOutlined className="text-green-400 text-lg" />
                <a
                  href="mailto:info@tourtravel.com"
                  className="text-gray-300 hover:text-green-400"
                >
                  info@tourtravel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ClockCircleOutlined className="text-green-400 text-lg mt-1" />
                <span className="text-gray-300">Senin - Sabtu: 08.00 - 17.00 WIB</span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Tour Travel Umroh. Hak cipta dilindungi undang-undang.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Kebijakan Privasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
