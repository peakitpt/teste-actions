export interface ModuleDocumentationLinkResponse {
  results: ModuleDocumentationLink[];
  total: number;
  grand_total: number;
  aggregates: any;
  groups: any[];
  page: number;
  limit: number;
}

export interface ModuleDocumentationLink {
  active: boolean;
  documentation_url: string;
  id: number;
  resource: string;
}
