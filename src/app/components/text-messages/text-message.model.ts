export interface TextMessageResponse {
  results: TextMessage[];
  total: number;
  page: number;
  limit: number;
}

export interface TextMessage {
  active: boolean;
  additional_recipients?: string;
  created_at: string;
  created_by_user_id?: number;
  deleted: boolean;
  deleted_by_user_id?: number;
  description: string;
  entity_ekklesia_location_id: number;
  frequency: number;
  group_description?: string;
  group_id?: number;
  id: number;
  message: string;
  sending_date: string;
  sending_hour: string;
  sent_at?: string;
  test_recipient?: string;
  updated_at?: string;
  updated_by_user_id?: number;
  text_messages_errors: TextMessageError[];
}

export interface TextMessageError {
  id?: number;
  text_message_id?: number;
  entity_id?: number;
  entity_description?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
}
