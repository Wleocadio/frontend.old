import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { createSchedule, deleteSchedule, fetchSchedules, getPatients } from '../../context/AuthProvider/util';
import { useAuth } from '../../context/AuthProvider/useAuth';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/pt-br';
import Schedule from '../../Forms/ScheduleForm/Schedule';
import { Button, Form, Input, Modal, Select, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';


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
  const [selectedItems, setSelectedItems] = useState<Schedule | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  useEffect(() => {
    showSchedulesOnCalendar([]) // mostra o calendário vazio, sem nenhum agendamento.
    const fetchAndShowSchedules = async () => {
      try {

        const id = (auth.id || '').toString();

        const schedules: Schedule[] = await fetchSchedules(token, id);
        showSchedulesOnCalendar(schedules);
      } catch (error) {
        console.error('Erro ao buscar agenda', error);
      }
    };
    const fetchShowPatients = async () => {
      try {

        const patientData = await getPatients(token,);
        setPatients(patientData)


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

      calendar.setOption('contentHeight', '530px');
      calendar.setOption('height', '530px');


      // Adiciona Botão "Criar Agendamento"


    }


  };

  const handleScheduleRegistration = () => {
    const scheduleData = {}

    createSchedule(scheduleData, token);
  }





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


  const handleDeleteSchedule = () => {
    if (selectedEvent) {
      const { _id } = selectedEvent;

      deleteSchedule(token, _id)
        .then(() => {
          closeModal();
          history.push('/Schedule');
          window.location.reload()
        })
        .catch((error) => {
          console.error('Erro ao exluir a agenda:', error)
        })
    }

  }

  const handleSubmit = async () => {
    setLoading(true);

    try {

      createSchedule({ patients: selectedItems }, token)
      notification.success({ message: 'Agendamento cadastrado com sucesso!' })
      setSelectedItems([]);
    } catch (error) {
      console.error('Erro ao cadastrar o agendamento:', error);
      notification.error({ message: 'Erro ao cadastrar o agendamento' });
    } finally {
      setLoading(false);
    }
  }






  return (
    <>
      <div ref={calendarRef}></div>
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
          <p>Valor da Consulta: R$: {selectedEvent.serviceValue},00 Reais</p>
          <p>Notas: {selectedEvent.notes}</p>

          {/* Adicione outros campos do objeto 'selectedEvent' conforme necessário */}
        </Modal>
      )}
      <Modal
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <h2 style={{ textAlign: 'center' }}> Agendar Atendimento</h2>
        <Form>
          <Form.Item className='item-label'>
            <label htmlFor="name">Nome do Paciente</label>

            <Select
              mode="multiple"
              placeholder="Selecione um ou mais pacientes"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: '100%' }}
              options={patients.map((patient) => ({
                value: patient._id,
                label: patient.patientName,
              }))}
            />
          </Form.Item>
          <Form.Item className='item-label'>
            <label htmlFor="name">Valor do Atendimento</label>
            <Input id='inputServiceValue'></Input>
          </Form.Item>
          <Form.Item className='item-label'>
            <label htmlFor="name">Observações</label>
            <Input.TextArea id='inputAnotacao' className='input-item'></Input.TextArea>
          </Form.Item>
          <Form.Item className='item-label'>
            <label htmlFor="name">Duração do Atendimento</label>
            <Input id='inputduration' className='input-item'></Input>
          </Form.Item>






        </Form>

      </Modal>
    </>
  );
};

export default CalendarPage;