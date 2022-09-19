import { CuriaAdministrativeProcessType } from '../curia-administrative-process-types/curia-administrative-process-type.model';

export interface CuriaAdministrativeProcessResponse {
  results: CuriaAdministrativeProcess[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaAdministrativeProcess {
  archive?: string;
  created_at?: string;
  created_by_user_id?: number;
  curia_administrative_process_attachments?: CuriaAdministrativeProcessAttachment[];
  curia_administrative_process_type?: CuriaAdministrativeProcessType;
  curia_administrative_process_type_description?: string;
  curia_administrative_process_type_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: any;
  delivery_term?: string;
  dispatch?: string;
  document_date?: string;
  document_entity_description?: string;
  document_entity_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_description?: string;
  entity_ekklesia_location_id?: number;
  entity_id?: number;
  free_description?: any;
  free_text?: any;
  free_text_title?: any;
  id?: number;
  is_free_text?: boolean;
  party_provision_bands_of?: any;
  party_provision_chapelry_description?: any;
  party_provision_chapelry_id?: any;
  party_provision_dates?: any;
  party_provision_party_name?: any;
  party_provision_place?: any;
  party_provision_preacher_description?: any;
  party_provision_preacher_entity_priest_id?: any;
  party_provision_preacher_id?: any;
  party_provision_schedule?: any;
  party_provision_subscriber_description?: any;
  party_provision_subscriber_entity_priest_id?: any;
  party_provision_subscriber_id?: any;
  place_description?: string;
  place_id?: number;
  receipt_id?: number;
  serie_number?: string;
  subscriber_description?: any;
  subscriber_entity_priest_id?: any;
  subscriber_id?: any;
  tax?: string;
  title?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}

export interface CuriaAdministrativeProcessAttachment {
  attachment: string;
  attachment_name: string;
  created_at: string;
  curia_administrative_process_id: number;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload?: any;
}
