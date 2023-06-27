import React, { useEffect, useState } from 'react';
import './Schedule.css';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Calendar } from 'antd';
import dayjs from 'dayjs/esm';
import { fetchSchedules } from '../../context/AuthProvider/util';
import moment from 'moment';



const Schedule: React.FC = () => {

  const [schedules, setSchedules] = useState([]);
  const auth = useAuth()
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Inicializar com Dayjs

  useEffect(() => {
    const fetchaData = async () => {
      try {
        const token = auth.token || ''
        const scheduleData = await fetchSchedules(token);

        //const data = response.data;
        setSchedules(scheduleData);
      } catch (error) {
        console.error('Erro ao buscar agenda', error)
         
      }
    };
    fetchaData();
  }, [auth]);
 

  const getEventsForDate = (date: dayjs.Dayjs) => {
    return schedules.filter((schedule: any) => {
      const scheduleDate = schedule.date ? dayjs(schedule.date) : null;
      return (
        scheduleDate?.isSame(date, 'day') // Verificar se é o mesmo dia
      );
    });
  };

  const renderEvents = (date: dayjs.Dayjs) => {
    const events = getEventsForDate(date);
    return events.map((event: any) => {
      const eventTime = dayjs(event.date).format('HH:mm'); // Obter a hora do evento
      return (
        <div key={event._id}>
          <strong>{eventTime}</strong> - {event.patientId} {/* Exibir a hora e o ID do paciente */}
          <ul>
            {event.times.map((time: string) => (
              <li key={time}>{time}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  const handleDateChange = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  const renderEventsForSelectedDate = () =>{
    return renderEvents(selectedDate)
  }
  // Renderizar a sua agenda com os dados obtidos dos schedules

  return (
    <div>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        cellRender={renderEventsForSelectedDate}
      />
    </div>
  );
};



export default Schedule;