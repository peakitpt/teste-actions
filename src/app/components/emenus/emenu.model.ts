export interface EmenuResponse {
  results: Emenu[];
  total: number;
  page: number;
  limit: number;
}

export interface Emenu {
  block_remove: boolean;
  id: number;
  title: string;
  type: string;
  url: string;
  child_menus?: any[];
  content_description?: string;
  content_id?: number;
  deleted?: boolean;
  entity_ekklesia_location_id?: number;
  father_id?: number;
  order_nr?: number;
  section_description?: string;
  section_id?: number;
  sync_at?: string;
  template_description?: string;
  template_id?: number;
}
