export interface CatechismResponse {
  results: Catechism[];
  total: number;
  page: number;
  limit: number;
}

export interface CatechismSessionResponse {
  results: CatechismSession[];
  total: number;
  page: number;
  limit: number;
}

export interface CatechismIndividualDocumentResponse {
  results: CatechismIndividualDocument[];
  total: number;
  page: number;
  limit: number;
}

export interface Catechism {
  catechists_names_for_search?: string;
  class_year?: string;
  finalized?: boolean;
  id?: number;
  is_for_adults?: boolean;
  name?: string;
  start_time?: string;
  end_time?: string;
  week_day?: number;
  year?: number;
  passing_year_created?: boolean;
  catechisms_catechists_attributes?: CatechismCatechist[];
  catechisms_students_attributes?: CatechismStudent[];
  catechisms_transfers_attributes?: CatechismTransfer[];
  catechisms_sessions_attributes?: CatechismSession[];
  catechisms_individual_documents_attributes?: CatechismIndividualDocument[];
}

export interface CatechismCatechist {
  catechism_id?: number;
  entity_description?: string;
  entity_id?: number;
  id?: number;
}

export interface CatechismStudent {
  catechism_id?: number;
  created_at?: string;
  deleted?: boolean;
  education_sponsor_description?: string;
  education_sponsor_id?: number;
  entity_description?: string;
  entity_id?: number;
  id?: number;
  inscription_date?: string;
  observations?: string;
  transferred?: boolean;
  updated_at?: string;
}

export interface CatechismTransfer {
  catechism_id?: number;
  chapelry_description?: string;
  chapelry_id?: number;
  entity_description?: string;
  entity_id?: number;
  id?: number;
  next_class_year_inscription: boolean;
  report_url?: string;
  transfer_date?: string;
  transited: boolean;
}

export interface CatechismSession {
  catechism_id?: number;
  catechisms_sessions_presences_attributes?: CatechismSessionPresence[];
  created_at?: string;
  created_by_user_id?: number;
  date?: string;
  deleted?: boolean;
  deleted_by_user_id?: number;
  id?: number;
  observations?: string;
  presences?: number;
  summary?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}

export interface CatechismIndividualDocument {
  catechism_id?: number;
  catechisms_student_id?: number;
  doc_attendance_sheet_url?: string;
  doc_historic_url?: string;
  doc_inscription_url?: string;
  doc_transfer_url?: string;
  entity_description?: string;
  entity_id?: number;
  id?: number;
}

export interface CatechismSessionPresence {
  catechisms_session_id?: number;
  entity?: Entity;
  entity_id?: number;
  entity_description?: string;
  id?: number;
  present?: boolean;
}

interface Entity {
  entity_person?: EntityPerson;
}

interface EntityPerson {
  id?: number;
}
