
import { addDays, subDays, isWeekend, isSameDay, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock list of holidays (Public security rule: adjust to previous business day)
const HOLIDAYS = [
  '2024-01-01', // New Year
  '2024-05-01', // Labor Day
  '2024-09-07', // Independence
  '2024-10-12', // Nossa Sra. Aparecida
  '2024-12-25', // Christmas
];

export const isHoliday = (date: Date): boolean => {
  const formatted = format(date, 'yyyy-MM-dd');
  return HOLIDAYS.includes(formatted);
};

export const getPreviousBusinessDay = (date: Date): Date => {
  let current = subDays(date, 1);
  while (isWeekend(current) || isHoliday(current)) {
    current = subDays(current, 1);
  }
  return current;
};

export const adjustToBusinessDay = (date: Date): Date => {
  // Specifically for public sector payments, if it falls on holiday/weekend,
  // the safety rule often dictates moving it to the PREVIOUS business day.
  if (isWeekend(date) || isHoliday(date)) {
    return getPreviousBusinessDay(date);
  }
  return date;
};

export const formatDate = (date: string | Date) => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: ptBR });
};
