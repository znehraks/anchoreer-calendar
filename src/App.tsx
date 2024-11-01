import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecruitsCalendarPage } from './components/recruitsCalendarPage/RecruitsCalendarPage';
import { Provider } from 'jotai';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <div className={'w-screen min-h-screen min-w-[768px]'}>
          <RecruitsCalendarPage />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
