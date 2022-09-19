export interface ChapelryResponse {
  results: Chapelry[];
  total: number;
  page: number;
  limit: number;
}

export interface Chapelry {
  id: number;
  entity_id: number;
  name: string;
  entity_relation_attributes: any;
}
