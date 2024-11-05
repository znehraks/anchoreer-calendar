import { IRecruit, useGetRecruits } from '../../../api/services/recruits';
import { useAtomValue } from 'jotai';
import { selectedDutyIdsAtom } from '../../../store/dutyFilter';
import { visibleDatesAtom } from '../../../store/calendar';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IRecruitMap } from './types';

export function useRecruitData() {
  const { data: recruits } = useGetRecruits();
  const selectedDutyIds = useAtomValue(selectedDutyIdsAtom);
  const visibleDates = useAtomValue(visibleDatesAtom);

  const filteredRecruitsByDutyId = useMemo(() => {
    if (!recruits) return [];
    if (selectedDutyIds.length === 0) return recruits;
    return recruits.filter((recruit) => recruit.duty_ids.some((dutyId) => selectedDutyIds.includes(dutyId)));
  }, [recruits, selectedDutyIds]);

  const recruitsByDate: IRecruitMap = useMemo(() => {
    const startMap = new Map<string, IRecruit[]>();
    const endMap = new Map<string, IRecruit[]>();

    filteredRecruitsByDutyId.forEach((recruit) => {
      const startDate = dayjs(recruit.start_time).format('YYYY-MM-DD');
      const endDate = dayjs(recruit.end_time).format('YYYY-MM-DD');

      if (!startMap.has(startDate)) startMap.set(startDate, []);
      if (!endMap.has(endDate)) endMap.set(endDate, []);

      startMap.get(startDate)?.push(recruit);
      endMap.get(endDate)?.push(recruit);
    });

    return { startMap, endMap };
  }, [filteredRecruitsByDutyId]);

  const visibleRecruits = useMemo(() => {
    const visibleDateStrings = visibleDates.map(({ date }) => dayjs(date).format('YYYY-MM-DD')).sort();

    return visibleDateStrings.flatMap((date) => [
      ...(recruitsByDate.startMap.get(date) || []),
      ...(recruitsByDate.endMap.get(date) || []),
    ]);
  }, [recruitsByDate, visibleDates]);

  return {
    recruitsByDate,
    visibleRecruits,
    visibleDates,
  };
}
