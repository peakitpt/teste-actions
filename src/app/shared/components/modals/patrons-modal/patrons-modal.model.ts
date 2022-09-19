export interface PatronsResponse {
  results: Patron[];
  total: number;
  page: number;
  limit: number;
}

export interface Patron {
  id: number;
  name: string;
}
