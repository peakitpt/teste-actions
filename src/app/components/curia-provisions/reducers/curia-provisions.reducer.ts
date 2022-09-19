import { Action } from '@ngrx/store';
import * as actions from './curia-provisions.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaProvision,
  CuriaProvisionResponse,
} from '../curia-provision.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaProvisions: CuriaProvisionResponse;
  curiaProvisionsEntirely: CuriaProvisionResponse;
  curiaMinistryAndOrder: CuriaProvision;
  selectedIds: CuriaProvision[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaProvisions: null,
  curiaProvisionsEntirely: null,
  curiaMinistryAndOrder: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let curiaProvisions: any;
  let curiaProvisionsEntirely: any;
  let curiaMinistryAndOrder: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaProvisionsActionTypes.RequestFailCuriaProvisions:
      const error = (action as actions.RequestFailCuriaProvisions).payload;
      return { ...state, error };

    case actions.CuriaProvisionsActionTypes.RequestGetAllCuriaProvisions:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessGetAllCuriaProvisions:
      curiaProvisions = (action as actions.SuccessGetAllCuriaProvisions)
        .payload;
      return { ...state, curiaProvisions };

    case actions.CuriaProvisionsActionTypes.RequestGetCuriaProvision:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessGetCuriaProvision:
      curiaMinistryAndOrder = (action as actions.SuccessGetCuriaProvision)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.RequestPostCuriaProvision:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessPostCuriaProvision:
      curiaMinistryAndOrder = (action as actions.SuccessPostCuriaProvision)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.RequestPutCuriaProvision:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessPutCuriaProvision:
      curiaMinistryAndOrder = (action as actions.SuccessPutCuriaProvision)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.RequestDeleteCuriaProvision:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessDeleteCuriaProvision:
      curiaMinistryAndOrder = (action as actions.SuccessDeleteCuriaProvision)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    // case actions.CuriaProvisionsActionTypes.RequestBulkDeleteCuriaProvisions:
    //   return { ...state, error: null };

    // case actions.CuriaProvisionsActionTypes.SuccessBulkDeleteCuriaProvisions:
    //   curiaMinistryAndOrder = (action as actions.SuccessBulkDeleteCuriaProvisions).payload;
    //   return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.RequestSendTestCuriaProvision:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessSendTestCuriaProvision:
      curiaMinistryAndOrder = (action as actions.SuccessSendTestCuriaProvision)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.SetSelectedCuriaProvisions:
      selectedIds = (action as actions.SetSelectedCuriaProvisions).payload;
      return { ...state, selectedIds };

    case actions.CuriaProvisionsActionTypes.SetModalSelectCuriaProvision:
      modalRowSelect = (action as actions.SetModalSelectCuriaProvision).payload;
      return { ...state, modalRowSelect };

    case actions.CuriaProvisionsActionTypes.RequestGetEntirelyCuriaProvisions:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessGetEntirelyCuriaProvisions:
      curiaProvisionsEntirely = (
        action as actions.SuccessGetEntirelyCuriaProvisions
      ).payload;
      return { ...state, curiaProvisionsEntirely };

    case actions.CuriaProvisionsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaProvisionsActionTypes.SuccessGetNew:
      curiaMinistryAndOrder = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaProvisionsActionTypes.ClearGet:
      return { ...state, curiaMinistryAndOrder: null };

    case actions.CuriaProvisionsActionTypes.RequestGetNewCMODocument:
      return { ...state, error: null };

    default:
      return state;
  }
}
