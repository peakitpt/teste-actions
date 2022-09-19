export interface ParishionersResponse {
  results: Parishioner[];
  total: number;
  page: number;
  limit: number;
}

export interface Parishioner {
  block_remove: boolean;
  can_sign_documents: boolean;
  entity__birth_date: string;
  entity__deceased: boolean;
  entity__is_catechized: boolean;
  entity__is_parishioner: boolean;
  entity__serie_number: string;
  entity_catechist__catechist: boolean;
  entity_elder__elder: boolean;
  entity_elder__sick: boolean;
  entity_mec__mec: boolean;
  entity_type__id: number;
  entity_type__name: string;
  id: number;
  name: string;
  newsletter_subscriptor: boolean;
}
