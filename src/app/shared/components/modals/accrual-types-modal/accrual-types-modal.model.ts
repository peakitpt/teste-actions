export interface AccrualTypesResponse {
  results: AccrualType[];
  total: number;
  page: number;
  limit: number;
}

export interface AccrualType {
  id: number;
  name: string;
}
