export interface UserNewsletterResponse {
  results: UserNewsletter[];
  total: number;
  page: number;
  limit: number;
}

export interface UserNewsletter {
  entity_ekklesia_location_description: string;
  entity_ekklesia_location_id: number;
  entity_ekklesia_location_type_id: number;
  from: string;
  id: number;
  message: string;
  newsletter_id: number;
  read: boolean;
  recipient_email: string;
  sent_at: string;
  subject: string;
}
