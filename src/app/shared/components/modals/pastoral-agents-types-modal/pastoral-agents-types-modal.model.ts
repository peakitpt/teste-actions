export interface PastoralAgentsTypesResponse {
  results: PastoralAgentsType[];
  total: number;
  page: number;
  limit: number;
}

export interface PastoralAgentsType {
  id: number;
  name: string;
}
