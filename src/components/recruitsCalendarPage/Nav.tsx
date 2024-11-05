// 월 네비게이션

// 상단 헤더에서 요구사항에 직무 필터만 존재하므로, 이 Nav 최우측에 임의로 배치하였습니다.

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { Typography } from '../common/Typography';
import { DutyFilterButton } from './dutyFilter/DutyFilterButton';
import { DutyFilterModal } from './dutyFilter/DutyFilterModal';
import { Suspense, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { currentYearAndMonthAtom } from '../../store/calendar';
import dayjs from 'dayjs';

export function Nav() {
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const [currentYearAndMonth, setCurrentYearAndMonth] = useAtom(currentYearAndMonthAtom);
  const [topOffset, setTopOffset] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useLayoutEffect(() => {
    if (navWrapperRef.current) {
      const { top, height } = navWrapperRef.current.getBoundingClientRect();
      setTopOffset(top + height);
    }
  }, []);

  const handleMonthChange = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentYearAndMonth((prev) => {
        const currentDate = dayjs(`${prev.year}-${prev.month}-01`);
        const newDate = direction === 'prev' ? currentDate.subtract(1, 'month') : currentDate.add(1, 'month');

        return {
          year: newDate.year(),
          month: newDate.month() + 1,
        };
      });
    },
    [setCurrentYearAndMonth],
  );

  const formattedDate = useMemo(() => {
    const month = String(currentYearAndMonth.month).padStart(2, '0');
    return `${currentYearAndMonth.year}.${month}`;
  }, [currentYearAndMonth.year, currentYearAndMonth.month]);

  return (
    <nav
      aria-label="calendar-month-navigation"
      ref={navWrapperRef}
      className="relative w-full h-12 flex justify-center items-center"
    >
      <div className="flex justify-center items-center gap-4 flex-1">
        <IconButton aria-label="prev-month-button" onClick={() => handleMonthChange('prev')}>
          <ChevronLeft className="text-gray-400" />
        </IconButton>
        <Typography aria-label="current-month" variant="title" color="brand">
          {formattedDate}
        </Typography>
        <IconButton aria-label="next-month-button" onClick={() => handleMonthChange('next')}>
          <ChevronRight className="text-gray-400" />
        </IconButton>
      </div>
      <DutyFilterButton onClick={() => setIsFilterModalOpen((prev) => !prev)} />
      <Suspense>
        <DutyFilterModal open={isFilterModalOpen} setOpen={setIsFilterModalOpen} topOffset={topOffset} />
      </Suspense>
    </nav>
  );
}
