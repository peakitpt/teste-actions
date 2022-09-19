export interface EntityPriestsResponse {
  results: EntityPriest[];
  total: number;
  page: number;
  limit: number;
}

export interface EntityPriest {
  id: number;
  clergy_type: ClergyType;
  entity: Entity;
}

export interface ClergyType {
  abbreviated_name: string;
  name: string;
}

export interface Entity {
  id: number;
  name: string;
}
