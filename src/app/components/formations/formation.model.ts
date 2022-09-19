import { FormationType } from './../formation-types/formation-type.model';
export interface FormationResponse {
  results: Formation[];
  total: number;
  page: number;
  limit: number;
}

export interface Formation {
  id: number;
  description: string;
  formations_type_id: number;
  formations_type_description: string;
  formations_type?: FormationType;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  entity_ekklesia_location_id?: number;
  sync_id?: number;
  updated_at?: string;
  updated_by_user_id?: number;
}
