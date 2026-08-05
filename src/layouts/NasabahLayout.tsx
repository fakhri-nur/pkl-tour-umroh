import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  WalletOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const { Sider, Content } = Layout;

interface NasabahLayoutProps {
  children: React.ReactNode;
}

const NasabahLayout: React.FC<NasabahLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/jemaah/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/jemaah/dashboard">Dashboard</Link>,
    },
    {
      key: '/jemaah/documents',
      icon: <FileTextOutlined />,
      label: <Link to="/jemaah/documents">Dokumen</Link>,
    },
    {
      key: '/jemaah/payments',
      icon: <WalletOutlined />,
      label: <Link to="/jemaah/payments">Pembayaran</Link>,
    },
    {
      key: '/jemaah/itinerary',
      icon: <CalendarOutlined />,
      label: <Link to="/jemaah/itinerary">Jadwal Perjalanan</Link>,
    },
    {
      key: '/jemaah/guides',
      icon: <BookOutlined />,
      label: <Link to="/jemaah/guides">Panduan</Link>,
    },
    {
      key: '/jemaah/profile',
      icon: <UserOutlined />,
      label: <Link to="/jemaah/profile">Profil</Link>,
    },
  ];

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={260}
        style={{
          background: '#0c2340',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* TOP SECTION - Brand + Profil + Menu */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5 flex items-center gap-3 border-b border-blue-900 flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0c2340] font-bold text-base">IT</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Intan Travel</span>
                <span className="text-orange-400 text-xs font-semibold">JAMAAH PORTAL</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="px-4 py-4 border-b border-blue-900 flex-shrink-0">
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/40">
                <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                  BA
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-white font-semibold text-sm truncate">
                    {user?.name || 'Bapak Ahmad'}
                  </span>
                  <span className="text-gray-400 text-xs truncate">Nasabah Reguler</span>
                </div>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="flex justify-center py-4 flex-shrink-0">
              <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{
                background: '#0c2340',
                borderRight: 0,
                marginTop: '16px',
              }}
              className="nasabah-menu"
            />
          </div>
        </div>

        {/* BOTTOM SECTION - Contact Support + Logout */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-700/50 space-y-3 px-6 pb-6 bg-[#0a1d33]">
          {!collapsed && (
            <>
              <div className="bg-slate-800/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CustomerServiceOutlined className="text-orange-400" />
                  <span className="text-white font-semibold text-sm">Contact Support</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">+62 812 3456 7890</p>
                <p className="text-gray-500 text-xs">cs@intantravel.com</p>
              </div>

              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors"
              >
                <QuestionCircleOutlined />
                <span>Bantuan & Pertanyaan</span>
              </a>
            </>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white transition-all font-medium text-sm ${
              collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
            }`}
          >
            <LogoutOutlined className="text-base" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s' }}>
        <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>
          {children}
        </Content>
      </Layout>

      <style>{`
        .nasabah-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
        }
        .nasabah-menu .ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .nasabah-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .nasabah-menu {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default NasabahLayout;