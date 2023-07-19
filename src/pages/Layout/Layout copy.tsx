import React, { useState, useEffect } from 'react';
import './Layout.css';
import Patients from '../Patients/Patients';
import { CalendarOutlined, DollarOutlined, LogoutOutlined, SettingOutlined, UnorderedListOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { logoutUser } from '../../components/ProtectedLayout/Logout/logout';
import { useHistory, useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';
import CalendarPage from '../Schedule/CalendarPage';
import Consults from '../Consults/Consults';
import logo from '../../assets/logo.png'
import MyPlan from '../MyPlan/MyPlan';
import Profile from '../Profile/Profile';

const { Sider, Content } = Layout;

const LayoutPrincipal: React.FC<{ content: React.ReactNode }> = ({ }) => {
  const location = useLocation();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuth();
  const logout = logoutUser();
  const [activePage, setActivePage] = useState<string>('');

  const photo = auth.image || '';
  const base64String = Buffer.from(photo).toString('base64');
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  useEffect(() => {
    const storedActivePage = localStorage.getItem('activePage');
    if (storedActivePage) {
      setActivePage(storedActivePage);
    }
  }, []);

  const handleMenuClick = (page: string) => {
    if (page === activePage) {
      // setActivePage('');
      setActivePage(page);
    } else {
      setActivePage(page);
    }
  };

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  const renderContent = () => {
    if (activePage === 'patientList') {
      history.push('/patients')
      return <Patients />;
    } else if (activePage === 'patientSchedule') {
      history.push('/schedule')
      return <CalendarPage />;
    } else if (activePage === 'patientConsults') {
      history.push('/consults')
      return <Consults />;
      // Renderizar o componente correspondente para 'patientConsults'
    } else if (activePage === 'myPlan') {
      history.push('/myPlan')
      return <MyPlan />;
      // Renderizar o componente correspondente para 'myPlan'
    } else if (activePage === 'profile') {
      history.push('/profile')
      return <Profile />;
      // Renderizar o componente correspondente para 'profile'
    }

    // Adicione mais condições para outras páginas do menu, se necessário

    return null;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        backgroundColor: '#15458d'
      }}>


        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[activePage]}
          style={{ marginTop: '20%', backgroundColor: '#15458d' }}
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
            <Typography.Text className={`user-text ${collapsed ? 'invisible' : ''}`} style={{ wordBreak: 'break-all' }}>
              {auth.user}
            </Typography.Text>
          </div>

          <Menu.Item key="patientList" icon={<UserAddOutlined style={{ fontSize: '15px' }} />}>
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

          <div className="class-logo-container">

            <Avatar
              className="class-logo"
              src={logo}
              alt="Foto de Perfil"
              size={90}
              shape="square"
            />
          </div>



          <Menu.Item key="logout" style={{ marginTop: '30%' }} icon={<LogoutOutlined style={{ fontSize: '15px' }} />} onClick={logout}>
            Sair
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 150, background: 'white' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPrincipal;