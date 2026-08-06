import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, message } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';
import { useTourLeaderStore } from '@/store/tourLeaderStore';

const { Sider, Content } = Layout;

interface TourLeaderLayoutProps {
  children: React.ReactNode;
}

const TourLeaderLayout: React.FC<TourLeaderLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { profile } = useTourLeaderStore();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/tour-leader/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/tour-leader/dashboard">Dashboard</Link>,
    },
    {
      key: '/tour-leader/jemaah',
      icon: <TeamOutlined />,
      label: <Link to="/tour-leader/jemaah">Jemaah Records</Link>,
    },
    {
      key: '/tour-leader/payments',
      icon: <DollarOutlined />,
      label: <Link to="/tour-leader/payments">Payments</Link>,
    },
    {
      key: '/tour-leader/packages',
      icon: <ShoppingOutlined />,
      label: <Link to="/tour-leader/packages">Packages</Link>,
    },
    {
      key: '/tour-leader/documents',
      icon: <FolderOpenOutlined />,
      label: <Link to="/tour-leader/documents">Documents</Link>,
    },
    {
      key: '/tour-leader/settings',
      icon: <SettingOutlined />,
      label: <Link to="/tour-leader/settings">Settings</Link>,
    },
  ];

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleNewBooking = () => {
    message.success('Fitur New Booking dibuka (simulasi).');
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
        {/* TOP SECTION - Brand + Profile + Menu */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5 flex items-center gap-3 border-b border-blue-900 flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0c2340] font-bold text-base">IT</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Intan Travel</span>
                <span className="text-amber-400 text-xs font-semibold leading-tight">
                  TOUR LEADER PORTAL
                </span>
              </div>
            )}
          </div>

          {/* Foto Profil & Nama */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-900 flex-shrink-0">
              <Avatar size={44} icon={<UserOutlined />} style={{ backgroundColor: '#b45309' }} />
              <div className="flex flex-col min-w-0">
                <span className="text-white font-semibold text-sm truncate">
                  {user?.name || profile.name}
                </span>
                <span className="text-amber-400 text-xs">{profile.role}</span>
              </div>
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
              className="tourleader-menu"
            />
          </div>
        </div>

        {/* BOTTOM SECTION - New Booking + Support + Logout */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-700/50 space-y-3 px-6 pb-6 bg-[#0a1d33]">
          {!collapsed && (
            <button
              onClick={handleNewBooking}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0c2340] font-semibold text-sm px-3 py-2.5 transition-all"
            >
              <PlusOutlined />
              <span>+ New Booking</span>
            </button>
          )}

          {collapsed && (
            <button
              onClick={handleNewBooking}
              title="New Booking"
              className="w-full flex items-center justify-center p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0c2340] transition-all"
            >
              <PlusOutlined className="text-base" />
            </button>
          )}

          {!collapsed && (
            <a
              href="#"
              className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors"
            >
              <QuestionCircleOutlined />
              <span>Bantuan & Dukungan</span>
            </a>
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
        <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>{children}</Content>
      </Layout>

      <style>{`
        .tourleader-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
        }
        .tourleader-menu .ant-menu-item-selected {
          background: rgba(251, 191, 36, 0.18) !important;
          color: #fbbf24 !important;
        }
        .tourleader-menu .ant-menu-item-selected .anticon {
          color: #fbbf24 !important;
        }
        .tourleader-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .tourleader-menu {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default TourLeaderLayout;
