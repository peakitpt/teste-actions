import { EntityReader } from '../mecs/mecs.model';

export interface ReaderResponse {
  results: EntityReader[];
  total: number;
  page: number;
  limit: number;
}
