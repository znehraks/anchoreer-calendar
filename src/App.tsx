import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Typography } from './components/common/Typography';
import { Badge } from './components/common/Badge';
import { Checkbox } from './components/common/Checkbox';
import { IconButton } from './components/common/IconButton';
import { Tag } from './components/common/Tag';
import { ChevronLeft } from 'lucide-react';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={'w-screen h-screen bg-green-100 '}>
        <Typography color={'brand'}>Hello, world!</Typography>
        <Badge variant={'brand'}>시</Badge>
        <Badge variant={'default'} size={'small'}>
          끝
        </Badge>
        <IconButton>
          <ChevronLeft size={16} />
        </IconButton>
        <Checkbox checked />{' '}
        <Tag variant={'default'} size={'medium'}>
          경영기획
        </Tag>
      </div>
    </QueryClientProvider>
  );
}

export default App;
