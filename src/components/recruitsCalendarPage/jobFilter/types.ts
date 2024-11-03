import { IDuty } from '../../../api/services/duties';

export interface IDutyNode extends IDuty {
  childIds: number[];
}

export interface IDutyHierarchy {
  dutyMap: Map<number, IDutyNode>;
  rootDuties: IDutyNode[];
  leafDuties: Set<number>;
}
