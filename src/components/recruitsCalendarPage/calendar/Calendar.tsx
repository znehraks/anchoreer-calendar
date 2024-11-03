import { useGetRecruits } from '../../../api/services/recruits';
import { CalendarGrid } from './CalendarGrid';
import { CalendarGridCell } from './CalendarGridCell';
import { CalendarHeader } from './CalendarHeader';
import { useAtomValue } from 'jotai';
import { visibleDatesAtom } from '../../../store/calendar';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { selectedDutyIdsAtom } from '../../../store/jobFilter';

export function Calendar() {
  const { data: recruits } = useGetRecruits();
  const visibleDates = useAtomValue(visibleDatesAtom);
  const selectedDutyIds = useAtomValue(selectedDutyIdsAtom);

  const filteredRecruitsByDutyId = useMemo(() => {
    if (!recruits) return [];
    if (selectedDutyIds.length === 0) return recruits;
    return recruits.filter((recruit) => recruit.duty_ids.some((dutyId) => selectedDutyIds.includes(dutyId)));
  }, [recruits, selectedDutyIds]);

  const recruitsByDate = useMemo(() => {
    const startMap = new Map<string, typeof recruits>();
    const endMap = new Map<string, typeof recruits>();

    filteredRecruitsByDutyId.forEach((recruit) => {
      const startDate = dayjs(recruit.start_time).format('YYYY-MM-DD');
      const endDate = dayjs(recruit.end_time).format('YYYY-MM-DD');

      if (!startMap.has(startDate)) {
        startMap.set(startDate, []);
      }
      if (!endMap.has(endDate)) {
        endMap.set(endDate, []);
      }

      startMap.get(startDate)?.push(recruit);
      endMap.get(endDate)?.push(recruit);
    });

    return {
      startMap,
      endMap,
    };
  }, [filteredRecruitsByDutyId]);

  console.log('recruitsByDate', recruitsByDate);

  return (
    <div className="w-full h-full flex flex-col px-1">
      <CalendarHeader />
      <CalendarGrid>
        {visibleDates.map(({ date }) => {
          const dateStr = dayjs(date).format('YYYY-MM-DD');
          return (
            <CalendarGridCell
              key={date}
              date={dayjs(date).format('DD')}
              startRecruits={recruitsByDate.startMap.get(dateStr) || []}
              endRecruits={recruitsByDate.endMap.get(dateStr) || []}
            />
          );
        })}
      </CalendarGrid>
    </div>
  );
}
