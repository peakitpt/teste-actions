import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './curia-ministries-and-orders.reducer';
import {
  CuriaMinistryAndOrderResponse,
  CuriaMinistryAndOrder,
} from '../curia-ministry-and-order.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';

export const getCuriaMinistriesAndOrders = createFeatureSelector(
  'curia-ministries-and-orders'
);

export const getError = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => state.error
);

export const getCuriaMinistriesAndOrdersList = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => {
    return state.curiaMinistriesAndOrders as CuriaMinistryAndOrderResponse;
  }
);

export const getCuriaMinistriesAndOrdersListEntirely = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => {
    return state.curiaMinistriesAndOrdersEntirely as CuriaMinistryAndOrderResponse;
  }
);

export const getCuriaMinistryAndOrder = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => {
    return state.curiaMinistryAndOrder as CuriaMinistryAndOrder;
  }
);

export const getSelectedCuriaMinistriesAndOrders = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => {
    return state.selectedIds as CuriaMinistryAndOrder[];
  }
);

export const getModalRowCuriaMinistryAndOrder = createSelector(
  getCuriaMinistriesAndOrders,
  (state: State) => {
    if (state) {
      return state.modalRowSelect as SelectedModalRow;
    }
  }
);
