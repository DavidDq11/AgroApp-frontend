import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
  locale: string;
}

const CustomCalendar: React.FC<CalendarProps> = ({ selected, onSelect, locale }) => {
  return (
    <Calendar
      onChange={onSelect}
      value={selected}
      locale={locale}
      className="rounded-md border"
    />
  );
};

export default CustomCalendar;