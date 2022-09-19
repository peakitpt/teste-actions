export interface DocumentResponse {
  results: Document[];
  total: number;
  page: number;
  limit: number;
}

export interface Document {
  id: number;
  accruals_accrual_id: number;
  block_edit: boolean;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  currency: string;
  deleted: boolean;
  deleted_by_user_id: number;
  document_date: string;
  document_line_attributes: any[];
  documents_status_description: string;
  documents_status_id: number;
  documents_type_description: string;
  documents_type_id: number;
  documents_type_serie_id: number;
  entity_description: string;
  entity_ekklesia_location_id: number;
  entity_id: number;
  expiration_date: string;
  has_parochial_rights: boolean;
  is_mass_delivery: boolean;
  name: string;
  paid: boolean;
  serie_number: any;
  total_amount: string;
  updated_at: string;
  updated_by_user_id: number;
  documents_attachments_attributes: DocumentsAttachment[];
}

export interface DocumentsEmolument {
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  document_id: number;
  emolument_description: string;
  emolument_id: number;
  id: number;
  price_value: string;
  updated_at: string;
  updated_by_user_id: number;
}

export interface Numeration {
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
  ser_year: string;
  serie: string;
  updated_at: string;
  updated_by_user_id: number;
}

export interface DocumentsAttachment {
  attachment?: string;
  attachment_name?: string;
  document_id?: number;
  created_at?: string;
  description?: string;
  id?: number;
  updated_at?: string;
  file_to_upload?: File;
}
