export interface PendingEntityResponse {
  results: PendingEntityEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface PendingEntityEntity {
  id: number;
  name: string;
  sex: boolean;
  email: string;
  entity_ekklesia_location_id: number;
  title?: string;
  birth_place_parish?: string;
  birth_place_county?: string;
  taxpayer?: string;
  address?: string;
  door_number?: string;
  postal_code?: string;
  district?: string;
  mobilephone?: string;
  phone?: string;
  fax?: string;
  reject_reason?: string;
  status?: string;
}

export interface CountPendingEntities {
  pending?: number;
  rejected?: number;
}
export interface AcceptPendingEntity {
  id?: number; // pending entity
  existing_entity_id?: number; // id da entidade onde vai associar os dados - id da ficha selecionada
  update_existing_entity?: boolean; //atualizar os dados no kyrios - pegar nos dados e reescrever na entidade que ja existe no kyrios
}
