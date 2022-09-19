export interface ValenceResponse {
  results: Valence[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface Valence {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  id: number;
  inserted_by_user: boolean;
  locale: string;
  name: string;
  updated_at: string;
  updated_by_user_id: number;
  validated: boolean;
}
