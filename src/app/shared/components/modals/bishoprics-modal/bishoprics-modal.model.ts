export interface BishopricsResponse {
  results: Bishopric[];
  total: number;
  page: number;
  limit: number;
}

export interface Bishopric {
  entity_id: number;
  entity_description: string;
}
