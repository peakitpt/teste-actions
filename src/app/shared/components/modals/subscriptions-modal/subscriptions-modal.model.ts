export interface SubscriptionsResponse {
  results: Subscription[];
  total: number;
  page: number;
  limit: number;
}

export interface Subscription {
  id: number;
  name: string;
}
