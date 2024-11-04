import React, { useCallback, useMemo } from 'react';
import { Tag } from '../../common/Tag';
import { Typography } from '../../common/Typography';
import { JobFilterMenu } from './JobFilterMenu';
import { JobFilterMenuItem } from './JobFilterMenuItem';
import { JobFilterTags } from './JobFilterTags';
import { IDutyNode } from './types';
import { useDutyHierarchy } from './useDutyHierarchy';
import { useDutyNavigation } from './useDutyNavigation';
import { useDutySelection } from './useDutySelection';
import { useGetDutyTreeIds } from './useGetDutyTreeIds';
import { useGetDuties } from '../../../api/services/duties';
import { Backdrop } from '../../common/Backdrop';
import { createPortal } from 'react-dom';

interface JobFilterModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topOffset: number | null;
}

export function JobFilterModal({ open, setOpen, topOffset }: JobFilterModalProps) {
  const { data: duties } = useGetDuties();
  const dutyHierarchy = useDutyHierarchy(duties);
  const { activeRootDutyId, activeParentDutyId, createHandleMenuItemClick } = useDutyNavigation(dutyHierarchy);
  const { selectedDutyIds, selectedLeafCount, handleSelectItem } = useDutySelection(dutyHierarchy);
  const { getSelectedLeafCount } = useGetDutyTreeIds(dutyHierarchy);

  const handleMenuItemClick = useMemo(
    () => createHandleMenuItemClick(handleSelectItem),
    [createHandleMenuItemClick, handleSelectItem],
  );

  const activeChildren = useMemo(() => {
    if (!activeParentDutyId || !dutyHierarchy.dutyMap.has(activeParentDutyId)) {
      return [];
    }
    const parent = dutyHierarchy.dutyMap.get(activeParentDutyId)!;
    return parent.childIds
      .map((id) => dutyHierarchy.dutyMap.get(id))
      .filter((duty): duty is IDutyNode => Boolean(duty));
  }, [dutyHierarchy, activeParentDutyId]);

  const activeParentDuties = useMemo(() => {
    if (!activeRootDutyId || !dutyHierarchy.dutyMap.has(activeRootDutyId)) {
      return [];
    }
    const root = dutyHierarchy.dutyMap.get(activeRootDutyId)!;
    return root.childIds.map((id) => dutyHierarchy.dutyMap.get(id)).filter((duty): duty is IDutyNode => Boolean(duty));
  }, [dutyHierarchy, activeRootDutyId]);

  const handleClickTag = useCallback(
    (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleSelectItem(dutyId)(e);
    },
    [handleSelectItem],
  );

  return createPortal(
    <>
      <Backdrop className={open ? 'block' : 'hidden'} onClick={() => setOpen(false)} />
      <div
        aria-label="job-filter-modal"
        className={`z-10 absolute top-0 w-full h-96 bg-gray-50 px-8 pt-6 pb-9 flex flex-col gap-4 overflow-hidden`}
        style={{
          display: open ? 'flex' : 'none',
          transform: `translateY(${(topOffset ?? 0) + 2}px)`,
        }}
      >
        <div className="flex flex-row gap-1">
          <Typography variant="content">직무</Typography>
          <Typography aria-label="selected-job-count" variant="content" className="text-blue-500">
            {selectedLeafCount ? `${selectedLeafCount}` : ''}
          </Typography>
        </div>
        <div className="flex-1 flex flex-row rounded-md border-2 min-h-0">
          <JobFilterMenu>
            {dutyHierarchy.rootDuties.map((duty) => (
              <JobFilterMenuItem
                key={duty.id}
                active={activeRootDutyId === duty.id}
                selected={selectedDutyIds.includes(duty.id)}
                duty={{
                  id: duty.id,
                  name: duty.name,
                }}
                hasChildren={duty.childIds.length > 0}
                selectedChildrenCount={getSelectedLeafCount(duty.id, selectedDutyIds)}
                onClick={handleMenuItemClick}
                onSelect={handleSelectItem}
              />
            ))}
          </JobFilterMenu>

          {!activeRootDutyId && <div className="flex-1 flex justify-center items-center">직무를 선택해 주세요.</div>}

          {activeRootDutyId && (
            <JobFilterMenu>
              {activeParentDuties.map((duty) => (
                <JobFilterMenuItem
                  key={duty.id}
                  active={activeParentDutyId === duty.id}
                  selected={selectedDutyIds.includes(duty.id)}
                  duty={{
                    id: duty.id,
                    name: duty.name,
                  }}
                  hasChildren={duty.childIds.length > 0}
                  selectedChildrenCount={getSelectedLeafCount(duty.id, selectedDutyIds)}
                  onClick={handleMenuItemClick}
                  onSelect={handleSelectItem}
                />
              ))}
            </JobFilterMenu>
          )}

          {activeParentDutyId && (
            <JobFilterTags>
              {activeChildren.map((duty) => (
                <Tag key={duty.id} aria-selected={selectedDutyIds.includes(duty.id)} onClick={handleClickTag(duty.id)}>
                  {duty.name}
                </Tag>
              ))}
            </JobFilterTags>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
