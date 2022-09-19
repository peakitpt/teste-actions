export interface PastoralAgentsTypeResponse {
  results: PastoralAgentsType[];
  total: number;
  page: number;
  limit: number;
}

export interface PastoralAgentsType {
  id: number;
  description: string;
  group: string;
}
