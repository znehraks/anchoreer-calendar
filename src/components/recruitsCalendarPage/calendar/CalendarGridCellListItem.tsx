import { IRecruit } from '../../../api/services/recruits';
import { Badge } from '../../common/Badge';
import { Typography } from '../../common/Typography';

export function CalendarGridCellListItem({ recruitInfo, type }: { recruitInfo: IRecruit; type: 'start' | 'end' }) {
  return (
    <div className="h-5 flex items-center cursor-pointer gap-1">
      <Badge variant={type === 'start' ? 'brand' : 'default'} size={'small'}>
        {type === 'start' ? '시' : '끝'}
      </Badge>
      <Typography variant="detail">{recruitInfo.company_name}</Typography>
    </div>
  );
}
