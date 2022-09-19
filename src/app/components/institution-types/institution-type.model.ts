export interface InstitutionTypeResponse {
  results: InstitutionType[];
  total: number;
  page: number;
  limit: number;
  id?: number;
}

export interface InstitutionType {
  archpriestship?: boolean;
  block_remove?: boolean;
  chapelry?: boolean;
  christian_life_centers_type?: boolean;
  community?: boolean;
  congregation?: boolean;
  created_at?: Date;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  historical_note?: boolean;
  holidays?: boolean;
  id?: number;
  inserted_by_user?: boolean;
  institution_gender?: boolean;
  locale?: string;
  mandate?: boolean;
  name?: string;
  observations?: boolean;
  periodicity_id?: boolean;
  photo?: boolean;
  property?: boolean;
  scholarity?: boolean;
  secular_institute?: boolean;
  social_media?: boolean;
  timetable?: boolean;
  updated_at?: Date;
  updated_by_user_id?: number;
  valences?: boolean;
  validated?: boolean;
  website_type_id?: number;
 
}