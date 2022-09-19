export interface CountriesResponse {
  results: Country[];
  total: number;
  page: number;
  limit: number;
}

export interface Country {
  id: number;
  name: string;
}
