import { PastoralAgentType } from '../pastoral-agents/pastoral-agents.model';

export interface MECResponse {
  results: EntityMec[];
  total: number;
  page: number;
  limit: number;
}

export interface EntityPerson {
  id: number;
  entity_id: number;
  entity_spouse_id: number;
  entity_wedding_location_id: number;
  entity_father_id: number;
  entity_mother_id: number;
  sex: boolean;
  deceased: boolean;
  title: string;
  birth_date: string;
  ident_document_type: string;
  ident_document_number: string;
  ident_document_emission_date: string;
  qualifications: string;
  maritial_status: string;
  wedding_date: string;
  professional_company: string;
  professional_post: string;
  professional_phone: string;
  professional_fax: string;
  professional_email: string;
  christian_baptized: boolean;
  christian_baptized_date: string;
  christian_baptized_number: string;
  christian_baptized_sheet: string;
  christian_first_communion: boolean;
  christian_first_communion_date: string;
  christian_first_communion_number: string;
  christian_first_communion_sheet: string;
  christian_solemn_communion: boolean;
  christian_solemn_communion_date: string;
  christian_chrism: boolean;
  christian_chrism_date: string;
  christian_chrism_number: string;
  christian_chrism_sheet: string;
  christian_attended_catechism: boolean;
  christian_often_eucharist: string;
  comments: string;
  is_parishioner: boolean;
  professional_url: string;
  professional_profession_id: number;
  professional_country_id: number;
  professional_district: string;
  professional_county: string;
  professional_postal_code: string;
  professional_door_number: string;
  professional_parish: string;
  christian_baptized_district: string;
  christian_baptized_county: string;
  professional_address: string;
  christian_first_communion_district: string;
  christian_first_communion_county: string;
  christian_solemn_communion_district: string;
  christian_solemn_communion_county: string;
  christian_chrism_district: string;
  christian_chrism_county: string;
  christian_attended_catechism_district: string;
  christian_attended_catechism_county: string;
  entity_birth_place_id: number;
  professional_mobilephone: string;
  christian_chrism_worshipplace_id: number;
  christian_baptized_worshipplace_id: number;
  christian_first_communion_worshipplace_id: number;
  christian_solemn_communion_worshipplace_id: number;
  christian_attended_catechism_worshipplace_id: number;
  birth_place_county: string;
  birth_place_parish: string;
  is_catechized: boolean;
  entity_christian_first_communion_by_id: number;
  christian_solemn_communion_by_id: number;
  outside_chapelry_id: number;
  time_of_birth: string;
  professional_locality: string;
  ident_document_validity_date: string;
  ident_document_emitted_by: string;
  is_adopted: boolean;
  previous_address: string;
  suitability_request: number;
  entity_wedding_location_description: string;
  christian_baptized_worshipplace_description: string;
  christian_first_communion_worshipplace_description: string;
  christian_solemn_communion_worshipplace_description: string;
  christian_chrism_worshipplace_description: string;
  christian_attended_catechism_worshipplace_description: string;
  outside_chapelry_description: string;
  entity_father_description: string;
  entity_mother_description: string;
  entity_spouse_description: string;
  baptized_chrismed_description: string;
  professional_profession_description: string;
  serie_number: string;
  christian_first_confession: boolean;
  christian_first_confession_date: string;
  christian_first_confession_worshipplace_id: number;
  christian_first_confession_worshipplace_description: string;
  attended_catechism_party_1: boolean;
  catechism_party_1_name: string;
  catechism_party_1_date: string;
  attended_catechism_year_1: boolean;
  catechism_inscription_date_1: string;
  catechism_attendance_1: number;
  catechism_failures_1: number;
  attended_catechism_party_2: boolean;
  catechism_party_2_name: string;
  catechism_party_2_date: string;
  attended_catechism_year_2: boolean;
  catechism_inscription_date_2: string;
  catechism_attendance_2: number;
  catechism_failures_2: number;
  attended_catechism_party_3: boolean;
  catechism_party_3_name: string;
  catechism_party_3_date: string;
  attended_catechism_year_3: boolean;
  catechism_inscription_date_3: string;
  catechism_attendance_3: number;
  catechism_failures_3: number;
  attended_catechism_party_4: boolean;
  catechism_party_4_name: string;
  catechism_party_4_date: string;
  attended_catechism_year_4: boolean;
  catechism_inscription_date_4: string;
  catechism_attendance_4: number;
  catechism_failures_4: number;
  attended_catechism_party_5: boolean;
  catechism_party_5_name: string;
  catechism_party_5_date: string;
  attended_catechism_year_5: boolean;
  catechism_inscription_date_5: string;
  catechism_attendance_5: number;
  catechism_failures_5: number;
  catechism_party_6_name: string;
  attended_catechism_year_6: boolean;
  catechism_inscription_date_6: string;
  catechism_attendance_6: number;
  catechism_failures_6: number;
  attended_catechism_party_7: boolean;
  catechism_party_7_name: string;
  catechism_party_7_date: string;
  attended_catechism_year_7: boolean;
  catechism_inscription_date_7: string;
  catechism_attendance_7: number;
  catechism_failures_7: number;
  attended_catechism_party_8: boolean;
  catechism_party_8_name: string;
  catechism_party_8_date: string;
  attended_catechism_year_8: boolean;
  catechism_inscription_date_8: string;
  catechism_attendance_8: number;
  catechism_failures_8: number;
  attended_catechism_party_9: boolean;
  catechism_party_9_name: string;
  catechism_party_9_date: string;
  attended_catechism_year_9: boolean;
  catechism_inscription_date_9: string;
  catechism_attendance_9: number;
  catechism_failures_9: number;
  attended_catechism_party_10: boolean;
  catechism_party_10_name: string;
  catechism_party_10_date: string;
  attended_catechism_year_10: boolean;
  catechism_inscription_date_10: string;
  catechism_attendance_10: number;
  catechism_failures_10: number;
  catechism_1_obs: string;
  catechism_2_obs: string;
  catechism_3_obs: string;
  catechism_4_obs: string;
  catechism_5_obs: string;
  catechism_6_obs: string;
  catechism_7_obs: string;
  catechism_8_obs: string;
  catechism_9_obs: string;
  catechism_10_obs: string;
  catechism_last_year: number;
  lives_with: string;
  lives_with_text: string;
  catechized_has_brothers_info: string;
  catechized_has_catechized_brothers: string;
  qualifications_id: number;
  entity_birth_place_description: string;
  professional_country_description: string;
}

