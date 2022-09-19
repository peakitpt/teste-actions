export interface InstitutionsResponse {
  results: Institution[];
  total: number;
  page: number;
  limit: number;
}

export interface Institution {
  archpriestship_description?: any;
  archpriestship_id?: any;
  chapelry?: any;
  chapelry_description?: any;
  chapelry_id?: any;
  christian_life_centers_type_id?: any;
  community?: any;
  congregation_description?: any;
  congregation_id?: any;
  created_at?: any;
  documents?: any;
  entity?: any;
  entity__disabled?: any;
  entity__email?: any;
  entity__mobilephone?: any;
  entity__name?: any;
  entity__phone?: any;
  entity_id?: any;
  entity_institution_appointments?: any;
  entity_institution_valences?: any;
  historical_note?: any;
  holidays?: any;
  id: any;
  institution_gender?: any;
  institution_type?: any;
  institution_type_description?: any;
  institution_type_id?: any;
  locale?: any;
  mandate?: any;
  observations?: any;
  periodicity_description?: any;
  periodicity_id?: any;
  property?: any;
  scholarity?: any;
  secular_institute_description?: any;
  secular_institute_id?: any;
  social_media_data_sheet?: any;
  social_media_institution_description?: any;
  social_media_type_description?: any;
  social_media_type_id?: any;
  timetable?: any;
  updated_at?: any;
  website_type_id?: any;
}
