export interface EntityAccessResponse {
  results: EntityAccess[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface EntityAccess {
  access_only_to_own_catechisms: boolean;
  block_remove: boolean;
  can_create: boolean;
  can_delete: boolean;
  can_edit: boolean;
  can_read: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: any;
  entity1__complete_relation: string;
  entity1__name: string;
  entity1_description: string;
  entity1_id: number;
  entity2__complete_relation: string;
  entity2__name: string;
  entity2_description: string;
  entity2_id: number;
  id: number;
  is_subscription_admin: boolean;
  predefined: boolean;
  sync_at: any;
  updated_at: string;
  updated_by_user_id: any;
  view_id: number;
}
