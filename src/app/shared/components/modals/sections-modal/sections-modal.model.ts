export interface SectionsResponse {
  results: Section[];
  total: number;
  page: number;
  limit: number;
}

export interface Section {
  id: number;
  description: string;
  reference: string;
  block_remove: boolean;
}
