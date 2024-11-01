import { useGetRecruits } from '../../../api/services/recruits';
import { CalendarGrid } from './CalendarGrid';
import { CalendarGridCell } from './CalendarGridCell';
import { CalendarHeader } from './CalendarHeader';
import { useAtomValue } from 'jotai';
import { visibleDatesAtom } from '../../../store/calendar';
import dayjs from 'dayjs';

export function Calendar() {
  const { data: recruits } = useGetRecruits();

  const visibleDates = useAtomValue(visibleDatesAtom);

  console.log('visibleDates', visibleDates);
  console.log('recruits', recruits);

  return (
    <div className="w-full h-full flex flex-col ">
      <CalendarHeader />
      <CalendarGrid>
        {visibleDates.map(({ date }) => {
          return <CalendarGridCell date={dayjs(date).format('DD')} duties={[]} />;
        })}
      </CalendarGrid>
    </div>
  );
}
