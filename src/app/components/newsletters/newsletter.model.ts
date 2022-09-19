export interface NewsletterResponse {
  results: Newsletter[];
  total: number;
  page: number;
  limit: number;
}

export interface Newsletter {
  active?: boolean;
  additional_recipients?: string;
  block_remove?: boolean;
  created_at?: string;
  created_by_user_id?: number;
  deleted?: boolean;
  deleted_by_user_id?: number;
  entity_ekklesia_location_id?: number;
  for_internal_read?: boolean;
  frequency?: number;
  from?: string;
  id?: number;
  layout?: number;
  message?: string;
  sending_date?: string;
  sending_hour?: string;
  sent_at?: string;
  subject?: string;
  sync_at?: string;
  test_recipient?: string;
  title?: string;
  to?: number;
  updated_at?: string;
  updated_by_user_id?: number;
  newsletter_read_statuses_attributes?: NewsletterReadStatus[];
}

export interface NewsletterReadStatus {
  deleted_by_recipient?: boolean;
  id?: number;
  newsletter_id?: number;
  read?: boolean;
  read_at?: string;
  read_at_formatted?: string;
  recipient_email?: string;
}
