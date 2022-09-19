export interface ChrismResponse {
  results: Chrism[];
  total: number;
  page: number;
  limit: number;
}

export interface Chrism {
  created_at?: string;
  created_by_user_id?: number;
  date?: string;
  deleted?: boolean;
  deleted_by_user_id?: null;
  entity_chrism_location_description?: string;
  entity_chrism_location_id?: number;
  entity_ekklesia_location_id?: number;
  entity_rel_mec_description?: string;
  entity_rel_mec_id?: number;
  id?: number;
  seat_number?: string;
  serie_number?: string;
  updated_at?: string;
  updated_by_user_id?: number;
  year?: number;
  chrisms_entities_attributes?: ChrismEntity[];
}

export interface ChrismEntity {
  chrism_id?: number;
  created_at?: string;
  document_entity_description?: string;
  document_entity_id?: number;
  document_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_description?: string;
  entity_id?: number;
  godfather_godmother_description?: string;
  godfather_godmother_id?: number;
  id?: number;
  tax?: number;
  updated_at?: string;
  chrism?: Chrism;
  entity?: Entity;
}

interface Entity {
  entity_person?: EntityPerson;
}

interface EntityPerson {
  id?: number;
}
