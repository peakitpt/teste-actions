export interface ChapelriesResponse {
  results: Chapelry[];
  total: number;
  page: number;
  limit: number;
}

export interface Chapelry {
  entity_id: number;
  entity_description: string;
}
