export interface WorshipplaceResponse {
  results: Worshipplace[];
  total: number;
  page: number;
  limit: number;
}

export interface Worshipplace {
  id: number;
  entity_id: number;
  name: string;
  entity_relation_attributes: any;
}
