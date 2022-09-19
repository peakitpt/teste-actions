import { Archpristship } from 'src/app/shared/components/modals/archpristships-modal/archpristships-modal.model';

export interface CatholicDirectoryInstitutionResponse {
  results: CatholicDirectoryInstitution[];
  total: number;
  page: number;
  limit: number;
}

export interface CatholicDirectoryInstitution {
  archpriestship: any;
  archpriestship_description: string;
  archpriestship_id: number;
  chapelry_description: string;
  chapelry_id: number;
  christian_life_centers_type_id: number;
  community: string;
  congregation_description: string;
  congregation_id: number;
  created_at: string;
  documents: any[];
  entity: any;
  entity_id: number;
  entity_institution_appointments: any[];
  entity_institution_valences: any[];
  historical_note: string;
  holidays: string;
  id: number;
  institution_gender: string;
  institution_type: any;
  institution_type_description: string;
  institution_type_id: number;
  locale: string;
  mandate: string;
  observations: string;
  periodicity_description: string;
  periodicity_id: number;
  property: string;
  scholarity: string;
  secular_institute_description: string;
  secular_institute_id: number;
  social_media_data_sheet: string;
  social_media_institution_description: string;
  social_media_type_description: string;
  social_media_type_id: number;
  timetable: string;
  updated_at: string;
  website_type_id: number;
}
