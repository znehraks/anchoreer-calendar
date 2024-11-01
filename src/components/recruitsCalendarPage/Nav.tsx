// 월 네비게이션

// 상단 헤더에서 요구사항에 직무 필터만 존재하므로, 이 Nav 최우측에 임의로 배치하였습니다.

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { Typography } from '../common/Typography';
import { JobFilterButton } from './jobFilter/JobFilterButton';
import { JobFilterModal } from './jobFilter/JobFilterModal';
import { useLayoutEffect, useRef, useState } from 'react';

export function Nav() {
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState<number | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useLayoutEffect(() => {
    if (navWrapperRef.current) {
      const { top, height } = navWrapperRef.current.getBoundingClientRect();
      setTopOffset(top + height);
    }
  }, []);

  return (
    <div ref={navWrapperRef} className="relative w-full h-12 flex justify-center items-center">
      <div className="flex justify-center items-center gap-4 flex-1">
        <IconButton>
          <ChevronLeft className="text-gray-400" />
        </IconButton>
        <Typography variant="title" color="brand">
          2024.11
        </Typography>
        <IconButton>
          <ChevronRight className="text-gray-400" />
        </IconButton>
      </div>
      <JobFilterButton onClick={() => setIsFilterModalOpen((prev) => !prev)} />
      <JobFilterModal open={isFilterModalOpen} topOffset={topOffset} />
    </div>
  );
}
