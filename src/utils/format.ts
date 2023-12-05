import { endOfDay, format, startOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const formatDate = (date: Date) => format(new Date(date), 'yyyy-MM-dd');

export const formatDateTo = (date: Date) => {
  return utcToZonedTime(endOfDay(new Date(date)), 'Europe/Vilnius');
};

export const formatDateAndTime = (datetime: Date | string) =>
  datetime ? format(new Date(datetime), 'yyyy-MM-dd HH:mm') : '-';

export const formatDateFrom = (date: Date) => {
  return utcToZonedTime(startOfDay(new Date(date)), 'Europe/Vilnius');
};
