export interface BishopricResponse {
  results: Bishopric[];
  total: number;
  page: number;
  limit: number;
}

export interface Bishopric {
  id: number;
  entity_id: number;
  name: string;
  entity_relation_attributes: any;
}
