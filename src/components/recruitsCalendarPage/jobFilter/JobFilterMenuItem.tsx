import { ChevronRight } from 'lucide-react';
import { Checkbox } from '../../common/Checkbox';

export function JobFilterMenuItem() {
  return (
    <div className="flex flex-row items-center px-3 py-2 w-64 gap-2 cursor-pointer hover:bg-slate-100">
      <Checkbox />
      <div className="flex-1 ">ss</div>
      <ChevronRight size={16} />
    </div>
  );
}
