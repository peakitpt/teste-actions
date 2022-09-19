export interface BishopricIntegratedViewResponse {
  results: BishopricIntegratedView[];
  total: number;
  page: number;
  limit: number;
}

export interface BishopricIntegratedView {
  archpriestship_description: string;
  archpriestship_id: number;
  complete_relation: string;
  country_description: string;
  country_id: number;
  diocese_description: string;
  diocese_id: number;
  entity_description: string;
  entity_id: number;
  entity_type_id: number;
  validated: boolean;
  accounting_chart_account_balances: any[];
}
