import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import dayjs from 'dayjs';

export function getVisibleDates(year: number, month: number) {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const lastDayOfMonth = firstDayOfMonth.endOf('month');
  const firstDayOfWeek = firstDayOfMonth.day();
  const lastDayOfWeek = lastDayOfMonth.day();
  const calendarData = [];

  if (firstDayOfWeek > 0) {
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = firstDayOfMonth.subtract(i + 1, 'day');
      calendarData.push({
        date: date.format('YYYY-MM-DD'),
        dayOfWeek: date.day(),
        isCurrentMonth: false,
      });
    }
  }

  for (let i = 0; i < lastDayOfMonth.date(); i++) {
    const date = firstDayOfMonth.add(i, 'day');
    calendarData.push({
      date: date.format('YYYY-MM-DD'),
      dayOfWeek: date.day(),
      isCurrentMonth: true,
    });
  }

  if (lastDayOfWeek < 6) {
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const date = lastDayOfMonth.add(i, 'day');
      calendarData.push({
        date: date.format('YYYY-MM-DD'),
        dayOfWeek: date.day(),
        isCurrentMonth: false,
      });
    }
  }

  return calendarData;
}
