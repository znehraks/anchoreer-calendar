import { IRecruit } from '../../../api/services/recruits';

export interface IRecruitMap {
  startMap: Map<string, IRecruit[]>;
  endMap: Map<string, IRecruit[]>;
}
