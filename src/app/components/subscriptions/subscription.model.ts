export interface SubscriptionResponse {
  results: Subscription[];
  total: number;
  page: number;
  limit: number;
}

export interface Subscription {
  entity1?: Entity1;
  entity1_id?: number;
  entity2?: Entity2;
  entity2_id?: number;
  deleted?: boolean;
  block_remove: boolean;
  can_create: boolean;
  can_delete: boolean;
  can_edit: boolean;
  can_read: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted_by_user_id: number;
  entity1_description: string;
  entity2_description: string;
  id: number;
  is_subscription_admin: boolean;
  sync_at: string;
  updated_at: string;
  updated_by_user_id: number;
  view_id: number;
}

export interface Entity1 {
  entity_type?: EntityType;
  user?: User;
}

export interface Entity2 {
  complete_relation?: string;
  country_description?: string;
  entities_relation?: EntitiesRelation;
  entity_type?: EntityType;
}

export interface EntityType {
  name?: string;
}

export interface User {
  disabled?: boolean;
  email?: string;
  entity_id?: number;
  expiration_date?: string;
  id?: number;
  name?: string;
  subscription_id?: number;
}

export interface EntitiesRelation {
  arciprestado_description?: string;
  diocese_description?: string;
  paroquia_description?: string;
}
