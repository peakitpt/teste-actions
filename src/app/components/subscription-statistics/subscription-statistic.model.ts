export interface SubscriptionStatistic {
  results: any;
}

export interface KpisRequest {
  view: string;
  params: KpisRequestParams;
  link?: string;
}

export interface KpisRequestParams {
  admin?: boolean;
  id: number;
  kpis: string;
  wlogins?: boolean;
  wloginslm?: boolean;
}
