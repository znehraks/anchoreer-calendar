import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nav } from './components/recruitsCalendarPage/Nav';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={'w-screen h-screen min-w-[768px]'}>
        <Nav />
      </div>
    </QueryClientProvider>
  );
}

export default App;
