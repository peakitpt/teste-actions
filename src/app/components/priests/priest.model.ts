import { Chapelry } from '../chapelries/chapelry.model';
import { ClergyType } from '../clergy-types/clergy-type.model';
import { Document } from '../documents/document.model';
import { EntityPerson } from '../persons/person.model';

export interface GroupsResponse {
  results: any[];
  total: number;
  page: number;
  limit: number;
  id?: number;
}

export interface CurrentAccountLinesResponse {
  results: any[];
  total: number;
  page: number;
  limit: number;
  id?: number;
}

export interface PriestResponse {
  results: Priest[];
  total: number;
  page: number;
  limit: number;
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

export interface EntityPriestAppointment {
  appointment_place_description?: string;
  appointment_place_id?: number;
  created_at?: Date;
  curia_function_description?: string;
  curia_function_id?: number;
  description?: string;
  end_date?: Date;
  entity_priest_id?: number;
  id?: number;
  institution_appointment_id?: number;
  nomination_id?: number;
  representing_description?: string;
  representing_id?: number;
  start_date?: Date;
  updated_at?: Date;
}

export interface EntityPriestHashtag {
  block_remove?: boolean;
  created_at?: Date;
  deleted?: boolean;
  entity_priest_id?: number;
  id?: number;
  tag?: string;
  updated_at?: Date;
}

export interface EntityPriestPriestlyCard {
  created_at?: Date;
  entity_priest_id?: number;
  id?: number;
  renewal_date?: Date;
  updated_at?: Date;
}

export interface EntityPriestRetreat {
  entity_priest_id?: number;
  retreat_year?: Date;
  retreat_place?: string;
}

export interface EntityPriestOngoingFormation {
  entity_priest_id?: number;
  start_date?: Date;
  end_date?: Date;
  description?: string;
}

export interface EntityPriestPublication {
  entity_priest_id?: number;
  publication_date?: Date;
  description?: string;
}

export interface EntityPriestCurriculum {
  entity_priest_id?: number;
  start_date?: Date;
  end_date?: Date;
  description?: string;
}

export interface EntityPriestAcademicQualification {
  entity_priest_id?: number;
  start_date?: Date;
  end_date?: Date;
  description?: string;
}

export interface Priest {
  abbreviated_name?: string;
  actual_appointments?: string;
  appointments?: string;
  attachment?: string;
  attachment_filename?: string;
  birth_chapelry_description?: string;
  birth_chapelry_id?: number;
  changes_request?: string;
  clergy_group_id?: number;
  clergy_type_description?: string;
  clergy_type_id?: number;
  coat_of_arms?: string;
  coat_of_arms_filename?: string;
  coordinator_delegate?: string;
  created_at?: Date;
  curriculum?: string;
  death_date?: Date;
  deceased?: boolean;
  entity_id?: number;
  episcopal_nomination_date?: Date;
  episcopal_ordination_date?: Date;
  episcopal_ordination_place?: string;
  father_description?: string;
  father_id?: number;
  id?: number;
  ident_document_emission_date?: Date;
  ident_document_emitted_by?: string;
  ident_document_number?: string;
  ident_document_type?: string;
  ident_document_validity_date?: Date;
  imported_actual_appointments?: string;
  mother_description?: string;
  mother_id?: number;
  observations?: string;
  ongoing_formations?: string;
  ordination_date?: Date;
  ordination_place?: string;
  pastoral_service?: string;
  priest_academic_qualifications?: string;
  priest_birth_date?: Date;
  priest_birth_place?: string;
  priestly_fraternity?: boolean;
  priestly_reference?: Date;
  private_mobilephone?: string;
  publications?: string;
  residence?: number;
  residence_chapelry_description?: string;
  residence_chapelry_id?: number;
  resignation_date?: Date;
  taken_date?: Date;
  title_for_documents?: string;
  updated_at?: Date;
  entity?: Entity;
  clergy_type?: ClergyType;
  birth_chapelry?: Chapelry;
  entity_priest_appointments?: EntityPriestAppointment[];
  entity_priest_retreats?: EntityPriestRetreat[];
  entity_priest_ongoing_formations?: EntityPriestOngoingFormation[];
  entity_priest_publications?: EntityPriestPublication[];
  entity_priest_curriculums?: EntityPriestCurriculum[];
  entity_priest_academic_qualifications?: EntityPriestAcademicQualification[];
  entity_priest_priestly_cards?: EntityPriestPriestlyCard[];
  entity_priest_hashtags?: EntityPriestHashtag[];
  documents?: Document[];
  entity_person: EntityPerson;
  entity__disabled?: boolean;
  entity__name?: string;
  retired?: boolean;
  retired_date?: Date;
}
