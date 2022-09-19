export interface GestdocumentResponse {
  results: Gestdocument[];
  total: number;
  page: number;
  limit: number;
}

export interface Gestdocument {
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  document_date?: string;
  document_reference?: string;
  document_text?: string;
  document_title?: string;
  entity_address?: string;
  entity_ekklesia_location_id?: number;
  entity_name?: string;
  entity_title?: string;
  footnotes?: string;
  id?: number;
  institution_date?: string;
  institution_name?: string;
  institution_reference?: string;
  institution_service?: string;
  institution_subject?: string;
  signature?: string;
  signature_post?: string;
  sync_at?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}
