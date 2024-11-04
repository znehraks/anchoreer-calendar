import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Typography } from '../../common/Typography';
import { IRecruit } from '../../../api/services/recruits';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { Backdrop } from '../../common/Backdrop';
import { useDetailNavigation } from './useDetailNavigation';
import { useResetScroll } from '../../useResetScroll';

export function RecruitDetailModal({
  detailRecruitInfo,
  handleDirectionClick,
}: {
  detailRecruitInfo: IRecruit | null;
  handleDirectionClick: (direction: 'prev' | 'next') => void;
}) {
  const { handleClose, handlePrevClick, handleNextClick } = useDetailNavigation(handleDirectionClick);

  const scrollContainerRef = useResetScroll<HTMLDivElement>([detailRecruitInfo]);

  useEffect(() => {
    if (detailRecruitInfo === null) return;
    const visitedRecruitIds = JSON.parse(localStorage.getItem('visitedRecruitIds') || '[]') as number[];
    const newVisitedRecruitIds = Array.from(new Set([...visitedRecruitIds, detailRecruitInfo.id]));
    localStorage.setItem('visitedRecruitIds', JSON.stringify(newVisitedRecruitIds));
  }, [detailRecruitInfo]);

  const remainingDays = useMemo(
    () => (detailRecruitInfo ? dayjs(detailRecruitInfo.end_time).diff(dayjs(), 'day') : 0),
    [detailRecruitInfo],
  );

  if (detailRecruitInfo === null) return null;

  return createPortal(
    <div className=" fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center ">
      <Backdrop onClick={handleClose} />
      <div
        className="relative min-w-[750px] w-4/5 h-screen flex flex-col  bg-white rounded-md overflow-auto"
        ref={scrollContainerRef}
      >
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
            <Typography className="text-red-400">{`(${Math.abs(remainingDays)}일 ${remainingDays > 0 ? '남음' : '지남'})`}</Typography>
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
