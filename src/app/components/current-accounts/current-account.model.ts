export interface CurrentAccountResponse {
  results: CurrentAccount[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface CurrentAccount {
  balance: string;
  created_at: string;
  created_by_user_id: number;
  current_accounts_lines: CurrentAccountLine[];
  current_accounts_receipts: CurrentAccountReceipt[];
  deleted: boolean;
  deleted_by_user_id: number;
  entity_description: string;
  entity_ekklesia_location_id: number;
  entity_id: number;
  id: number;
  observations: string;
  payment_type_id: number;
  receipt_date: string;
  total_amount_to_receive: string;
  treasury_location: string;
  updated_at: string;
  updated_by_user_id: number;
}

export interface CurrentAccountLine {
  amount_to_receive: string;
  currency: string;
  current_account_id: number;
  deleted: boolean;
  document_date: string;
  document_expiration_date: string;
  document_id: number;
  documents_status_description: string;
  documents_status_id: number;
  documents_type_description: string;
  documents_type_id: number;
  entity_ekklesia_location_id: number;
  entity_id: number;
  id: number;
  pending_amount: string;
  serie_number: string;
  total_amount: string;
  virtual_pending_amount: string;
}

export interface CurrentAccountReceipt {
  block_edit: boolean;
  created_at: string;
  created_by_user_id: number;
  currency: string;
  current_account_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  entity_description: string;
  entity_ekklesia_location_id: number;
  entity_id: number;
  id: number;
  observations: string;
  payment_type_description: string;
  payment_type_id: number;
  receipt_date: string;
  serie_number: string;
  total_amount: string;
  treasury_location: string;
  updated_at: string;
  updated_by_user_id: number;
  current_accounts_receipts_lines: any[];
  current_accounts_receipts_attachments: CurrentAccountReceiptAttachment[];
}

export interface CurrentAccountReceiptAttachment {
  attachment: string;
  attachment_name: string;
  current_accounts_receipt_id: number;
  created_at: string;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload: any;
}
