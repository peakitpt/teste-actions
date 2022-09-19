export interface PersonsResponse {
  results: EntityPerson[];
  total: number;
  page: number;
  limit: number;
}

export interface EntityPerson {
  id: number;
  serie_number: string;
  birth_date?: string;
  is_parishioner?: boolean;
  entity: Entity;
  entity_father?: Entity;
  entity_mother?: Entity;
}

export interface Entity {
  id: number;
  name: string;
  taxpayer?: string;
  disabled: boolean;
  email?: string;
  phone?: string;
  mobilephone?: string;
  entity_elder_patient?: EntityElderPatient;
}

export interface EntityElderPatient {
  sick: boolean;
  elder: boolean;
}
