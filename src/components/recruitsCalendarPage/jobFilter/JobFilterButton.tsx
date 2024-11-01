import { ChevronDownIcon } from 'lucide-react';
import { Typography } from '../../common/Typography';

export function JobFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="transition-colors h-full flex flex-row justify-between items-center rounded-md border-2 px-1 absolute right-0 hover:bg-slate-100"
    >
      <div className="w-28 flex flex-col">
        <Typography variant="content">직무</Typography>
        <Typography variant="content">3개</Typography>
      </div>
      <ChevronDownIcon size={16} />
    </div>
  );
}
