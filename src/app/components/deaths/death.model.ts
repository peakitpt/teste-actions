export interface DeathResponse {
  results: Death[];
  total: number;
  page: number;
  limit: number;
}

export interface Death {
  block_remove?: boolean;
  bury_chapelry_description?: string;
  bury_chapelry_id?: number;
  civil_status_on_death?: string;
  created_at?: string;
  created_by_user_id?: number;
  death_chapelry_description?: string;
  death_chapelry_id?: number;
  death_date?: string;
  death_hour?: string;
  death_year?: number;
  declaration_relative_kinship?: string;
  declaration_relative_presence?: string;
  deleted?: boolean;
  deleted_by_user_id?: number;
  document_entity_description?: string;
  document_entity_id?: number;
  document_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_bury_cemitery?: string;
  entity_bury_date?: string;
  entity_death_bury_process_id?: number;
  entity_death_county?: string;
  entity_death_locality?: string;
  entity_death_place?: string;
  entity_description?: string;
  entity_ekklesia_location_id?: number;
  entity_id?: number;
  id?: number;
  import_origin?: string;
  observations?: string;
  paroquia_sw_id?: string;
  sacraments?: string;
  seat_number?: string;
  serie_number?: string;
  sheet?: string;
  tax?: number;
  touched_in_current_importation?: boolean;
  updated_at?: string;
  updated_by_user_id?: number;
  entity__name?: string;
  entity?: Entity;
}

export interface Entity {
  entity_person?: EntityPerson;
}

export interface EntityPerson {
  id?: number;
}
