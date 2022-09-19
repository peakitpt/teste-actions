export interface CatechumenResponse {
  results: Catechumen[];
  total: number;
  page: number;
  limit: number;
}

export interface Catechumen {
  admission_date?: string;
  admission_hour?: string;
  admission_local_description?: string;
  admission_local_id?: number;
  block_remove?: boolean;
  comments?: string;
  created_at?: string;
  created_by_user_id?: number;
  date?: string;
  deleted?: boolean;
  deleted_by_user_id?: number;
  document_entity_description?: string;
  document_entity_id?: number;
  document_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_by_description?: string;
  entity_by_id?: number;
  entity_catechumen?: EntityCatechumen;
  entity_catechumen_description?: string;
  entity_catechumen_id?: number;
  entity_ekklesia_location_id?: number;
  id?: number;
  seat_number?: string;
  serie_number?: string;
  sheet?: string;
  tax?: number;
  updated_at?: string;
  updated_by_user_id?: number;
  entity_catechumen__name?: string;
}

interface EntityCatechumen {
  entity_person?: EntityPerson;
}

interface EntityPerson {
  id?: number;
}
