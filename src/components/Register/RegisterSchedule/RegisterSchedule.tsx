import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Result, Col, Row } from "antd";

import { Dayjs } from "dayjs";
import { createSchedule } from "../../../context/AuthProvider/util";
import { useAuth } from "../../../context/AuthProvider/useAuth";
import { useHistory } from "react-router-dom";
import MiniCalendar from "../../Calendar/MiniCalendar";

interface ScheduleModalProps {
    visible: boolean;
    onCancel: () => void;
    onDateSelect: (date: Dayjs, time: Dayjs) => void;
    patients: any[]; // Substitua "any[]" pelo tipo correto dos pacientes
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
    visible,
    onCancel,
    onDateSelect,
    patients,
}) => {
    const auth = useAuth();
    const token = auth.token || '';
    const id = (auth.id || '').toString();
    const history = useHistory()
    const [form] = Form.useForm();
    const { Option } = Select;
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [showDeleteResult, setShowDeleteResult] = useState(false);
    const [showCreateResult, setShowCreateResult] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSave = () => {
        
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
        //setModalOpen(false);
    };

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
        <div>
        <Modal
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button id="btnSave" key="salvar" type="primary" onClick={handleSave}>
                    Salvar
                </Button>,
                <Button id="btnClose" key="cancel" onClick={onCancel}>
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
                                <Form.Item name="inputNomePaciente" 
                                 >
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
                                <Form.Item name="serviceValue" >
                                    <InputNumber min={0} max={1000} id='inputServiceValue' />
                                </Form.Item>
                            </Col>

                            <Col span={3}>
                                <label htmlFor="name">Minutos</label>
                                <Form.Item name="duration" >
                                    <InputNumber min={0} max={60} id='inputduration' />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <label htmlFor="name">Observações</label>
                                <Form.Item name="notes"  >
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
                </div>
    );
};

export default ScheduleModal;

