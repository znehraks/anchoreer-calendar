// 직무 관련 API 서비스 로직

import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '..';

export interface IDuty {
  id: number;
  name: string;
  parent_id: number;
}

async function getDuties() {
  return api.get<IDuty[]>('/duties.json').then((res) => res.data);
}

export function useGetDuties() {
  return useSuspenseQuery({
    queryKey: ['get/duties'],
    queryFn: getDuties,
  });
}
