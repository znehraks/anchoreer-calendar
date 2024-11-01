import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Typography } from './components/common/Typography';
import { Badge } from './components/common/Badge';
import { Checkbox } from './components/common/Checkbox';
import { IconButton } from './components/common/IconButton';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Typography color={'brand'}>Hello, world!</Typography>
      <Badge variant={'brand'}>시</Badge>
      <Badge variant={'default'} size={'small'}>
        끝
      </Badge>
      <IconButton size={'small'}>
        <div>{'>'}</div>
      </IconButton>
      <Checkbox checked />
      <div className={'w-screen h-screen bg-green-100'}>hi</div>
    </QueryClientProvider>
  );
}

export default App;
