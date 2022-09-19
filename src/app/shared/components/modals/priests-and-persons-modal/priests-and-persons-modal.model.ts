export interface PriestsAndPersonsResponse {
  results: PriestsAndPerson[];
  total: number;
  page: number;
  limit: number;
}

export interface PriestsAndPerson {
  birth_date: string;
  email: string;
  entity_type_description: string;
  id: number;
  name: string;
}
