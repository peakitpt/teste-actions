export interface SubscriptionSettingResponse {
  results: SubscriptionSetting[];
  total: number;
  page: number;
  limit: number;
}

export interface SubscriptionSetting {
  created_by_user_id?: number;
  currency?: string;
  current_account_notification_layout_description?: string;
  current_account_notification_layout_id?: number;
  entity_ekklesia_location_id: number;
  entity_priest_id?: number;
  finance_department?: string;
  hide_warnings_from_dash: boolean;
  hide_wizard_from_dash: boolean;
  id: number;
  mass_intention_default_delivered_document_type_description?: string;
  mass_intention_default_delivered_document_type_id?: number;
  priest_description?: string;
  priest_id?: number;
  priestly_fraternity_institution_description?: string;
  priestly_fraternity_institution_id?: number;
  sms_gateway?: string;
  sms_msisdn?: string;
  sms_password?: string;
  treasury_default_document_type_description?: string;
  treasury_default_document_type_id?: number;
  updated_by_user_id?: number;
  priest?: Entity;
}

interface Entity {
  entity_priest?: EntityPriest;
}

interface EntityPriest {
  id?: number;
  abbreviated_name?: string;
  clergy_group_id?: number;
  clergy_type?: ClergyType;
}

interface ClergyType {
  locale?: string;
  name?: string;
  abbreviated_name?: string;
}
