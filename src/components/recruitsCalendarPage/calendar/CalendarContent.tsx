import dayjs from 'dayjs';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarGridCell } from './CalendarGridCell';
import { IRecruitMap } from './types';

interface CalendarContentProps {
  visibleDates: { date: string }[];
  recruitsByDate: IRecruitMap;
}

export function CalendarContent({ visibleDates, recruitsByDate }: CalendarContentProps) {
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
