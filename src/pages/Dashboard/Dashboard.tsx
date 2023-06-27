import React, { useState } from 'react';
import './Dashboard.css'
import Patients from '../../Forms/PatientForm/Patients'
import { CalendarOutlined, DollarOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserAddOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Typography } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { logoutUser } from '../../components/ProtectedLayout/Logout/logout'
import CalendarPage from '../Schedule/CalendarPage';
import { useLocation } from 'react-router-dom';


const { Header, Sider, Content } = Layout;


export const Dashboard: React.FC = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const auth = useAuth();
  const logout = logoutUser()
  const [activePage, setActivePage] = useState<string>('');

  //const activePage = location.pathname === '/schedule' ? 'patientSchedule' : '';
  const handleMenuClick = (page: string) => {
    if (page == activePage) {
      window.location.reload()
    } else {
      setActivePage(page);
    }

  };



  const renderContent = () => {
    if (activePage === 'patientList' || location.pathname === '/Patients') {
      return <Patients />;
    } else if (activePage === 'patientSchedule' || location.pathname === '/Schedule') {
      return <CalendarPage />;
    } else if (activePage === 'myPlan' || location.pathname === '/myPlan') {
      //return <CalendarPage/>;

    } else if (activePage === 'profile' || location.pathname === '/profile') {
      // return <CalendarPage/>;
    }

    // Adicione mais condições para outras páginas do menu, se necessário

    return null;
  };



  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[activePage]}
          onClick={({ key }) => handleMenuClick(key as string)}
        >
          <div >
            <Avatar className="avatar" icon={<UserOutlined style={{ fontSize: '32px' }} />} />
          </div>

          <div className="user-info">
            <Typography.Text className={`user-text ${collapsed ? 'invisible' : ''}`} style={{ wordBreak: 'break-all' }}>{auth.user}</Typography.Text>
          </div>

          <Menu.Item key="patientList" icon={<UserAddOutlined style={{ fontSize: '15px' }} />} >
            Pacientes
          </Menu.Item>
          <Menu.Item key="patientSchedule" icon={<CalendarOutlined style={{ fontSize: '15px' }} />}>
            Agenda
          </Menu.Item>
          <Menu.Item key="myPlan" icon={<DollarOutlined style={{ fontSize: '15px' }} />}>
            Meu Plano
          </Menu.Item>
          <Menu.Item key="profile" icon={<SettingOutlined style={{ fontSize: '15px' }} />}>
            Perfil
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined style={{ fontSize: '15px' }} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '10px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 150,
            background: colorBgContainer,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};


export default Dashboard;