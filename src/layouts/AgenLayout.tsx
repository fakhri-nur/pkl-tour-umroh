import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  FormOutlined,
  WalletOutlined,
  BookOutlined,
  FileImageOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const { Sider, Content } = Layout;

interface AgenLayoutProps {
  children: React.ReactNode;
}

const AgenLayout: React.FC<AgenLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/agen/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/agen/dashboard">Dashboard</Link>,
    },
    {
      key: '/agen/jemaah',
      icon: <TeamOutlined />,
      label: <Link to="/agen/jemaah">Jemaah Saya</Link>,
    },
    {
      key: '/agen/registrations',
      icon: <FormOutlined />,
      label: <Link to="/agen/registrations">Pendaftaran</Link>,
    },
    {
      key: '/agen/commissions',
      icon: <WalletOutlined />,
      label: <Link to="/agen/commissions">Komisi</Link>,
    },
    {
      key: '/agen/packages',
      icon: <BookOutlined />,
      label: <Link to="/agen/packages">Katalog Paket</Link>,
    },
    {
      key: '/agen/materials',
      icon: <FileImageOutlined />,
      label: <Link to="/agen/materials">Materi</Link>,
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
        {/* TOP SECTION - Brand Header + Menu */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5 flex items-center gap-3 border-b border-blue-900 flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0c2340] font-bold text-base">IT</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Intan Travel</span>
                <span className="text-orange-400 text-xs font-semibold">AGEN PORTAL</span>
              </div>
            )}
          </div>

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
              className="agen-menu"
            />
          </div>
        </div>

        {/* BOTTOM SECTION - Menempel di bawah */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-700/50 space-y-3 px-6 pb-6 bg-[#0a1d33]">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
              <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-semibold text-sm truncate">{user?.name || 'User'}</span>
                <span className="text-gray-400 text-xs truncate">Agen & Cabang</span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="flex justify-center mb-2">
              <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </div>
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
        .agen-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
        }
        .agen-menu .ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .agen-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .agen-menu {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default AgenLayout;