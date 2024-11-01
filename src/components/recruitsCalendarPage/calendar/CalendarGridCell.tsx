import { IDuty } from '../../../api/services/duties';
import { Typography } from '../../common/Typography';

export function CalendarGridCell({ date, duties }: { date: string; duties: IDuty[] }) {
  return (
    <div className="w-1/7 min-h-20 border-[1px] mt-[-1px] ml-[-1px]">
      <div className="flex-1 flex justify-center items-center ">
        <Typography>{date}</Typography>
      </div>
      <div className="min-h-fit flex flex-col border-t">
        {duties.map((duty) => (
          <div key={duty.id} className="flex-1 flex justify-center items-center">
            <Typography>{duty.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
