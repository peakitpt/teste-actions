import { User } from '../users/user.model';

export interface ReportsGroupResponse {
  results: ReportsGroup[];
  total: number;
  page: number;
  limit: number;
}

export interface ReportsGroup {
  block_remove: boolean;
  created_at: string;
  created_by_user: User;
  created_by_user_id: number;
  deleted: boolean;
  deleted_by_user_id: number;
  enabled: boolean;
  id: number;
  name: string;
  reports_groups_lines: ReportsGroupsLine[];
  updated_at: string;
  updated_by_user: User;
  updated_by_user_id: number;
}

export interface ReportsGroupsLine {
  created_at: string;
  free_text: any;
  id: number;
  is_free_text: boolean;
  report_description: string;
  report_id: number;
  reports_group_id: number;
  reports_grouper_description: string;
  reports_grouper_id: number;
  updated_at: string;
}
