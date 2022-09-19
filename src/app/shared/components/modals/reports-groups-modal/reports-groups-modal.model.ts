export interface ReportsGroupResponse {
  results: ReportsGroup[];
  total: number;
  page: number;
  limit: number;
}

export interface ReportsGroup {
  id: number;
  name: string;
}
