import { useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { IDutyHierarchy } from './types';
import { selectedDutyIdsAtom, selectedLeafDutyCountAtom } from '../../../store/jobFilter';
import { useGetDutyTreeIds } from './useGetDutyTreeIds';

export function useDutySelection(dutyHierarchy: IDutyHierarchy) {
  const [selectedDutyIds, setSelectedDutyIds] = useAtom(selectedDutyIdsAtom);
  const setSelectedLeafDutyCount = useSetAtom(selectedLeafDutyCountAtom);
  const {
    getAllDescendantIds,
    getAncestorIds,
    isAllChildrenSelected: areAllChildrenSelected,
  } = useGetDutyTreeIds(dutyHierarchy);

  const selectedLeafCount = selectedDutyIds.filter((id) => dutyHierarchy.leafDuties.has(id)).length;

  useEffect(() => {
    setSelectedLeafDutyCount(selectedLeafCount);
  }, [selectedLeafCount, setSelectedLeafDutyCount]);

  const handleSelectItem = useCallback(
    (dutyId: number) => (e: React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const node = dutyHierarchy.dutyMap.get(dutyId);
      if (!node) return;

      setSelectedDutyIds((prev) => {
        const selectedSet = new Set(prev);
        const isSelected = selectedSet.has(dutyId);

        if (isSelected) {
          selectedSet.delete(dutyId);
          getAllDescendantIds(dutyId).forEach((id) => selectedSet.delete(id));
          getAncestorIds(dutyId).forEach((id) => selectedSet.delete(id));
        } else {
          selectedSet.add(dutyId);
          getAllDescendantIds(dutyId).forEach((id) => selectedSet.add(id));
          getAncestorIds(dutyId).forEach((ancestorId) => {
            if (areAllChildrenSelected(ancestorId, selectedSet)) {
              selectedSet.add(ancestorId);
            }
          });
        }

        return Array.from(selectedSet);
      });
    },
    [dutyHierarchy.dutyMap, setSelectedDutyIds, getAllDescendantIds, getAncestorIds, areAllChildrenSelected],
  );

  return {
    selectedDutyIds,
    selectedLeafCount,
    handleSelectItem,
  };
}
