import { useCallback, useMemo } from 'react';
import { useGetDuties } from '../../../api/services/duties';
import { Tag } from '../../common/Tag';
import { Typography } from '../../common/Typography';
import { JobFilterMenu } from './JobFilterMenu';
import { JobFilterMenuItem } from './JobFilterMenuItem';
import { JobFilterTags } from './JobFilterTags';
import { useAtom } from 'jotai';
import { activeParentDutyIdAtom, activeRootDutyIdAtom, selectedDutyIdsAtom } from '../../../store/jobFilter';

export function JobFilterModal({ open, topOffset }: { open: boolean; topOffset: number | null }) {
  const { data } = useGetDuties();
  const [activeRootDutyId, setActiveRootDutyId] = useAtom(activeRootDutyIdAtom);
  const [activeParentDutyId, setActiveParentDutyId] = useAtom(activeParentDutyIdAtom);
  const [selectedDutyIds, setSelectedDutyIds] = useAtom(selectedDutyIdsAtom);
  const rootDuties = useMemo(() => data?.filter((duty) => duty.parent_id === null), [data]);
  const parentDuties = useMemo(
    () => data?.filter((duty) => duty.parent_id === activeRootDutyId),
    [data, activeRootDutyId],
  );
  const childDuties = useMemo(
    () => data?.filter((duty) => duty.parent_id === activeParentDutyId),
    [data, activeParentDutyId],
  );

  console.log('selectedDutyIds', selectedDutyIds);

  const handleMenuItemClick = useCallback(
    (itemType: 'root' | 'parent') => (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (itemType === 'root') {
        setActiveRootDutyId((prev) => (prev === dutyId ? null : dutyId));
        return;
      }
      if (itemType === 'parent') {
        setActiveParentDutyId((prev) => (prev === dutyId ? null : dutyId));
        return;
      }
    },
    [setActiveParentDutyId, setActiveRootDutyId],
  );

  const handleSelectItem = useCallback(
    (itemType: 'root' | 'parent' | 'child') => (dutyId: number) => (e: React.ChangeEvent<HTMLElement>) => {
      e.stopPropagation();
      switch (itemType) {
        case 'root': {
          // 선택 해제 시, 지금 눌린 것과 그것의 자손들만 선택 해제 해야함
          // 모든 자손까지 다
          setSelectedDutyIds((prev) => {
            if (prev.includes(dutyId)) {
              const parentDuties = data?.filter((duty) => duty.parent_id === dutyId);
              const childDuties = parentDuties?.flatMap((duty) =>
                data?.filter((childDuty) => childDuty.parent_id === duty.id),
              );
              const allDuties = parentDuties?.concat(childDuties ?? []);
              return prev.filter((id) => id !== dutyId && !(allDuties?.map((duty) => duty.id) ?? []).includes(id));
            }
            const parentDuties = data?.filter((duty) => duty.parent_id === dutyId);
            const childDuties = parentDuties?.flatMap((duty) =>
              data?.filter((childDuty) => childDuty.parent_id === duty.id),
            );
            const allDuties = parentDuties?.concat(childDuties ?? []);
            return [...prev, dutyId, ...(allDuties?.map((duty) => duty.id) ?? [])];
          });
          return;
        }
        case 'parent':
          setActiveParentDutyId(dutyId);
          setSelectedDutyIds((prev) => {
            const childDuties = data?.filter((duty) => duty.parent_id === dutyId);
            const childDutyIds = childDuties?.map((duty) => duty.id) ?? [];
            return prev.includes(dutyId)
              ? prev.filter((id) => id !== dutyId && !childDutyIds.includes(id))
              : [...prev, ...childDutyIds, dutyId];
          });
          return;
      }
    },
    [data, setActiveParentDutyId, setSelectedDutyIds],
  );

  const handleClickTag = useCallback(
    (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setSelectedDutyIds((prev) => (prev.includes(dutyId) ? prev.filter((id) => id !== dutyId) : [...prev, dutyId]));
    },
    [setSelectedDutyIds],
  );
  return (
    <div
      className={`absolute top-0 w-full h-96 bg-gray-50 px-8 pt-6 pb-9 flex flex-col gap-4 overflow-hidden`}
      style={{
        display: open ? 'flex' : 'none',
        transform: `translateY(${(topOffset ?? 0) + 2}px)`,
      }}
    >
      <div className=" flex flex-row gap-1  ">
        <Typography variant="content">직무</Typography>
        <Typography variant="content" className="text-blue-500">
          3
        </Typography>
      </div>
      <div className="flex-1 flex flex-row rounded-md border-2 min-h-0">
        <JobFilterMenu>
          {rootDuties.map((duty) => (
            <JobFilterMenuItem
              key={duty.id}
              active={activeRootDutyId === duty.id}
              selected={selectedDutyIds.includes(duty.id)}
              duty={duty}
              hasChildren={data?.some((childDuty) => childDuty.parent_id === duty.id)}
              onClick={handleMenuItemClick('root')}
              onSelect={handleSelectItem('root')}
            />
          ))}
        </JobFilterMenu>
        {activeRootDutyId && (
          <JobFilterMenu>
            {parentDuties.map((duty) => (
              <JobFilterMenuItem
                key={duty.id}
                active={activeParentDutyId === duty.id}
                selected={selectedDutyIds.includes(duty.id)}
                hasChildren={data?.some((childDuty) => childDuty.parent_id === duty.id)}
                duty={duty}
                onClick={handleMenuItemClick('parent')}
                onSelect={handleSelectItem('parent')}
              />
            ))}
          </JobFilterMenu>
        )}
        {activeParentDutyId && (
          <JobFilterTags>
            {childDuties.map((duty) => (
              <Tag
                key={duty.id}
                aria-selected={selectedDutyIds.includes(duty.id)}
                onClick={(e) => handleClickTag(duty.id)(e)}
              >
                {duty.name}
              </Tag>
            ))}
          </JobFilterTags>
        )}
      </div>
    </div>
  );
}
