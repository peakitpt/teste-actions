import { Action } from '@ngrx/store';
import * as actions from './curia-ministries-and-orders.actions';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import {
  CuriaMinistryAndOrder,
  CuriaMinistryAndOrderResponse,
} from '../curia-ministry-and-order.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export interface State {
  curiaMinistriesAndOrders: CuriaMinistryAndOrderResponse;
  curiaMinistriesAndOrdersEntirely: CuriaMinistryAndOrderResponse;
  curiaMinistryAndOrder: CuriaMinistryAndOrder;
  selectedIds: CuriaMinistryAndOrder[];
  modalRowSelect: SelectedModalRow;
  error: RequestError;
}

export const initialState: State = {
  curiaMinistriesAndOrders: null,
  curiaMinistriesAndOrdersEntirely: null,
  curiaMinistryAndOrder: null,
  selectedIds: null,
  modalRowSelect: null,
  error: null,
};

export function reducer(state = initialState, action: Action): State {
  let curiaMinistriesAndOrders: any;
  let curiaMinistriesAndOrdersEntirely: any;
  let curiaMinistryAndOrder: any;
  let selectedIds: any;
  let modalRowSelect: any;

  switch (action.type) {
    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestFailCuriaMinistriesAndOrders:
      const error = (action as actions.RequestFailCuriaMinistriesAndOrders)
        .payload;
      return { ...state, error };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestGetAllCuriaMinistriesAndOrders:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessGetAllCuriaMinistriesAndOrders:
      curiaMinistriesAndOrders = (
        action as actions.SuccessGetAllCuriaMinistriesAndOrders
      ).payload;
      return { ...state, curiaMinistriesAndOrders };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestGetCuriaMinistryAndOrder:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessGetCuriaMinistryAndOrder:
      curiaMinistryAndOrder = (
        action as actions.SuccessGetCuriaMinistryAndOrder
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestPostCuriaMinistryAndOrder:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessPostCuriaMinistryAndOrder:
      curiaMinistryAndOrder = (
        action as actions.SuccessPostCuriaMinistryAndOrder
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestPutCuriaMinistryAndOrder:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessPutCuriaMinistryAndOrder:
      curiaMinistryAndOrder = (
        action as actions.SuccessPutCuriaMinistryAndOrder
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestDeleteCuriaMinistryAndOrder:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessDeleteCuriaMinistryAndOrder:
      curiaMinistryAndOrder = (
        action as actions.SuccessDeleteCuriaMinistryAndOrder
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    // case actions.CuriaMinistriesAndOrdersActionTypes.RequestBulkDeleteCuriaMinistriesAndOrders:
    //   return { ...state, error: null };

    // case actions.CuriaMinistriesAndOrdersActionTypes.SuccessBulkDeleteCuriaMinistriesAndOrders:
    //   curiaMinistryAndOrder = (action as actions.SuccessBulkDeleteCuriaMinistriesAndOrders).payload;
    //   return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestSendTestCuriaMinistryAndOrder:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessSendTestCuriaMinistryAndOrder:
      curiaMinistryAndOrder = (
        action as actions.SuccessSendTestCuriaMinistryAndOrder
      ).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SetSelectedCuriaMinistriesAndOrders:
      selectedIds = (action as actions.SetSelectedCuriaMinistriesAndOrders)
        .payload;
      return { ...state, selectedIds };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SetModalSelectCuriaMinistryAndOrder:
      modalRowSelect = (action as actions.SetModalSelectCuriaMinistryAndOrder)
        .payload;
      return { ...state, modalRowSelect };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .RequestGetEntirelyCuriaMinistriesAndOrders:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessGetEntirelyCuriaMinistriesAndOrders:
      curiaMinistriesAndOrdersEntirely = (
        action as actions.SuccessGetEntirelyCuriaMinistriesAndOrders
      ).payload;
      return { ...state, curiaMinistriesAndOrdersEntirely };

    case actions.CuriaMinistriesAndOrdersActionTypes.RequestGetNew:
      return { ...state, error: null };

    case actions.CuriaMinistriesAndOrdersActionTypes.SuccessGetNew:
      curiaMinistryAndOrder = (action as actions.SuccessGetNew).payload;
      return { ...state, curiaMinistryAndOrder };

    case actions.CuriaMinistriesAndOrdersActionTypes.ClearGet:
      return { ...state, curiaMinistryAndOrder: null };

    default:
      return state;
  }
}
