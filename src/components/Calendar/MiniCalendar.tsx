import React, { useState } from 'react';
import { DatePicker, TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br'
import days from 'dayjs';


interface MiniCalendarProps {
    visible: boolean;
    onDateSelect: (date: Dayjs, time: Dayjs) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

    if (selectedDate && selectedTime) {
        onDateSelect(selectedDate, selectedTime);
    }

    const handleDateSelect = (date: Dayjs | null) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time: Dayjs | null) => {
        setSelectedTime(time);
    };

   
    const disabledDate = (current: Dayjs | null) => {
        return current ? current.isBefore(days(), 'day') : false;
      };

    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <label htmlFor="name">Selecione Data e Hora</label>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DatePicker value={selectedDate} onChange={handleDateSelect} disabledDate={disabledDate} />

            <TimePicker
                format="HH:mm"
                minuteStep={15}
                disabled={!selectedDate}
                value={selectedTime}
                onChange={handleTimeSelect}
                
            />
        </div>
        </div>

    );
};

export default MiniCalendar;