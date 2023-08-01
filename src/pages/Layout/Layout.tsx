import React, { useState, useEffect } from 'react';
import './Layout.css';
import Patients from '../Patients/Patients';
import { AreaChartOutlined, CalendarOutlined, DollarOutlined, LogoutOutlined, SettingOutlined, UnorderedListOutlined, UploadOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Typography, Modal, Button, Upload, Col, message, Result } from 'antd';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { logoutUser } from '../../components/ProtectedLayout/Logout/logout';
import { useHistory, useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';
import CalendarPage from '../Schedule/CalendarPage';
import Consults from '../Consults/Consults';
import logo from '../../assets/logo.png'
import MyPlan from '../MyPlan/MyPlan';
import Profile from '../Profile/Profile';
import { getProfessionalPhoto, updatePhoto } from '../../context/AuthProvider/util';
import Dashboard from '../Dashboard/Dashboard';

const { Sider, Content } = Layout;


const LayoutPrincipal: React.FC<{ content: React.ReactNode }> = ({ }) => {
  const location = useLocation();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuth();
  const token = auth.token || '';
  const id = (auth.id || '').toString();
  const logout = logoutUser();
  const [activePage, setActivePage] = useState<string>(location.pathname);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null)
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showCreateResult, setShowCreateResult] = useState(false);
  const [photo, setPhoto] = useState('');
  const base64String = Buffer.from(photo).toString('base64');
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  //console.log(base64String)
  if (activePage === '/login') {
    setActivePage('dashboard')
  }

  useEffect(() => {
    // Monitora a localização atual (pathname) e atualiza a activePage
    
    setActivePage(location.pathname.replace(/^\/([^/]*).*$/, '$1'));
    
    const storedActivePage = localStorage.getItem('activePage');
    if (storedActivePage) {
      setActivePage(storedActivePage);
    }
    const fetchProfessionalData = async () => {
      try {

        const professionalPhoto = await getProfessionalPhoto(token, id)
        setPhoto(professionalPhoto.image)
        // console.log('professionalPhoto:', professionalPhoto);


      } catch (error) {
        console.error('Erro ao buscar dados do profissional:', error);
      }
    };

    fetchProfessionalData();

  }, [token, id, location.pathname]);

  useEffect(() => {
    const base64String = Buffer.from(photo).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    setCurrentPhoto(imageUrl);
  }, [photo]);


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

    // if(location.pathname === '/dashboard'){
    //  return <Dashboard />

    // }

    if (activePage === 'patients') {
      history.push('/patients')
      return <Patients />;
    } else if (activePage === 'schedule') {
      history.push('/schedule')
      return <CalendarPage />;
    } else if (activePage === 'consults') {
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
    } else if (activePage === 'dashboard') {
      history.push('/dashboard')
      return <Dashboard />;
      // Renderizar o componente correspondente para 'Dashboard'
    }


    // Adicione mais condições para outras páginas do menu, se necessário

    return null;
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUploadImage = (info: any) => {
    if (info.file.status === 'done' && info.file.response) {
      setCurrentPhoto(info.file.response.url);
      setFileList(info.fileList)
    }
    if (info.file.status === 'error') {
      message.error('Erro ao enviar a imagem!');
    }
    // Ao final do processo, armazene o arquivo da imagem selecionada em currentFile
    if (info.file && info.file.originFileObj) {
      setCurrentFile(info.file.originFileObj as File);
    }
  };

  const handleSave = async () => {
    // Verifica se há uma imagem selecionada
    if (!currentFile) {
      message.error('Por favor, selecione uma imagem para atualizar.');
      return;
    }

    try {
      const photoData = new FormData();
      photoData.append('image', currentFile);

      // Chame a função updatePhoto passando o FormData com a imagem selecionada
      await updatePhoto(photoData, token, id);
      //message.success('Foto do perfil foi atualizada com sucesso');
      // Atualiza diretamente o estado 'photo' com a nova imagem retornada pela API
      const professionalPhoto = await getProfessionalPhoto(token, id)
      setPhoto(professionalPhoto.image)
    } catch (error) {
      console.error('Erro ao atualizar foto', error);
      message.error('Ocorreu um erro ao atualizar a foto');
    }

    handleCloseModal();
    setShowCreateResult(true)
  };

  const closeCreateMessage = () => {
    setShowCreateResult(false)

  }

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
          <div className={`custom-avatar-container ${isMouseOver ? 'avatar-hover' : ''}`}
            onClick={handleOpenModal}
            onMouseEnter={() => setIsMouseOver(true)}  // Adicionamos um evento para definir isMouseOver como true ao passar o mouse sobre o Avatar
            onMouseLeave={() => setIsMouseOver(false)} // Adicionamos um evento para definir isMouseOver como false ao tirar o mouse do Avatar

          >

            <Avatar
              className="custom-avatar"
              src={imageUrl}
              alt="Foto de Perfil"
              size={100}
              shape="circle"
              onClick={handleOpenModal}
            />
          </div>

          <div className="user-info">
            <Typography.Text className={`user-text ${collapsed ? 'invisible' : ''}`} style={{ wordBreak: 'break-all' }}>
              {auth.user}
            </Typography.Text>
          </div>

          <Menu.Item key="dashboard" icon={<AreaChartOutlined style={{ fontSize: '15px' }} />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="patients" icon={<UserAddOutlined style={{ fontSize: '15px' }} />}>
            Pacientes
          </Menu.Item>
          <Menu.Item key="schedule" icon={<CalendarOutlined style={{ fontSize: '15px' }} />}>
            Agenda
          </Menu.Item>
          <Menu.Item key="consults" icon={<UnorderedListOutlined style={{ fontSize: '15px' }} />}>
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
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        footer={[
          <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '400px', marginTop: '15%' }}>

            <Upload
              key="upload"
              name="avatar"
              showUploadList={false}
              fileList={fileList}
              beforeUpload={(file) => {
                // Verifica a extensão do arquivo
                const fileType = file.type;
                if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
                  message.error('Você pode somente enviar arquivos JPG ou PNG!');
                  return false;
                }

                // Verifica o tamanho do arquivo (em bytes)
                const fileSize = file.size;
                const maxSize = 2 * 1024 * 1024; // 2MB
                if (fileSize > maxSize) {
                  message.error('A imagem deve ter no máximo 2MB!');
                  return false;
                }

                // Processa o arquivo caso as validações sejam bem-sucedidas
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setCurrentPhoto(reader.result as string);
                  setCurrentFile(file as File); // Armazena o arquivo da imagem selecionada
                };

                return false; // Retorna 'false' para impedir o envio automático do arquivo
              }}
              onChange={handleUploadImage}
            >
              <Button key="alterar">
                Alterar foto
              </Button>
            </Upload>
            <Button key="save" onClick={handleSave} style={{ marginLeft: 8 }}>
              Salvar
            </Button>
            <Button key="cancel" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Col>
        ]}
        maskClosable={false}
      >
        {/* Conteúdo do modal */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {currentPhoto ? (
            <Avatar
              className="custom-avatar"
              src={currentPhoto}
              alt="Foto de Perfil"
              size={250}
              shape="circle"
            />
          ) : (
            <div>
              <UploadOutlined /> Carregar Foto
            </div>
          )}
        </div>
      </Modal>
      <Modal
        visible={showCreateResult}
        centered
        footer={null}
      >
        <Result
          status="success"
          title="Foto do perfil atualizada com Sucesso!"
          extra={[
            <Button id='btnOkMessagePatient' type="primary" key="ok" onClick={closeCreateMessage}>
              OK
            </Button>
          ]}
        ></Result>
      </Modal>
    </Layout>

  );
};

export default LayoutPrincipal;