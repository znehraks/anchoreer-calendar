import { Suspense } from 'react';
import { Nav } from './Nav';
import { Calendar } from './calendar/Calendar';
import { Loading } from '../Loader';

export function RecruitsCalendarPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<Loading />}>
        <Calendar />
      </Suspense>
    </>
  );
}
