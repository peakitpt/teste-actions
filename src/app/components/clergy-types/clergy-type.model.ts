export interface ClergyTypeResponse {
  results: ClergyType[];
  total: number;
  page: number;
  limit: number;
}

export interface ClergyType {
  id: number;
  name: string;
  abbreviated_name: string | null;
  group_name: string;
  block_remove: boolean;
  created_at: Date;
  created_by_user_id: number | null;
  deleted: boolean;
  deleted_by_user_id: number | null;
  group_id: number;
  inserted_by_user: boolean;
  locale: string;
  updated_at: Date;
  updated_by_user_id: number;
  validated: boolean;
}
