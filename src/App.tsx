import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecruitsCalendarPage } from './components/recruitsCalendarPage/RecruitsCalendarPage';
import { Provider } from 'jotai';
import ErrorBoundary from './ErrorBoundary';
import { ErrorPage } from './components/ErrorPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <div className={'w-screen min-h-screen min-w-[768px]'}>
            <RecruitsCalendarPage />
          </div>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
