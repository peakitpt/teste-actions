export interface AccountingExerciseResponse {
  results: AccountingExercise[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingExercise {
  active: boolean;
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  end_date: string;
  id: number;
  start_date: string;
  taxonomy_reference_description: string;
  taxonomy_reference_id: number;
  updated_at: string;
  updated_by_user_id: number;
  year: number;
}
