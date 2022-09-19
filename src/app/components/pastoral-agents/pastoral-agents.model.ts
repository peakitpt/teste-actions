import { EntityPastoralAgent } from '../mecs/mecs.model';

export interface PastoralAgentResponse {
  results: EntityPastoralAgent[];
  total: number;
  page: number;
  limit: number;
}


export interface PastoralAgentTypesResponse {
  results: PastoralAgentType[];
  total: number;
  page: number;
  limit: number;
}

export interface PastoralAgentType {
  id: number;
  description?: string;
  group?: string;
  group_translate?: string;
}
