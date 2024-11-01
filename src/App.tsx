import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Typography } from './components/common/Typography';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Typography color={'brand'}>Hello, world!</Typography>
      <div className={'w-screen h-screen bg-green-100'}>hi</div>
    </QueryClientProvider>
  );
}

export default App;
