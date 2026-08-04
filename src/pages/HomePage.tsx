import { FloatButton } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutCompany from '@/components/AboutCompany';
import PackageSection from '@/components/PackageSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/6281234567890', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutCompany />
      <PackageSection />
      <Footer />

      <FloatButton
        icon={<WhatsAppOutlined />}
        type="primary"
        className="!bg-green-500 hover:!bg-green-600"
        onClick={handleWhatsApp}
        tooltip="Hubungi Kami via WhatsApp"
      />
    </div>
  );
};

export default HomePage;