export interface EntityAcolyte {
  id: number;
  entity_id: number;
  institution_date: string;
  mec: boolean;
  created_at: Date;
  updated_at: Date;
  is_acolyte: true;
  acolyte_number: null;
  institution_center_worshipplace_id: number;
  institution_center_worshipplace_description: string;
  magnetic_number: string;
  is_coordinator: boolean;
  congregation: string;
  formation_courses: string;
  ecclesial_formation_biblical_courses: boolean;
  ecclesial_formation_theological_pastorails_courses: boolean;
  ecclesial_formation_other: boolean;
  ecclesial_activities_acolyte: boolean;
  ecclesial_activities_mec: false;
  ecclesial_activities_singer: boolean;
  ecclesial_activities_reader: boolean;
  ecclesial_activities_caretaker: boolean;
  ecclesial_activities_association_of_faithful_direction_member: boolean;
  ecclesial_activities_economic_council_member: boolean;
  ecclesial_activities_other: boolean;
  ecclesial_formation_other_description: string;
  ecclesial_activities_other_description: string;
  entity: Entity;
  entities_acolytes_lines: AcolyteLine[];
  entities_acolytes_formations: AcolyteFormation[];
}


export interface EntityReader {
  id: number;
  entity_id: number;
  institution_date: string;
  is_reader: boolean;
  created_at: Date;
  updated_at: Date;
  reader_number: string;
  institution_center_worshipplace_id: number;
  institution_center_worshipplace_description: string;
  magnetic_number: string;
  is_coordinator: boolean;
  congregation: string;
  formation_courses: string;
  ecclesial_formation_biblical_courses: boolean;
  ecclesial_formation_theological_pastorails_courses: boolean;
  ecclesial_formation_other: boolean;
  ecclesial_activities_mec: boolean;
  ecclesial_activities_singer: boolean;
  ecclesial_activities_acolyte: boolean;
  ecclesial_activities_caretaker: boolean;
  ecclesial_activities_association_of_faithful_direction_member: boolean;
  ecclesial_activities_economic_council_member: boolean;
  ecclesial_activities_other: boolean;
  ecclesial_formation_other_description: string;
  ecclesial_activities_other_description: string;
  entity: Entity;
  entities_readers_lines: ReaderLine[];
  entities_readers_formations: ReaderFormation[];
}

