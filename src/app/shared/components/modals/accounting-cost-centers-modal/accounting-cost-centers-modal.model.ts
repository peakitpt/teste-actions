export interface AccountingCostCentersResponse {
  results: AccountingCostCenter[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingCostCenter {
  code: string;
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: any;
  description: string;
  id: number;
  updated_at: string;
  updated_by_user_id: any;
}
