import { ReactNode } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/packages',
      icon: <ShoppingOutlined />,
      label: 'Paket',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Pelanggan',
    },
    {
      key: '/bookings',
      icon: <FileTextOutlined />,
      label: 'Booking',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Keluar',
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 flex items-center justify-center text-white font-bold text-lg">
          {collapsed ? 'TT' : 'Tour Travel'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between shadow">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar icon={<UserOutlined />} />
              <span>{user?.name}</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="m-6 p-6 bg-white rounded-lg">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
