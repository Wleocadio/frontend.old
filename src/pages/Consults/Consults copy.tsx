import { MoreOutlined, ScheduleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, List, Modal, Result, Row, Select, Tooltip, Typography, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import VirtualList from 'rc-virtual-list';
import './Consults.css'
import React, { useEffect, useState } from "react";
import moment from "moment";
import { createSchedule, deleteSchedule, fetchPatients, fetchSchedules } from "../../context/AuthProvider/util";
import { useAuth } from "../../context/AuthProvider/useAuth";
import MiniCalendar from "../../components/Calendar/MiniCalendar";
import { Dayjs } from 'dayjs';
import { useHistory } from "react-router-dom";

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
    const [form] = Form.useForm();
    const { Option } = Select;
    const isSmallScreen = window.innerHeight < 770;
    const [patients, setPatients] = useState<Patient[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [creatSchedule, setcreatSchedule] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Schedule | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
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
        setSearchText(value);
        const filteredSchedules = schedules.filter((schedule) =>
            schedule.patientName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSchedules(filteredSchedules);
    };
    const handleSave = () => {

        //const selectedDate = form.getFieldValue('selectedDate');
        const serviceValue = form.getFieldValue('serviceValue');
        const duration = form.getFieldValue('duration');
        const notes = form.getFieldValue('notes');
        if (selectedDate && selectedTime && selectedPatientId) {

            const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
            const formattedTime = selectedTime ? selectedTime.format('HH:mm:ss') : '';
            const dateTime = `${formattedDate}T${formattedTime}Z`;

            const scheduleData = {
                professionalId: id,
                date: dateTime,
                serviceValue: serviceValue,
                notes: notes,
                duration: duration,
                patientId: selectedPatientId
            };

            createSchedule(scheduleData, token)
                .then(() => {
                    setShowCreateResult(true)
                })
        };
        form.resetFields();
        setModalOpen(false);
    };


    const handleOpenModal = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
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
    const handlePatientSelect = (value: string) => {
        setSelectedPatientId(value);
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



    return (
        <div className='teste'>
            <div>
                <Modal
                    visible={modalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    {/* Renderizar as informações da consulta no modal */}
                    {selectedSchedule && (
                        <div>
                            <h2 style={{ display: 'flex', justifyContent: 'center' }}>{selectedSchedule.patientName}</h2>
                            <p>Data: {selectedSchedule.date}</p>
                            <p>Valor da Consulta: {selectedSchedule.serviceValue}</p>
                            <p>duração do atendimento: {selectedSchedule.duration + ' minutos'}</p>
                            {/* Outras informações da consulta */}
                        </div>
                    )}
                </Modal>
                <Modal
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    visible={creatSchedule}
                    onCancel={() => setcreatSchedule(false)}
                    footer={[
                        <Button id='btnSave' key="salvar" type="primary" onClick={handleSave}>
                            Salvar
                        </Button>,
                        <Button id='btnClose' key="cancel" onClick={closeModalCreateSchedule}>
                            Cancelar
                        </Button>,
                    ]}
                    maskClosable={false}
                >
                    <h2 style={{ textAlign: 'center' }}> Agendar Atendimento</h2>

                    <Form
                        form={form}
                        style={{ display: 'flex' }}
                        onFinish={handleSave}
                    >
                        <Row gutter={[16, 9]}>
                            <Col span={24}>
                                <Form.Item name="selectedDate" noStyle>
                                    <MiniCalendar visible={modalOpen} onDateSelect={handleDateSelect}></MiniCalendar>
                                </Form.Item>
                            </Col>

                            <Col span={15}>
                                <Form.Item name="inputNomePaciente">
                                    <label htmlFor="name">Nome do Paciente</label>
                                    <Select
                                        id='inputNomePaciente'
                                        className='input-item'
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option && option.children
                                                ? String(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                : false
                                        }
                                        onSelect={handlePatientSelect}
                                    >
                                        {patients.map((patient: any) => (
                                            <Option key={patient._id} value={patient._id}>
                                                {patient.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={3.5}>
                                <label htmlFor="name">Valor</label>
                                <Form.Item name="serviceValue">
                                    <InputNumber min={0} max={1000} id='inputServiceValue' />
                                </Form.Item>
                            </Col>

                            <Col span={3}>
                                <label htmlFor="name">Minutos</label>
                                <Form.Item name="duration">
                                    <InputNumber min={0} max={60} id='inputduration' />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <label htmlFor="name">Observações</label>
                                <Form.Item name="notes">
                                    <Input.TextArea maxLength={450} id='inputAnotacao' rows={5}></Input.TextArea>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
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
                            data={filteredSchedules.length > 0 ? filteredSchedules : schedules}
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