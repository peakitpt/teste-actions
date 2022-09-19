export interface PlacesResponse {
  results: Place[];
  total: number;
  page: number;
  limit: number;
}

export interface Place {
  complete_relation: string;
  entity_type: EntityType;
  id: number;
  name: string;
}

interface EntityType {
  id: number;
  name: string;
}
