import { MoreOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, List, Modal, Result, Row, Tabs, Tooltip, Typography, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import VirtualList from 'rc-virtual-list';
import './Consults.css'
import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchPatients, fetchSchedules, updateSchedule } from "../../context/AuthProvider/util";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Dayjs } from 'dayjs';
import { useHistory } from "react-router-dom";
import ScheduleModal from "../../components/Register/RegisterSchedule/RegisterSchedule";
import TabPane from "antd/es/tabs/TabPane";
import { ChangeEvent } from "react";

interface Schedule {
    professionalId: string;
    date: string;
    serviceValue: number;
    notes: string;
    vague: boolean;
    duration: number;
    realized: string,
    consultationObervation: string,
    patientName: string;
    _id: string;
    patientId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface Patient {
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



const Consults: React.FC = () => {
    const { Text } = Typography;
    const ContainerHeight = 520;
    const { token: { colorBgContainer }, } = theme.useToken();
    const isSmallScreen = window.innerHeight < 770;
    const [form] = Form.useForm();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [creatSchedule, setcreatSchedule] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [showDeleteResult, setShowDeleteResult] = useState(false);
    const [showCreateResult, setShowCreateResult] = useState(false);
    const auth = useAuth();
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const history = useHistory()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSchedules: Schedule[] = await fetchSchedules(token, id);
                setSchedules(fetchedSchedules);

                const fetchedPatients: Patient[] = await fetchPatients(token, id);
                setPatients(fetchedPatients);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (value: string) => {
        const trimmedValue = value.trim();
        setSearchText(trimmedValue);

        if (trimmedValue === '') {
            setFilteredSchedules([]);
        } else {
            const filteredSchedules = schedules.filter((schedule) =>
                schedule.patientName.toLowerCase().includes(trimmedValue.toLowerCase())
            );
            const sortedSchedules = filteredSchedules.sort((b, a) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
            setFilteredSchedules(sortedSchedules);
        }
    };
    //função para atualizar os campos atividades realizadas e observação da consulta.
    const updateSchedules = () => {

        const realized = form.getFieldValue('realized');
        const consultationObervation = form.getFieldValue('consultationObervation');
        console.log(realized, consultationObervation)

        if (selectedSchedule) {

            const scheduleId= selectedSchedule._id

            const scheduleData = {
                
                realized: realized,
                consultationObervation: consultationObervation,

            };
            console.log(scheduleData, token, id)
            updateSchedule(scheduleData, token, scheduleId)
                .then(() => {
                    setShowCreateResult(true)
                })
        };
        form.resetFields();
        //setModalOpen(false);
    };


    const handleOpenModal = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
        form.setFieldsValue({
            realized: schedule.realized,
            consultationObervation: schedule.consultationObervation
          });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedSchedule(null);
        setModalVisible(false);
    };

    const openModalCreateSchedule = () => {
        setcreatSchedule(true);
    }
    const closeModalCreateSchedule = () => {
        setcreatSchedule(false);
    }
    const handleDateSelect = (date: Dayjs, time: Dayjs) => {
        setSelectedDate(date)
        setSelectedTime(time)
    }

    const closeDeleteMessage = () => {
        setShowDeleteResult(false)
        history.push('/schedule');
        window.location.reload()
    }

    const closeCreateMessage = () => {
        setShowCreateResult(false)
        history.push('/schedule');
        window.location.reload()
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Schedule, _id: string) => {
        setSelectedSchedule((prevState) => ({
            ...(prevState as Schedule),
            _id: _id,
            [field]: event.target.value,

        }));

    };

    const sortedSchedules = [...schedules].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });


