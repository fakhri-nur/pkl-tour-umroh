import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Card } from 'antd';
import {
  DashboardOutlined,
  RocketOutlined,
  FunnelPlotOutlined,
  BarChartOutlined,
  DollarOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';

const { Sider, Content } = Layout;

interface MarketingFinanceLayoutProps {
  children: React.ReactNode;
}

const MarketingFinanceLayout: React.FC<MarketingFinanceLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/marketing/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/marketing/dashboard">Dashboard</Link>,
    },
    {
      key: '/marketing/campaigns',
      icon: <RocketOutlined />,
      label: <Link to="/marketing/campaigns">Campaigns</Link>,
    },
    {
      key: '/marketing/leads',
      icon: <FunnelPlotOutlined />,
      label: <Link to="/marketing/leads">Leads Pipeline</Link>,
    },
    {
      key: '/marketing/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/marketing/analytics">Analytics</Link>,
    },
    {
      key: '/marketing/finance',
      icon: <DollarOutlined />,
      label: <Link to="/marketing/finance">Keuangan</Link>,
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
                <span className="text-amber-400 text-xs font-semibold leading-tight">
                  PORTAL MARKETING & KEUANGAN
                </span>
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
              className="marketing-menu"
            />
          </div>
        </div>

        {/* BOTTOM SECTION - Contact Support + Logout */}
        <div className="flex-shrink-0 pt-4 border-t border-slate-700/50 space-y-3 px-6 pb-6 bg-[#0a1d33]">
          {!collapsed && (
            <Card
              size="small"
              className="!bg-slate-800/60 !border-slate-700"
              bodyStyle={{ padding: '12px' }}
            >
              <div className="flex items-start gap-2 mb-2">
                <CustomerServiceOutlined className="text-amber-400 text-lg mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-xs">Contact Support</p>
                  <p className="text-gray-400 text-[11px] leading-snug mt-0.5">
                    Tim kami siap membantu 24/7.
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px] text-gray-300">
                <p className="flex items-center gap-2">
                  <EnvironmentOutlined className="text-gray-500" /> Jl. Sudirman No. 123, Jakarta
                </p>
                <p className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-500" /> +62 812 3456 7890
                </p>
              </div>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors"
              >
                <QuestionCircleOutlined />
                <span>Pusat Bantuan</span>
              </a>
            </Card>
          )}

          {collapsed && (
            <div className="flex justify-center mb-2">
              <CustomerServiceOutlined className="text-amber-400 text-xl" />
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

          {!collapsed && (
            <p className="text-[10px] text-gray-500 text-center pt-1">
              {user?.name || 'Marketing'} • {user?.role || 'Marketing & Keuangan'}
            </p>
          )}
        </div>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s' }}>
        <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>{children}</Content>
      </Layout>

      <style>{`
        .marketing-menu .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
        }
        .marketing-menu .ant-menu-item-selected {
          background: rgba(251, 191, 36, 0.18) !important;
          color: #fbbf24 !important;
        }
        .marketing-menu .ant-menu-item-selected .anticon {
          color: #fbbf24 !important;
        }
        .marketing-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .marketing-menu {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default MarketingFinanceLayout;
