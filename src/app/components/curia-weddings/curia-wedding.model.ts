import { Emolument } from 'src/app/shared/components/modals/emoluments-modal/emoluments-modal.model';

export interface CuriaWeddingResponse {
  results: CuriaWedding[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaWedding {
  blocked: boolean;
  canonical_process_absences: boolean;
  canonical_process_absences_text: any;
  canonical_process_comments: string;
  canonical_process_data_mod_1: any;
  canonical_process_end_date: any;
  canonical_process_oratory: any;
  canonical_process_start_date: any;
  children_common: boolean;
  civil_registration_address: any;
  civil_registration_certificates: string;
  civil_registration_convention: boolean;
  civil_registration_convention_text: any;
  civil_registration_date: any;
  civil_registration_name: any;
  civil_registration_number: any;
  conservatory_endorsement_date: any;
  created_at: string;
  created_by_user_id: number;
  curia_status: string;
  curia_status_date: string;
  curia_weddings_attachments: CuriaWeddingsAttachment[];
  date: string;
  deleted: boolean;
  deleted_by_user_id: any;
  document_date: string;
  document_entity_description: string;
  document_entity_id: number;
  document_observations: string;
  emolument: Emolument;
  emolument_description: string;
  emolument_id: number;
  entity_bride: EntityGroomBride;
  entity_bride_description: string;
  entity_bride_id: number;
  entity_bride_nick: any;
  entity_ekklesia_location_id: number;
  entity_groom: EntityGroomBride;
  entity_groom_description: string;
  entity_groom_id: number;
  entity_groom_nick: any;
  entity_location: Entity;
  entity_location_county: string;
  entity_location_description: string;
  entity_location_id: number;
  id: number;
  mass: boolean;
  mod2_chapelry_description: any;
  mod2_chapelry_id: any;
  no_proclamations_exemption: boolean;
  not_children_common: boolean;
  opt_mod1_extra_option1: any;
  opt_mod1_extra_option2: any;
  opt_mod1_opt1: boolean;
  opt_mod1_opt1_text: any;
  opt_mod1_opt2: boolean;
  opt_mod1_opt2_text: any;
  opt_mod1_opt3: boolean;
  opt_mod1_opt3_text: any;
  opt_mod1_opt4: boolean;
  opt_mod1_opt4_text: any;
  opt_mod1_opt5: boolean;
  opt_mod1_opt5_text: any;
  opt_mod1_opt6: boolean;
  opt_mod1_opt6_date: any;
  opt_mod1_opt6_number: any;
  opt_mod1_opt6_text: any;
  opt_mod2_groom_bride: any;
  opt_mod2_opt1: boolean;
  opt_mod2_opt2: boolean;
  opt_mod2_opt3: boolean;
  opt_mod2_opt3_text: any;
  opt_mod2_opt4: boolean;
  opt_mod2_opt4_input: any;
  opt_mod2_opt5: boolean;
  opt_mod2_opt5_text: any;
  opt_mod2_opt6: boolean;
  opt_mod2_opt6_text: any;
  opt_mod2_opt6_text2: any;
  opt_mod2_opt7: boolean;
  opt_mod2_opt7_text: any;
  opt_mod2_opt7_text2: any;
  opt_mod2_opt8: boolean;
  opt_mod2_opt8_text: any;
  opt_mod2_opt8_text2: any;
  process_id: any;
  property_regime: any;
  receipt: any;
  receipt_id: number;
  seat_duplicate_attestation_number: any;
  seat_duplicate_baptism_endorsement_date: any;
  seat_duplicate_comments_edge_seat: any;
  seat_duplicate_officiating_description: any;
  seat_duplicate_officiating_id: any;
  seat_duplicate_present: any;
  seat_duplicate_special_mentions: any;
  seat_duplicate_will_be_signed: any;
  seat_duplicate_witnesses_identification_groom1?: any;
  seat_duplicate_witnesses_identification_groom2?: any;
  seat_duplicate_witnesses_identification_bride1?: any;
  seat_duplicate_witnesses_identification_bride2?: any;
  seat_duplicate_witnesses_identification_bride1_description: any;
  seat_duplicate_witnesses_identification_bride1_id: any;
  seat_duplicate_witnesses_identification_bride2_description: any;
  seat_duplicate_witnesses_identification_bride2_id: any;
  seat_duplicate_witnesses_identification_groom1_description: any;
  seat_duplicate_witnesses_identification_groom1_id: any;
  seat_duplicate_witnesses_identification_groom2_description: any;
  seat_duplicate_witnesses_identification_groom2_id: any;
  seat_number: any;
  serie_number: string;
  sheet: any;
  tax: string;
  updated_at: string;
  updated_by_user_id: any;
  wedding_date: any;
  wedding_hour: any;
  wedding_parson_description: any;
}

interface Entity {
  address?: string;
  attachment?: string;
  attachment_filename?: string;
  block_remove?: boolean;
  can_sign_documents?: boolean;
  civil_status?: string;
  civil_status_id?: number;
  complete_relation?: string;
  country_description?: string;
  country_id?: number;
  county?: string;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  disabled?: boolean;
  district?: string;
  door_number?: string;
  email?: string;
  emoluments_imported?: boolean;
  entity_birth_chapelry_description?: string;
  entity_birth_chapelry_free_text?: string;
  entity_birth_chapelry_id?: number;
  entity_ekklesia_location_id?: number;
  entity_type_id?: number;
  fax?: string;
  id?: number;
  import_origin?: string;
  inserted_by_user?: boolean;
  is_archdiocese?: boolean;
  is_demo?: boolean;
  is_public_profile?: boolean;
  latitude?: string;
  longitude?: string;
  mass_intention_types_imported?: boolean;
  mobilephone?: string;
  name?: string;
  newsletter_subscriptor?: boolean;
  parish?: string;
  paroquia_sw_id?: number;
  patron_description?: string;
  patron_id?: number;
  payment_types_imported?: boolean;
  phone?: string;
  photo_filename?: string;
  photo_url?: string;
  place?: string;
  postal_code?: string;
  reports_group_description?: string;
  reports_group_id?: number;
  residence_chapelry_description?: string;
  residence_chapelry_id?: number;
  sync_at?: string;
  sync_id?: number;
  tax_designation?: string;
  taxpayer?: string;
  touched_in_current_importation?: boolean;
  updated_at?: string;
  updated_by_user_id?: number;
  url?: string;
  validated?: boolean;
  entity_person?: EntityPerson;
}

interface EntityPerson {
  attended_catechism_party_1?: boolean;
  attended_catechism_party_10?: boolean;
  attended_catechism_party_2?: boolean;
  attended_catechism_party_3?: boolean;
  attended_catechism_party_4?: boolean;
  attended_catechism_party_5?: boolean;
  attended_catechism_party_7?: boolean;
  attended_catechism_party_8?: boolean;
  attended_catechism_party_9?: boolean;
  attended_catechism_year_1?: boolean;
  attended_catechism_year_10?: boolean;
  attended_catechism_year_2?: boolean;
  attended_catechism_year_3?: boolean;
  attended_catechism_year_4?: boolean;
  attended_catechism_year_5?: boolean;
  attended_catechism_year_6?: boolean;
  attended_catechism_year_7?: boolean;
  attended_catechism_year_8?: boolean;
  attended_catechism_year_9?: boolean;
  baptized_chrismed_description?: string;
  birth_date?: string;
  birth_place_county?: string;
  birth_place_parish?: string;
  catechism_10_obs?: string;
  catechism_1_obs?: string;
  catechism_2_obs?: string;
  catechism_3_obs?: string;
  catechism_4_obs?: string;
  catechism_5_obs?: string;
  catechism_6_obs?: string;
  catechism_7_obs?: string;
  catechism_8_obs?: string;
  catechism_9_obs?: string;
  catechism_attendance_1?: number;
  catechism_attendance_10?: number;
  catechism_attendance_2?: number;
  catechism_attendance_3?: number;
  catechism_attendance_4?: number;
  catechism_attendance_5?: number;
  catechism_attendance_6?: number;
  catechism_attendance_7?: number;
  catechism_attendance_8?: number;
  catechism_attendance_9?: number;
  catechism_failures_1?: number;
  catechism_failures_10?: number;
  catechism_failures_2?: number;
  catechism_failures_3?: number;
  catechism_failures_4?: number;
  catechism_failures_5?: number;
  catechism_failures_6?: number;
  catechism_failures_7?: number;
  catechism_failures_8?: number;
  catechism_failures_9?: number;
  catechism_inscription_date_1?: string;
  catechism_inscription_date_10?: string;
  catechism_inscription_date_2?: string;
  catechism_inscription_date_3?: string;
  catechism_inscription_date_4?: string;
  catechism_inscription_date_5?: string;
  catechism_inscription_date_6?: string;
  catechism_inscription_date_7?: string;
  catechism_inscription_date_8?: string;
  catechism_inscription_date_9?: string;
  catechism_last_year?: number;
  catechism_party_10_date?: string;
  catechism_party_10_name?: string;
  catechism_party_1_date?: string;
  catechism_party_1_name?: string;
  catechism_party_2_date?: string;
  catechism_party_2_name?: string;
  catechism_party_3_date?: string;
  catechism_party_3_name?: string;
  catechism_party_4_date?: string;
  catechism_party_4_name?: string;
  catechism_party_5_date?: string;
  catechism_party_5_name?: string;
  catechism_party_6_name?: string;
  catechism_party_7_date?: string;
  catechism_party_7_name?: string;
  catechism_party_8_date?: string;
  catechism_party_8_name?: string;
  catechism_party_9_date?: string;
  catechism_party_9_name?: string;
  catechized_has_brothers_info?: string;
  catechized_has_catechized_brothers?: string;
  christian_attended_catechism?: boolean;
  christian_attended_catechism_county?: string;
  christian_attended_catechism_district?: string;
  christian_attended_catechism_worshipplace_description?: string;
  christian_attended_catechism_worshipplace_id?: number;
  christian_baptized?: boolean;
  christian_baptized_county?: string;
  christian_baptized_date?: string;
  christian_baptized_district?: string;
  christian_baptized_number?: string;
  christian_baptized_sheet?: string;
  christian_baptized_worshipplace_description?: string;
  christian_baptized_worshipplace_id?: number;
  christian_chrism?: boolean;
  christian_chrism_county?: string;
  christian_chrism_date?: string;
  christian_chrism_district?: string;
  christian_chrism_number?: string;
  christian_chrism_sheet?: string;
  christian_chrism_worshipplace_description?: string;
  christian_chrism_worshipplace_id?: number;
  christian_first_communion?: boolean;
  christian_first_communion_county?: string;
  christian_first_communion_date?: string;
  christian_first_communion_district?: string;
  christian_first_communion_number?: string;
  christian_first_communion_sheet?: string;
  christian_first_communion_worshipplace_description?: string;
  christian_first_communion_worshipplace_id?: number;
  christian_first_confession?: boolean;
  christian_first_confession_date?: string;
  christian_first_confession_worshipplace_description?: string;
  christian_first_confession_worshipplace_id?: number;
  christian_often_eucharist?: string;
  christian_solemn_communion?: boolean;
  christian_solemn_communion_by_id?: number;
  christian_solemn_communion_county?: string;
  christian_solemn_communion_date?: string;
  christian_solemn_communion_district?: string;
  christian_solemn_communion_worshipplace_description?: string;
  christian_solemn_communion_worshipplace_id?: number;
  comments?: string;
  deceased?: boolean;
  entity_birth_place_description?: string;
  entity_birth_place_id?: number;
  entity_christian_first_communion_by_id?: number;
  entity_father_description?: string;
  entity_father_id?: number;
  entity_id?: number;
  entity_mother_description?: string;
  entity_mother_id?: number;
  entity_spouse_description?: string;
  entity_spouse_id?: number;
  entity_wedding_location_description?: string;
  entity_wedding_location_id?: number;
  id?: number;
  ident_document_emission_date?: string;
  ident_document_emitted_by?: string;
  ident_document_number?: string;
  ident_document_type?: string;
  ident_document_validity_date?: string;
  is_adopted?: boolean;
  is_catechized?: boolean;
  is_parishioner?: boolean;
  lives_with?: string;
  lives_with_text?: string;
  maritial_status?: string;
  outside_chapelry_description?: string;
  outside_chapelry_id?: number;
  previous_address?: string;
  professional_address?: string;
  professional_company?: string;
  professional_country_description?: string;
  professional_country_id?: number;
  professional_county?: string;
  professional_district?: string;
  professional_door_number?: string;
  professional_email?: string;
  professional_fax?: string;
  professional_locality?: string;
  professional_mobilephone?: string;
  professional_parish?: string;
  professional_phone?: string;
  professional_post?: string;
  professional_postal_code?: string;
  professional_profession_description?: string;
  professional_profession_id?: number;
  professional_url?: string;
  qualifications?: string;
  qualifications_id?: number;
  serie_number?: string;
  sex?: boolean;
  suitability_request?: number;
  time_of_birth?: string;
  title?: string;
  wedding_date?: string;
  entity_father?: Entity;
  entity_mother?: Entity;
}

interface EntityGroomBride {
  address: string;
  attachment: any;
  attachment_filename: any;
  block_remove: boolean;
  can_sign_documents: boolean;
  civil_status: string;
  civil_status_id: number;
  complete_relation: string;
  country_description: string;
  country_id: number;
  county: string;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: any;
  disabled: boolean;
  district: string;
  door_number: string;
  email: string;
  emoluments_imported: boolean;
  entity_birth_chapelry_description: string;
  entity_birth_chapelry_free_text: any;
  entity_birth_chapelry_id: number;
  entity_ekklesia_location_id: number;
  entity_person: EntityPerson;
  entity_type_id: number;
  fax: any;
  id: number;
  import_origin: any;
  inserted_by_user: 1;
  is_archdiocese: boolean;
  is_demo: boolean;
  is_public_profile: boolean;
  latitude: any;
  longitude: any;
  mass_intention_types_imported: boolean;
  mobilephone: string;
  name: string;
  newsletter_subscriptor: boolean;
  parish: any;
  paroquia_sw_id: any;
  patron_description: any;
  patron_id: any;
  payment_types_imported: boolean;
  phone: any;
  photo_filename: any;
  photo_url: any;
  place: string;
  postal_code: string;
  reports_group_description: any;
  reports_group_id: any;
  residence_chapelry_description: string;
  residence_chapelry_id: number;
  sync_at: any;
  sync_id: any;
  tax_designation: any;
  taxpayer: any;
  touched_in_current_importation: boolean;
  updated_at: string;
  updated_by_user_id: number;
  url: any;
  validated: boolean;
}

export interface CuriaWeddingsAttachment {
  attachment?: string;
  attachment_name?: string;
  wedding_id?: number;
  created_at?: string;
  description?: string;
  id?: number;
  updated_at?: string;
  file_to_upload?: File;
}

export interface CuriaWeddingsReceipt {
  accruals_accrual_id: number;
  block_edit: boolean;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  currency: string;
  deleted: boolean;
  deleted_by_user_id: number;
  document_date: string;
  documents_status_description: string;
  documents_status_id: number;
  documents_type_description: string;
  documents_type_id: number;
  documents_type_serie_id: number;
  entity_description: string;
  entity_ekklesia_location_id: number;
  entity_id: number;
  expiration_date: string;
  has_parochial_rights: boolean;
  id: number;
  is_mass_delivery: boolean;
  name: string;
  paid: boolean;
  serie_number: string;
  total_amount: string;
  updated_at: string;
  updated_by_user_id: number;
}
