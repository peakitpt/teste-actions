export interface ViewsResponse {
  results: View[];
  total: number;
  page: number;
  limit: number;
}

export interface View {
  block_remove: boolean;
  created_at: string;
  deleted: boolean;
  id: number;
  name: string;
  numerationable: boolean;
  transl_name: string;
  updated_at: string;
}
