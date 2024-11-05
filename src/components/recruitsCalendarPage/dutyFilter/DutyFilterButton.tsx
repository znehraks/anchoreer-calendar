import { ChevronDownIcon } from 'lucide-react';
import { Typography } from '../../common/Typography';
import { useAtomValue } from 'jotai';
import { selectedLeafDutyCountAtom } from '../../../store/dutyFilter';

export function DutyFilterButton({ onClick }: { onClick: () => void }) {
  const selectedLeafDutyCount = useAtomValue(selectedLeafDutyCountAtom);

  return (
    <div
      aria-label="duty-filter-button"
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="transition-colors h-full flex flex-row justify-between items-center rounded-md border-2 px-1 absolute right-0 hover:bg-slate-100"
    >
      <div className="w-28 flex flex-col">
        <Typography variant="content">직무</Typography>
        <Typography variant="content">{selectedLeafDutyCount ? `${selectedLeafDutyCount}개` : `직무 선택`}</Typography>
      </div>
      <ChevronDownIcon size={16} />
    </div>
  );
}
