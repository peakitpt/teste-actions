export interface EmolumentResponse {
  results: Emolument[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface Emolument {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  currency: string;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  description_short: string;
  emoluments_type_id: number;
  entity_ekklesia_location_id: number;
  id: number;
  is_parochial_right: boolean;
  updated_at: string;
  updated_by_user_id: number;
  value: string;
}
