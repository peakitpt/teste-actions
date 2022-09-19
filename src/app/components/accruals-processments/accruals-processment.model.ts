export interface AccrualsProcessmentResponse {
  results: AccrualsProcessment[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccrualsProcessment {
  accrual_type_description: string;
  accruals_accruals_emoluments: AccrualsProcessmentsTypesEmolument[];
  accruals_type_id: number;
  active: boolean;
  client_id: number;
  client_name: string;
  comments: string;
  created_at: string;
  created_by_user_id: number;
  deleted: false;
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

export interface AccrualsProcessmentsTypesEmolument {
  accruals_accrual_id: number;
  created_at: string;
  emolument_description: string;
  emolument_id: number;
  id: number;
  quantity: string;
  total: string;
  updated_at: string;
  value: string;
}
