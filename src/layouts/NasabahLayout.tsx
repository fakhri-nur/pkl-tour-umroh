import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Tooltip } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  WalletOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
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
        trigger={null}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={256}
        collapsedWidth={80}
        className="sidebar-layout w-64 h-screen max-h-screen sticky top-0 left-0 flex flex-col overflow-hidden p-4 bg-[#0F2942] text-white"
        style={{
          background: '#0F2942',
        }}
      >
        {/* 1. HEADER - Fixed at top */}
        <div className="flex-shrink-0 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[#0F2942] font-bold text-base">IT</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">Intan Travel</span>
              <span className="text-orange-400 text-xs font-semibold">JAMAAH PORTAL</span>
            </div>
          )}
        </div>

        {/* 2. NAVIGATION MENU - Scrollable only if needed */}
        <nav className="flex-1 overflow-y-auto min-h-0 space-y-1 pr-1 custom-scrollbar">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
              background: '#0F2942',
              borderRight: 0,
            }}
            className="nasabah-menu"
          />
        </nav>

        {/* 3. FOOTER SECTION - Always fixed at bottom */}
        <div className="flex-shrink-0 pt-3 mt-auto border-t border-slate-700/50 space-y-2">
          {!collapsed && (
            <>
              <div className="p-2.5 my-2 text-xs rounded-lg bg-slate-800/40 border border-slate-700/40 space-y-1">
                <p className="flex items-center gap-2 text-white font-semibold">
                  <CustomerServiceOutlined className="text-orange-400" />
                  Contact Support
                </p>
                <p className="text-gray-400">+62 812 3456 7890</p>
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

          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
              <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                BA
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-semibold text-sm truncate">
                  {user?.name || 'Bapak Ahmad'}
                </span>
                <span className="text-gray-400 text-xs truncate">Nasabah Reguler</span>
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

          {/* Tombol Collapse Sidebar */}
          <div className="pt-1 w-full">
  <Tooltip title={collapsed ? 'Perluas Sidebar' : 'Kecilkan Sidebar'} placement="right">
    <button
      onClick={() => setCollapsed((prev) => !prev)}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200 flex items-center gap-3 justify-center"
    >
      {collapsed ? (
        <RightOutlined />
      ) : (
        <>
          <LeftOutlined />
          <span className="text-sm font-medium"></span>
        </>
      )}
    </button>
  </Tooltip>
</div>
        </div>
      </Sider>

      <Layout>
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
        .sidebar-layout .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </Layout>
  );
};

export default NasabahLayout;