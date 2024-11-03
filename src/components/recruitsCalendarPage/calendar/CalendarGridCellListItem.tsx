import { useAtom } from 'jotai';
import { IRecruit } from '../../../api/services/recruits';
import { Badge } from '../../common/Badge';
import { Typography } from '../../common/Typography';
import { detailRecruitIdAtom } from '../../../store/calendar';
import { useEffect, useState } from 'react';
import { cn } from '../../../utils';

export function CalendarGridCellListItem({ recruitInfo, type }: { recruitInfo: IRecruit; type: 'start' | 'end' }) {
  const [detailRecruitId, setDetailRecruitId] = useAtom(detailRecruitIdAtom);
  const [isVisited, setIsVisited] = useState<boolean | null>(null);

  useEffect(() => {
    const visitedRecruitIds = (localStorage.getItem('visitedRecruitIds') || []) as number[];
    setIsVisited(visitedRecruitIds.includes(recruitInfo.id));
  }, [detailRecruitId, recruitInfo.id]);

  if (isVisited === null) return null;
  return (
    <div
      className={cn('h-5 flex items-center cursor-pointer gap-1 overflow-hidden px-1', isVisited && 'opacity-40')}
      onClick={() => setDetailRecruitId(recruitInfo.id)}
    >
      <Badge variant={type === 'start' ? 'brand' : 'default'} size={'small'}>
        {type === 'start' ? '시' : '끝'}
      </Badge>
      <Typography variant="detail" className="max-w-fit whitespace-nowrap">
        {recruitInfo.company_name}
      </Typography>
    </div>
  );
}
