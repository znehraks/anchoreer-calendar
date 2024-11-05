import { useMemo } from 'react';
import { IDuty } from '../../../api/services/duties';
import { IDutyHierarchy, IDutyNode } from './types';

export function useDutyHierarchy(data: IDuty[]) {
  return useMemo<IDutyHierarchy>(() => {
    const dutyMap = new Map<number, IDutyNode>();
    const leafDuties = new Set<number>();

    data.forEach((duty) => {
      dutyMap.set(duty.id, { ...duty, childIds: [] });
      leafDuties.add(duty.id);
    });

    data.forEach((duty) => {
      if (duty.parent_id !== null) {
        const parent = dutyMap.get(duty.parent_id);
        if (parent) {
          parent.childIds.push(duty.id);
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
}
