import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Typography } from './components/common/Typography';
import { Badge } from './components/common/Badge';
import { Checkbox } from './components/common/Checkbox';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Typography color={'brand'}>Hello, world!</Typography>
      <Badge variant={'brand'}>시</Badge>
      <Badge variant={'default'}>끝</Badge>
      <Checkbox checked />
      <div className={'w-screen h-screen bg-green-100'}>hi</div>
    </QueryClientProvider>
  );
}

export default App;
