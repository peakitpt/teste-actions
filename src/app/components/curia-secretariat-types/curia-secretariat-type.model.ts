export interface CuriaSecretariatTypeResponse {
  results: CuriaSecretariatType[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaSecretariatType {
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  entity_ekklesia_location_id?: number;
  id?: number;
  name?: string;
  sync_at?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}
