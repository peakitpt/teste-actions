export interface SubscriptionUserResponse {
  results: SubscriptionUser[];
  total: number;
  aggregates: {};
  grand_total: number;
  groups: any[];
  page: number;
  limit: number;
}

export interface SubscriptionUser {
  created_at?: string;
  current_sign_in_at?: any;
  disabled?: boolean;
  email?: string;
  entity?: any;
  id: number;
  locale?: string;
  name?: string;
  sign_in_count?: number;

  accounting_attributes?: any[];
  accruals_attributes?: any[];
  admin_attributes?: any[];
  api_token?: any;
  approved_at?: string;
  archive_attributes?: any[];
  block_remove?: boolean;
  blocked_at?: any;
  blocked_by_user_id?: any;
  catholic_directory_attributes?: any[];
  cms_attributes?: any[];
  created_by_user_id?: number;
  dash_calendar_attributes?: any[];
  deleted?: boolean;
  deleted_by_user_id?: any;
  dms_attributes?: any[];
  entity_id?: number;
  expiration_date?: any;
  is_subscription_admin?: boolean;
  newsletter_attributes?: any[];
  processes_attributes?: any[];
  profile_id?: any;
  reporting_attributes?: any[];
  role?: string;
  sacraments_attributes?: any[];
  session_id?: any;
  settings_attributes?: any[];
  subscription_admin_attributes?: any[];
  subscription_description?: string;
  subscription_id?: number;
  subscriptions_limit?: number;
  sync_at?: any;
  treasury_attributes?: any[];
  updated_by_user_id?: any;
  user_id?: string;
}
