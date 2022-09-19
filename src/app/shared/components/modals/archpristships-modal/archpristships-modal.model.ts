export interface ArchpristshipsResponse {
  results: Archpristship[];
  total: number;
  page: number;
  limit: number;
}

export interface Archpristship {
  entity_id: number;
  entity_description: string;
}
