export interface GroupResponse {
  results: Group[];
  total: number;
  page: number;
  limit: number;
}

export interface Group {
  id: number;
  name: string;
  active: boolean;
  deleted: boolean;
  is_newsletter_group: boolean;
}
