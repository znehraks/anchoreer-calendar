import { useCallback, useMemo } from 'react';
import { useGetDuties } from '../../../api/services/duties';
import { Tag } from '../../common/Tag';
import { Typography } from '../../common/Typography';
import { JobFilterMenu } from './JobFilterMenu';
import { JobFilterMenuItem } from './JobFilterMenuItem';
import { JobFilterTags } from './JobFilterTags';
import { useAtom } from 'jotai';
import { activeParentDutyIdAtom, activeRootDutyIdAtom, selectedDutyIdsAtom } from '../../../store/jobFilter';
import { IDutyHierarchy, IDutyNode } from './types';

export function JobFilterModal({ open, topOffset }: { open: boolean; topOffset: number | null }) {
  const { data } = useGetDuties();
  const [activeRootDutyId, setActiveRootDutyId] = useAtom(activeRootDutyIdAtom);
  const [activeParentDutyId, setActiveParentDutyId] = useAtom(activeParentDutyIdAtom);
  const [selectedDutyIds, setSelectedDutyIds] = useAtom(selectedDutyIdsAtom);

  const dutyHierarchy = useMemo<IDutyHierarchy>(() => {
    if (!data) return { dutyMap: new Map(), rootDuties: [], leafDuties: new Set() };

    const dutyMap = new Map<number, IDutyNode>();
    const leafDuties = new Set<number>();

    // 첫 번째 패스: 기본 노드 생성 및 맵핑
    data.forEach((duty) => {
      dutyMap.set(duty.id, { ...duty, children: [] });
      leafDuties.add(duty.id);
    });

    // 두 번째 패스: 부모-자식 관계 설정 및 leaf 노드 식별
    data.forEach((duty) => {
      if (duty.parent_id !== null) {
        const parent = dutyMap.get(duty.parent_id);
        if (parent) {
          parent.children.push(duty.id);
          leafDuties.delete(duty.parent_id);
        }
      }
    });

    const rootDuties = data
      .filter((duty) => duty.parent_id === null)
      .map((duty) => dutyMap.get(duty.id)!)
      .filter((duty): duty is IDutyNode => Boolean(duty));

    return { dutyMap, rootDuties, leafDuties };
  }, [data]);

  const activeChildren = useMemo(() => {
    if (!activeParentDutyId || !dutyHierarchy.dutyMap.has(activeParentDutyId)) return [];
    const parent = dutyHierarchy.dutyMap.get(activeParentDutyId)!;
    return parent.children
      .map((id) => dutyHierarchy.dutyMap.get(id))
      .filter((duty): duty is IDutyNode => Boolean(duty));
  }, [dutyHierarchy, activeParentDutyId]);

  const activeParentDuties = useMemo(() => {
    if (!activeRootDutyId || !dutyHierarchy.dutyMap.has(activeRootDutyId)) return [];
    const root = dutyHierarchy.dutyMap.get(activeRootDutyId)!;
    return root.children.map((id) => dutyHierarchy.dutyMap.get(id)).filter((duty): duty is IDutyNode => Boolean(duty));
  }, [dutyHierarchy, activeRootDutyId]);

  const selectedLeafCount = useMemo(() => {
    return selectedDutyIds.filter((id) => dutyHierarchy.leafDuties.has(id)).length;
  }, [selectedDutyIds, dutyHierarchy.leafDuties]);

  // 특정 노드의 모든 자식 노드 ID를 가져오는 함수
  const getAllDescendantIds = useCallback((nodeId: number, dutyMap: Map<number, IDutyNode>): number[] => {
    const node = dutyMap.get(nodeId);
    if (!node) return [];

    const descendantIds: number[] = [];
    const queue = [...node.children];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentNode = dutyMap.get(currentId);
      if (!currentNode) continue;

      descendantIds.push(currentId);
      queue.push(...currentNode.children);
    }

    return descendantIds;
  }, []);

  // 특정 노드의 모든 조상 노드 ID를 가져오는 함수
  const getAncestorIds = useCallback((nodeId: number, dutyMap: Map<number, IDutyNode>): number[] => {
    const ancestors: number[] = [];
    let currentNode = dutyMap.get(nodeId);

    while (currentNode?.parent_id) {
      ancestors.push(currentNode.parent_id);
      currentNode = dutyMap.get(currentNode.parent_id);
    }

    return ancestors;
  }, []);

  // 특정 노드의 모든 자식들이 선택되었는지 확인하는 함수
  const areAllChildrenSelected = useCallback(
    (nodeId: number, selectedIds: Set<number>): boolean => {
      const node = dutyHierarchy.dutyMap.get(nodeId);
      if (!node) return false;

      const descendantIds = getAllDescendantIds(nodeId, dutyHierarchy.dutyMap);
      if (descendantIds.length === 0) return true;

      return descendantIds.every((id) => selectedIds.has(id));
    },
    [dutyHierarchy.dutyMap, getAllDescendantIds],
  );

  const getSelectedLeafCount = useCallback(
    (nodeId: number): number => {
      const node = dutyHierarchy.dutyMap.get(nodeId);
      if (!node) return 0;

      if (dutyHierarchy.leafDuties.has(nodeId)) {
        return selectedDutyIds.includes(nodeId) ? 1 : 0;
      }

      return node.children.reduce((sum, childId) => sum + getSelectedLeafCount(childId), 0);
    },
    [dutyHierarchy, selectedDutyIds],
  );

  const handleSelectItem = useCallback(
    (dutyId: number) => (e: React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const node = dutyHierarchy.dutyMap.get(dutyId);
      if (!node) return;

      setSelectedDutyIds((prev) => {
        const selectedSet = new Set(prev);
        const isSelected = selectedSet.has(dutyId);

        // 선택 해제 시
        if (isSelected) {
          // 1. 현재 노드 선택 해제
          selectedSet.delete(dutyId);

          // 2. 모든 하위 노드 선택 해제
          getAllDescendantIds(dutyId, dutyHierarchy.dutyMap).forEach((id) => selectedSet.delete(id));

          // 3. 상위 노드들의 선택 상태 갱신
          getAncestorIds(dutyId, dutyHierarchy.dutyMap).forEach((id) => selectedSet.delete(id));
        }
        // 선택 시
        else {
          // 1. 현재 노드 선택
          selectedSet.add(dutyId);

          // 2. 모든 하위 노드 선택
          getAllDescendantIds(dutyId, dutyHierarchy.dutyMap).forEach((id) => selectedSet.add(id));

          // 3. 상위 노드들의 선택 상태 갱신
          getAncestorIds(dutyId, dutyHierarchy.dutyMap).forEach((ancestorId) => {
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

  const handleMenuItemClick = useCallback(
    (itemType: 'root' | 'parent') => (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (itemType === 'root') {
        setActiveRootDutyId(dutyId);
        setActiveParentDutyId(null);
        return;
      }

      const isLeaf = dutyHierarchy.leafDuties.has(dutyId);
      if (isLeaf) {
        handleSelectItem(dutyId)(e);
        return;
      }
      setActiveParentDutyId(dutyId);
    },
    [dutyHierarchy.leafDuties, handleSelectItem, setActiveParentDutyId, setActiveRootDutyId],
  );

  const handleClickTag = useCallback(
    (dutyId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleSelectItem(dutyId)(e);
    },
    [handleSelectItem],
  );

  return (
    <div
      className={`absolute top-0 w-full h-96 bg-gray-50 px-8 pt-6 pb-9 flex flex-col gap-4 overflow-hidden`}
      style={{
        display: open ? 'flex' : 'none',
        transform: `translateY(${(topOffset ?? 0) + 2}px)`,
      }}
    >
      <div className="flex flex-row gap-1">
        <Typography variant="content">직무</Typography>
        <Typography variant="content" className="text-blue-500">
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
              duty={duty}
              hasChildren={duty.children.length > 0}
              selectedChildrenCount={getSelectedLeafCount(duty.id)}
              onClick={handleMenuItemClick('root')}
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
                hasChildren={duty.children.length > 0}
                selectedChildrenCount={getSelectedLeafCount(duty.id)}
                duty={duty}
                onClick={handleMenuItemClick('parent')}
                onSelect={handleSelectItem}
              />
            ))}
          </JobFilterMenu>
        )}
        {activeParentDutyId && (
          <JobFilterTags>
            {activeChildren.map((duty) => (
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
