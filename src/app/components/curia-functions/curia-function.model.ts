export interface CuriaFunctionResponse {
  results: CuriaFunction[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaFunction {
  abbreviated_name: string;
  appointment_type_description: string;
  appointment_type_id: number;
  block_remove: boolean;
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  id: number;
  inserted_by_user: true;
  locale: string;
  name: string;
  updated_at: string;
  updated_by_user_id: number;
  validated: boolean;
}
