export interface NewsletterSubscriptionResponse {
  results: NewsletterSubscription[];
  total: number;
  page: number;
  limit: number;
}

export interface NewsletterSubscription {
  active?: boolean;
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  email?: string;
  email_validated_at?: string;
  entity_ekklesia_location_id?: number;
  entity_id?: number;
  id?: number;
  mobilephone?: string;
  name?: string;
  sync_at?: string;
  updated_at?: string;
  updated_by_user_id?: number;
}
