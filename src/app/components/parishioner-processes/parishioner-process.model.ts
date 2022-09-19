export interface ParishionerProcessResponse {
  results: ParishionerProcess[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface ParishionerProcess {
  deleted: boolean;
  entity_ekklesia_location_id: number;
  entity_id: number;
  id: number;
  process_description: string;
  process_id: number;
  serie_number: string;
  updated_at: string;
  url: string;
  view_description: string;
  view_id: number;
}
