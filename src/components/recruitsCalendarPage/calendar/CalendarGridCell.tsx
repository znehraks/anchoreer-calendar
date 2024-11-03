import { IRecruit } from '../../../api/services/recruits';
import { Typography } from '../../common/Typography';
import { CalendarGridCellListItem } from './CalendarGridCellListItem';

export function CalendarGridCell({
  date,
  startRecruits,
  endRecruits,
}: {
  date: string;
  startRecruits: IRecruit[];
  endRecruits: IRecruit[];
}) {
  return (
    <div className="w-1/7 min-h-20 border-[1px] mt-[-1px] ml-[-1px]">
      <div className="flex-1 flex justify-center items-center">
        <Typography>{date}</Typography>
      </div>
      <div className="min-h-fit flex flex-col border-t">
        {startRecruits.map((recruit) => (
          <CalendarGridCellListItem key={recruit.id} recruitInfo={recruit} type="start" />
        ))}
        {endRecruits.map((recruit) => (
          <CalendarGridCellListItem key={recruit.id} recruitInfo={recruit} type="end" />
        ))}
      </div>
    </div>
  );
}
