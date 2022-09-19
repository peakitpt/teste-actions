export interface NewslettersLayoutResponse {
  results: NewslettersLayout[];
  total: number;
  page: number;
  limit: number;
}

export interface NewslettersLayout {
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  entity_ekklesia_location_id?: number;
  id?: number;
  img_url?: string;
  img_url_filename?: string;
  layout?: string;
  sync_at?: string;
  title?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}
