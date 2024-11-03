import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { IDutyHierarchy } from './types';
import { activeParentDutyIdAtom, activeRootDutyIdAtom } from '../../../store/jobFilter';

export function useDutyNavigation(dutyHierarchy: IDutyHierarchy) {
  const [activeRootDutyId, setActiveRootDutyId] = useAtom(activeRootDutyIdAtom);
  const [activeParentDutyId, setActiveParentDutyId] = useAtom(activeParentDutyIdAtom);

  const createHandleMenuItemClick = useCallback(
    (
      onSelectItem: (dutyId: number) => (e: React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLDivElement>) => void,
    ) => {
      return (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const node = dutyHierarchy.dutyMap.get(dutyId);
        if (!node) return;

        if (dutyHierarchy.leafDuties.has(dutyId)) {
          onSelectItem(dutyId)(e);
          return;
        }

        if (node.children.length === 0) {
          onSelectItem(dutyId)(e);
          return;
        }

        if (node.parent_id === null) {
          setActiveRootDutyId(dutyId);
          setActiveParentDutyId(null);
          return;
        }

        setActiveParentDutyId(dutyId);
      };
    },
    [dutyHierarchy, setActiveRootDutyId, setActiveParentDutyId],
  );

  return {
    activeRootDutyId,
    activeParentDutyId,
    createHandleMenuItemClick,
  };
}
