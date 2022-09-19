export interface ReportsGrouperResponse {
  results: ReportsGrouper[];
  total: number;
  page: number;
  limit: number;
}

export interface ReportsGrouper {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  enabled: boolean;
  id: number;
  locale: string;
  name: string;
  updated_at: string;
  updated_by_user_id: number;
}
