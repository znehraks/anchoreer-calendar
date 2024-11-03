import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Typography } from '../../common/Typography';
import { IRecruit } from '../../../api/services/recruits';
import { useSetAtom } from 'jotai';
import { detailRecruitIdAtom } from '../../../store/calendar';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { Backdrop } from '../../common/Backdrop';

export function RecruitDetailModal({
  detailRecruitInfo,
  handleDirectionClick,
}: {
  detailRecruitInfo: IRecruit | null;
  handleDirectionClick: (direction: 'prev' | 'next') => void;
}) {
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
    if (detailRecruitInfo === null) return;
    const visitedRecruitIds = JSON.parse(localStorage.getItem('visitedRecruitIds') || '[]') as number[];
    const newVisitedRecruitIds = Array.from(new Set([...visitedRecruitIds, detailRecruitInfo.id]));
    localStorage.setItem('visitedRecruitIds', JSON.stringify(newVisitedRecruitIds));
  }, [detailRecruitInfo]);

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

  if (detailRecruitInfo === null) return null;

  return createPortal(
    <div className=" fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center ">
      <Backdrop onClick={handleClose} />
      <div className="relative min-w-[750px] w-4/5 h-screen flex flex-col  bg-white rounded-md overflow-auto">
        <div className="absolute top-3 right-5">
          <X size={20} className="text-gray-500 cursor-pointer" onClick={handleClose} />
        </div>
        <div className="p-9 pb-0 flex flex-col gap-2">
          <Typography variant="content">{detailRecruitInfo.company_name}</Typography>
          <Typography variant="title" color="gray">
            {detailRecruitInfo.title}
          </Typography>
          <div className="flex items-center gap-1">
            <Typography variant="detail" color="gray">
              {detailRecruitInfo.start_time} ~ {detailRecruitInfo.end_time}
            </Typography>
            <Typography className="text-red-400">{`(${dayjs(detailRecruitInfo.end_time).diff(dayjs(), 'day')}일 남음)`}</Typography>
          </div>
        </div>
        <div className="p-9 min-h-fit">
          <img src={detailRecruitInfo.image_url} alt="recruit" className="w-full object-cover rounded-md" />
        </div>
      </div>
      <ChevronLeft className="fixed left-0 top-1/2 text-white cursor-pointer" size={64} onClick={handlePrevClick} />
      <ChevronRight className="fixed right-0 top-1/2 text-white cursor-pointer" size={64} onClick={handleNextClick} />
    </div>,
    document.body,
  );
}
