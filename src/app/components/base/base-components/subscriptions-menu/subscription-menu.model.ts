export interface UserSubscriptionsResponse {
  default: UserSubscription;
  subscriptions: UserSubscription[];
}

export interface UserSubscription {
  id: number;
  name: string;
  fullName?: string;
  entity_type: Entity;
}

export interface Entity {
  id: number;
  name_translate: string;
}