export interface EntityCatechist {
  id: number;
  entity_id: number;
  initiation_course_avaliation: string;
  initiation_course_date: string;
  general_course_date: string;
  general_course_avaliation: string;
  complementary_course_date: string;
  complementary_course_avaliation: string;
  catechist: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface EntityElderPatient {
  id: number;
  entity_id: number;
  sunday_communion: boolean;
  sunday_communion_minister_id: number;
  anointing_ofthe_sick_date: string;
  anointing_ofthe_sick_locale: string;
  sick: boolean;
  elder: boolean;
  created_at: Date;
  updated_at: Date;
  sunday_communion_minister_description: string;
}

export interface EntityPastoralAgent {
  id: number;
  entity_id: number;
  active: boolean;
  approved: boolean;
  signature: string;
  dac_type_id: number;
  dac_date: string;
  dac_chapelry_id: number;
  dac_is_parochial_coordinator: boolean;
  dac_is_phase_coordinator: boolean;
  dac_is_year_coordinator: boolean;
  dac_is_card_emitted: boolean;
  dac_childhood: boolean;
  dac_adolescence: boolean;
  dac_youth: boolean;
  dac_adults: boolean;
  dapj_type_id: number;
  dapj_date: string;
  dapj_chapelry_id: number;
  dapj_is_parochial_coordinator: boolean;
  dapj_is_card_emitted: boolean;
  eca_type_id: number;
  eca_date: string;
  eca_chapelry_id: number;
  eca_is_parochial_coordinator: boolean;
  eca_is_phase_coordinator: boolean;
  eca_is_year_coordinator: boolean;
  eca_is_trainer: boolean;
  eca_is_card_emitted: boolean;
  emrc_type_id: number;
  emrc_chapelry_id: number;
  emrc_is_parochial_coordinator: boolean;
  emrc_is_card_emitted: boolean;
  emrc_work_schools: string;
  ec_type_id: number;
  ec_chapelry_id: number;
  ec_is_parochial_coordinator: boolean;
  ec_is_card_emitted: boolean;
  ec_work_schools: string;
  pu_type_id: number;
  pu_comments: string;
  ddbp_comments: string;
  created_at: Date;
  updated_at: Date;
  pastoral_agent_number: string;
  magnetic_number: string;
  dac_chapelry_description: string;
  dapj_chapelry_description: string;
  eca_chapelry_description: string;
  emrc_chapelry_description: string;
  ec_chapelry_description: string;
  entity: Entity;
  pastoral_agents_departments: PastoralAgentDepartment[];
  pastoral_agents_formations: PastoralAgentFormation[];
}


export interface Entity {
  id: number;
  entity_type_id: number;
  name: string;
  address: string;
  phone: string;
  fax: string;
  mobilephone: string;
  email: string;
  url: string;
  disabled: boolean;
  taxpayer: string;
  civil_status: string;
  created_at: Date;
  updated_at: Date;
  can_sign_documents: boolean;
  entity_ekklesia_location_id: number;
  country_id: number;
  district: string;
  county: string;
  postal_code: string;
  door_number: string;
  parish: string;
  place: string;
  deleted: boolean;
  block_remove: boolean;
  sync_at: Date;
  inserted_by_user: number;
  validated: boolean;
  complete_relation: string;
  emoluments_imported: boolean;
  mass_intention_types_imported: boolean;
  sync_id: number;
  paroquia_sw_id: number;
  newsletter_subscriptor: boolean;
  created_by_user_id: number;
  updated_by_user_id: number;
  deleted_by_user_id: number;
  residence_chapelry_id: number;
  residence_chapelry_description: string;
  longitude: string;
  latitude: string;
  photo_url: string;
  photo_filename: string;
  patron_id: number;
  patron_description: string;
  is_demo: boolean;
  reports_group_id: number;
  reports_group_description: string;
  is_archdiocese: boolean;
  entity_birth_chapelry_id: number;
  entity_birth_chapelry_description: string;
  payment_types_imported: boolean;
  entity_birth_chapelry_free_text: string;
  tax_designation: string;
  attachment: string;
  attachment_filename: string;
  import_origin: string;
  touched_in_current_importation: boolean;
  is_public_profile: boolean;
  civil_status_id: number;
  country_description: string;
  entity_person: EntityPerson;
  entity_acolyte: EntityAcolyte;
  entity_reader: EntityReader;
  entity_catechist: EntityCatechist;
  entity_elder_patient: EntityElderPatient;
  entity_pastoral_agent: EntityPastoralAgent;
}

export interface AcolyteLine {
  id?: number;
  entity_acolyte_id?: number;
  renewal_date: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AcolyteFormation {
  entity_acolyte_id?: number;
  formation_id: number;
  formation_date: string;
  deleted?: boolean;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  deleted_by_user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  formation_description: string;
}
export interface MecLine {
  id?: number;
  entity_mec_id?: number;
  renewal_date: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MecFormation {
  entity_mec_id?: number;
  formation_id: number;
  formation_date: string;
  deleted?: boolean;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  deleted_by_user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  formation_description: string;
}
export interface ReaderLine {
  id?: number;
  entity_reader_id?: number;
  renewal_date: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ReaderFormation {
  entity_reader_id?: number;
  formation_id: number;
  formation_date: string;
  deleted?: boolean;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  deleted_by_user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  formation_description: string;
}
export interface PastoralAgentDepartment {
  id?: number;
  entity_pastoral_agent_id?: number;
  pastoral_agents_type_id?: number;
  pastoral_agents_type: PastoralAgentType;
}

export interface PastoralAgentFormation {
  id?: number;
  entity_pastoral_agent_id?: number;
  agent_type: string;
  formation: PastoralAgentFormationFormation;
}


export interface PastoralAgentFormationFormation {
  id: number;
  description: string;
  formations_type_id: number;
  formations_type_description: string;
}


export interface EntityMec {
  id: number;
  entity_id: number;
  institution_date: string;
  mec: boolean;
  created_at: Date;
  updated_at: Date;
  mec_number: string;
  institution_center_worshipplace_id: number;
  institution_center_worshipplace_description: string;
  magnetic_number: string;
  is_coordinator: boolean;
  congregation: string;
  formation_courses: string;
  ecclesial_formation_biblical_courses: boolean;
  ecclesial_formation_theological_pastorails_courses: boolean;
  ecclesial_formation_other: boolean;
  ecclesial_activities_acolyte: boolean;
  ecclesial_activities_singer: boolean;
  ecclesial_activities_reader: boolean;
  ecclesial_activities_caretaker: boolean;
  ecclesial_activities_association_of_faithful_direction_member: boolean;
  ecclesial_activities_economic_council_member: boolean;
  ecclesial_activities_other: boolean;
  ecclesial_formation_other_description: string;
  ecclesial_activities_other_description: string;
  entity: Entity;
  entities_mecs_lines: MecLine[];
  entities_mecs_formations: MecFormation[];
}



