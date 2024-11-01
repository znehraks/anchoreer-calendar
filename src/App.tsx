import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={'w-screen h-screen bg-green-100'}>hi</div>
    </QueryClientProvider>
  );
}

export default App;
