import { Action } from '@ngrx/store';
import * as actions from './persons.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { EntityPerson, EntityPersonResponse } from '../person.model';
import { TaxpayerNameValidation } from '@peakitpt/ui-kyrios-api';

export interface State {
  persons: EntityPersonResponse;
  personsEntirely: EntityPersonResponse;
  person: EntityPerson;
  personByEntityId: EntityPerson;
  selectedIds: EntityPerson[];
  image: any;

  error: RequestError;
  taxpayerNameValidation: TaxpayerNameValidation;
}

export const initialState: State = {
  persons: null,
  personsEntirely: null,
  person: null,
  personByEntityId: null,
  selectedIds: null,
  image: null,

  error: null,
  taxpayerNameValidation: null,
};

export function reducer(state = initialState, action: Action): State {
  let successResult: any;

  switch (action.type) {
    case actions.PersonsActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.PersonsActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessGetAll:
      successResult = (action as actions.SuccessGetAll).payload;
      return { ...state, persons: successResult };

    case actions.PersonsActionTypes.ClearGetAll:
      return { ...state, persons: { results: [] } as EntityPersonResponse };

    case actions.PersonsActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessGet:
      successResult = (action as actions.SuccessGet).payload;
      return { ...state, person: successResult };

    case actions.PersonsActionTypes.ClearGet:
      return { ...state, person: null };

    case actions.PersonsActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessPost:
      successResult = (action as actions.SuccessPost).payload;
      return { ...state, person: successResult };

    case actions.PersonsActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessPut:
      successResult = (action as actions.SuccessPut).payload;
      return { ...state, person: successResult };

    case actions.PersonsActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessDelete:
      successResult = (action as actions.SuccessDelete).payload;
      return { ...state, person: successResult };

    case actions.PersonsActionTypes.RequestBulkDelete:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessBulkDelete:
      successResult = (action as actions.SuccessBulkDelete).payload;
      return { ...state, person: successResult };

    case actions.PersonsActionTypes.SetSelected:
      successResult = (action as actions.SetSelected).payload;
      return { ...state, selectedIds: successResult };

    case actions.PersonsActionTypes.RequestGetByEntityId:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessGetByEntityId:
      successResult = (action as actions.SuccessGetByEntityId).payload;
      return { ...state, personByEntityId: successResult };

    case actions.PersonsActionTypes.ClearGetByEntityId:
      return { ...state, personByEntityId: null };

    case actions.PersonsActionTypes.RequestCheckExistance:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessCheckExistance:
      successResult = (action as actions.SuccessCheckExistance).payload;
      return { ...state, taxpayerNameValidation: successResult };

    case actions.PersonsActionTypes.ClearCheckExistance:
      return { ...state, taxpayerNameValidation: null };

    case actions.PersonsActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessGetEntirely:
      successResult = (action as actions.SuccessGetEntirely).payload;
      return { ...state, personsEntirely: successResult };

    case actions.PersonsActionTypes.RequestPostImage:
      return { ...state, error: null };

    case actions.PersonsActionTypes.SuccessPostImage:
      successResult = (action as actions.SuccessPostImage).payload;
      return { ...state, image: successResult };

    default:
      return state;
  }
}
