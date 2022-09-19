import { Action } from '@ngrx/store';
import * as actions from './accounting-cost-centers.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  AccountingCostCenter,
  AccountingCostCenterResponse,
} from '../accounting-cost-center.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  accountingCostCenters: AccountingCostCenterResponse;
  accountingCostCentersEntirely: AccountingCostCenterResponse;
  accountingCostCenter: AccountingCostCenter;
  selectedIds: AccountingCostCenter[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  accountingCostCenters: null,
  accountingCostCentersEntirely: null,
  accountingCostCenter: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let accountingCostCenters: any;
  let accountingCostCentersEntirely: any;
  let accountingCostCenter: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.AccountingCostCentersActionTypes.RequestFail:
      const error = (action as actions.RequestFail).payload;
      return { ...state, error };

    case actions.AccountingCostCentersActionTypes.RequestGetAll:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessGetAll:
      accountingCostCenters = (action as actions.SuccessGetAll).payload;
      return { ...state, accountingCostCenters };

    case actions.AccountingCostCentersActionTypes.RequestGet:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessGet:
      accountingCostCenter = (action as actions.SuccessGet).payload;
      return { ...state, accountingCostCenter };

    case actions.AccountingCostCentersActionTypes.RequestPost:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessPost:
      accountingCostCenter = (action as actions.SuccessPost).payload;
      return { ...state, accountingCostCenter };

    case actions.AccountingCostCentersActionTypes.RequestPut:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessPut:
      accountingCostCenter = (action as actions.SuccessPut).payload;
      return { ...state, accountingCostCenter };

    case actions.AccountingCostCentersActionTypes.RequestDelete:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessDelete:
      accountingCostCenter = (action as actions.SuccessDelete).payload;
      return { ...state, accountingCostCenter };

    // case actions.AccountingCostCentersActionTypes.RequestBulkDelete:
    //   return { ...state, error: null };

    // case actions.AccountingCostCentersActionTypes.SuccessBulkDelete:
    //   accountingCostCenter = (action as actions.SuccessBulkDelete).payload;
    //   return { ...state, accountingCostCenter };

    case actions.AccountingCostCentersActionTypes.RequestSendTest:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessSendTest:
      accountingCostCenter = (action as actions.SuccessSendTest).payload;
      return { ...state, accountingCostCenter };

    case actions.AccountingCostCentersActionTypes.SetSelected:
      selectedIds = (action as actions.SetSelected).payload;
      return { ...state, selectedIds };

    case actions.AccountingCostCentersActionTypes.SetModalSelect:
      modalRowSelect = (action as actions.SetModalSelect).payload;
      return { ...state, modalRowSelect };

    case actions.AccountingCostCentersActionTypes.RequestGetEntirely:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessGetEntirely:
      accountingCostCentersEntirely = (action as actions.SuccessGetEntirely)
        .payload;
      return { ...state, accountingCostCentersEntirely };

    case actions.AccountingCostCentersActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.AccountingCostCentersActionTypes.SuccessGetNew:
      accountingCostCenter = (action as actions.SuccessGetNew).payload;
      return { ...state, accountingCostCenter };

    default:
      return state;
  }
}
