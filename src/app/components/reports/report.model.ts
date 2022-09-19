export interface ReportResponse {
  results: Report[];
  total: number;
  page: number;
  limit: number;
}

export interface Report {
  id: number;
  name?: string;
  report_type?: string;
  module?: string;
  export_type?: string;
  report_file?: any;
  locked?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionReportGroup {
  grouper: string;
  reports: SubscriptionReport[];
}

export interface SubscriptionReport {
  id: number;
  report_name: string;
  report_path?: string;
}

export interface ViewResponse {
  results: View[];
  total: number;
  page: number;
  limit: number;
}

export interface View {
  id: number;
  name?: string;
  deleted?: boolean;
}

export interface ReportPermition {
  can_write: boolean;
  entity: any;
  entity_id: number;
  id: number;
  is_super_permission: boolean;
  reporting: Reporting;
  reporting_id: number;
}

export interface Reporting {
  name: string;
  reportings_permissions_exceptions: ReportingsPermissionsException[];
}

export interface ReportingsPermissionsException {
  entity_id: number;
  exception: boolean;
  hide: boolean;
  id: number;
  reporting_id: number;
}

export interface TreeForm {
  id: number;
  name: string;
  labe: string;
  can_read: boolean;
  children: TreeForm[];
}
