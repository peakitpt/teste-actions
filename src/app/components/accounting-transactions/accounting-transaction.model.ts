export interface AccountingTransactionResponse {
  results: AccountingTransaction[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingTransaction {
  accounting_exercise_id: number;
  accounting_journal_description: string;
  accounting_journal_id: number;
  accounting_transaction_document_type_description: string;
  accounting_transaction_document_type_id: number;
  accounting_transaction_lines: AccountingTransactionLine[];
  accounting_transaction_attachments: AccountingTransactionAttachment[];
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  customer_description: string;
  customer_id: any;
  deleted: boolean;
  deleted_by_user_id: any;
  description: string;
  doc_archival_number: string;
  id: number;
  number_lines: number;
  origin_application_description: string;
  origin_document_link: string;
  origin_document_serie_number: any;
  period: number;
  supplier_description: string;
  supplier_id: any;
  total_amount: string;
  transaction_credit_amount: string;
  transaction_date: string;
  transaction_debit_amount: string;
  transaction_id: string;
  transaction_serie_number: string;
  transaction_type: string;
  updated_at: string;
  updated_by_user_id: number;
  year: number;
}

export interface AccountingTransactionLine {
  accounting_chart_account_description: string;
  accounting_chart_account_id: number;
  accounting_cost_center_description: string;
  accounting_cost_center_id: any;
  accounting_transaction_id: number;
  company_id: number;
  created_at: string;
  credit_amount: number | string;
  debit_amount: number | string;
  description: string;
  id: number;
  period: number;
  trans_date: string;
  transaction_id: string;
  updated_at: string;
}

export interface AccountingTransactionAttachment {
  attachment: string;
  attachment_name: string;
  accounting_transaction_id: number;
  created_at: string;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload: any;
}
