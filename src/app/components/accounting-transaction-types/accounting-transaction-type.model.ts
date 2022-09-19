export interface AccountingTransactionTypeResponse {
  results: AccountingTransactionType[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingTransactionType {
  code: string;
  code_and_description: string;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  id: number;
  is_default: boolean;
  locale: string;
  updated_at: string;
  updated_by_user_id: number;
}
