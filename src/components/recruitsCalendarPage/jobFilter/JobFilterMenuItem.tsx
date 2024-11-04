import { ChevronRight } from 'lucide-react';
import { Checkbox } from '../../common/Checkbox';
import { Typography } from '../../common/Typography';
import { cn } from '../../../utils';
import { memo, useCallback, useMemo } from 'react';

interface JobFilterMenuItemProps {
  active: boolean;
  selected: boolean;
  duty: {
    id: number;
    name: string;
  };
  hasChildren?: boolean;
  selectedChildrenCount?: number;
  onClick: (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => void;
  onSelect: (dutyId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function JobFilterMenuItem_({
  active,
  selected,
  duty,
  hasChildren = false,
  selectedChildrenCount = 0,
  onClick,
  onSelect,
}: JobFilterMenuItemProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick(duty.id)(e);
    },
    [onClick, duty.id],
  );

  const handleCheckboxClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSelect(duty.id)(e);
    },
    [onSelect, duty.id],
  );

  const renderSelectedCount = useMemo(() => {
    if (!selectedChildrenCount) return null;
    return <Typography className="text-blue-500">{selectedChildrenCount}</Typography>;
  }, [selectedChildrenCount]);

  return (
    <div
      aria-label={`job-filter-menu-item-${duty.name}`}
      className={cn(
        'flex flex-row items-center px-3 py-2 min-w-64 gap-2 cursor-pointer hover:bg-slate-100',
        active && 'bg-slate-100',
      )}
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      aria-selected={active}
      aria-checked={selected}
    >
      <Checkbox
        checked={selected}
        onClick={handleCheckboxClick}
        onChange={handleChange}
        aria-label={`job-filter-menu-item-checkbox-${duty.name}`}
      />
      <div className="flex-1 flex flex-row gap-1">
        <Typography className="truncate">{duty.name}</Typography>
        {renderSelectedCount}
      </div>
      {hasChildren && <ChevronRight size={16} aria-hidden="true" className="text-gray-500" />}
    </div>
  );
}

const arePropsEqual = (prev: JobFilterMenuItemProps, next: JobFilterMenuItemProps): boolean => {
  return (
    prev.duty.id === next.duty.id &&
    prev.active === next.active &&
    prev.selected === next.selected &&
    prev.hasChildren === next.hasChildren &&
    prev.selectedChildrenCount === next.selectedChildrenCount &&
    prev.duty.name === next.duty.name
  );
};

export const JobFilterMenuItem = memo(JobFilterMenuItem_, arePropsEqual);
