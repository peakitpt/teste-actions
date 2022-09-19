export interface PatronResponse {
  results: Patron[];
  total: number;
  page: number;
  limit: number;
}

export interface Patron {
  id: number;
  locale: string;
  name: string;
  validated: boolean;
}
