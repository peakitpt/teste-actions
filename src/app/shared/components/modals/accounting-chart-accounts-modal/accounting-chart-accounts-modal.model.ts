export interface AccountingChartAccountsResponse {
  results: AccountingChartAccount[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingChartAccount {
  id: number;
  description: string;
}
