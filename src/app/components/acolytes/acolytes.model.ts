import { EntityAcolyte } from '../mecs/mecs.model';

export interface AcolyteResponse {
  results: EntityAcolyte[];
  total: number;
  page: number;
  limit: number;
}
