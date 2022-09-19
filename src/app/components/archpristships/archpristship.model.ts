export interface ArchpristshipResponse {
  results: Archpristship[];
  total: number;
  page: number;
  limit: number;
}

export interface Archpristship {
  id: number;
  entity_id: number;
  name: string;
  entity_relation_attributes: any;
}
