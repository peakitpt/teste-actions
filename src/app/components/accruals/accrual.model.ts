export interface AccrualResponse {
  results: Accrual[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface Accrual {
  accruals_types_emoluments: AccrualsTypesEmolument[];
  accrual_type_description: string;
  accruals_type_id: number;
  active: boolean;
  client_id: number;
  client_name: string;
  comments: string;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  document_to_generate_document_type_description: string;
  document_to_generate_document_type_id: number;
  document_to_generate_serie_description: string;
  document_to_generate_serie_id: number;
  emoluments_total: string;
  entity_ekklesia_location_id: number;
  id: number;
  processing_last_date: string;
  processing_next_date: string;
  updated_at: string;
  validity_date_end: string;
  validity_date_start: string;
}

export interface AccrualsTypesEmolument {
  accruals_type_id: number;
  created_at: string;
  emolument_description: string;
  emolument_id: number;
  id: number;
  quantity: string;
  total: string;
  updated_at: string;
  value: string;
}

export interface DocumentsTypesNumeration {
  active: boolean;
  block_edit: boolean;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  documents_type_id: number;
  entity_ekklesia_location_id: number;
  id: number;
  is_default: boolean;
  name: string;
  ser_length: number;
  ser_max: number;
  ser_preffix: string;
  ser_suffix: any;
  ser_value: number;
  ser_year: any;
  serie: string;
  updated_at: string;
  updated_by_user_id: number;
}
