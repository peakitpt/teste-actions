export interface InstitutionTypeResponse {
  results: InstitutionType[];
  total: number;
  page: number;
  limit: number;
}

export interface InstitutionType {
  id?: number;
  name?: string;
  abbreviated_name?: string;
  group_name?: string;
  block_remove?: boolean;
  created_at?: Date;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  group_id?: number;
  inserted_by_user?: boolean;
  locale?: string;
  updated_at?: Date;
  updated_by_user_id?: number;
  validated?: boolean;
}
