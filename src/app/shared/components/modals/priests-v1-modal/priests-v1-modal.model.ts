export interface PriestsV1Response {
  results: Priest[];
  total: number;
  page: number;
  limit: number;
}

export interface Priest {
  abbreviated_name: any;
  actual_appointments: any;
  appointments: string;
  attachment: any;
  attachment_filename: any;
  birth_chapelry_description: any;
  birth_chapelry_id: any;
  changes_request: any;
  clergy_group_id: number;
  clergy_type: any;
  clergy_type_description: string;
  clergy_type_id: number;
  coat_of_arms: any;
  coat_of_arms_filename: any;
  coordinator_delegate: any;
  created_at: string;
  curriculum: any;
  death_date: string;
  deceased: boolean;
  documents: any[];
  entity: any;
  entity__disabled: boolean;
  entity__name: string;
  entity_id: number;
  entity_person: any;
  entity_priest_academic_qualifications: any[];
  entity_priest_appointments: any[];
  entity_priest_curriculums: any[];
  entity_priest_hashtags: any[];
  entity_priest_ongoing_formations: any[];
  entity_priest_priestly_cards: any[];
  entity_priest_publications: any[];
  entity_priest_retreats: any[];
  episcopal_nomination_date: any;
  episcopal_ordination_date: any;
  episcopal_ordination_place: any;
  father_description: any;
  father_id: any;
  id: number;
  ident_document_emission_date: any;
  ident_document_emitted_by: any;
  ident_document_number: any;
  ident_document_type: any;
  ident_document_validity_date: any;
  imported_actual_appointments: any;
  mother_description: any;
  mother_id: any;
  observations: any;
  ongoing_formations: any;
  ordination_date: string;
  ordination_place: string;
  pastoral_service: any;
  priest_academic_qualifications: any;
  priest_birth_date: string;
  priest_birth_place: string;
  priestly_fraternity: boolean;
  priestly_reference: any;
  private_mobilephone: any;
  publications: any;
  residence: number;
  residence_chapelry_description: any;
  residence_chapelry_id: any;
  resignation_date: any;
  taken_date: any;
  title_for_documents: any;
  updated_at: string;
}