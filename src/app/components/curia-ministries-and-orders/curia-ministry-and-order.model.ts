import { Numeration } from '../numerations/numeration.model';

export interface CuriaMinistryAndOrderResponse {
  results: CuriaMinistryAndOrder[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaMinistryAndOrder {
  company_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  description: string;
  id: number;
  updated_at: string;
  updated_by_user_id: number;
  archive?: any;
  curia_ministries_and_order_attachments?: CuriaMinistriesAndOrderAttachment[];
  date?: string;
  delivery_term?: any;
  dispatch?: any;
  document_date?: string;
  document_entity_description?: string;
  document_entity_id?: number;
  emolument_description?: any;
  emolument_id?: any;
  entity_description?: string;
  entity_ekklesia_location_id?: number;
  entity_id?: number;
  entity_priest_id?: number;
  function_description?: string;
  function_id?: number;
  hours?: string;
  place_description?: string;
  place_id?: number;
  receipt_id?: any;
  serie_number?: string;
  subscriber1_description?: string;
  subscriber1_entity_priest_id?: number;
  subscriber1_id?: number;
  subscriber2_description?: string;
  subscriber2_entity_priest_id?: number;
  subscriber2_id?: number;
  tax?: any;
  type_description?: string;
  type_id?: number;
}

export interface CuriaMinistriesAndOrderAttachment {
  attachment: string;
  attachment_name: string;
  created_at: string;
  curia_ministries_and_order_id: number;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload?: any;
}
