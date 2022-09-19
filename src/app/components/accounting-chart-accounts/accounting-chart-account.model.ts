export interface AccountingChartAccountResponse {
  results: AccountingChartAccount[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingChartAccount {
  account_description: string;
  account_id: number;
  account_id_as_text: string;
  accounting_exercise_id: number;
  active: boolean;
  closing_credit_balance: string;
  closing_debit_balance: string;
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  grouping_category: string;
  grouping_code: any;
  grouping_code_description: string;
  has_childs: boolean;
  id: number;
  included_on_profit_loss: boolean;
  opening_credit_balance: string;
  opening_debit_balance: string;
  profit: boolean;
  taxonomy_code: any;
  taxonomy_code_description: string;
  updated_at: string;
  updated_by_user_id: number;
  year: number;
}
