export interface EmolumentsResponse {
  results: Emolument[];
  total: number;
  page: number;
  limit: number;
}

export interface Emolument {
  id: number;
  description: string;
  value: number;
  currency: string;
  emoluments_type_id: number;
  description_short: string;
  is_parochial_right: boolean;
  emoluments_type: EmolumentsType;
}

export interface EmolumentsType {
  name: string;
  id: number;
}
