export interface AccountingTaxonomyReferencesResponse {
  results: AccountingTaxonomyReference[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingTaxonomyReference {
  id: number;
  description: string;
}
