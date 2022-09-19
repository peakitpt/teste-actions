export interface FormationTypesResponse {
  results: FormationType[];
  total: number;
  page: number;
  limit: number;
}

export interface FormationType {
  id: number;
  name: string;
}
