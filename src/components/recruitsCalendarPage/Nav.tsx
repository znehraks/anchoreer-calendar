// 월 네비게이션

// 상단 헤더에서 요구사항에 직무 필터만 존재하므로, 이 Nav 최우측에 임의로 배치하였습니다.

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { Typography } from '../common/Typography';
import { JobFilterButton } from './jobFilter/JobFilterButton';
import { JobFilterModal } from './jobFilter/JobFilterModal';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
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
      const currentDate = dayjs(`${currentYearAndMonth.year}-${currentYearAndMonth.month}-01`);
      const newDate = direction === 'prev' ? currentDate.subtract(1, 'month') : currentDate.add(1, 'month');

      setCurrentYearAndMonth({
        year: newDate.year(),
        month: newDate.month() + 1,
      });
    },
    [currentYearAndMonth, setCurrentYearAndMonth],
  );

  return (
    <div ref={navWrapperRef} className="relative w-full h-12 flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 flex-1">
        <IconButton>
          <ChevronLeft className="text-gray-400" role="button" tabIndex={0} onClick={() => handleMonthChange('prev')} />
        </IconButton>
        <Typography variant="title" color="brand">
          {`${currentYearAndMonth.year}.${currentYearAndMonth.month}`}
        </Typography>
        <IconButton>
          <ChevronRight
            className="text-gray-400"
            role="button"
            tabIndex={0}
            onClick={() => {
              handleMonthChange('next');
            }}
          />
        </IconButton>
      </div>
      <JobFilterButton onClick={() => setIsFilterModalOpen((prev) => !prev)} />
      <JobFilterModal open={isFilterModalOpen} topOffset={topOffset} />
    </div>
  );
}
