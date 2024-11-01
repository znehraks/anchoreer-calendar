import { Typography } from '../../common/Typography';

export function CalendarHeader() {
  return (
    <div className="flex flex-row">
      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
        <div key={day} className="flex-1 flex justify-center items-center bg-gray-400">
          <Typography variant={'content'} className="text-gray-800">
            {day}
          </Typography>
        </div>
      ))}
    </div>
  );
}
