export interface FormationsResponse {
  results: Formation[];
  total: number;
  page: number;
  limit: number;
}

export interface Formation {
  entity_id: number;
  entity_description: string;
}
