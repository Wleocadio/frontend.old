import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { createSchedule, deleteSchedule, fetchPatients, fetchSchedules } from '../../context/AuthProvider/util';
import { useAuth } from '../../context/AuthProvider/useAuth';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';
import { Button, Col, Form, Input, InputNumber, Modal, Result, Row, Select, theme } from 'antd';
import { useHistory } from 'react-router-dom';
import MiniCalendar from '../../components/Calendar/MiniCalendar';
import { Dayjs } from 'dayjs';




interface Schedule {
  professionalId: string;
  date: string;
  serviceValue: number;
  notes: string;
  vague: boolean;
  duration: number;
  patientName: string;
  _id: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CalendarPage: React.FC = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const auth = useAuth();
  const token = auth.token || '';
  const [selectedEvent, setSelectedEvent] = useState<Schedule | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDeleteResult, setShowDeleteResult] = useState(false);
  const [showCreateResult, setShowCreateResult] = useState(false);
  const [patients, setPatients] = useState([]);
  const history = useHistory()
  const { Option } = Select;
  const id = (auth.id || '').toString();
  const [form] = Form.useForm();
  const { token: { colorBgContainer }, } = theme.useToken();


  useEffect(() => {
    showSchedulesOnCalendar([]) // mostra o calendário vazio, sem nenhum agendamento.
    const fetchAndShowSchedules = async () => {
      try {
        const schedules: Schedule[] = await fetchSchedules(token, id);
        showSchedulesOnCalendar(schedules);
      } catch (error) {
        console.error('Erro ao buscar agenda', error);
      }
    };
    const fetchShowPatients = async () => {
      try {
        const token = auth.token || '';
        const patientData = await fetchPatients(token, id);

        setPatients(patientData);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    }

    fetchAndShowSchedules();
    fetchShowPatients();
  }, []);

  const showSchedulesOnCalendar = (schedules: Schedule[]) => {
    const colorList = ['#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFFFCC', '#D9D9FF', '#FFCCFF', '#FF9999', '#99FF99', '#9999FF', '#FFFF99']; // Lista de cores disponíveis
    if (calendarRef.current) {
      //const calendarContainer = calendarRef.current;

      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        timeZone: 'America/Sao_Paulo',
        locale: ptBrLocale,
        
        
        headerToolbar: {
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'prevYear,prev,next,nextYear',
          

        },
        events: schedules.map((schedule) => ({
          title: schedule.patientName,
          start: moment.utc(schedule.date).add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss'),
          end: moment.utc(schedule.date).add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss'),
          extendedProps: { schedule }, // Passa os dados da consulta como propriedade estendida do evento
          //color: getColorByIndex(index)// Define a cor com base no indice do evento
          // Define a cor de fundo com base no índice do evento

        })),
        dateClick: function () { setModalOpen(true); },

        eventContent: (arg) => {
          // Obter a hora e os minutos do evento
          const eventTime = moment(arg.event.start).format('HH:mm');
          // Criar o conteúdo do evento
          const content = document.createElement('div');
          content.textContent = `${eventTime} - ${arg.event.title}`;
          content.style.overflow = 'hidden';
          content.style.textOverflow = 'ellipsis';
          content.style.display = 'inline-block';
          content.style.color = 'black';
          content.style.whiteSpace = 'nowrap'; // Evita que o texto seja quebrado em várias linhas
          content.style.width = '100%'; // Ocupa toda a largura disponível
          content.style.textAlign = 'center';
          content.style.borderRadius = '20%'

          //Escolha um cor aleatória da lista
          const randomColor = getRandomColor(colorList);
          content.style.backgroundColor = randomColor;


          // Adiciona o evento de clique ao elemento de conteúdo do evento
          content.addEventListener('click', () => handleEventClick(arg.event));

          return { domNodes: [content] };
        },
      });

      calendar.render();

      //calendar.setOption('contentHeight', '530px');
      //calendar.setOption('height', '530px');


      // Adiciona Botão "Criar Agendamento"
      const handleResize = () => {
        const width = window.innerWidth;

        if (width < 768) {
          calendar.setOption('contentHeight', '200px');
          calendar.setOption('height', '200px');
        } else if (width >= 768 && width < 1024) {
          calendar.setOption('contentHeight', '400px');
          calendar.setOption('height', '40px');
        } else if (width >= 1025 && width < 1367) {
          calendar.setOption('contentHeight', '510px');
          calendar.setOption('height', '510px');
        } else {
          calendar.setOption('contentHeight', '580px');
          calendar.setOption('height', '580px');
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        calendar.destroy();
        window.removeEventListener('resize', handleResize);
      };
    }
  };

  const getRandomColor = (colorList: string[]): string => {
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  }

  const handleEventClick = (event: any) => {
    const { schedule } = event.extendedProps;
    setSelectedEvent(schedule);
  };

  const closeModal = () => {
    setSelectedEvent(null);

  };
  const closeScheduleModal = () => {
    setModalOpen(false);

  };

  const handlerEventOpenSchedule = () =>{
    setModalOpen(true)
  }

  const handleDeleteSchedule = () => {
    if (selectedEvent) {
      const { _id } = selectedEvent;
       deleteSchedule(token, _id)

        .then(() => {
          closeModal();
          setShowDeleteResult(true)

        })
        .catch((error) => {
          console.error('Erro ao exluir a agenda:', error)
        })
    }
  }

  const handlePatientSelect = (value: string) => {
    setSelectedPatientId(value);
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

  return (
    <>

        <div className="calendar-container" ref={calendarRef} ></div>
        {selectedEvent && (
          <Modal visible={true} onCancel={closeModal} footer={[

            <Button key="delete" type="primary" onClick={handleDeleteSchedule} danger>
              Excluir
            </Button>,
            <Button key="cancel" onClick={closeModal}>
              Cancelar
            </Button>,
          ]}
            maskClosable={false}
          >
            {/* Conteúdo do modal com os dados da consulta */}
            <h2 className='modal-title' >{selectedEvent.patientName}</h2>
            <p>Data: {moment(selectedEvent.date).add(3, 'hours').format('DD/MM/YYYY HH:mm')}</p>
            <p>Valor da Atendimento: R$: {selectedEvent.serviceValue},00 Reais</p>
            <p>Duração do Atendimento: {selectedEvent.duration} Minutos</p>
            <p>Observação: {selectedEvent.notes}</p>

            {/* Adicione outros campos do objeto 'selectedEvent' conforme necessário */}
          </Modal>
        )}
        <Modal
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          visible={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button id='btnSave' key="salvar" type="primary" onClick={handleSave}>
              Salvar
            </Button>,
            <Button id='btnClose' key="cancel" onClick={closeScheduleModal}>
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
      </>
      );
};

      export default CalendarPage;