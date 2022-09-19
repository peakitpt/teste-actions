export interface AdminStatistic {
  results: any;
}

export interface KpisRequest {
  view: string;
  params: KpisRequestParams;
}

export interface KpisRequestParams {
  admin: boolean;
  id: number;
  kpis: string;
  wlogins?: boolean;
  wloginslm?: boolean;
}
