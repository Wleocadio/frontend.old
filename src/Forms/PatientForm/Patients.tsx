import React, { useEffect, useState, ChangeEvent } from 'react';
import './Patient.css'

import { Avatar, Button, Form, Input, List, Modal, Tabs  } from 'antd';
import VirtualList from 'rc-virtual-list';
import { fetchPatients } from '../../context/AuthProvider/util';
import { useAuth } from '../../context/AuthProvider/useAuth';




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

  const ContainerHeight = 500;
  const [selectedPatient, setSelectedPatient] = useState<UserItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState<UserItem[]>([]);
  const { TabPane } = Tabs;



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof UserItem) => {
    setSelectedPatient((prevState) => ({
      ...(prevState as UserItem),
      [field]: event.target.value,
    }));
  };
  // <Input className='input-item' value={selectedPatient.nameEmergencyContact} onChange={(e) => handleInputChange(e, 'nameEmergencyContact')} />
  const auth = useAuth();
  useEffect(() => {
    const fetchaData = async () => {
      console.log('teste')
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


  const openModal = (patient: UserItem) => {
    setSelectedPatient(patient);
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedPatient(null);
    setModalVisible(false)
  }

  const handleSave = () => {
    // Implemente aqui a lógica para salvar as alterações feitas no modal
    closeModal();
  }

  const formattedDateOfBirth = selectedPatient?.dateBirth ? new Date(selectedPatient.dateBirth).toLocaleDateString('pt-BR') : '';


  return (
    <div >
      <List>
        <VirtualList
          height={ContainerHeight}
          className="content"
          data={patients}
          itemHeight={47}
          itemKey="_id"
        >
          {(response: UserItem) => (
            <List.Item key={response._id}>
              <List.Item.Meta
                avatar={<Avatar src={response.image} />}
                title={<a onClick={() => openModal(response)}>{response.name}</a>}
                description={["Email: ", response.mail, " Telefone: " + response.phone]}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>

      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="save" type="primary" onClick={handleSave}>
            Salvar
          </Button>,
          <Button key="cancel" onClick={closeModal}>
            Cancelar
          </Button>,

        ]}
        style={{
          width: '700px',
          transformOrigin: '-234px 34px',

        }}
        maskClosable={false}

      >
        <h2 className="modal-title">Detalhes do Paciente</h2>
        {selectedPatient && (

          <>
            <Tabs defaultActiveKey="1" className="custom-tabs">
              <TabPane tab="Informações Pessoais" key="1" className="custom-tabs">
                <Form className='item-form'>
                  <div className="form-row">
                    <Form.Item className='item-label' label="">
                      <label htmlFor="name">Nome</label>
                      <Input id="inputName" value={selectedPatient.name} disabled />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                      <label htmlFor="name">CPF</label>
                      <Input id='inputCPF' className='input-item' value={selectedPatient.cpf} disabled />
                    </Form.Item>
                    <Form.Item className='item-label' label="">
                      <label htmlFor="name">Email</label>
                      <Input id='inputEmail' className='input-item' value={selectedPatient.mail} disabled />
                    </Form.Item>
                    <Form.Item className='item-label' label="">
                      <label htmlFor="name">Telefone</label>
                      <Input id='inputTelefone' className='input-item' value={selectedPatient.phone} disabled />
                    </Form.Item>

                  </div>
                  <div className="form-row">
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Data de Nascimento</label>
                      <Input id='inputDataNacismento' className=' .input-item.small' value={formattedDateOfBirth} readOnly />
                    </Form.Item>
                    <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Sexo</label>
                      <Input id='inputSexo' className=' .input-item.small' value={selectedPatient.gender} />
                    </Form.Item>
                    <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Estado Civil</label>
                      <Input id='inputEstadoCivil' className='.custom-form-item .input-item.small' value={selectedPatient.gender} />
                    </Form.Item>

                  </div>


                  <div className="form-row">
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">CEP</label>
                      <Input id='inputCep' className='.custom-form-item .input-item.small' value={selectedPatient.zipCode} />
                    </Form.Item>
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Estado</label>
                      <Input id='inputEstado' className='.custom-form-item .input-item.small' value={selectedPatient.state} />
                    </Form.Item>
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Cidade</label>
                      <Input id='inputCidade' className='.custom-form-item .input-item.small' value={selectedPatient.city} />
                    </Form.Item>
                  </div>
                  <div className="form-row">
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Bairro</label>
                      <Input id='inputBairro' className='.custom-form-item .input-item.small' value={selectedPatient.district} />
                    </Form.Item>
                    <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                      <label htmlFor="name">Rua</label>
                      <Input id='inputRua' className='.custom-form-item .input-item.small' value={selectedPatient.street} />
                    </Form.Item>
                    <Form.Item className='item-label'>
                      <label htmlFor="name">Número</label>
                      <Input id='inputNumeroResidencia' className='.custom-form-item .input-item.small' value={selectedPatient.number} />
                    </Form.Item>
                  </div>

                </Form>
              </TabPane>

              <TabPane id='tabProtuario' tab="Prontuário do Paciente" key="2">
                <Form className='item-form'>
                  <Tabs defaultActiveKey="1" className="custom-tabs">
                    <TabPane tab="Demanda Inicial" key="4">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputDemandaInicial' className='input-item' value={selectedPatient.initialDemand} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'initialDemand')} rows={10} />
                           
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane id='tabObjetivoTratamento' tab="Objetivo do Tratamento" key="5">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputObjetivoTratamento' className='input-item' value={selectedPatient.purposeTreatment} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'purposeTreatment')} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane id='tabEvolucaoPaciente' tab="Evolução do Paciente" key="6">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' label="" style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputEvolucaoPaciente' className='input-item' value={selectedPatient.patientEvolution} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'patientEvolution')} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                    <TabPane id='tabAnotacaoGerais' tab="Anotação Gerais" key="7">
                      <Form className='item-form'>
                        <div className="form-row">
                          <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                            <Input.TextArea id='inputAnotacaoGerais' className='input-item' value={selectedPatient.generalNotes} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'generalNotes')} rows={10} />
                          </Form.Item>
                        </div>
                      </Form>
                    </TabPane>
                  </Tabs>

                </Form>
              </TabPane>
              <TabPane id='tabContatoEmergencia' tab="Contato de Emergência" key="3">
                <Form className='item-form'>


                  <Form.Item className='item-label' style={{ marginRight: '10px' }}>
                    <label htmlFor="name">Contato de Emergência</label>
                    <Input id='inputContatoEmergencia' className='.custom-form-item .input-item.small' value={selectedPatient.nameEmergencyContact} />
                  </Form.Item>
                  <Form.Item className='item-label'>
                    <label htmlFor="name">Telefone de Emergência</label>
                    <Input id='inputTelefoneEmergencia' className='.custom-form-item .input-item.small' value={selectedPatient.emergencyContact} />
                  </Form.Item>
                  <Form.Item className='item-label'>
                    <label htmlFor="name">Celular de Emergência</label>
                    <Input id='inputCelularEmergencia' className='.custom-form-item .input-item.small' value={selectedPatient.emergencyContact} />
                  </Form.Item>

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