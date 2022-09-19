export interface CountryResponse {
  results: Country[];
  total: number;
  page: number;
  limit: number;
}

export interface Country {
  id: number;
  name: string;
  cca2?: string;
  cca3?: string;
  cioc?: string;
  name_official?: string;
  validated?: boolean;
}
