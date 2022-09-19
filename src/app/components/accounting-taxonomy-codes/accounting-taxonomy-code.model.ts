export interface AccountingTaxonomyCodeResponse {
  results: AccountingTaxonomyCode[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingTaxonomyCode {
  accounting_taxonomy_reference_description: string;
  accounting_taxonomy_reference_id: number;
  base_code: string;
  deleted: boolean;
  description: string;
  id: number;
  locale: string;
  observations: string;
  taxonomy_code: number;
  taxonomy_reference_code: string;
  taxonomy_reference_description: string;
  taxonomy_reference_id: number;
  taxonomy_reference_is_default: boolean;
}
