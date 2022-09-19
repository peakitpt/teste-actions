export interface AccountingTaxonomyCodesResponse {
  results: AccountingTaxonomyCodes[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingTaxonomyCodes {
  id: number;
  description: string;
}
