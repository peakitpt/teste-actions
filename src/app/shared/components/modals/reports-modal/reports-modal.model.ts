export interface ReportResponse {
  results: Report[];
  total: number;
  page: number;
  limit: number;
}

export interface Report {
  created_at: string;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  enabled: boolean;
  free_text: string;
  id: number;
  index_report: boolean;
  is_free_text: boolean;
  report_locale: string;
  report_name: string;
  report_path: string;
  updated_at: string;
  updated_by_user_id: number;
  view_description: string;
  view_id: number;
}
