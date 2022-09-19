export interface AccountingTransactionDocumentTypesResponse {
  results: AccountingTransactionDocumentType[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingTransactionDocumentType {
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  id: number;
  updated_at: string;
  updated_by_user_id: number;
}
