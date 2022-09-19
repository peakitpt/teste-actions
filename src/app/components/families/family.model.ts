export interface FamilyResponse {
  results: Family[];
  total: number;
  page: number;
  limit: number;
}

export interface Family {
  id: number;
  father?: Entity;
  father_id: number;
  mother?: Entity;
  mother_id?: number;
  name: string;
  disabled: boolean;
  opt1_text?: string;
  opt1_text2?: string;
  opt2_text?: string;
  opt2_text2?: string;
  opt3_text?: string;
  opt4_text?: string;
  opt5_text?: string;
  created_at: string;
  updated_at?: string;
  entity_ekklesia_location_id: number;
  deleted: boolean;
  block_remove: boolean;
  opt1_text2_description?: string;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  deleted_by_user_id?: number;
  father_description: string;
  mother_description?: string;
  comments?: string;
  import_origin?: string;
  paroquia_sw_id?: string;
  touched_in_current_importation: boolean;
  families_entities: FamiliesEntity[];
}

export interface FamiliesEntity {
  block_remove?: boolean;
  created_at?: string;
  entity_description: string;
  entity?: Entity;
  entity_id: number;
  family_id: number;
  id: number;
  relation_with: number;
  relationship_degree_description: string;
  relationship_degree_id: number;
  updated_at?: string;
  _destroy?: boolean;
}

interface Entity {
  entity_person?: EntityPerson;
}

interface EntityPerson {
  id?: number;
}
