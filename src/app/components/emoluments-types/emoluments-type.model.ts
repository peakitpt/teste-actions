export interface EmolumentTypeResponse {
  results: EmolumentType[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface EmolumentType {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  entity_ekklesia_location_id: number;
  id: number;
  inserted_by_user: boolean;
  is_donation_emolument: boolean;
  name: string;
  sync_at: string;
  updated_at: string;
  updated_by_user_id: number;
  validated: boolean;
}
