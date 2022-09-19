export interface ContentsResponse {
  results: Content[];
  total: number;
  page: number;
  limit: number;
}

export interface Content {
  id: number;
  name: string;
}
