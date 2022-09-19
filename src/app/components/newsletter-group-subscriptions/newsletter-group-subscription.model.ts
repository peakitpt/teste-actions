export interface NewsletterGroupSubscriptionResponse {
  results: NewsletterGroupSubscription[];
  total: number;
  page: number;
  limit: number;
}

export interface NewsletterGroupSubscription {
  subscription_date?: string;
  unsubscription_date?: string;
  active?: boolean;
  id?: number;
  group_id?: number;
  newsletter_subscription_id?: number;
  group?: Group;
  newsletter_subscription?: NewsletterSubscription;
}

export interface Group {
  id?: number;
  name?: string;
}

export interface NewsletterSubscription {
  id?: number;
  name?: string;
}
