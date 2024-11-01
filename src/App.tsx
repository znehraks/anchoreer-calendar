import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecruitsCalendarPage } from './components/recruitsCalendarPage/RecruitsCalendarPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={'w-screen min-h-screen min-w-[768px]'}>
        <RecruitsCalendarPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
