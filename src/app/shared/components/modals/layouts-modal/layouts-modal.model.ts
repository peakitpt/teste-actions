import { StringIterator } from 'lodash';

export interface LayoutsResponse {
  results: Layout[];
  total: number;
  page: number;
  limit: number;
}

export interface Layout {
  id: number;
  name: string;
}
