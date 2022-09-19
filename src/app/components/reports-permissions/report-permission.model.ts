import { Report } from '../reports/report.model';

export interface ReportPermissionResponse {
  results: ReportPermission[];
  total: number;
  page: number;
  limit: number;
}

export interface ReportPermission {
  reporting_id: number;
  entity_id?: number;
  can_write?: boolean;
  entity?: Entity;
  reporting?: Report;
}

export interface Entity {
  name: string;
}
