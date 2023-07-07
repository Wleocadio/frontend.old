import React, { useState } from 'react';
import './Layout.css'
import Patients from '../Patients/Patients'
import { CalendarOutlined, DollarOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UnorderedListOutlined, UserAddOutlined, UserOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Typography } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { logoutUser } from '../../components/ProtectedLayout/Logout/logout'
import CalendarPage from '../Schedule/CalendarPage';
import { useHistory, useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';
const { Sider, Content } = Layout;



const LayoutPrincipal: React.FC<{ content: React.ReactNode }> = ({ }) => {
  const location = useLocation();
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const auth = useAuth();
  const logout = logoutUser()
  const [activePage, setActivePage] = useState<string>('');
  const photo = auth.image || '';
  const base64String = Buffer.from(photo).toString('base64');
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  
  const handleMenuClick = (page: string) => {
    if (page == activePage) {
      window.location.reload()
    } else {
      setActivePage(page);
    }

  };


  const renderContent = () => {


    if (activePage === 'patientList') {
      history.push('/patients')
      return <Patients />;


    } else if (activePage === 'patientSchedule' || location.pathname === '/schedule') {
      history.push('/schedule')
      return <CalendarPage />;
    } else if (activePage === 'patientConsults') {
      history.push('/patientConsults')
      //return <CalendarPage/>;
    } else if (activePage === 'MyPlan') {
      history.push('/myPlan')
      //return <CalendarPage/>;

    } else if (activePage === 'profile' || location.pathname === '/profile') {
      history.push('/profile')
      // return <CalendarPage/>;
    }

    // Adicione mais condições para outras páginas do menu, se necessário

    return null;
  };




  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{backgroundColor: '#15458d'}}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[activePage]}
          style={{backgroundColor: '#15458d'}}
          onClick={({ key }) => handleMenuClick(key as string)}
        >


          <div className="avatar-container">
           <Avatar
              className="custom-avatar"
              src={imageUrl}
              alt="Foto de Perfil"
              size={100}
              shape="circle"
            />
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
          <Menu.Item key="patientConsults" icon={<UnorderedListOutlined style={{ fontSize: '15px' }} />}>
            Consultas
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

export default LayoutPrincipal;