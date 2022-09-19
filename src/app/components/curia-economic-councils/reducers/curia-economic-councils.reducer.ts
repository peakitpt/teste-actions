import { Action } from '@ngrx/store';
import * as actions from './curia-economic-councils.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaEconomicCouncil,
  CuriaEconomicCouncilResponse,
} from '../curia-economic-council.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaEconomicCouncils: CuriaEconomicCouncilResponse;
  curiaEconomicCouncilsEntirely: CuriaEconomicCouncilResponse;
  curiaMinistryAndOrder: CuriaEconomicCouncil;
  selectedIds: CuriaEconomicCouncil[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaEconomicCouncils: null,
  curiaEconomicCouncilsEntirely: null,
  curiaMinistryAndOrder: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let curiaEconomicCouncils: any;
  let curiaEconomicCouncilsEntirely: any;
  let curiaMinistryAndOrder: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaEconomicCouncilsActionTypes
      .RequestFailCuriaEconomicCouncils:
      const error = (action as actions.RequestFailCuriaEconomicCouncils)
        .payload;
      return { ...state, error };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestGetAllCuriaEconomicCouncils:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessGetAllCuriaEconomicCouncils:
      curiaEconomicCouncils = (
        action as actions.SuccessGetAllCuriaEconomicCouncils
      ).payload;
      return { ...state, curiaEconomicCouncils };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestGetCuriaEconomicCouncil:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessGetCuriaEconomicCouncil:
      curiaMinistryAndOrder = (action as actions.SuccessGetCuriaEconomicCouncil)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestPostCuriaEconomicCouncil:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessPostCuriaEconomicCouncil:
      curiaMinistryAndOrder = (
        action as actions.SuccessPostCuriaEconomicCouncil
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestPutCuriaEconomicCouncil:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessPutCuriaEconomicCouncil:
      curiaMinistryAndOrder = (action as actions.SuccessPutCuriaEconomicCouncil)
        .payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestDeleteCuriaEconomicCouncil:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessDeleteCuriaEconomicCouncil:
      curiaMinistryAndOrder = (
        action as actions.SuccessDeleteCuriaEconomicCouncil
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    // case actions.CuriaEconomicCouncilsActionTypes.RequestBulkDeleteCuriaEconomicCouncils:
    //   return { ...state, error: null };

    // case actions.CuriaEconomicCouncilsActionTypes.SuccessBulkDeleteCuriaEconomicCouncils:
    //   curiaMinistryAndOrder = (action as actions.SuccessBulkDeleteCuriaEconomicCouncils).payload;
    //   return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestSendTestCuriaEconomicCouncil:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessSendTestCuriaEconomicCouncil:
      curiaMinistryAndOrder = (
        action as actions.SuccessSendTestCuriaEconomicCouncil
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes
      .SetSelectedCuriaEconomicCouncils:
      selectedIds = (action as actions.SetSelectedCuriaEconomicCouncils)
        .payload;
      return { ...state, selectedIds };

    case actions.CuriaEconomicCouncilsActionTypes
      .SetModalSelectCuriaEconomicCouncil:
      modalRowSelect = (action as actions.SetModalSelectCuriaEconomicCouncil)
        .payload;
      return { ...state, modalRowSelect };

    case actions.CuriaEconomicCouncilsActionTypes
      .RequestGetEntirelyCuriaEconomicCouncils:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes
      .SuccessGetEntirelyCuriaEconomicCouncils:
      curiaEconomicCouncilsEntirely = (
        action as actions.SuccessGetEntirelyCuriaEconomicCouncils
      ).payload;
      return { ...state, curiaEconomicCouncilsEntirely };

    case actions.CuriaEconomicCouncilsActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaEconomicCouncilsActionTypes.SuccessGetNew:
      curiaMinistryAndOrder = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaEconomicCouncilsActionTypes.ClearGet:
      return { ...state, curiaMinistryAndOrder: null };

    case actions.CuriaEconomicCouncilsActionTypes.RequestGetNewCMODocument:
      return { ...state, error: null };

    default:
      return state;
  }
}
