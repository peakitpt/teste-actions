import { Action } from '@ngrx/store';
import * as actions from './curia-secretariats.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaSecretariat,
  CuriaSecretariatResponse,
} from '../curia-secretariat.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaSecretariats: CuriaSecretariatResponse;
  curiaSecretariatsEntirely: CuriaSecretariatResponse;
  curiaMinistryAndOrder: CuriaSecretariat;
  selectedIds: CuriaSecretariat[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaSecretariats: null,
  curiaSecretariatsEntirely: null,
  curiaMinistryAndOrder: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let curiaSecretariats: any;
  let curiaSecretariatsEntirely: any;
  let curiaMinistryAndOrder: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaSecretariatsActionTypes.RequestFailCuriaSecretariats:
      const error = (action as actions.RequestFailCuriaSecretariats).payload;
      return { ...state, error };

    case actions.CuriaSecretariatsActionTypes.RequestGetAllCuriaSecretariats:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessGetAllCuriaSecretariats:
      curiaSecretariats = (action as actions.SuccessGetAllCuriaSecretariats)
        .payload;
      return { ...state, curiaSecretariats };

    case actions.CuriaSecretariatsActionTypes.RequestGetCuriaSecretariat:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessGetCuriaSecretariat:
      curiaMinistryAndOrder = (action as actions.SuccessGetCuriaSecretariat)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.RequestPostCuriaSecretariat:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessPostCuriaSecretariat:
      curiaMinistryAndOrder = (action as actions.SuccessPostCuriaSecretariat)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.RequestPutCuriaSecretariat:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessPutCuriaSecretariat:
      curiaMinistryAndOrder = (action as actions.SuccessPutCuriaSecretariat)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.RequestDeleteCuriaSecretariat:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessDeleteCuriaSecretariat:
      curiaMinistryAndOrder = (action as actions.SuccessDeleteCuriaSecretariat)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    // case actions.CuriaSecretariatsActionTypes.RequestBulkDeleteCuriaSecretariats:
    //   return { ...state, error: null };

    // case actions.CuriaSecretariatsActionTypes.SuccessBulkDeleteCuriaSecretariats:
    //   curiaMinistryAndOrder = (action as actions.SuccessBulkDeleteCuriaSecretariats).payload;
    //   return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.RequestSendTestCuriaSecretariat:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessSendTestCuriaSecretariat:
      curiaMinistryAndOrder = (
        action as actions.SuccessSendTestCuriaSecretariat
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.SetSelectedCuriaSecretariats:
      selectedIds = (action as actions.SetSelectedCuriaSecretariats).payload;
      return { ...state, selectedIds };

    case actions.CuriaSecretariatsActionTypes.SetModalSelectCuriaSecretariat:
      modalRowSelect = (action as actions.SetModalSelectCuriaSecretariat)
        .payload;
      return { ...state, modalRowSelect };

    case actions.CuriaSecretariatsActionTypes
      .RequestGetEntirelyCuriaSecretariats:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes
      .SuccessGetEntirelyCuriaSecretariats:
      curiaSecretariatsEntirely = (
        action as actions.SuccessGetEntirelyCuriaSecretariats
      ).payload;
      return { ...state, curiaSecretariatsEntirely };

    case actions.CuriaSecretariatsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaSecretariatsActionTypes.SuccessGetNew:
      curiaMinistryAndOrder = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaSecretariatsActionTypes.ClearGet:
      return { ...state, curiaMinistryAndOrder: null };

    case actions.CuriaSecretariatsActionTypes.RequestGetNewCMODocument:
      return { ...state, error: null };

    default:
      return state;
  }
}
