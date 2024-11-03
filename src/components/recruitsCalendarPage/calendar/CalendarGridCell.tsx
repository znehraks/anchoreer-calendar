import { memo, useEffect, useState } from 'react';
import { IRecruit } from '../../../api/services/recruits';
import { Typography } from '../../common/Typography';
import { CalendarGridCellListItem } from './CalendarGridCellListItem';
import { useAtomValue } from 'jotai';
import { detailRecruitIdAtom } from '../../../store/calendar';

function CalendarGridCell_({
  date,
  startRecruits,
  endRecruits,
}: {
  date: string;
  startRecruits: IRecruit[];
  endRecruits: IRecruit[];
}) {
  const detailRecruitId = useAtomValue(detailRecruitIdAtom);
  // 불필요한 리렌더를 막기위해, 상위에서 처리
  const [visitedRecruitIds, setVisitedRecruitIds] = useState<number[]>([]);

  useEffect(() => {
    const visitedRecruitIds = (localStorage.getItem('visitedRecruitIds') || []) as number[];
    setVisitedRecruitIds(visitedRecruitIds);
  }, [detailRecruitId]);

  return (
    <div className="w-1/7 min-h-20 border-[1px] mt-[-1px] ml-[-1px]">
      <div className="flex-1 flex justify-center items-center">
        <Typography>{date}</Typography>
      </div>
      <ul className="min-h-fit flex flex-col border-t">
        {startRecruits.map((recruit) => {
          return (
            <CalendarGridCellListItem
              key={recruit.id}
              recruitInfo={recruit}
              type="start"
              visited={visitedRecruitIds.includes(recruit.id)}
            />
          );
        })}
        {endRecruits.map((recruit) => {
          return (
            <CalendarGridCellListItem
              key={recruit.id}
              recruitInfo={recruit}
              type="end"
              visited={visitedRecruitIds.includes(recruit.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export const CalendarGridCell = memo(CalendarGridCell_);
