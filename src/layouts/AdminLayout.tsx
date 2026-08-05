import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  FileTextOutlined,
  NotificationOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const { Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: '/admin/jemaah',
      icon: <TeamOutlined />,
      label: <Link to="/admin/jemaah">Data Jemaah</Link>,
    },
    {
      key: '/admin/payments',
      icon: <DollarOutlined />,
      label: <Link to="/admin/payments">Pembayaran</Link>,
    },
    {
      key: '/admin/packages',
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/packages">Paket Agen</Link>,
    },
    {
      key: '/admin/schedules',
      icon: <CalendarOutlined />,
      label: <Link to="/admin/schedules">Keberangkatan</Link>,
    },
    {
      key: '/admin/documents',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/documents">Dokumen</Link>,
    },
    {
      key: '/admin/news',
      icon: <NotificationOutlined />,
      label: <Link to="/admin/news">Berita</Link>,
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Pengaturan</Link>,
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
                <span className="text-orange-400 text-xs font-semibold">ADMIN PORTAL</span>
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
              className="admin-menu"
            />
          </div>
        </div>

        {/* BOTTOM SECTION - Menempel di bawah */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-700/50 space-y-3 px-6 pb-6 bg-[#0a1d33]">
          {/* Support Link */}
          {!collapsed && (
            <a
              href="#"
              className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors"
            >
              <QuestionCircleOutlined />
              <span>Bantuan & Dukungan</span>
            </a>
          )}

          {/* Profil Pengguna */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
              <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-semibold text-sm truncate">{user?.name || 'Admin User'}</span>
                <span className="text-gray-400 text-xs truncate">Operations Manager</span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="flex justify-center mb-2">
              <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            </div>
          )}

          {/* Tombol Logout */}
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
        .admin-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
        }
        .admin-menu .ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .admin-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .admin-menu {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default AdminLayout;