    return (
        <div className='teste'>
            <div>
                <Modal
                    visible={modalVisible}
                    onCancel={handleCloseModal}
                    footer={[

                        <Button key="salve" type="primary" onClick={updateSchedules}>
                            Salve
                        </Button>,
                        <Button key="cancel" onClick={handleCloseModal}>
                            Cancelar
                        </Button>,
                    ]}
                    maskClosable={false}
                >
                    {/* Renderizar as informações da consulta no modal */}
                    {selectedSchedule && (
                        <div>
                            <h2 style={{ display: 'flex', justifyContent: 'center' }}>{selectedSchedule.patientName}</h2>
                            <Form
                                form={form}
                                style={{ display: 'flex' }}
                                onFinish={updateSchedules}
                            >
                                <Row>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop:'' }}>
                                    <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <label style={{ marginRight: '3px' }}> Data:</label>
                                        {moment(selectedSchedule.date).add(3, 'hours').format('DD/MM')}
                                        <label style={{ marginLeft: '5px', marginRight: '3px' }}> Horário:</label>
                                        {moment(selectedSchedule.date).add(3, 'hours').format('HH:mm')}
                                    </Col>
                                    <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <label style={{ marginRight: '2px' }}> Valor: </label>
                                        {selectedSchedule.serviceValue}
                                        <label style={{ marginRight: '5px' }}>,00 </label>
                                    </Col>
                                    <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <label style={{ marginRight: '5px' }}>Duração: </label>
                                        {selectedSchedule.duration}
                                        <label style={{ marginLeft: '2px' }}> Minutos </label>
                                    </Col>
                                </Col>
                                <Col span={24} style={{display:'flex', marginTop:'3%'}}>
                                <Tabs>
                                <TabPane tab="Atividades Realizadas" key="1">
                                    <Col span={24}>
                                        
                                        <Form.Item name="realized" className='item-label' label="" style={{ marginRight: '10px', width:'185%' }}>
                                            <Input.TextArea id='inputRealized' className='input-item' value={selectedSchedule.realized} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'realized', selectedSchedule._id)} rows={10} />
                                        </Form.Item>
                                    </Col>
                                </TabPane>
                                <TabPane tab="Observações" key="2" >
                                    <Col span={24}>
                                        <Form.Item name="consultationObervation" className='item-label' label="" style={{ marginRight: '10px', width:'185%'}}>
                                            <Input.TextArea id='inputconsultationObervation' className='input-item' value={selectedSchedule.consultationObervation} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, 'consultationObervation', selectedSchedule._id)} rows={10} />
                                        </Form.Item>
                                    </Col>
                                </TabPane>
                            </Tabs>
                            </Col>
                            </Row>
                            </Form>

                            


                            <p></p>
                            {/* Outras informações da consulta */}
                        </div>
                    )}
                </Modal>
                <Modal
                    visible={showDeleteResult}
                    centered
                    footer={null}
                >
                    <Result
                        status="success"
                        title="Agendamento excluido com Sucesso!"
                        extra={[
                            <Button id='btnOkDeleteMessage' type="primary" key="ok" onClick={closeDeleteMessage}>
                                OK
                            </Button>
                        ]}
                    ></Result>
                </Modal>
                <Modal
                    visible={showCreateResult}
                    centered
                    footer={null}
                >
                    <Result
                        status="success"
                        title="Agendamento realizado com Sucesso!"
                        extra={[
                            <Button id='btnOkMessageSuccess' type="primary" key="ok" onClick={closeCreateMessage}>
                                OK
                            </Button>
                        ]}
                    ></Result>
                </Modal>
                <ScheduleModal
                    visible={creatSchedule}
                    onCancel={closeModalCreateSchedule}
                    onDateSelect={handleDateSelect}
                    patients={patients}
                />

                <div>
                    <Header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%', background: colorBgContainer }}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={6}>
                                <Text style={{ display: 'flex', fontSize: '30px', alignItems: 'center' }}>Lista de Consultas</Text>
                            </Col>
                            <Col span={10}>
                                <Tooltip title="Digite o nome do paciente">
                                    <Input
                                        style={{ backgroundColor: '#b6d3f0', borderRadius: "20px", }}
                                        placeholder="Buscar paciente"
                                        className="white-placeholder"
                                        value={searchText}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </Tooltip>
                            </Col>
                            <Col span={8} style={{ display: 'flex', justifyContent: 'right' }}>
                                <Tooltip title="Adicionar Consulta">
                                    <Button icon={<ScheduleOutlined style={{ fontSize: '20px' }} />} style={{ display: 'flex', backgroundColor: '#23a6f0', alignItems: 'center', color: 'white', }} onClick={openModalCreateSchedule}> Agendar atendimento</Button>
                                </Tooltip>

                            </Col>
                        </Col>
                    </Header>

                    <List size="large">
                        <List.Item
                            style={{ borderBottom: 'none', marginBottom: '-10px' }}
                        >
                            <Col span={24} style={{ display: 'flex' }}>

                                <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <strong>Data</strong>
                                </Col>
                                <Col span={2} style={{ display: 'flex', justifyContent: 'left' }}>
                                    <strong>Horário</strong>
                                </Col>
                                <Col span={8} style={{ display: 'flex', justifyContent: 'left' }}>
                                    <strong>Nome</strong>
                                </Col>
                                <Col span={5} style={{ display: 'flex', justifyContent: 'right', marginLeft: '40px' }}>
                                    <strong>Valor</strong>
                                </Col>
                                <Col span={6} style={{ display: 'flex', justifyContent: 'center', marginLeft: '-15px' }}>
                                    <strong>Duração</strong>
                                </Col>
                            </Col>
                        </List.Item>
                        <VirtualList
                            height={isSmallScreen ? 400 : ContainerHeight}
                            data={filteredSchedules.length > 0 ? filteredSchedules : sortedSchedules}
                            itemHeight={80}
                            itemKey="_id"
                        >
                            {(response: Schedule) => (
                                <List.Item
                                    key={response._id}
                                    style={{ borderBottom: 'none', marginBottom: '-10px' }}
                                >
                                    <Col span={24} style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        borderRadius: '20px',
                                        borderColor: '#5eb0f8',
                                        borderStyle: 'solid',
                                        borderWidth: '1px 1px 1px 1px',
                                        height: '40px',
                                        alignItems: 'center'

                                    }}>
                                        <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                            {moment(response.date).format('DD/MM')}
                                        </Col>
                                        <Col span={2} style={{ display: 'flex', justifyContent: 'left' }}>
                                            {moment(response.date).add(3, 'hours').format('HH:mm')}
                                        </Col>
                                        <Col span={8} style={{ display: 'flex', justifyContent: 'left' }}>
                                            {response.patientName}
                                        </Col>
                                        <Col span={6} style={{ display: 'flex', justifyContent: 'right' }}>
                                            {'R$: ' + response.serviceValue + ',00'}
                                        </Col>
                                        <Col span={5} style={{ display: 'flex', justifyContent: 'center' }}>
                                            {response.duration + ' Minutos'}
                                        </Col>
                                        <Col span={1}>
                                            <Button
                                                shape="circle"
                                                icon={<MoreOutlined style={{ fontSize: '30px' }} />}
                                                size="small"
                                                className="actions-button"
                                                onClick={() => handleOpenModal(response)}
                                            />
                                        </Col>
                                    </Col>
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </div>
            </div>
        </div>
    );
}

export default Consults;