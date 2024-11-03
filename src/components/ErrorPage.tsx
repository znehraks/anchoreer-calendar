import { TriangleAlertIcon } from 'lucide-react';
import { Typography } from './common/Typography';

export function ErrorPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <TriangleAlertIcon className="text-red-600" size={128} />
      <Typography variant={'title'}>Something wrong!</Typography>
    </div>
  );
}
