import { useAtom } from 'jotai';
import { detailRecruitIdAtom } from '../../../store/calendar';
import { useCallback, useMemo } from 'react';
import { IRecruit } from '../../../api/services/recruits';

export function useRecruitDetail(visibleRecruits: IRecruit[]) {
  const [detailRecruitId, setDetailRecruitId] = useAtom(detailRecruitIdAtom);

  const detailRecruitInfo = useMemo(() => {
    return visibleRecruits.find((recruit) => recruit.id === detailRecruitId) ?? null;
  }, [detailRecruitId, visibleRecruits]);

  const handleDirectionClick = useCallback(
    (direction: 'prev' | 'next') => {
      const currentIndex = visibleRecruits.findIndex((recruit) => recruit.id === detailRecruitId);
      if (currentIndex === -1) return;

      const nextIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
      const nextRecruit = visibleRecruits[nextIndex];

      if (nextRecruit) {
        setDetailRecruitId(nextRecruit.id);
      }
    },
    [detailRecruitId, setDetailRecruitId, visibleRecruits],
  );

  return {
    detailRecruitInfo,
    handleDirectionClick,
    detailRecruitId,
  };
}
