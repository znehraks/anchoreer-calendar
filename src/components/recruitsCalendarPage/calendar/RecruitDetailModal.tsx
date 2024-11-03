import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Typography } from '../../common/Typography';
import { IRecruit } from '../../../api/services/recruits';
import { useSetAtom } from 'jotai';
import { detailRecruitIdAtom } from '../../../store/calendar';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export function RecruitDetailModal({
  detailRecruitInfo,
  handleDirectionClick,
}: {
  detailRecruitInfo: IRecruit | null;
  handleDirectionClick: (direction: 'prev' | 'next') => void;
}) {
  const setDetailRecruitId = useSetAtom(detailRecruitIdAtom);

  useEffect(() => {
    if (detailRecruitInfo === null) return;
    const visitedRecruitIds = JSON.parse(localStorage.getItem('visitedRecruitIds') || '[]') as number[];
    const newVisitedRecruitIds = Array.from(new Set([...visitedRecruitIds, detailRecruitInfo.id]));
    localStorage.setItem('visitedRecruitIds', JSON.stringify(newVisitedRecruitIds));
  }, [detailRecruitInfo]);

  if (detailRecruitInfo === null) return null;

  return createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black opacity-50" />
      <div
        className=" fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center"
        onClick={() => setDetailRecruitId(null)}
      >
        <div className="relative min-w-[750px] w-4/5 h-screen flex flex-col  bg-white rounded-md">
          <div className="absolute top-3 right-5">
            <X size={20} className="text-gray-500 cursor-pointer" onClick={() => setDetailRecruitId(null)} />
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
            <img src={detailRecruitInfo.image_url} alt="recruit" className="w-full h-96 object-cover rounded-md" />
          </div>
        </div>
      </div>
      <ChevronLeft
        className="fixed left-0 top-1/2 text-white cursor-pointer"
        size={64}
        onClick={() => handleDirectionClick('prev')}
      />
      <ChevronRight
        className="fixed right-0 top-1/2 text-white cursor-pointer"
        size={64}
        onClick={() => handleDirectionClick('next')}
      />
    </>,
    document.body,
  );
}
