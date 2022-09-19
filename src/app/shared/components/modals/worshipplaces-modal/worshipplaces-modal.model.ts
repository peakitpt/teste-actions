export interface WorshipplacesResponse {
  results: Worshipplace[];
  total: number;
  page: number;
  limit: number;
}

export interface Worshipplace {
  entity_id: number;
  entity_description: string;
}
