export interface CuriaSecretariatResponse {
  results: CuriaSecretariat[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaSecretariat {
  archive?: any;
  created_at?: any;
  created_by_user_id?: any;
  curia_secretariat_attachments?: CuriaSecretariatAttachment[];
  curia_secretariat_entities?: CuriaSecretariatEntity[];
  curia_secretariat_type_description?: any;
  curia_secretariat_type_id?: any;
  deleted?: boolean;
  deleted_by_user_id?: any;
  delivery_term?: any;
  dispatch?: any;
  document_date?: string;
  document_entity_description?: any;
  document_entity_id?: any;
  emolument_description?: any;
  emolument_id?: any;
  entity_ekklesia_location_id?: any;
  free_description?: any;
  free_text?: any;
  id?: any;
  is_free_text?: boolean;
  receipt_id?: any;
  serie_number?: any;
  subscriber_description?: any;
  subscriber_entity_priest_id?: any;
  subscriber_id?: any;
  tax?: any;
  title?: any;
  updated_at?: any;
  updated_by_user_id?: any;
}

export interface CuriaSecretariatAttachment {
  attachment: string;
  attachment_name: string;
  created_at: string;
  curia_secretariat_id: number;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload?: any;
}

export interface CuriaSecretariatEntity {
  created_at: string;
  curia_function_description: string;
  curia_function_id: number;
  curia_secretariat_id: number;
  description: any;
  entity_description: string;
  entity_id: number;
  id: number;
  place_description: string;
  place_id: number;
  updated_at: string;
  _destroy: boolean;
}
