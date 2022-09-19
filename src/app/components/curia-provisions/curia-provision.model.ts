export interface CuriaProvisionResponse {
  results: CuriaProvision[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaProvision {
  active?: boolean;
  applicant_chapelry_description?: any;
  applicant_chapelry_id?: any;
  applicant_entity_description?: any;
  applicant_entity_id?: any;
  applicant_function_description?: any;
  applicant_function_id?: any;
  archpriest_description?: any;
  archpriest_entity_priest_id?: any;
  archpriest_id?: any;
  created_at?: string;
  created_by_user_id?: number;
  curia_provision_members?: CuriaProvisionMember[];
  curia_provision_attachments?: CuriaProvisionAttachment[];
  deleted?: false;
  deleted_by_user_id?: any;
  document_date?: string;
  document_entity_description?: string;
  document_entity_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_ekklesia_location_id?: number;
  expiration_date?: string;
  id?: number;
  observations?: any;
  place_description?: string;
  place_id?: number;
  provision_type_description?: string;
  provision_type_id?: number;
  receipt_id?: number;
  serie_number?: string;
  subscriber1_description?: string;
  subscriber1_entity_priest_id?: number;
  subscriber1_id?: number;
  subscriber2_description?: string;
  subscriber2_entity_priest_id?: number;
  subscriber2_id?: number;
  tax?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}

export interface CuriaProvisionAttachment {
  attachment: string;
  attachment_name: string;
  created_at: string;
  curia_provision_id: number;
  description: string;
  id: number;
  updated_at: string;
  file_to_upload?: any;
}

export interface CuriaProvisionMember {
  created_at: string;
  curia_provision_id: number;
  function_description: string;
  function_id: number;
  id: number;
  member_description: string;
  member_id: number;
  updated_at: string;
  _destroy: boolean;
}
