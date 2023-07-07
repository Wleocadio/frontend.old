import React, { useEffect, useState, ChangeEvent } from 'react';
import './Patient.css'
import { Layout, Avatar, Button, Col, Form, Input, List, Modal, Row, Tabs, Tooltip, theme, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import { fetchPatients } from '../../context/AuthProvider/util';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import moment from 'moment';
import RegisterPatients from '../../components/Register/RegisterPatients/RegisterPatients';
import PatientCalendar from '../../components/Calendar/PatientCalendar';

const { Header } = Layout;



interface UserItem {
  _id: string;
  name: string;
  cpf: string;
  mail: string;
  phone: number;
  emergencyContact: number;
  nameEmergencyContact: string;
  gender: string;
  dateBirth: string;
  zipCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: number;
  initialDemand: string;
  purposeTreatment: string;
  patientEvolution: string;
  generalNotes: string;
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Patients: React.FC = () => {

  const ContainerHeight = 550;
  const [selectedPatient, setSelectedPatient] = useState<UserItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setsearchText] = useState('');
  const [patients, setPatients] = useState<UserItem[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const { TabPane } = Tabs;
  const isSmallScreen = window.innerHeight < 700;
  const { token: { colorBgContainer }, } = theme.useToken();
  const { Text } = Typography;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof UserItem, _id: string) => {
    setSelectedPatient((prevState) => ({
      ...(prevState as UserItem),
      _id: _id,
      [field]: event.target.value,

    }));


  };
  // <Input className='input-item' value={selectedPatient.nameEmergencyContact} onChange={(e) => handleInputChange(e, 'nameEmergencyContact')} />
  const auth = useAuth();
  useEffect(() => {
    const fetchaData = async () => {
      try {

        const token = auth.token || '';
        const id = (auth.id || '').toString();

        const patientData = await fetchPatients(token, id);

        setPatients(patientData);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);

      }
    };

    fetchaData();
  }, [auth]);

  const handleSearch = (value: string) => {
    setsearchText(value);
  }


  const openModal = (patient: UserItem) => {
    setSelectedPatient(patient);
    setSelectedPatientId(patient._id);
    setModalVisible(true)
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const closeModals = () => {
    setSelectedPatient(null);
    setModalVisible(false)
  }

  const handleSave = () => {
    // Implemente aqui a lógica para salvar as alterações feitas no modal
    closeModals();
  }

  const filteredData = patients.filter((patients) => {
    return patients.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  })





  const formattedDateOfBirth = selectedPatient?.dateBirth ? new Date(selectedPatient.dateBirth).toLocaleDateString('pt-BR') : '';


  return (
    <div className='teste'>
      <div>
        <div>
          <Header style={{marginBottom: '2%', background: colorBgContainer }}>
            <Row gutter={16} style={{display: 'flex', alignItems:'center'}}>
              <Col span={8}>
                <Text style={{ marginLeft: '-3%', fontSize: '35px' }}> Pacientes</Text>
              </Col>
              <Col span={8}>
                <Tooltip title="Digite o nome do paciente">
                  <Input

                    style={{ borderColor: '#5eb0f8', borderRadius: "20px" }}
                    placeholder="Buscar"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}

                  />
                </Tooltip>
              </Col>
              <Col span={2} style={{ marginLeft: '20%' }}>
                <Tooltip title="Adicionar Usuário">
                  <Button icon={<UserAddOutlined style={{ fontSize: '20px' }} />} style={{ borderColor: '#5eb0f8' }} onClick={handleOpenModal}> Adicionar Pacientes</Button>
                </Tooltip>
              </Col>
            </Row>

          </Header>
        </div>
        {showModal && <RegisterPatients closeModal={handleCloseModal} />}
      </div>
      <List>
        <VirtualList
          height={isSmallScreen ? 400 : ContainerHeight}
          className="content"
          data={filteredData.length > 0 ? filteredData : patients}
          itemHeight={47}
          itemKey="_id"
        >
          {(response: UserItem) => (
            <List.Item key={response._id}>
              <List.Item.Meta
                avatar={<Avatar src={response.image} />}
                title={<a onClick={() => openModal(response)}>{response.name}</a>}
                description={[
                  "Nascimento: " + moment(response.dateBirth).format('DD/MM/YYYY') + " | ",
                  "Email: " + response.mail + " | ",
                  "Telefone: " + response.phone + " | ",
                  "Contato de Emergencia: " + response.emergencyContact
                ]}

              />

            </List.Item>
          )}
        </VirtualList>
      </List>
      <Modal style={{ marginTop: '-6%' }}
        //style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        visible={modalVisible}
        onCancel={closeModals}
        footer={[
          <Button key="save" type="primary" onClick={handleSave}>
            Salvar
          </Button>,
          <Button key="cancel" onClick={closeModals}>
            Cancelar
          </Button>,

        ]}

        maskClosable={false}

      >
        <h2 className="modal-title">Detalhes do Paciente</h2>
        {selectedPatient && (

          <>
            <Tabs defaultActiveKey="1" >
              <TabPane tab="Informações Pessoais" key="1" className="custom-tabs">
                <Form style={{ display: 'flex' }} className='item-form'>
                  <Row gutter={[16, 0]}>
                    <Col span={17}>
                      <Form.Item>
                        <label htmlFor="name">Nome</label>
                        <Input id="inputName" value={selectedPatient.name} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <label htmlFor="name">CPF</label>
                        <Input id='inputCPF' value={selectedPatient.cpf} />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item>
                        <label htmlFor="name">Email</label>
                        <Input id='inputEmail' value={selectedPatient.mail} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item>
                        <label htmlFor="name">Telefone</label>
                        <Input id='inputTelefone' value={selectedPatient.phone} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item >
                        <label htmlFor="name">Nascimento</label>
                        <Input id='inputDataNacismento' value={formattedDateOfBirth} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item>
                        <label htmlFor="name">Sexo</label>
                        <Input id='inputSexo' value={selectedPatient.gender} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item>
                        <label htmlFor="name">Estado Civil</label>
                        <Input id='inputEstadoCivil' value={selectedPatient.gender} />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item>
                        <label htmlFor="name">Profissão</label>
                        <Input id='inputEstadoCivil' value={selectedPatient.gender} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item >
                        <label htmlFor="name">CEP</label>
                        <Input id='inputCep' value={selectedPatient.zipCode} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item >
                        <label htmlFor="name">Estado</label>
                        <Input id='inputEstado' value={selectedPatient.state} />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item >
                        <label htmlFor="name">Cidade</label>
                        <Input id='inputCidade' value={selectedPatient.city} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item >
                        <label htmlFor="name">Bairro</label>
                        <Input id='inputBairro' value={selectedPatient.district} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item>
                        <label htmlFor="name">Rua</label>
                        <Input id='inputRua' value={selectedPatient.street} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item >
                        <label htmlFor="name">Número</label>
                        <Input id='inputNumeroResidencia' value={selectedPatient.number} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              <TabPane id='tabProtuario' tab="Prontuário do Paciente" key="2">
                <Form className='item-form'>
                  <Tabs defaultActiveKey="1" className="custom-tabs">
                    <TabPane tab="Demanda Inicial" key="4">
                      <Form className='item-form'>
                        <Col span={24}>
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputDemandaInicial' className='input-item' value={selectedPatient.initialDemand} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'initialDemand', selectedPatient._id)} rows={10} />
                          </Form.Item>
                        </Col>
                      </Form>
                    </TabPane>
                    <TabPane id='tabObjetivoTratamento' tab="Objetivo do Tratamento" key="5">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputObjetivoTratamento' className='input-item' value={selectedPatient.purposeTreatment} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'purposeTreatment', selectedPatient._id)} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane id='tabEvolucaoPaciente' tab="Evolução do Paciente" key="6">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputEvolucaoPaciente' className='input-item' value={selectedPatient.patientEvolution} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'patientEvolution', selectedPatient._id)} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane id='tabAnotacaoGerais' tab="Anotação Gerais" key="7">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputAnotacaoGerais' className='input-item' value={selectedPatient.generalNotes} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'generalNotes', selectedPatient._id)} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                  </Tabs>

                </Form>
              </TabPane>
              <TabPane id='tabContatoEmergencia' tab="Contato de Emergência" key="3">
                <Form className='item-form'>
                  <Row gutter={10}>
                    <Col span={8}>
                      <Form.Item >
                        <label htmlFor="name">Contato de Emergência</label>
                        <Input id='inputContatoEmergencia' value={selectedPatient.nameEmergencyContact} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item >
                        <label htmlFor="name">Telefone de Emergência</label>
                        <Input id='inputTelefoneEmergencia' value={selectedPatient.emergencyContact} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item >
                        <label htmlFor="name">Celular de Emergência</label>
                        <Input id='inputCelularEmergencia' value={selectedPatient.emergencyContact} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>

              </TabPane>

              <TabPane id='agendaDoPaciente' tab="Proximas Consultas" key="4">
                <Form >
                  {selectedPatientId && (
                    <PatientCalendar patientId={selectedPatientId} />
                  )}

                </Form>

              </TabPane>
              {/* Adicione mais abas conforme necessário */}

            </Tabs>
          </>
        )}
      </Modal>
    </div >
  );
};

export default Patients;