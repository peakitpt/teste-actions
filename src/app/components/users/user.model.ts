export interface UserResponse {
  results: User[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  api_token?: string;
  approved_at?: string;
  block_remove?: boolean;
  blocked_at?: string;
  blocked_by_user_id?: number;
  created_at?: string;
  created_by_user_id?: number;
  current_sign_in_at?: string;
  deleted?: boolean;
  deleted_by_user_id?: number;
  disabled?: boolean;
  email?: string;
  entity?: Entity;
  entity_id?: number;
  expiration_date?: string;
  id?: number;
  locale?: string;
  name?: string;
  profile_id?: number;
  role?: string;
  session_id?: number;
  sign_in_count?: number;
  subscription_description?: string;
  subscription_id?: number;
  subscriptions_limit?: number;
  sync_at?: string;
  updated_by_user_id?: number;
  user_id?: string;
  kyrios_social_access?: boolean;
  kyrios_portal_access?: boolean;
  kyrios_social_following?: string;
}

export interface Entity {
  address: any;
  attachment: any;
  attachment_filename: any;
  block_remove: boolean;
  can_sign_documents: boolean;
  civil_status: any;
  civil_status_id: any;
  complete_relation: string;
  country_description: string;
  country_id: number;
  county: any;
  created_at: string;
  created_by_user_id: any;
  deleted: boolean;
  deleted_by_user_id: any;
  disabled: boolean;
  district: any;
  door_number: any;
  email: string;
  emoluments_imported: boolean;
  entity_birth_chapelry_description: any;
  entity_birth_chapelry_free_text: any;
  entity_birth_chapelry_id: any;
  entity_ekklesia_location_id: number;
  entity_type_id: number;
  fax: any;
  id: number;
  import_origin: any;
  inserted_by_user: number;
  is_archdiocese: boolean;
  is_demo: boolean;
  is_public_profile: boolean;
  latitude: any;
  longitude: any;
  mass_intention_types_imported: boolean;
  masses_schedules_attributes: any[];
  mobilephone: any;
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
  place: any;
  postal_code: any;
  reports_group_description: any;
  reports_group_id: any;
  residence_chapelry_description: any;
  residence_chapelry_id: any;
  sync_at: any;
  sync_id: any;
  tax_designation: any;
  taxpayer: any;
  touched_in_current_importation: boolean;
  updated_at: string;
  updated_by_user_id: any;
  url: any;
  validate_taxpayer_and_name: any;
  validated: boolean;
}

export const entityTypes = {
  2: 'chapelry',
  3: 'user',
  4: 'super_user',
  5: 'parishioner',
  8: 'worship_place',
  9: 'bishopric',
  10: 'archpriestship',
  11: 'priest',
  13: 'institution',
};
