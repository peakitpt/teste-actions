export interface CuriaFunctionsResponse {
  results: CuriaFunction[];
  total: number;
  page: number;
  limit: number;
}

export interface CuriaFunction {
  appointment_type_description: string;
  appointment_type_id: number;
  block_remove: boolean;
  id: number;
  locale: string;
  name: string;
  validated: boolean;
}
