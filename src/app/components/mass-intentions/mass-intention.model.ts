export interface MassIntentionResponse {
  results: MassIntention[];
  total: number;
  page: number;
  limit: number;
}

export interface MassIntention {
  block_remove?: boolean;
  celebrated_by_description?: string;
  celebrated_by_id?: number;
  comments?: string;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  document_entity_description?: string;
  document_entity_id?: number;
  document_id?: number;
  emolument_description?: string;
  emolument_id?: number;
  entity_ekklesia_location_id?: number;
  id?: number;
  intention_date?: string;
  intention_description?: string;
  intention_time?: string;
  intention_type_id?: number;
  location_description?: string;
  location_id?: number;
  masses_delivered_document_id?: number;
  paid?: boolean;
  requested_by_description?: string;
  requested_by_id?: number;
  serie_number?: string;
  tax?: number;
  updated_at?: string;
  updated_by_user_id?: number;
  intention_type?: MassIntentionsType;
}

export interface MassIntentionsType {
  name?: string;
}
