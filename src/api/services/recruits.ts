// 채용 공고 관련 API 서비스 로직

import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '..';
import { IDuty } from './duties';

export interface IRecruit {
  id: number;
  company_name: string;
  title: string;
  start_time: string;
  end_time: string;
  image_url: string;
  duty_ids: IDuty['id'][];
}

async function getRecruits() {
  return api.get<IRecruit[]>('/recruits.json').then((res) => res.data);
}

export function useGetRecruits() {
  return useSuspenseQuery({
    queryKey: ['get/recruits'],
    queryFn: getRecruits,
  });
}
