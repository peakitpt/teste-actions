export interface ValencesResponse {
  results: Valence[];
  total: number;
  page: number;
  limit: number;
}

export interface Valence {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: any;
  deleted: boolean;
  deleted_by_user_id: any;
  id: number;
  inserted_by_user: boolean;
  locale: string;
  name: string;
  updated_at: string;
  updated_by_user_id: number;
  validated: true;
}

export interface ValencesType {
  name: string;
  id: number;
}
