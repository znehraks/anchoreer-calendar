import { useSetAtom } from 'jotai';
import { IRecruit } from '../../../api/services/recruits';
import { Badge } from '../../common/Badge';
import { Typography } from '../../common/Typography';
import { detailRecruitIdAtom } from '../../../store/calendar';
import { memo } from 'react';
import { cn } from '../../../utils';

function CalendarGridCellListItem_({
  recruitInfo,
  type,
  visited,
}: {
  recruitInfo: IRecruit;
  type: 'start' | 'end';
  visited?: boolean;
}) {
  const setDetailRecruitId = useSetAtom(detailRecruitIdAtom);

  return (
    <li
      className={cn('h-5 flex items-center cursor-pointer gap-1 overflow-hidden px-1', visited && 'opacity-40')}
      onClick={() => setDetailRecruitId(recruitInfo.id)}
    >
      <Badge variant={type === 'start' ? 'brand' : 'default'} size={'small'}>
        {type === 'start' ? '시' : '끝'}
      </Badge>
      <Typography variant="detail" className="max-w-fit whitespace-nowrap">
        {recruitInfo.company_name}
      </Typography>
    </li>
  );
}

export const CalendarGridCellListItem = memo(CalendarGridCellListItem_);
