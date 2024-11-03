import { atom } from 'jotai';
import dayjs from 'dayjs';
import { getVisibleDates } from '../utils';

export const currentYearAndMonthAtom = atom({
  year: dayjs().get('year'),
  month: dayjs().get('month') + 1,
});

export const visibleDatesAtom = atom((get) => {
  const { year, month } = get(currentYearAndMonthAtom);
  return getVisibleDates(year, month);
});

export const detailRecruitIdAtom = atom<number | null>(null);
