export interface CuriaAdministrativeProcessTypeResponse {
  results: CuriaAdministrativeProcessType[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaAdministrativeProcessType {
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: any;
  deleted?: boolean;
  deleted_by_user_id?: any;
  entity_ekklesia_location_id?: number;
  id?: number;
  name?: string;
  subtype_description?: any;
  subtype_id?: any;
  updated_at?: string;
  updated_by_user_id?: any;
}
