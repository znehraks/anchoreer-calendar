import { useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { detailRecruitIdAtom } from '../../../store/calendar';

export function useDetailNavigation(handleDirectionClick: (direction: 'prev' | 'next') => void) {
  const setDetailRecruitId = useSetAtom(detailRecruitIdAtom);

  const handleClose = useCallback(() => {
    setDetailRecruitId(null);
  }, [setDetailRecruitId]);

  const handlePrevClick = useCallback(() => {
    handleDirectionClick('prev');
  }, [handleDirectionClick]);

  const handleNextClick = useCallback(() => {
    handleDirectionClick('next');
  }, [handleDirectionClick]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (e.key === 'ArrowRight') {
        handleNextClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, handleNextClick, handlePrevClick]);

  return {
    handleClose,
    handlePrevClick,
    handleNextClick,
  };
}
