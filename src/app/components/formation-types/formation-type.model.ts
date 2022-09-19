export interface FormationTypeResponse {
  results: FormationType[];
  total: number;
  page: number;
  limit: number;
}

export interface FormationType {
  id: number;
  description: string;
  block_delete?: boolean;
  block_edit?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  entity_ekklesia_location_id?: number;
  updated_at?: string;
  updated_by_user_id?: number;
}
