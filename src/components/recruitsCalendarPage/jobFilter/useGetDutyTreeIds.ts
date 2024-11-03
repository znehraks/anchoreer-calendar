import { useCallback } from 'react';
import { IDutyHierarchy } from './types';
//
export function useGetDutyTreeIds(dutyHierarchy: IDutyHierarchy) {
  const getAllDescendantIds = useCallback(
    (nodeId: number): number[] => {
      const node = dutyHierarchy.dutyMap.get(nodeId);
      if (!node) return [];

      const descendantIds: number[] = [];
      const queue = [...node.children];

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        const currentNode = dutyHierarchy.dutyMap.get(currentId);
        if (!currentNode) continue;

        descendantIds.push(currentId);
        queue.push(...currentNode.children);
      }

      return descendantIds;
    },
    [dutyHierarchy.dutyMap],
  );

  const getAncestorIds = useCallback(
    (nodeId: number): number[] => {
      const ancestors: number[] = [];
      let currentNode = dutyHierarchy.dutyMap.get(nodeId);

      while (currentNode?.parent_id) {
        ancestors.push(currentNode.parent_id);
        currentNode = dutyHierarchy.dutyMap.get(currentNode.parent_id);
      }

      return ancestors;
    },
    [dutyHierarchy.dutyMap],
  );

  const isAllChildrenSelected = useCallback(
    (nodeId: number, selectedIds: Set<number>): boolean => {
      const node = dutyHierarchy.dutyMap.get(nodeId);
      if (!node) return false;

      const descendantIds = getAllDescendantIds(nodeId);
      if (descendantIds.length === 0) return true;

      return descendantIds.every((id) => selectedIds.has(id));
    },
    [dutyHierarchy.dutyMap, getAllDescendantIds],
  );

  const getSelectedLeafCount = useCallback(
    (nodeId: number, selectedIds: number[]): number => {
      const node = dutyHierarchy.dutyMap.get(nodeId);
      if (!node) return 0;

      if (dutyHierarchy.leafDuties.has(nodeId)) {
        return selectedIds.includes(nodeId) ? 1 : 0;
      }

      return node.children.reduce((sum, childId) => sum + getSelectedLeafCount(childId, selectedIds), 0);
    },
    [dutyHierarchy],
  );

  return {
    getAllDescendantIds,
    getAncestorIds,
    isAllChildrenSelected,
    getSelectedLeafCount,
  };
}
