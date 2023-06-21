import React, { useState } from 'react';
import './Dashboard.css'
import Schedule from '../../Forms/ScheduleForm/Schedule';
import Patients from '../../Forms/PatientForm/Patients'
import { CalendarOutlined, DollarOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserAddOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Typography } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { logoutUser } from '../../components/ProtectedLayout/Logout/logout'


const { Header, Sider, Content } = Layout;


export const Dashboard: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const auth = useAuth();
  const logout = logoutUser()
  const [activePage, setActivePage] = useState<string>('');

  const handleMenuClick = (page: string) => {
    setActivePage(page);
  };

  const renderContent = () => {
    if (activePage === 'patientList') {
      return <Patients/>;
    } else if (activePage === 'patientSchedule') {
      return <Schedule/>;
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
          <Menu.Item key="3" icon={<DollarOutlined style={{ fontSize: '15px' }} />}>
            Planos
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined style={{ fontSize: '15px' }} />}>
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
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};


