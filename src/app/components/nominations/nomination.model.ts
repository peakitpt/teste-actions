export interface NominationResponse {
  results: Nomination[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface Nomination {
  birth_place: string;
  bishop_description: string;
  bishop_id: number;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  enabled: boolean;
  entity_ekklesia_location_id: number;
  entity_priest_description: string;
  entity_priest_id: number;
  expiration_date: string;
  function_description: string;
  function_details: string;
  function_id: number;
  id: number;
  moderator_description: string;
  moderator_id: number;
  nomination_attachments: Attachment[];
  nomination_date: string;
  nomination_type_id: number;
  observations: string;
  place_description: string;
  place_id: number;
  serie_number: string;
  subscriber1_description: string;
  subscriber1_id: number;
  subscriber2_description: string;
  subscriber2_id: number;
  updated_at: string;
  updated_by_user_id: number;
}

export interface Attachment {
  attachment: string;
  attachment_description: string;
  attachment_filename: string;
  created_at: string;
  id: number;
  nomination_id: number;
  updated_at: string;
}
