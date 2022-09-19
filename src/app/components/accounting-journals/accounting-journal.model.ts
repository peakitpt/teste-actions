export interface AccountingJournalResponse {
  results: AccountingJournal[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingJournal {
  accounting_exercise_id: number;
  code: string;
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  id: number;
  serie_number: any;
  updated_at: string;
  updated_by_user_id: number;
  year: number;
}
