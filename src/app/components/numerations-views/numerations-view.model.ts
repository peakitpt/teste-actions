export interface NumerationsViewResponse {
  results: NumerationsView[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface NumerationsView {
  block_remove: boolean;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: any;
  id: number;
  updated_by_user_id: any;
  entity_id: number;
  numeration__name: string;
  numeration_description: string;
  numeration_id: number;
  sync_at: any;
  view__name: string;
  view_id: number;
}
