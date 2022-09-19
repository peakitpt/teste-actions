export interface TreasuryLocationResponse {
  results: TreasuryLocation[];
  total: number;
  page: number;
  limit: number;
}

export interface TreasuryLocation {
  active?: boolean;
  created_at?: any;
  created_by_user_id?: any;
  deleted?: boolean;
  deleted_by_user_id?: any;
  entity_ekklesia_location_id?: any;
  id?: any;
  name?: any;
  updated_at?: any;
  updated_by_user_id?: any;
}
