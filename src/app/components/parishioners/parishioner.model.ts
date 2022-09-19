export interface ParishionerResponse {
  results: Parishioner[];
  total: number;
  page: number;
  limit: number;
}

export interface Parishioner {
  address?: string;
  complete_relation?: string;
  entity_ekklesia_location_id?: number;
  entity_type__id?: number;
  entity_type__name?: string;
  id: number;
  name?: string;
  taxpayer?: any;
}
