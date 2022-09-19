export interface NumerationResponse {
  results: Numeration[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface Numeration {
  active: boolean;
  block_edit: boolean;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: any;
  documents_type_id: any;
  entity_ekklesia_location_id: number;
  id: number;
  is_default: boolean;
  name: string;
  numeration_view_attributes: any;
  ser_length: number;
  ser_max: number;
  ser_preffix: any;
  ser_suffix: string;
  ser_value: number;
  ser_year: number;
  serie: string;
  updated_at: string;
  updated_by_user_id: any;
}
