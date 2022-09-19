import { Numeration } from '../numerations/numeration.model';

export interface DocumentsTypeResponse {
  results: DocumentsType[];
  total: number;
  page: number;
  limit: number;
}

export interface DocumentsType {
  active: boolean;
  affects_legal_tax_reports: boolean;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  entity_ekklesia_location_id: number;
  id: number;
  inverse_doc_type_id: number;
  movement_operator: string;
  movement_type: string;
  name: string;
  numerations: Numeration[];
  self_assessment: boolean;
  updated_at: string;
  updated_by_user_id: number;
}
