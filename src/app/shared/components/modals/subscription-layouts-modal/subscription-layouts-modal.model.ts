import { StringIterator } from 'lodash';

export interface SubscriptionLayoutsResponse {
  results: SubscriptionLayout[];
  total: number;
  page: number;
  limit: number;
}

export interface SubscriptionLayout {
  id: number;
  layout_id: number;
  block_remove: boolean;
  layout: Layout;
}

export interface Layout {
  id: number;
  name: string;
}
