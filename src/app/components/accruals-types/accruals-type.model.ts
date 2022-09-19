export interface AccrualsTypeResponse {
  results: AccrualsType[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccrualsType {
  accruals_types_emoluments: AccrualTypesEmolument[];
  code: string;
  comments: string;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  description: string;
  document_to_generate_document_type_description: string;
  document_to_generate_document_type_id: number;
  document_to_generate_serie_description: string;
  document_to_generate_serie_id: number;
  emoluments_total: string;
  entity_ekklesia_location_id: number;
  id: number;
  periodicity_number_of_days: number;
  periodicity_type: string;
  updated_at: string;
  validity_date_end: string;
  validity_date_start: string;
}

export interface AccrualTypesEmolument {
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
