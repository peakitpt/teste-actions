export interface CuriaEconomicCouncilResponse {
  results: CuriaEconomicCouncil[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaEconomicCouncil {
  active?: boolean;
  applicant_entity_description?: string;
  applicant_entity_id?: number;
  applicant_function_description?: string;
  applicant_function_id?: number;
  archpriest_description?: string;
  archpriest_entity_priest_id?: number;
  archpriest_id?: number;
  chapelry_description?: string;
  chapelry_id?: number;
  created_at?: string;
  created_by_user_id?: number;
  curia_economic_council_appointments?: CuriaEconomicCouncilAppointment[];
  curia_economic_council_attachments?: CuriaEconomicCouncilAttachment[];
  deleted?: boolean;
  deleted_by_user_id?: any;
  document_date?: any;
  document_entity_description?: string;
  document_entity_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_ekklesia_location_id?: number;
  expiration_date?: string;
  free_text?: any;
  id?: number;
  is_free_text?: boolean;
  president_description?: string;
  president_id?: number;
  receipt_id?: number;
  serie_number?: string;
  subscriber1_description?: string;
  subscriber1_id?: number;
  subscriber2_description?: string;
  subscriber2_id?: number;
  tax?: string;
  updated_at?: string;
  updated_by_user_id?: number;
  vice_president_description?: any;
  vice_president_id?: any;
}

export interface CuriaEconomicCouncilAttachment {
  attachment: string;
  attachment_name: string;
  created_at: string;
  curia_economic_council_id: number;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload?: any;
}

export interface CuriaEconomicCouncilAppointment {
  created_at: string;
  curia_economic_council_id: number;
  curia_function_description: string;
  curia_function_id: number;
  entity_description: string;
  entity_id: number;
  id: number;
  updated_at: string;
  _destroy: boolean;
}
