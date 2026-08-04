import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#0c2340] shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0c2340] font-bold text-xl">TT</span>
            </div>
            <span className="text-white font-bold text-xl">Tour Travel Umroh</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              Beranda
            </Link>
            <Link
              to="/paket"
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              Paket
            </Link>
            <Link
              to="/tentang-kami"
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              Tentang Kami
            </Link>
            <Link
              to="/kontak"
              className="text-white hover:text-green-400 transition-colors font-medium"
            >
              Kontak
            </Link>
          </div>

          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate('/login')}
            className="!rounded-full !bg-green-600 hover:!bg-green-700 !border-none px-6"
            size="large"
          >
            Login Portal
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
