import { ChevronRight } from 'lucide-react';
import { Checkbox } from '../../common/Checkbox';
import { IDuty } from '../../../api/services/duties';
import React from 'react';
import { cn } from '../../../utils';

function _JobFilterMenuItem({
  active,
  selected,
  duty,
  hasChildren,
  onClick,
  onSelect,
}: {
  active: boolean;
  selected: boolean;
  duty: IDuty;
  hasChildren?: boolean;
  onClick: (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => void;
  onSelect: (dutyId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className={cn(
        'flex flex-row items-center px-3 py-2 w-64 gap-2 cursor-pointer hover:bg-slate-100',
        active ? 'bg-slate-100' : '',
      )}
      role="button"
      tabIndex={0}
      onClick={onClick(duty.id)}
    >
      <Checkbox
        checked={selected}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={onSelect(duty.id)}
      />
      <div className="flex-1 ">{duty.name}</div>
      {hasChildren && <ChevronRight size={16} />}
    </div>
  );
}

export const JobFilterMenuItem = React.memo(
  _JobFilterMenuItem,
  (prev, next) =>
    prev.duty.id === next.duty.id &&
    prev.active === next.active &&
    prev.selected === next.selected &&
    prev.hasChildren === next.hasChildren,
);
