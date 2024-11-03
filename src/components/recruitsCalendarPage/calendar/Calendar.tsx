import { RecruitDetailModal } from './RecruitDetailModal';
import { usePreventScroll } from '../../usePreventScroll';
import { CalendarContent } from './CalendarContent';
import { useRecruitData } from './useRecruitData';
import { useRecruitDetail } from './useRecruitDetail';

export function Calendar() {
  const { recruitsByDate, visibleRecruits, visibleDates } = useRecruitData();
  const { detailRecruitInfo, handleDirectionClick, detailRecruitId } = useRecruitDetail(visibleRecruits);

  usePreventScroll(!!detailRecruitId);

  return (
    <>
      <RecruitDetailModal detailRecruitInfo={detailRecruitInfo} handleDirectionClick={handleDirectionClick} />
      <CalendarContent visibleDates={visibleDates} recruitsByDate={recruitsByDate} />
    </>
  );
}
